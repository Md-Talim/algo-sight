
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlgorithmType } from "@/utils/algorithmTypes";
import { algorithmInfoMap } from "@/utils/algorithms";

interface AlgorithmInfoProps {
  algorithm: AlgorithmType;
}

const AlgorithmInfo: React.FC<AlgorithmInfoProps> = ({ algorithm }) => {
  const info = algorithmInfoMap[algorithm];
  
  return (
    <Card className="w-full mb-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">{info.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm">
          <p>{info.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <h3 className="font-medium mb-1">Time Complexity</h3>
              <ul className="list-disc list-inside">
                <li>Best: {info.timeComplexity.best}</li>
                <li>Average: {info.timeComplexity.average}</li>
                <li>Worst: {info.timeComplexity.worst}</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-1">Space Complexity</h3>
              <p>{info.spaceComplexity}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AlgorithmInfo;
