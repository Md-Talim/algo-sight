
import React, { useState } from "react";
import { AlgorithmType, ArrayElement } from "@/utils/algorithmTypes";
import ControlPanel from "@/components/ControlPanel";
import Visualizer from "@/components/Visualizer";
import AlgorithmInfo from "@/components/AlgorithmInfo";
import CodeViewer from "@/components/CodeViewer";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Book } from "lucide-react";

const Index = () => {
  // Algorithm state
  const [algorithm, setAlgorithm] = useState<AlgorithmType>("bubbleSort");
  const [arraySize, setArraySize] = useState<number>(30);
  const [speed, setSpeed] = useState<number>(5);
  
  // Visualization control state
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [triggerReset, setTriggerReset] = useState<boolean>(false);
  const [triggerStep, setTriggerStep] = useState<boolean>(false);
  const [triggerNewArray, setTriggerNewArray] = useState<boolean>(false);
  const [showInfo, setShowInfo] = useState<boolean>(true);
  const [customArray, setCustomArray] = useState<ArrayElement[] | null>(null);
  
  // Handle visualization controls
  const handleStart = () => {
    if (!isRunning) {
      setIsRunning(true);
      setIsPaused(false);
    } else if (isPaused) {
      setIsPaused(false);
    }
  };
  
  const handlePause = () => {
    if (isRunning && !isPaused) {
      setIsPaused(true);
    }
  };
  
  const handleReset = () => {
    setTriggerReset(true);
    setTimeout(() => setTriggerReset(false), 100);
  };
  
  const handleStepForward = () => {
    if (!isRunning) {
      setIsRunning(true);
      setIsPaused(true);
    }
    setTriggerStep(true);
  };
  
  const handleGenerateNewArray = () => {
    setCustomArray(null);
    setTriggerNewArray(true);
  };
  
  const handleCustomArraySubmit = (array: ArrayElement[]) => {
    if (isRunning && !isPaused) {
      setIsPaused(true);
    }
    setCustomArray(array);
  };
  
  const resetStepTrigger = () => {
    setTriggerStep(false);
  };
  
  const resetNewArrayTrigger = () => {
    setTriggerNewArray(false);
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      <header className="mb-6 text-center relative">
        <div className="absolute right-0 top-0">
          <ThemeToggle />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Algorithm Visualizer</h1>
        <p className="text-muted-foreground">
          Watch sorting algorithms in action to understand how they work
        </p>
      </header>
      
      <div className="max-w-6xl mx-auto">
        <ControlPanel
          algorithm={algorithm}
          setAlgorithm={setAlgorithm}
          arraySize={arraySize}
          setArraySize={setArraySize}
          speed={speed}
          setSpeed={setSpeed}
          isRunning={isRunning}
          isPaused={isPaused}
          onStart={handleStart}
          onPause={handlePause}
          onReset={handleReset}
          onStepForward={handleStepForward}
          onGenerateNewArray={handleGenerateNewArray}
          onCustomArraySubmit={handleCustomArraySubmit}
          showInfo={showInfo}
          setShowInfo={setShowInfo}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <Visualizer
              algorithm={algorithm}
              arraySize={arraySize}
              speed={speed}
              isRunning={isRunning}
              isPaused={isPaused}
              setIsRunning={setIsRunning}
              setIsPaused={setIsPaused}
              triggerReset={triggerReset}
              triggerStep={triggerStep}
              resetStepTrigger={resetStepTrigger}
              triggerNewArray={triggerNewArray}
              resetNewArrayTrigger={resetNewArrayTrigger}
              customArray={customArray}
            />

            {/* Mobile-only Info Button */}
            <div className="flex justify-center mt-4 md:hidden">
              <Button
                onClick={() => setShowInfo(!showInfo)}
                variant={showInfo ? "default" : "outline"}
                className="w-full"
              >
                <Book className="mr-2 h-4 w-4" />
                {showInfo ? "Hide Algorithm Info" : "Show Algorithm Info"}
              </Button>
            </div>
          </div>
          
          {showInfo && (
            <div className="md:col-span-1">
              <AlgorithmInfo algorithm={algorithm} />
              <CodeViewer algorithm={algorithm} />
            </div>
          )}
        </div>
      </div>
      
      <footer className="mt-12 text-center text-sm text-muted-foreground">
        <p>Built with React, TypeScript, and Tailwind CSS</p>
      </footer>
    </div>
  );
};

export default Index;
