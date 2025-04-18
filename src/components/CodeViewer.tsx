
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlgorithmType } from "@/utils/algorithmTypes";

interface CodeViewerProps {
  algorithm: AlgorithmType;
}

const CodeViewer: React.FC<CodeViewerProps> = ({ algorithm }) => {
  const getAlgorithmCode = () => {
    switch (algorithm) {
      case 'bubbleSort':
        return `function bubbleSort(arr) {
  const n = arr.length;
  
  for (let i = 0; i < n; i++) {
    let swapped = false;
    
    // Last i elements are already in place
    for (let j = 0; j < n - i - 1; j++) {
      // Compare adjacent elements
      if (arr[j] > arr[j + 1]) {
        // Swap them if they are in wrong order
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }
    
    // If no swapping occurred in this pass, array is sorted
    if (!swapped) break;
  }
  
  return arr;
}`;
      case 'selectionSort':
        return `function selectionSort(arr) {
  const n = arr.length;
  
  for (let i = 0; i < n; i++) {
    // Find the minimum element in the unsorted part
    let minIndex = i;
    
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    
    // Swap the found minimum element with the element at index i
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
  }
  
  return arr;
}`;
      case 'insertionSort':
        return `function insertionSort(arr) {
  const n = arr.length;
  
  // Start from the second element
  for (let i = 1; i < n; i++) {
    // Element to be inserted
    const key = arr[i];
    
    // Index of the previous element
    let j = i - 1;
    
    // Move elements greater than key to one position ahead
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    
    // Insert the key at the correct position
    arr[j + 1] = key;
  }
  
  return arr;
}`;
      case 'mergeSort':
        return `function mergeSort(arr) {
  // Base case
  if (arr.length <= 1) return arr;
  
  // Split array into halves
  const mid = Math.floor(arr.length / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);
  
  // Recursively sort both halves
  return merge(
    mergeSort(left),
    mergeSort(right)
  );
}

function merge(left, right) {
  const result = [];
  let leftIndex = 0;
  let rightIndex = 0;
  
  // Compare elements from both arrays and add smaller one to result
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }
  
  // Add remaining elements
  return result
    .concat(left.slice(leftIndex))
    .concat(right.slice(rightIndex));
}`;
      case 'quickSort':
        return `function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    // Find the partition index
    const pivotIndex = partition(arr, low, high);
    
    // Recursively sort elements before and after partition
    quickSort(arr, low, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, high);
  }
  
  return arr;
}

function partition(arr, low, high) {
  // Choose rightmost element as pivot
  const pivot = arr[high];
  
  // Index of smaller element
  let i = low - 1;
  
  for (let j = low; j < high; j++) {
    // If current element is less than the pivot
    if (arr[j] < pivot) {
      i++;
      // Swap elements
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  
  // Swap pivot with element at i+1
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  
  // Return position of pivot
  return i + 1;
}`;
      default:
        return '';
    }
  };

  return (
    <Card className="w-full mb-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Code Implementation</CardTitle>
      </CardHeader>
      <CardContent>
        <pre className="p-4 rounded-md bg-muted dark:bg-gray-900 overflow-auto text-sm text-foreground">
          <code>{getAlgorithmCode()}</code>
        </pre>
      </CardContent>
    </Card>
  );
};

export default CodeViewer;
