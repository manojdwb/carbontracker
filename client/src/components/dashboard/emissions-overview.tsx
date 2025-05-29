import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { formatCO2 } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface EmissionsSummary {
  scope1: number;
  scope2: number;
  scope3: number;
  total: number;
}

export default function EmissionsOverview() {
  const { data: summary, isLoading } = useQuery<EmissionsSummary>({
    queryKey: ["/api/emissions/summary"],
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-8 w-16 mb-1" />
              <Skeleton className="h-4 w-12" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const scopes = [
    {
      title: "Scope 1 Emissions",
      value: summary?.scope1 || 0,
      icon: "fas fa-fire",
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
      change: "+8.2%",
      changeColor: "text-red-600",
      changeIcon: "fas fa-arrow-up",
    },
    {
      title: "Scope 2 Emissions", 
      value: summary?.scope2 || 0,
      icon: "fas fa-bolt",
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
      change: "-3.1%",
      changeColor: "text-accent",
      changeIcon: "fas fa-arrow-down",
    },
    {
      title: "Scope 3 Emissions",
      value: summary?.scope3 || 0,
      icon: "fas fa-globe",
      iconBg: "bg-blue-100", 
      iconColor: "text-blue-600",
      change: "+12.5%",
      changeColor: "text-red-600",
      changeIcon: "fas fa-arrow-up",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {scopes.map((scope) => (
        <Card key={scope.title} className="bg-card shadow-sm border border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{scope.title}</p>
                <p className="text-3xl font-bold text-foreground mt-2">{formatCO2(scope.value).split(' ')[0]}</p>
                <p className="text-sm text-muted-foreground">tCO2e</p>
              </div>
              <div className={`w-12 h-12 ${scope.iconBg} rounded-lg flex items-center justify-center`}>
                <i className={`${scope.icon} ${scope.iconColor}`}></i>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center text-sm">
                <i className={`${scope.changeIcon} ${scope.changeColor} mr-1`}></i>
                <span className={`${scope.changeColor} font-medium`}>{scope.change}</span>
                <span className="text-muted-foreground ml-1">vs last month</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
