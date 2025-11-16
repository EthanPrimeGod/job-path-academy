import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  MessageSquare, 
  GraduationCap, 
  CreditCard, 
  UsersRound, 
  Settings 
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Overview", href: "/company", icon: LayoutDashboard },
  { label: "Jobs", href: "/company/jobs", icon: Briefcase },
  { label: "Applicants", href: "/company/applicants", icon: Users },
  { label: "Messages", href: "/company/messages", icon: MessageSquare },
  { label: "Modules", href: "/company/modules", icon: GraduationCap },
  { label: "Billing", href: "/company/billing", icon: CreditCard },
  { label: "Team", href: "/company/team", icon: UsersRound },
  { label: "Settings", href: "/company/settings", icon: Settings },
];

export const CompanySidebar = () => {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:flex-col md:w-72 border-r border-border/50 bg-card/40 backdrop-blur-glass relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-accent opacity-50" />
        <div className="relative z-10 p-8">
          <div className="mb-8 pb-6 border-b border-border/50">
            <h2 className="text-2xl font-light mb-1">
              Company <span className="font-medium bg-gradient-primary bg-clip-text text-transparent">Portal</span>
            </h2>
            <p className="text-sm text-muted-foreground">Manage your hiring pipeline</p>
          </div>
          <nav className="space-y-1.5">
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                end={item.href === "/company"}
                className={({ isActive }) =>
                  cn(
                    "group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 relative overflow-hidden",
                    isActive
                      ? "bg-primary/10 text-primary border border-primary/20 shadow-glow"
                      : "text-muted-foreground hover:bg-muted/50 hover:text-foreground border border-transparent hover:border-border/50"
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-accent opacity-20" />
                    )}
                    <div className={cn(
                      "w-9 h-9 rounded-lg flex items-center justify-center transition-colors relative z-10",
                      isActive 
                        ? "bg-primary/20 border border-primary/30" 
                        : "bg-muted/30 border border-border/30 group-hover:bg-muted/50"
                    )}>
                      <item.icon className={cn(
                        "w-5 h-5 transition-colors",
                        isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                      )} />
                    </div>
                    <span className="font-medium relative z-10">{item.label}</span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>
      </aside>

      {/* Mobile Top Tabs */}
      <div className="md:hidden border-b border-border/50 bg-card/40 backdrop-blur-glass overflow-x-auto relative">
        <div className="absolute inset-0 bg-gradient-accent opacity-30" />
        <nav className="flex px-4 gap-2 min-w-max relative z-10">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              end={item.href === "/company"}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-2 px-5 py-4 border-b-2 transition-all duration-300 whitespace-nowrap relative",
                  isActive
                    ? "border-primary text-primary bg-primary/5"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/30"
                )
              }
            >
              <item.icon className="h-4 w-4" />
              <span className="text-sm font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </>
  );
};
