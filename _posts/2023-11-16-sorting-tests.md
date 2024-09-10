---
title: Sorting Tests
author: david
categories: ['Lab Notebook']
tags: ['Project', 'Java']
type: tangibles
week: 14
description: Lesson for SASS.
toc: True
comments: True
date: 2023-11-30 12:00:00 +0000
---

```java
class Sort {
  public void insertion(int arr[]) {
    int n = arr.length;
    for (int i = 1; i < n; i++) {
      int x = arr[i];
      int j = i - 1;
  
      while (j >= 0 && arr[j] > x) {
        arr[j + 1] = arr[j];
        j = j - 1;
      }
      arr[j + 1] = x;
    }
  }

  static void printArray(int arr[])
    {
        int n = arr.length;
        for (int i = 0; i < n; ++i)
            System.out.print(arr[i] + " ");
 
        System.out.println();
    }
 
    // Driver method
    public static void main(String args[])
    {
        int arr[] = { 12, 11, 13, 5, 6 };

        printArray(arr);

        Sort ob = new Sort();
        ob.insertion(arr);
 
        printArray(arr);
    }
}

Sort.main(null);
```

    12 11 13 5 6 
    5 6 11 12 13 



```java
class GFG {
     
  // An optimized version of Bubble Sort
  static void bubbleSort(int arr[], int n)
  {
      int i, j, temp;
      boolean swapped;
      for (i = 0; i < n - 1; i++) {
          swapped = false;
          for (j = 0; j < n - i - 1; j++) {
              if (arr[j] > arr[j + 1]) {
                   
                  // Swap arr[j] and arr[j+1]
                  temp = arr[j];
                  arr[j] = arr[j + 1];
                  arr[j + 1] = temp;
                  swapped = true;
              }
          }

          // If no two elements were
          // swapped by inner loop, then break
          if (swapped == false)
              break;
      }
  }

  // Function to print an array
  static void printArray(int arr[], int size)
  {
      int i;
      for (i = 0; i < size; i++)
          System.out.print(arr[i] + " ");
      System.out.println();
  }

  // Driver program
  public static void main(String args[])
  {
      int arr[] = { 64, 34, 25, 12, 22, 11, 90 };
      int n = arr.length;
      bubbleSort(arr, n);
      System.out.println("Sorted array: ");
      printArray(arr, n);
  }
}

GFG.main(null);
```

    Sorted array: 
    11 12 22 25 34 64 90 

