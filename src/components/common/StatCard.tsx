import { Card, CardContent } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: LucideIcon;
  color?: string; // Tailwind class para color del texto/icono
}

const StatCard = ({
  label,
  value,
  icon: Icon,
  color = "text-primary",
}: StatCardProps) => {
  return (
    <Card className="card-elevated">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{label}</p>
            <p className={`text-2xl font-bold ${color}`}>{value}</p>
          </div>
          {Icon && <Icon className={`h-8 w-8 ${color}`} />}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
