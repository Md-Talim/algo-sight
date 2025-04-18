
import { AlgorithmInfo, AlgorithmType, ArrayElement, ElementState, SortingStep } from './algorithmTypes';

// Helper functions
export const createRandomArray = (size: number): ArrayElement[] => {
  return Array.from({ length: size }, () => ({
    value: Math.floor(Math.random() * 100) + 5,
    state: 'default' as ElementState
  }));
};

export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const algorithmInfoMap: Record<AlgorithmType, AlgorithmInfo> = {
  bubbleSort: {
    name: 'Bubble Sort',
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)'
    },
    spaceComplexity: 'O(1)',
    description: 'Bubble Sort is a simple comparison-based algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.'
  },
  selectionSort: {
    name: 'Selection Sort',
    timeComplexity: {
      best: 'O(n²)',
      average: 'O(n²)',
      worst: 'O(n²)'
    },
    spaceComplexity: 'O(1)',
    description: 'Selection Sort divides the input into a sorted and an unsorted region, and repeatedly selects the smallest element from the unsorted region and moves it to the end of the sorted region.'
  },
  insertionSort: {
    name: 'Insertion Sort',
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)'
    },
    spaceComplexity: 'O(1)',
    description: 'Insertion Sort builds the sorted array one item at a time by repeatedly taking the next element and inserting it into the previously sorted part of the array.'
  },
  mergeSort: {
    name: 'Merge Sort',
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)'
    },
    spaceComplexity: 'O(n)',
    description: 'Merge Sort is a divide and conquer algorithm that divides the array into two halves, recursively sorts them, and then merges the sorted halves.'
  },
  quickSort: {
    name: 'Quick Sort',
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n²)'
    },
    spaceComplexity: 'O(log n)',
    description: 'Quick Sort is a divide and conquer algorithm that selects a pivot element and partitions the array around the pivot, then recursively sorts the sub-arrays.'
  }
};

