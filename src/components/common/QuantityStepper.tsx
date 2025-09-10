import React, { useState, useEffect } from 'react';
import { Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface QuantityStepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  label?: string;
  disabled?: boolean;
  size?: 'sm' | 'default' | 'lg';
  showInput?: boolean;
}

export const QuantityStepper: React.FC<QuantityStepperProps> = ({
  value,
  onChange,
  min = 1,
  max = 999,
  step = 1,
  unit = 'unidades',
  label,
  disabled = false,
  size = 'default',
  showInput = true
}) => {
  const [inputValue, setInputValue] = useState(value.toString());
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!isEditing) {
      setInputValue(value.toString());
    }
  }, [value, isEditing]);

  const handleIncrement = () => {
    const newValue = Math.min(value + step, max);
    if (newValue !== value) {
      onChange(newValue);
    }
  };

  const handleDecrement = () => {
    const newValue = Math.max(value - step, min);
    if (newValue !== value) {
      onChange(newValue);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    setIsEditing(false);
    const numValue = parseInt(inputValue, 10);
    
    if (isNaN(numValue)) {
      setInputValue(value.toString());
      return;
    }

    const clampedValue = Math.max(min, Math.min(max, numValue));
    onChange(clampedValue);
    setInputValue(clampedValue.toString());
  };

  const handleInputFocus = () => {
    setIsEditing(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleInputBlur();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      handleIncrement();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      handleDecrement();
    }
  };

  const buttonSize = {
    sm: 'h-7 w-7',
    default: 'h-9 w-9',
    lg: 'h-11 w-11'
  }[size];

  const inputSize = {
    sm: 'h-7 text-sm',
    default: 'h-9',
    lg: 'h-11 text-lg'
  }[size];

  const isMinDisabled = disabled || value <= min;
  const isMaxDisabled = disabled || value >= max;

  return (
    <div className="space-y-2">
      {label && (
        <Label className="text-sm font-medium text-foreground">
          {label}
        </Label>
      )}
      
      <div className="flex items-center space-x-1">
        {/* Decrement button */}
        <Button
          variant="outline"
          size="icon"
          className={buttonSize}
          disabled={isMinDisabled}
          onClick={handleDecrement}
          aria-label={`Disminuir cantidad de ${unit}`}
        >
          <Minus className="h-4 w-4" />
        </Button>

        {/* Input field */}
        {showInput ? (
          <div className="flex-1 max-w-20">
            <Input
              type="number"
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              onFocus={handleInputFocus}
              onKeyDown={handleKeyDown}
              disabled={disabled}
              min={min}
              max={max}
              step={step}
              className={`text-center ${inputSize}`}
              aria-label={`Cantidad de ${unit}`}
            />
          </div>
        ) : (
          <div className={`
            flex items-center justify-center min-w-16 px-3 py-2 
            bg-muted border border-border rounded-md ${inputSize}
            font-medium text-foreground
          `}>
            {value}
          </div>
        )}

        {/* Increment button */}
        <Button
          variant="outline"
          size="icon"
          className={buttonSize}
          disabled={isMaxDisabled}
          onClick={handleIncrement}
          aria-label={`Aumentar cantidad de ${unit}`}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {/* Unit and validation info */}
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>{unit}</span>
        {(min > 1 || max < 999) && (
          <span>
            {min}-{max} {unit}
          </span>
        )}
      </div>

      {/* Validation errors */}
      {value < min && (
        <p className="text-xs text-destructive">
          Cantidad mínima: {min} {unit}
        </p>
      )}
      {value > max && (
        <p className="text-xs text-destructive">
          Cantidad máxima: {max} {unit}
        </p>
      )}
    </div>
  );
};