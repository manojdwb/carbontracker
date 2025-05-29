import { Button } from "@/components/ui/button";

interface HeaderProps {
  title: string;
  subtitle: string;
  onExport?: () => void;
  onAddEntry?: () => void;
}

export default function Header({ title, subtitle, onExport, onAddEntry }: HeaderProps) {
  return (
    <header className="bg-card border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">{title}</h2>
          <p className="text-muted-foreground">{subtitle}</p>
        </div>
        <div className="flex items-center space-x-4">
          {onExport && (
            <Button variant="outline" onClick={onExport}>
              <i className="fas fa-download mr-2"></i>
              Export Data
            </Button>
          )}
          {onAddEntry && (
            <Button onClick={onAddEntry}>
              <i className="fas fa-plus mr-2"></i>
              Add Entry
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
