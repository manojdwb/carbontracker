import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/", icon: "fas fa-chart-line" },
  { name: "Data", href: "/data", icon: "fas fa-database" },
  { name: "Analytics", href: "/analytics", icon: "fas fa-chart-bar" },
  { name: "Reporting", href: "/reporting", icon: "fas fa-file-alt" },
  { name: "Market Analysis", href: "/market-analysis", icon: "fas fa-lock" },
  { name: "Supplier Assessment", href: "/supplier-assessment", icon: "fas fa-handshake" },
];

export default function Sidebar() {
  const [location] = useLocation();

  return (
    <div className="w-64 bg-sidebar text-sidebar-foreground flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center">
            <i className="fas fa-leaf text-sidebar-primary-foreground text-sm"></i>
          </div>
          <div>
            <h1 className="text-lg font-bold">Invalumetrics</h1>
            <p className="text-xs text-gray-400">ESG Platform</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const isActive = location === item.href;
            return (
              <li key={item.name}>
                <Link href={item.href}>
                  <div className={cn(
                    "flex items-center space-x-3 p-3 rounded-lg transition-colors cursor-pointer",
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "text-gray-300 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}>
                    <i className={`${item.icon} w-5`}></i>
                    <span>{item.name}</span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer - Removed user info section */}
    </div>
  );
}
