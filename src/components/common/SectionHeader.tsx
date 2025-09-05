import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

const SectionHeader = ({
  title,
  subtitle,
  buttonText,
  onButtonClick,
}: SectionHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-3xl font-bold text-foreground">{title}</h1>
        {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
      </div>

      {buttonText && (
        <Button className="flex items-center gap-2" onClick={onButtonClick}>
          <Plus className="h-4 w-4" />
          {buttonText}
        </Button>
      )}
    </div>
  );
};

export default SectionHeader;
