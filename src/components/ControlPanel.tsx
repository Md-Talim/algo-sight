
import React from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { AlgorithmType, ArrayElement } from "@/utils/algorithmTypes";
import { algorithmInfoMap } from "@/utils/algorithms";
import { 
  PlayCircle, PauseCircle, RotateCcw, StepForward, Book, Zap
} from "lucide-react";
import CustomArrayInput from "./CustomArrayInput";

interface ControlPanelProps {
  algorithm: AlgorithmType;
  setAlgorithm: (algorithm: AlgorithmType) => void;
  arraySize: number;
  setArraySize: (size: number) => void;
  speed: number;
  setSpeed: (speed: number) => void;
  isRunning: boolean;
  isPaused: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onStepForward: () => void;
  onGenerateNewArray: () => void;
  onCustomArraySubmit: (array: ArrayElement[]) => void;
  showInfo: boolean;
  setShowInfo: (show: boolean) => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  algorithm,
  setAlgorithm,
  arraySize,
  setArraySize,
  speed,
  setSpeed,
  isRunning,
  isPaused,
  onStart,
  onPause,
  onReset,
  onStepForward,
  onGenerateNewArray,
  onCustomArraySubmit,
  showInfo,
  setShowInfo
}) => {
  return (
    <Card className="w-full mb-4">
      <CardContent className="p-4 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Algorithm</label>
            <Select 
              value={algorithm} 
              onValueChange={(value) => setAlgorithm(value as AlgorithmType)}
              disabled={isRunning && !isPaused}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Algorithm" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bubbleSort">Bubble Sort</SelectItem>
                <SelectItem value="selectionSort">Selection Sort</SelectItem>
                <SelectItem value="insertionSort">Insertion Sort</SelectItem>
                <SelectItem value="mergeSort">Merge Sort</SelectItem>
                <SelectItem value="quickSort">Quick Sort</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Array Size: {arraySize}</label>
            <Slider 
              value={[arraySize]} 
              onValueChange={(values) => setArraySize(values[0])} 
              min={5} 
              max={100} 
              step={1}
              disabled={isRunning && !isPaused}
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Speed: {speed}x</label>
            <Slider 
              value={[speed]} 
              onValueChange={(values) => setSpeed(values[0])} 
              min={1} 
              max={10} 
              step={1}
            />
          </div>
          
          <div className="flex flex-wrap gap-2 col-span-1 md:col-span-2 lg:col-span-3">
            {isRunning ? (
              <Button variant="outline" onClick={onPause} disabled={!isRunning}>
                <PauseCircle className="mr-1 h-4 w-4" />
                Pause
              </Button>
            ) : (
              <Button variant="default" onClick={onStart} disabled={isRunning && !isPaused}>
                <PlayCircle className="mr-1 h-4 w-4" />
                {isPaused ? "Resume" : "Start"}
              </Button>
            )}
            
            <Button variant="outline" onClick={onReset}>
              <RotateCcw className="mr-1 h-4 w-4" />
              Reset
            </Button>
            
            <Button variant="outline" onClick={onStepForward} disabled={!isPaused && isRunning}>
              <StepForward className="mr-1 h-4 w-4" />
              Step
            </Button>
            
            <Button variant="outline" onClick={onGenerateNewArray} disabled={isRunning && !isPaused}>
              <Zap className="mr-1 h-4 w-4" />
              New Array
            </Button>
            
            <CustomArrayInput 
              onArraySubmit={onCustomArraySubmit} 
              maxArraySize={100}
            />
            
            <Button 
              variant={showInfo ? "default" : "outline"} 
              onClick={() => setShowInfo(!showInfo)}
            >
              <Book className="mr-1 h-4 w-4" />
              {showInfo ? "Hide Info" : "Show Info"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ControlPanel;
