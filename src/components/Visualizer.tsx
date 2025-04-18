
import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import ArrayBar from "./ArrayBar";
import { ArrayElement, AlgorithmType, SortingStep } from "@/utils/algorithmTypes";
import { createRandomArray, getAlgorithmGenerator, sleep } from "@/utils/algorithms";

interface VisualizerProps {
  algorithm: AlgorithmType;
  arraySize: number;
  speed: number;
  isRunning: boolean;
  isPaused: boolean;
  setIsRunning: (isRunning: boolean) => void;
  setIsPaused: (isPaused: boolean) => void;
  triggerReset: boolean;
  triggerStep: boolean;
  resetStepTrigger: () => void;
  triggerNewArray: boolean;
  resetNewArrayTrigger: () => void;
  customArray: ArrayElement[] | null;
}

const Visualizer: React.FC<VisualizerProps> = ({
  algorithm,
  arraySize,
  speed,
  isRunning,
  isPaused,
  setIsRunning,
  setIsPaused,
  triggerReset,
  triggerStep,
  resetStepTrigger,
  triggerNewArray,
  resetNewArrayTrigger,
  customArray
}) => {
  const [array, setArray] = useState<ArrayElement[]>([]);
  const [currentStep, setCurrentStep] = useState<SortingStep | null>(null);
  const generatorRef = useRef<AsyncGenerator<SortingStep> | null>(null);
  const nextValueRef = useRef<IteratorResult<SortingStep> | null>(null);
  
  // Find the maximum value in the array for scaling
  const maxValue = Math.max(...array.map(el => el.value));
  
  // Initialize array on mount or when size changes
  useEffect(() => {
    if (!isRunning || isPaused) {
      if (!customArray) {
        generateNewArray();
      }
    }
  }, [arraySize]);
  
  // Handle custom array changes
  useEffect(() => {
    if (customArray) {
      setArray(customArray);
      setCurrentStep(null);
    }
  }, [customArray]);
  
  // Reset logic
  useEffect(() => {
    if (triggerReset) {
      resetVisualization();
    }
  }, [triggerReset]);
  
  // New array generation logic
  useEffect(() => {
    if (triggerNewArray) {
      generateNewArray();
      resetNewArrayTrigger();
    }
  }, [triggerNewArray]);
  
  // Step forward logic
  useEffect(() => {
    if (triggerStep && isPaused && generatorRef.current) {
      stepForward();
      resetStepTrigger();
    }
  }, [triggerStep]);
  
  // Start/pause logic
  useEffect(() => {
    if (isRunning && !isPaused) {
      runAlgorithm();
    }
  }, [isRunning, isPaused, speed]);
  
  // Initialize generator when algorithm changes
  useEffect(() => {
    if (!isRunning) {
      initializeGenerator();
    }
  }, [algorithm, array]);
  
  const generateNewArray = () => {
    const newArray = createRandomArray(arraySize);
    setArray(newArray);
    setCurrentStep(null);
  };
  
  const initializeGenerator = () => {
    generatorRef.current = getAlgorithmGenerator(algorithm, array);
    nextValueRef.current = null;
  };
  
  const resetVisualization = () => {
    setIsRunning(false);
    setIsPaused(false);
    generateNewArray();
  };
  
  const runAlgorithm = async () => {
    if (!generatorRef.current) {
      initializeGenerator();
    }
    
    try {
      while (isRunning && !isPaused && generatorRef.current) {
        const next = nextValueRef.current || await generatorRef.current.next();
        nextValueRef.current = null;
        
        if (next.done) {
          setIsRunning(false);
          break;
        }
        
        setCurrentStep(next.value);
        setArray(next.value.array);
        
        // Adjust speed based on the speed setting (inverse relationship)
        await sleep(500 / speed);
      }
    } catch (error) {
      console.error("Error during algorithm execution:", error);
      setIsRunning(false);
    }
  };
  
  const stepForward = async () => {
    if (!generatorRef.current) {
      initializeGenerator();
    }
    
    try {
      const next = nextValueRef.current || await generatorRef.current!.next();
      nextValueRef.current = null;
      
      if (next.done) {
        setIsRunning(false);
        return;
      }
      
      setCurrentStep(next.value);
      setArray(next.value.array);
      
      // Store the next value for future stepping
      nextValueRef.current = await generatorRef.current!.next();
    } catch (error) {
      console.error("Error during step execution:", error);
    }
  };
  
  return (
    <div className="w-full">
      <Card className="w-full mb-4">
        <CardContent className="p-4">
          {currentStep && (
            <div className="mb-4 text-center">
              <p className="text-sm md:text-base">{currentStep.description}</p>
            </div>
          )}
          <div className="w-full h-64 md:h-80 flex items-end gap-[1px] md:gap-1">
            {array.map((element, index) => (
              <ArrayBar
                key={index}
                element={element}
                maxValue={maxValue}
                index={index}
              />
            ))}
          </div>
        </CardContent>
      </Card>
      
      <div className="mt-4 flex justify-center gap-2 sm:gap-3 flex-wrap">
        <div className="flex items-center gap-1 sm:gap-2">
          <div className="w-3 h-3 sm:w-4 sm:h-4 bg-algo-default rounded"></div>
          <span className="text-[10px] sm:text-xs">Default</span>
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          <div className="w-3 h-3 sm:w-4 sm:h-4 bg-algo-comparing rounded"></div>
          <span className="text-[10px] sm:text-xs">Comparing</span>
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          <div className="w-3 h-3 sm:w-4 sm:h-4 bg-algo-swapping rounded"></div>
          <span className="text-[10px] sm:text-xs">Swapping</span>
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          <div className="w-3 h-3 sm:w-4 sm:h-4 bg-algo-sorted rounded"></div>
          <span className="text-[10px] sm:text-xs">Sorted</span>
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          <div className="w-3 h-3 sm:w-4 sm:h-4 bg-algo-selected rounded"></div>
          <span className="text-[10px] sm:text-xs">Selected</span>
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          <div className="w-3 h-3 sm:w-4 sm:h-4 bg-algo-pivot rounded"></div>
          <span className="text-[10px] sm:text-xs">Pivot</span>
        </div>
      </div>
    </div>
  );
};

export default Visualizer;
