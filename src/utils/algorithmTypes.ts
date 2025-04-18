
export type AlgorithmType = 'bubbleSort' | 'selectionSort' | 'insertionSort' | 'mergeSort' | 'quickSort';

export interface ArrayElement {
  value: number;
  state: ElementState;
}

export type ElementState = 'default' | 'comparing' | 'swapping' | 'sorted' | 'selected' | 'pivot';

export interface SortingStep {
  array: ArrayElement[];
  description: string;
}

export interface AlgorithmInfo {
  name: string;
  timeComplexity: {
    best: string;
    average: string;
    worst: string;
  };
  spaceComplexity: string;
  description: string;
}
