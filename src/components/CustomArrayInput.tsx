
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { ArrayElement } from "@/utils/algorithmTypes";
import { AlertCircle } from "lucide-react";

interface CustomArrayInputProps {
  onArraySubmit: (array: ArrayElement[]) => void;
  maxArraySize: number;
}

const CustomArrayInput: React.FC<CustomArrayInputProps> = ({ onArraySubmit, maxArraySize }) => {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  
  const handleSubmit = () => {
    setError(null);
    
    try {
      // Split the input by commas and convert to numbers
      const values = inputValue.split(",")
        .map(val => val.trim())
        .filter(val => val !== "")
        .map(val => {
          const num = Number(val);
          if (isNaN(num)) {
            throw new Error(`"${val}" is not a valid number`);
          }
          return num;
        });
      
      if (values.length === 0) {
        setError("Please enter at least one number");
        return;
      }
      
      if (values.length > maxArraySize) {
        setError(`Array size cannot exceed ${maxArraySize} elements`);
        return;
      }
      
      // Create array elements
      const arrayElements: ArrayElement[] = values.map(value => ({
        value,
        state: 'default'
      }));
      
      onArraySubmit(arrayElements);
      setInputValue("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid input");
    }
  };
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Custom Array</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Enter Custom Array</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Enter numbers separated by commas (e.g., "5, 10, 3, 8, 2")
            </p>
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="5, 10, 3, 8, 2"
            />
            {error && (
              <div className="flex items-center text-destructive text-sm mt-1">
                <AlertCircle className="h-4 w-4 mr-1" />
                <span>{error}</span>
              </div>
            )}
          </div>
          <div className="flex justify-end gap-2">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button onClick={handleSubmit}>Apply</Button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CustomArrayInput;
