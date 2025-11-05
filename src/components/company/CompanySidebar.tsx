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
      <aside className="hidden md:flex md:flex-col md:w-64 border-r border-border/50 bg-card/30">
        <div className="p-6">
          <h2 className="text-lg font-semibold">Company Dashboard</h2>
        </div>
        <nav className="flex-1 px-3 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              end={item.href === "/company"}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                )
              }
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Mobile Top Tabs */}
      <div className="md:hidden border-b border-border/50 bg-card/30 overflow-x-auto">
        <nav className="flex px-4 gap-2 min-w-max">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              end={item.href === "/company"}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap",
                  isActive
                    ? "border-primary text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                )
              }
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </>
  );
};
