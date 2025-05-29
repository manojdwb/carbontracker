import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getComponentIcon, getComponentColor, formatCO2 } from "@/lib/utils";
import type { EmissionEntry } from "@shared/schema";

export default function RecentEntries() {
  const { data: entries, isLoading, refetch } = useQuery<EmissionEntry[]>({
    queryKey: ["/api/emissions"],
  });

  if (isLoading) {
    return (
      <Card className="bg-card shadow-sm border border-border">
        <CardHeader>
          <CardTitle>Recent Entries</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div className="flex items-center space-x-3">
                  <Skeleton className="w-10 h-10 rounded-lg" />
                  <div>
                    <Skeleton className="h-4 w-16 mb-1" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </div>
                <div className="text-right">
                  <Skeleton className="h-4 w-16 mb-1" />
                  <Skeleton className="h-3 w-12" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const recentEntries = entries?.slice(0, 3) || [];

  return (
    <Card className="bg-card shadow-sm border border-border">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Recent Entries</span>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" onClick={() => refetch()}>
              <i className="fas fa-sync-alt"></i>
            </Button>
            <Button variant="ghost" size="sm">
              <i className="fas fa-filter"></i>
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {recentEntries.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <i className="fas fa-inbox text-4xl mb-4 block"></i>
              <p>No emission entries yet</p>
              <p className="text-sm">Add your first entry to get started</p>
            </div>
          ) : (
            recentEntries.map((entry) => (
              <div key={entry.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getComponentColor(entry.componentType)}`}>
                    <i className={`${getComponentIcon(entry.componentType)} text-sm`}></i>
                  </div>
                  <div>
                    <p className="font-medium text-foreground capitalize">
                      {entry.componentType.replace('-', ' ')}
                    </p>
                    <p className="text-sm text-muted-foreground">{entry.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-foreground">{formatCO2(Number(entry.co2Emissions))}</p>
                  <p className="text-sm text-muted-foreground">{entry.quantity} units</p>
                </div>
              </div>
            ))
          )}
        </div>

        {recentEntries.length > 0 && (
          <div className="mt-6 pt-4 border-t border-border">
            <Button variant="ghost" className="w-full text-primary hover:text-primary-dark">
              View All Entries
              <i className="fas fa-arrow-right ml-2"></i>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
