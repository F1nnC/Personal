---
title: Arrays
author: david
categories: ['Lab Notebook']
tags: ['Java']
type: tangibles
week: 30
description: Arrays Lesson (FINAL)
toc: True
comments: True
date: 2024-04-19 12:00:00 +0000
---

# Lesson on Arrays in Java

## Introduction
- Arrays are fundamental data structures in Java that allow storing multiple elements of the same type under a single variable.
- They provide a convenient way to work with collections of data efficiently.

## Array Creation and Access
- **Use of Array Objects**: Arrays allow multiple related items to be represented using a single variable.
- **Fixed Size**: The size of an array is established at the time of creation and cannot be changed.
- **Initialization**: Arrays are created using the `new` keyword, and their elements are initialized with specific values based on the type of element. Elements of reference type are initialized to the reference value `null`.
- **ArrayIndexOutOfBoundsException**: Accessing elements outside the bounds of the array leads to this exception.


```java
public class ArrayExceptionExample {
    public static void main(String[] args) {
        int[] numbers = {1, 2, 3, 4, 5};

        // accessing element out of bounds of array
        int indexOutOfRange = numbers[10]; // this will throw the error
    }
}

ArrayExceptionExample.main(null);

```


    ---------------------------------------------------------------------------

    java.lang.ArrayIndexOutOfBoundsException: Index 10 out of bounds for length 5

    	at ArrayExceptionExample.main(#12:6)

    	at .(#13:1)



```java
import java.util.Random;

public class Array {
    public static void main(String[] args) {
        // creating array of integers with size 5
        int[] numbers = new int[5];

        // generating random values and assigning them to elements of the array
        Random random = new Random();
        for (int i = 0; i < numbers.length; i++) {
            numbers[i] = random.nextInt(100); // random integers are between 0 and 99
        }

        // accessing and printing elements of the array
        for (int i = 0; i < numbers.length; i++) {
            System.out.println("Element at index " + i + ": " + numbers[i]);
        }
    }
}

Array.main(null);

```

    Element at index 0: 18
    Element at index 1: 21
    Element at index 2: 1
    Element at index 3: 57
    Element at index 4: 15


## Traversing Arrays
- **Iteration Statements**: Iteration statements like `for` or `while` loops are used to access all elements in an array.
- **Indexed Access**: Traversing an array with an indexed `for` loop or `while` loop requires accessing elements using their indices.


## Enhanced for loop for Arrays
- **Syntax**: An enhanced `for` loop header includes a variable that iterates over each element in the array.
- **Element Access**: During each iteration, the enhanced `for` loop variable is assigned a copy of an element without using its index.
- **Immutability**: Modifying the enhanced `for` loop variable does not change the value stored in the array.
- **Flexibility**: Program code using an enhanced `for` loop for array traversal can be rewritten using an indexed `for` loop or a `while` loop.


```java
public class ArrayTraversal {
    public static void main(String[] args) {
        // creating integer array
        int[] numbers = {10, 20, 30, 40, 50};

        // traversing array with for loop
        System.out.println("Traversing the array using a for loop:");
        for (int i = 0; i < numbers.length; i++) {
            System.out.println("Element at index " + i + ": " + numbers[i]);
        }

        // traversing array with enhanced for loop
        System.out.println("\nTraversing the array using an enhanced for loop:");
        for (int num : numbers) {
            System.out.println("Element: " + num);
        }
    }
}

ArrayTraversal.main(null);
```

    Traversing the array using a for loop:
    Element at index 0: 10
    Element at index 1: 20
    Element at index 2: 30
    Element at index 3: 40
    Element at index 4: 50
    
    Traversing the array using an enhanced for loop:
    Element: 10
    Element: 20
    Element: 30
    Element: 40
    Element: 50


## FRQ Tip for Developing Algorithms Using Arrays

# Be familiar with certain algorithms that are likely to come on the exam:

- Determine the minimum or maximum value in an array

- Compute a sum, average, or mode of array elements

- Search for a particular element in the array

- Determine if at least one element has a particular property

- Determine if all elements have a particular property

- Access all consecutive pairs of elements

- Determine the presence or absence of duplicate elements

- Determine the number of elements meeting specific criteria

- Shift or rotate elements left or right

- Reverse the order of the elements

## SAMPLE FRQ PART: 2019 Question 3

A string containing text and possibly delimiters has been split into *tokens* and stored in String[] tokens. Each token is either an open delimiter, a close delimiter, or a substring that is not a delimiter. You will write the method getDelimitersList, which returns an ArrayList containing all the open and close delimiters found in *tokens* in their original order. 

<br>

Complete method getDelimitersList below:

public ArrayList<String> getDelimitersList (String[] tokens)

**GIVEN SOLUTION**


```java
public ArrayList<String> getDelimitersList(String[] tokens)
{
    // creating a new ArrayList to store delimiter tokens
    ArrayList<String> d = new ArrayList<String>();
    
    // use enhanced for loop to iterate through each token in the provided array
    for (String str : tokens)
    {
        // check if current token is equal to the specified open delimiter or close delimiter
        if (str.equals(openDel) || str.equals(closeDel))
        {
            // if token is delimiter, add to arraylist
            d.add(str);
        }
    }
    
    // return arraylist with delimiter tokens
    return d;
}

```

**SCORING CRITERIA**

1. Create the ArrayList<String>

<br>

2. Accesses all elements in array *tokens* without any bound errors.

<br>

3. Compares strings in *tokens* with both instance variables which must be in the context of a loop.

<br>

4. Adds delimiters into ArrayList in original order.

## HACKS

PART A: How does the use of an array simplify the management of related data compared to individual variables?

<br>

PART B: Develop an algorithm to find the median value of an integer array WITHOUT sorting the array.