// Generator functions for each algorithm
export async function* bubbleSortGenerator(array: ArrayElement[]): AsyncGenerator<SortingStep> {
  const arr = JSON.parse(JSON.stringify(array));
  const n = arr.length;
  let swapped;
  
  for (let i = 0; i < n; i++) {
    swapped = false;
    
    for (let j = 0; j < n - i - 1; j++) {
      // Mark elements being compared
      arr[j].state = 'comparing';
      arr[j + 1].state = 'comparing';
      yield {
        array: JSON.parse(JSON.stringify(arr)),
        description: `Comparing ${arr[j].value} and ${arr[j + 1].value}`
      };
      
      if (arr[j].value > arr[j + 1].value) {
        // Mark elements being swapped
        arr[j].state = 'swapping';
        arr[j + 1].state = 'swapping';
        yield {
          array: JSON.parse(JSON.stringify(arr)),
          description: `Swapping ${arr[j].value} and ${arr[j + 1].value}`
        };
        
        // Swap elements
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
      
      // Reset state to default
      arr[j].state = 'default';
      arr[j + 1].state = 'default';
    }
    
    // Mark the last item as sorted
    arr[n - i - 1].state = 'sorted';
    yield {
      array: JSON.parse(JSON.stringify(arr)),
      description: `Element ${arr[n - i - 1].value} is now sorted`
    };
    
    if (!swapped) {
      // Mark all remaining elements as sorted
      for (let k = 0; k < n - i - 1; k++) {
        if (arr[k].state !== 'sorted') {
          arr[k].state = 'sorted';
        }
      }
      yield {
        array: JSON.parse(JSON.stringify(arr)),
        description: 'Array is sorted!'
      };
      break;
    }
  }
}

export async function* selectionSortGenerator(array: ArrayElement[]): AsyncGenerator<SortingStep> {
  const arr = JSON.parse(JSON.stringify(array));
  const n = arr.length;
  
  for (let i = 0; i < n; i++) {
    let minIndex = i;
    arr[i].state = 'selected';
    yield {
      array: JSON.parse(JSON.stringify(arr)),
      description: `Finding the minimum element in the unsorted subarray starting from index ${i}`
    };
    
    for (let j = i + 1; j < n; j++) {
      arr[j].state = 'comparing';
      yield {
        array: JSON.parse(JSON.stringify(arr)),
        description: `Comparing current minimum ${arr[minIndex].value} with ${arr[j].value}`
      };
      
      if (arr[j].value < arr[minIndex].value) {
        // Reset the old minIndex state
        if (minIndex !== i) {
          arr[minIndex].state = 'default';
        }
        minIndex = j;
        arr[minIndex].state = 'selected';
        yield {
          array: JSON.parse(JSON.stringify(arr)),
          description: `Found new minimum: ${arr[minIndex].value}`
        };
      } else {
        arr[j].state = 'default';
      }
    }
    
    if (minIndex !== i) {
      arr[i].state = 'swapping';
      arr[minIndex].state = 'swapping';
      yield {
        array: JSON.parse(JSON.stringify(arr)),
        description: `Swapping ${arr[i].value} and ${arr[minIndex].value}`
      };
      
      // Swap elements
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
    
    arr[i].state = 'sorted';
    if (minIndex !== i) {
      arr[minIndex].state = 'default';
    }
    
    yield {
      array: JSON.parse(JSON.stringify(arr)),
      description: `Element ${arr[i].value} is now sorted`
    };
  }
}

export async function* insertionSortGenerator(array: ArrayElement[]): AsyncGenerator<SortingStep> {
  const arr = JSON.parse(JSON.stringify(array));
  const n = arr.length;
  
  // Mark first element as sorted
  arr[0].state = 'sorted';
  yield {
    array: JSON.parse(JSON.stringify(arr)),
    description: 'First element is considered sorted'
  };
  
  for (let i = 1; i < n; i++) {
    // Mark current element for insertion
    arr[i].state = 'selected';
    yield {
      array: JSON.parse(JSON.stringify(arr)),
      description: `Inserting element ${arr[i].value} into the sorted subarray`
    };
    
    const key = { ...arr[i] };
    let j = i - 1;
    
    while (j >= 0 && arr[j].value > key.value) {
      arr[j].state = 'comparing';
      yield {
        array: JSON.parse(JSON.stringify(arr)),
        description: `Comparing ${key.value} with ${arr[j].value}`
      };
      
      arr[j + 1] = { ...arr[j], state: 'swapping' };
      arr[j].state = 'swapping';
      yield {
        array: JSON.parse(JSON.stringify(arr)),
        description: `Moving ${arr[j].value} to the right`
      };
      
      arr[j + 1] = { ...arr[j], state: 'sorted' };
      j--;
    }
    
    arr[j + 1] = { ...key, state: 'sorted' };
    yield {
      array: JSON.parse(JSON.stringify(arr)),
      description: `Inserted ${key.value} at position ${j + 1}`
    };
  }
}

export async function* mergeSortGenerator(array: ArrayElement[]): AsyncGenerator<SortingStep> {
  const arr = JSON.parse(JSON.stringify(array));
  
  async function* mergeSortHelper(start: number, end: number): AsyncGenerator<SortingStep> {
    // Base case
    if (start >= end) return;
    
    const mid = Math.floor((start + end) / 2);
    
    // Mark the subarrays
    for (let i = start; i <= mid; i++) {
      arr[i].state = 'selected';
    }
    for (let i = mid + 1; i <= end; i++) {
      arr[i].state = 'comparing';
    }
    
    yield {
      array: JSON.parse(JSON.stringify(arr)),
      description: `Dividing array into two subarrays: [${start}...${mid}] and [${mid + 1}...${end}]`
    };
    
    // Reset states
    for (let i = start; i <= end; i++) {
      arr[i].state = 'default';
    }
    
    // Recursively sort left and right subarrays
    yield* mergeSortHelper(start, mid);
    yield* mergeSortHelper(mid + 1, end);
    
    // Merge the sorted subarrays
    yield* merge(start, mid, end);
  }
  
  async function* merge(start: number, mid: number, end: number): AsyncGenerator<SortingStep> {
    const leftSize = mid - start + 1;
    const rightSize = end - mid;
    
    // Create temporary arrays
    const leftArray = [];
    const rightArray = [];
    
    // Copy data to temporary arrays
    for (let i = 0; i < leftSize; i++) {
      leftArray[i] = { ...arr[start + i] };
    }
    for (let i = 0; i < rightSize; i++) {
      rightArray[i] = { ...arr[mid + 1 + i] };
    }
    
    // Mark subarrays being merged
    for (let i = start; i <= mid; i++) {
      arr[i].state = 'selected';
    }
    for (let i = mid + 1; i <= end; i++) {
      arr[i].state = 'comparing';
    }
    
    yield {
      array: JSON.parse(JSON.stringify(arr)),
      description: `Merging subarrays from index ${start} to ${end}`
    };
    
    // Merge the arrays back
    let i = 0, j = 0, k = start;
    
    while (i < leftSize && j < rightSize) {
      // Comparing elements from both subarrays
      yield {
        array: JSON.parse(JSON.stringify(arr)),
        description: `Comparing ${leftArray[i].value} and ${rightArray[j].value}`
      };
      
      if (leftArray[i].value <= rightArray[j].value) {
        arr[k] = { ...leftArray[i], state: 'swapping' };
        i++;
      } else {
        arr[k] = { ...rightArray[j], state: 'swapping' };
        j++;
      }
      
      yield {
        array: JSON.parse(JSON.stringify(arr)),
        description: `Placing element ${arr[k].value} at position ${k}`
      };
      
      arr[k].state = 'sorted';
      k++;
    }
    
    // Copy remaining elements
    while (i < leftSize) {
      arr[k] = { ...leftArray[i], state: 'swapping' };
      yield {
        array: JSON.parse(JSON.stringify(arr)),
        description: `Placing remaining left element ${arr[k].value} at position ${k}`
      };
      
      arr[k].state = 'sorted';
      i++;
      k++;
    }
    
    while (j < rightSize) {
      arr[k] = { ...rightArray[j], state: 'swapping' };
      yield {
        array: JSON.parse(JSON.stringify(arr)),
        description: `Placing remaining right element ${arr[k].value} at position ${k}`
      };
      
      arr[k].state = 'sorted';
      j++;
      k++;
    }
    
    // Mark the merged subarray as sorted
    for (let i = start; i <= end; i++) {
      arr[i].state = 'sorted';
    }
    
    yield {
      array: JSON.parse(JSON.stringify(arr)),
      description: `Subarray from index ${start} to ${end} is now merged and sorted`
    };
  }
  
  yield* mergeSortHelper(0, arr.length - 1);
  
  // Final state: everything is sorted
  for (let i = 0; i < arr.length; i++) {
    arr[i].state = 'sorted';
  }
  
  yield {
    array: JSON.parse(JSON.stringify(arr)),
    description: 'Array is fully sorted'
  };
}

export async function* quickSortGenerator(array: ArrayElement[]): AsyncGenerator<SortingStep> {
  const arr = JSON.parse(JSON.stringify(array));
  
  async function* quickSortHelper(low: number, high: number): AsyncGenerator<SortingStep> {
    if (low < high) {
      // Find the partition index
      let pi = low;
      
      // Choose the rightmost element as pivot
      const pivot = arr[high].value;
      arr[high].state = 'pivot';
      
      yield {
        array: JSON.parse(JSON.stringify(arr)),
        description: `Selecting pivot: ${pivot}`
      };
      
      // Index of smaller element
      let i = low - 1;
      
      for (let j = low; j < high; j++) {
        arr[j].state = 'comparing';
        yield {
          array: JSON.parse(JSON.stringify(arr)),
          description: `Comparing ${arr[j].value} with pivot ${pivot}`
        };
        
        if (arr[j].value < pivot) {
          i++;
          
          if (i !== j) {
            arr[i].state = 'swapping';
            arr[j].state = 'swapping';
            yield {
              array: JSON.parse(JSON.stringify(arr)),
              description: `Swapping ${arr[i].value} and ${arr[j].value}`
            };
            
            [arr[i], arr[j]] = [arr[j], arr[i]];
            
            yield {
              array: JSON.parse(JSON.stringify(arr)),
              description: `Swapped ${arr[i].value} and ${arr[j].value}`
            };
          }
          
          arr[i].state = 'selected';
        }
        
        if (j !== i) {
          arr[j].state = 'default';
        }
      }
      
      // Place pivot in the correct position
      pi = i + 1;
      if (pi !== high) {
        arr[pi].state = 'swapping';
        arr[high].state = 'swapping';
        yield {
          array: JSON.parse(JSON.stringify(arr)),
          description: `Placing pivot ${pivot} at position ${pi}`
        };
        
        [arr[pi], arr[high]] = [arr[high], arr[pi]];
        
        yield {
          array: JSON.parse(JSON.stringify(arr)),
          description: `Placed pivot ${pivot} at position ${pi}`
        };
      }
      
      // Mark pivot as sorted
      arr[pi].state = 'sorted';
      yield {
        array: JSON.parse(JSON.stringify(arr)),
        description: `Pivot ${arr[pi].value} is at its final position ${pi}`
      };
      
      // Reset states
      for (let k = low; k <= high; k++) {
        if (k !== pi) arr[k].state = 'default';
      }
      
      // Sort the sub-arrays
      yield* quickSortHelper(low, pi - 1);
      yield* quickSortHelper(pi + 1, high);
    } else if (low === high) {
      // Single element is always sorted
      arr[low].state = 'sorted';
      yield {
        array: JSON.parse(JSON.stringify(arr)),
        description: `Element at position ${low} is already sorted`
      };
    }
  }
  
  yield* quickSortHelper(0, arr.length - 1);
  
  // Final state: everything is sorted
  for (let i = 0; i < arr.length; i++) {
    arr[i].state = 'sorted';
  }
  
  yield {
    array: JSON.parse(JSON.stringify(arr)),
    description: 'Array is fully sorted'
  };
}

export const getAlgorithmGenerator = (type: AlgorithmType, array: ArrayElement[]) => {
  switch (type) {
    case 'bubbleSort':
      return bubbleSortGenerator(array);
    case 'selectionSort':
      return selectionSortGenerator(array);
    case 'insertionSort':
      return insertionSortGenerator(array);
    case 'mergeSort':
      return mergeSortGenerator(array);
    case 'quickSort':
      return quickSortGenerator(array);
    default:
      return bubbleSortGenerator(array);
  }
};
