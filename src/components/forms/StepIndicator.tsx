import { Card, CardContent } from '@/components/ui/card';
import { Check } from 'lucide-react';

interface Step {
  id: number;
  title: string;
  description: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ steps, currentStep }) => {
  return (
    <Card className="card-elevated">
      <CardContent className="p-4 md:p-6">
        <div 
          className="
            flex md:justify-between items-center 
            gap-6 md:gap-0 
            overflow-x-auto md:overflow-visible 
            scrollbar-hide
          "
        >
          {steps.map((step, index) => (
            <div 
              key={step.id} 
              className="flex items-center flex-shrink-0 md:flex-1"
            >
              {/* Circle */}
              <div
                className={`
                  flex items-center justify-center w-10 h-10 rounded-full border-2 font-medium shrink-0
                  ${currentStep >= step.id 
                    ? 'bg-primary text-primary-foreground border-primary' 
                    : 'bg-background text-muted-foreground border-border'
                  }
                `}
              >
                {currentStep > step.id ? (
                  <Check className="h-5 w-5" />
                ) : (
                  step.id
                )}
              </div>

              {/* Text */}
              <div className="ml-3 hidden md:block">
                <div
                  className={`
                    text-sm font-medium
                    ${currentStep >= step.id ? 'text-foreground' : 'text-muted-foreground'}
                  `}
                >
                  {step.title}
                </div>
                <div className="text-xs text-muted-foreground">
                  {step.description}
                </div>
              </div>

              {/* Divider */}
              {index < steps.length - 1 && (
                <div
                  className={`
                    w-12 h-px mx-4
                    ${currentStep > step.id ? 'bg-primary' : 'bg-border'}
                  `}
                />
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
