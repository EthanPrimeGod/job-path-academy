import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Eye, EyeOff } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

type AuthMode = "signin" | "signup";
type UserRole = "annotator" | "company";

const signInSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const signUpAnnotatorSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters").max(20, "Username must be less than 20 characters"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
  agreeToTerms: z.boolean().refine((val) => val === true, "You must agree to the terms"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const signUpCompanySchema = z.object({
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
  agreeToTerms: z.boolean().refine((val) => val === true, "You must agree to the terms"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SignInFormData = z.infer<typeof signInSchema>;
type SignUpAnnotatorFormData = z.infer<typeof signUpAnnotatorSchema>;
type SignUpCompanyFormData = z.infer<typeof signUpCompanySchema>;

const Auth = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<AuthMode>("signin");
  const [role, setRole] = useState<UserRole>("annotator");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const signInForm = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
  });

  const signUpAnnotatorForm = useForm<SignUpAnnotatorFormData>({
    resolver: zodResolver(signUpAnnotatorSchema),
    defaultValues: { username: "", email: "", password: "", confirmPassword: "", agreeToTerms: false },
  });

  const signUpCompanyForm = useForm<SignUpCompanyFormData>({
    resolver: zodResolver(signUpCompanySchema),
    defaultValues: { companyName: "", email: "", password: "", confirmPassword: "", agreeToTerms: false },
  });

  const getPasswordStrength = (password: string): { strength: string; color: string } => {
    if (password.length < 8) return { strength: "weak", color: "bg-destructive" };
    if (password.length < 12 || !/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
      return { strength: "okay", color: "bg-yellow-500" };
    }
    return { strength: "strong", color: "bg-green-500" };
  };

  const handleSignIn = async (data: SignInFormData) => {
    setIsLoading(true);
    try {
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) throw error;

      if (authData.user) {
        // Check user role
        const { data: roleData } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", authData.user.id)
          .single();

        toast({
          title: "Welcome back!",
          description: "You've successfully signed in.",
        });

        // Redirect based on role
        if (roleData?.role === "company") {
          navigate("/dashboard");
        } else {
          navigate("/hive");
        }
      }
    } catch (error: any) {
      toast({
        title: "Error signing in",
        description: error.message || "Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (data: SignUpAnnotatorFormData | SignUpCompanyFormData) => {
    setIsLoading(true);
    try {
      const { data: authData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            username: "username" in data ? data.username : undefined,
            company_name: "companyName" in data ? data.companyName : undefined,
          },
        },
      });

      if (error) throw error;

      if (authData.user) {
        // Insert role
        const { error: roleError } = await supabase.from("user_roles").insert({
          user_id: authData.user.id,
          role: role,
        });

        if (roleError) throw roleError;

        // Insert profile
        const { error: profileError } = await supabase.from("profiles").insert({
          user_id: authData.user.id,
          username: "username" in data ? data.username : undefined,
          company_name: "companyName" in data ? data.companyName : undefined,
        });

        if (profileError) throw profileError;

        toast({
          title: "Account created!",
          description: "Welcome to Annota. Redirecting...",
        });

        // Redirect based on role
        if (role === "company") {
          navigate("/dashboard");
        } else {
          navigate("/hive");
        }
      }
    } catch (error: any) {
      toast({
        title: "Error creating account",
        description: error.message || "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const annotatorPassword = signUpAnnotatorForm.watch("password");
  const companyPassword = signUpCompanyForm.watch("password");
  const password = role === "annotator" ? annotatorPassword : companyPassword;
  const passwordStrength = password ? getPasswordStrength(password) : null;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      
      <main className="flex-1 flex items-center justify-center px-4 py-12 bg-gradient-subtle">
        <Card className="w-full max-w-[560px] shadow-soft border-border/50 bg-card/80 backdrop-blur-glass">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-3xl font-bold">Welcome to Annota</CardTitle>
            <CardDescription>
              Sign in or create an account to start practicing in The Hive or post jobs.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Mode Toggle */}
            <div className="flex gap-2 p-1 bg-muted/30 rounded-lg">
              <Button
                type="button"
                variant={mode === "signin" ? "outline" : "ghost"}
                className="flex-1"
                onClick={() => setMode("signin")}
              >
                Sign In
              </Button>
              <Button
                type="button"
                variant={mode === "signup" ? "outline" : "ghost"}
                className="flex-1"
                onClick={() => setMode("signup")}
              >
                Create Account
              </Button>
            </div>

            {/* Sign In Form */}
            {mode === "signin" && (
              <form onSubmit={signInForm.handleSubmit(handleSignIn)} className="space-y-4 animate-fade-in">
                <div className="space-y-2">
                  <Label htmlFor="signin-email">Email</Label>
                  <Input
                    id="signin-email"
                    type="email"
                    placeholder="you@example.com"
                    {...signInForm.register("email")}
                  />
                  {signInForm.formState.errors.email && (
                    <p className="text-sm text-destructive">{signInForm.formState.errors.email.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signin-password">Password</Label>
                  <div className="relative">
                    <Input
                      id="signin-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      {...signInForm.register("password")}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {signInForm.formState.errors.password && (
                    <p className="text-sm text-destructive">{signInForm.formState.errors.password.message}</p>
                  )}
                </div>

                <Button type="submit" className="w-full" variant="outline" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>

                <div className="text-center space-y-2">
                  <a href="/auth/reset" className="text-sm text-primary hover:underline">
                    Forgot password?
                  </a>
                  <p className="text-sm text-muted-foreground">
                    Don't have an account?{" "}
                    <button
                      type="button"
                      onClick={() => setMode("signup")}
                      className="text-primary hover:underline"
                    >
                      Create one
                    </button>
                  </p>
                </div>

                {/* SSO Placeholders */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button type="button" variant="outline" disabled>
                    Google
                  </Button>
                  <Button type="button" variant="outline" disabled>
                    GitHub
                  </Button>
                </div>
              </form>
            )}

            {/* Sign Up Form */}
            {mode === "signup" && (
              <div className="space-y-4 animate-fade-in">
                {/* Role Toggle */}
                <div className="space-y-2">
                  <Label>Account Type</Label>
                  <div className="flex gap-2 p-1 bg-muted/30 rounded-lg">
                    <Button
                      type="button"
                      variant={role === "annotator" ? "outline" : "ghost"}
                      size="sm"
                      className="flex-1"
                      onClick={() => setRole("annotator")}
                    >
                      Annotator
                    </Button>
                    <Button
                      type="button"
                      variant={role === "company" ? "outline" : "ghost"}
                      size="sm"
                      className="flex-1"
                      onClick={() => setRole("company")}
                    >
                      Company
                    </Button>
                  </div>
                </div>

                {/* Annotator Fields */}
                {role === "annotator" && (
                  <form
                    onSubmit={signUpAnnotatorForm.handleSubmit(handleSignUp)}
                    className="space-y-4"
                  >
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        placeholder="annotator123"
                        {...signUpAnnotatorForm.register("username")}
                      />
                      {signUpAnnotatorForm.formState.errors.username && (
                        <p className="text-sm text-destructive">
                          {signUpAnnotatorForm.formState.errors.username.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="annotator-email">Email</Label>
                      <Input
                        id="annotator-email"
                        type="email"
                        placeholder="you@example.com"
                        {...signUpAnnotatorForm.register("email")}
                      />
                      {signUpAnnotatorForm.formState.errors.email && (
                        <p className="text-sm text-destructive">
                          {signUpAnnotatorForm.formState.errors.email.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="annotator-password">Password</Label>
                      <div className="relative">
                        <Input
                          id="annotator-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a strong password"
                          {...signUpAnnotatorForm.register("password")}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                      {passwordStrength && (
                        <div className="space-y-1">
                          <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                            <div
                              className={`h-full transition-all ${passwordStrength.color}`}
                              style={{
                                width:
                                  passwordStrength.strength === "weak"
                                    ? "33%"
                                    : passwordStrength.strength === "okay"
                                    ? "66%"
                                    : "100%",
                              }}
                            />
                          </div>
                          <p className="text-xs text-muted-foreground capitalize">
                            Password strength: {passwordStrength.strength}
                          </p>
                        </div>
                      )}
                      {signUpAnnotatorForm.formState.errors.password && (
                        <p className="text-sm text-destructive">
                          {signUpAnnotatorForm.formState.errors.password.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="annotator-confirm">Confirm Password</Label>
                      <div className="relative">
                        <Input
                          id="annotator-confirm"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm your password"
                          {...signUpAnnotatorForm.register("confirmPassword")}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                      {signUpAnnotatorForm.formState.errors.confirmPassword && (
                        <p className="text-sm text-destructive">
                          {signUpAnnotatorForm.formState.errors.confirmPassword.message}
                        </p>
                      )}
                    </div>

                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="annotator-terms"
                        checked={signUpAnnotatorForm.watch("agreeToTerms")}
                        onCheckedChange={(checked) =>
                          signUpAnnotatorForm.setValue("agreeToTerms", checked === true)
                        }
                      />
                      <label htmlFor="annotator-terms" className="text-sm leading-tight">
                        I agree to the{" "}
                        <a href="/legal/terms" className="text-primary hover:underline">
                          Terms
                        </a>{" "}
                        and{" "}
                        <a href="/legal/privacy" className="text-primary hover:underline">
                          Privacy Policy
                        </a>
                      </label>
                    </div>
                    {signUpAnnotatorForm.formState.errors.agreeToTerms && (
                      <p className="text-sm text-destructive">
                        {signUpAnnotatorForm.formState.errors.agreeToTerms.message}
                      </p>
                    )}

                    <Button
                      type="submit"
                      className="w-full"
                      variant="outline"
                      disabled={isLoading || !signUpAnnotatorForm.watch("agreeToTerms")}
                    >
                      {isLoading ? "Creating account..." : "Create Account"}
                    </Button>

                    <p className="text-sm text-center text-muted-foreground">
                      Already have an account?{" "}
                      <button
                        type="button"
                        onClick={() => setMode("signin")}
                        className="text-primary hover:underline"
                      >
                        Sign in
                      </button>
                    </p>
                  </form>
                )}

                {/* Company Fields */}
                {role === "company" && (
                  <form
                    onSubmit={signUpCompanyForm.handleSubmit(handleSignUp)}
                    className="space-y-4"
                  >
                    <div className="space-y-2">
                      <Label htmlFor="company-name">Company Name</Label>
                      <Input
                        id="company-name"
                        placeholder="Acme Inc."
                        {...signUpCompanyForm.register("companyName")}
                      />
                      {signUpCompanyForm.formState.errors.companyName && (
                        <p className="text-sm text-destructive">
                          {signUpCompanyForm.formState.errors.companyName.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company-email">Company Email</Label>
                      <Input
                        id="company-email"
                        type="email"
                        placeholder="contact@company.com"
                        {...signUpCompanyForm.register("email")}
                      />
                      {signUpCompanyForm.formState.errors.email && (
                        <p className="text-sm text-destructive">
                          {signUpCompanyForm.formState.errors.email.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company-password">Password</Label>
                      <div className="relative">
                        <Input
                          id="company-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a strong password"
                          {...signUpCompanyForm.register("password")}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                      {passwordStrength && (
                        <div className="space-y-1">
                          <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                            <div
                              className={`h-full transition-all ${passwordStrength.color}`}
                              style={{
                                width:
                                  passwordStrength.strength === "weak"
                                    ? "33%"
                                    : passwordStrength.strength === "okay"
                                    ? "66%"
                                    : "100%",
                              }}
                            />
                          </div>
                          <p className="text-xs text-muted-foreground capitalize">
                            Password strength: {passwordStrength.strength}
                          </p>
                        </div>
                      )}
                      {signUpCompanyForm.formState.errors.password && (
                        <p className="text-sm text-destructive">
                          {signUpCompanyForm.formState.errors.password.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company-confirm">Confirm Password</Label>
                      <div className="relative">
                        <Input
                          id="company-confirm"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm your password"
                          {...signUpCompanyForm.register("confirmPassword")}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                      {signUpCompanyForm.formState.errors.confirmPassword && (
                        <p className="text-sm text-destructive">
                          {signUpCompanyForm.formState.errors.confirmPassword.message}
                        </p>
                      )}
                    </div>

                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="company-terms"
                        checked={signUpCompanyForm.watch("agreeToTerms")}
                        onCheckedChange={(checked) =>
                          signUpCompanyForm.setValue("agreeToTerms", checked === true)
                        }
                      />
                      <label htmlFor="company-terms" className="text-sm leading-tight">
                        I agree to the{" "}
                        <a href="/legal/terms" className="text-primary hover:underline">
                          Terms
                        </a>{" "}
                        and{" "}
                        <a href="/legal/privacy" className="text-primary hover:underline">
                          Privacy Policy
                        </a>
                      </label>
                    </div>
                    {signUpCompanyForm.formState.errors.agreeToTerms && (
                      <p className="text-sm text-destructive">
                        {signUpCompanyForm.formState.errors.agreeToTerms.message}
                      </p>
                    )}

                    <Button
                      type="submit"
                      className="w-full"
                      variant="outline"
                      disabled={isLoading || !signUpCompanyForm.watch("agreeToTerms")}
                    >
                      {isLoading ? "Creating account..." : "Create Account"}
                    </Button>

                    <p className="text-sm text-center text-muted-foreground">
                      Already have an account?{" "}
                      <button
                        type="button"
                        onClick={() => setMode("signin")}
                        className="text-primary hover:underline"
                      >
                        Sign in
                      </button>
                    </p>
                  </form>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default Auth;
