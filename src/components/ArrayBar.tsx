
import React from "react";
import { ArrayElement } from "@/utils/algorithmTypes";
import { cn } from "@/lib/utils";

interface ArrayBarProps {
  element: ArrayElement;
  maxValue: number;
  index: number;
}

const ArrayBar: React.FC<ArrayBarProps> = ({ element, maxValue, index }) => {
  // Calculate height based on value and maximum value
  const height = `${(element.value / maxValue) * 100}%`;
  
  // Determine color based on element state
  const getBarColor = () => {
    switch (element.state) {
      case 'comparing':
        return 'bg-algo-comparing';
      case 'swapping':
        return 'bg-algo-swapping';
      case 'sorted':
        return 'bg-algo-sorted';
      case 'selected':
        return 'bg-algo-selected';
      case 'pivot':
        return 'bg-algo-pivot';
      default:
        return 'bg-algo-default';
    }
  };
  
  // Determine animations based on element state
  const getAnimationClass = () => {
    switch (element.state) {
      case 'swapping':
        return 'array-bar swapping';
      case 'sorted':
        return 'array-bar sorted';
      default:
        return 'array-bar';
    }
  };
  
  return (
    <div className="flex flex-col items-center justify-end h-full">
      <div 
        className={cn(
          "w-full transition-all duration-300 ease-in-out rounded-t-sm shadow-md dark:shadow-gray-900",
          getBarColor(),
          getAnimationClass()
        )}
        style={{ height }}
        data-index={index}
        data-value={element.value}
      />
      <span className="text-xs mt-1 hidden md:block text-foreground">
        {element.value}
      </span>
    </div>
  );
};

export default ArrayBar;
