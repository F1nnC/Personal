---
title: Methods & Control Structures Lesson (Math Class)
author: david
categories: ['Lab Notebook']
tags: ['Java', 'Collegeboard']
type: tangibles
week: 28
description: Lessons for methods & control structures
toc: True
comments: True
date: 2024-03-12 12:00:00 +0000
---

## Math Class

## Intro
The Math class in Java is part of the java.lang package, which is automatically imported, hence you don't need to manually import it. The Math class provides a collection of methods and constants for performing mathematical operations.

## Key points about the Math class:
- Static Methods: The methods of the Math class are static, meaning you can call them directly using the class name without needing to create an instance of the Math class. For example, Math.sqrt(25) will return 5.0.
Commonly Used Methods:
- Math.abs(double a): Returns the absolute value of a.
- Math.sqrt(double a): Returns the square root of a.
- Math.pow(double a, double b): Returns a raised to the power of b.
- Math.max(double a, double b): Returns the greater of a and b.
- Math.min(double a, double b): Returns the lesser of a and b.
- Math.round(double a): Rounds a to the nearest integer.
- Math.random(): Returns a double value greater than or equal to 0.0 and less than 1.0.

## Evaluation of Expressions Using the Math Class
Let's dive into evaluating expressions and demonstrating program statements using Math class methods. We will explore how to use these methods in Java code through examples.

### Example 1: Calculating the Hypotenuse of a Right Triangle


```java
public class Triangle {
    public static void main(String[] args){
        double a = 3;
        double b = 4;
        double c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
        System.out.println("Hypotenuse: " + c);
    }
}
Triangle.main(null)
```

    Hypotenuse: 5.0


```
Math.pow()
```

- As stated previously, Math.pow() method is used to raise a number to a specified power. Here, it is used to calculate the squares of the sides a and b

```
Math.sqrt()
```

- As Math.sqrt() method calculates the square root of a number. Here, it is used to find the square root of the sum of the squares of a and b, which gives the length of the hypotenuse

### Example 2: Finding the Larger of Two Numbers


```java
public class Larger{
    public static void main(String[] args){
        double num1 = 7.25;
        double num2 = 7.20;
        double larger = Math.max(num1, num2);
        System.out.println("The larger number is: " + larger);
    }
}
Larger.main(null)
```

    The larger number is: 7.25


```
Math.max() 
```

- Used to find the maximum of two numbers. In this example, it is used to determine the larger number between num1 and num2

## Using Math.random() and Setting Up a Range
Math.random() is a versatile method used to generate random numbers. However, it returns a double value that is greater than or equal to 0.0 and less than 1.0. Often, you'll need a random integer within a specific range, say from min to max (inclusive). To achieve this, you can scale and shift the result of Math.random().

### Example: Generating a Random Integer Between 1 and 10


```java
public class Generate{
    public static void main(String[] args){
        int min = 1;
        int max = 10;
        int randomNum = (int)(Math.random() * ((max - min) + 1)) + min;
        System.out.println("Random Number: " + randomNum);
    }
}
Generate.main(null)
```

    Random Number: 2


# Example FRQ

## 2016 1a: RandomStringChooser Method


A RandomStringChooser object is constructed from an array of non-null String values. When the object is first constructed, all of the strings are considered available. The RandomStringChooser class has a getNext method, which has the following behavior. A call to getNext returns a randomly chosen string from the available strings in the object. Once a particular string has been returned from a call to getNext, it is no longer available to be returned from subsequent calls to getNext. If no strings are available to be returned, getNext returns "NONE". The following code segment shows an example of the behavior of RandomStringChooser.

```java
String[] wordArray = {"wheels", "on", "the", "bus"}; 
RandomStringChooser sChooser = new RandomStringChooser(wordArray); 
for (int k = 0; k < 6; k++) { 
    System.out.print(sChooser.getNext() + " "); 
}
```

One possible output is shown below. Because sChooser has only four strings, the string "NONE" is printed twice. 

```bus the wheels on none none```

Write the entire RandomStringChooser class. Your implementation must include an appropriate constructor and any necessary methods. Any instance variables must be private. The code segment in the example above should have the indicated behavior (that is, it must compile and produce a result like the possible output shown). Neither the constructor nor any of the methods should alter the parameter passed to the constructor, but your implementation may copy the contents of the array.

## Solution + Common Mistakes


```java
public class RandomStringChooser {
    private List<String> words;
    public RandomStringChooser(String[] wordArray){

    words = new ArrayList<String>();

    for (String singleWord : wordArray){
    words.add(singleWord);
}}

public String getNext() {
    if (words.size() > 0){
        return words.remove((int)(Math.random() * words.size()));
}

    return "NONE";
}

} 
```

### Things to Look Out For 
- Making sure that when you initialize an instance variable to use the parameter in initialization
- Properly casting with an integer when working with the random class
- Don't alter the constructor parameter!


## Hacks
In this assignment, you will work with a collection of randomly generated data represented by an ArrayList of ArrayLists of integers. You will design a class, named `DataList`, from scratch and implement methods within this class to manipulate the data according to specified criteria.

#### Requirements

1.  **Class Declaration**: Create a `DataList` class that encapsulates a collection of data.
    
    *   The data collection should be an `ArrayList` of `ArrayList` of integers (`ArrayList<ArrayList<Integer>>`).
    *   Include any necessary instance variables and a constructor to initialize the data structure.
2.  **`repopulate` Method**:
    
    *   Write a method named `repopulate` in the `DataList` class. This method should fill each element of the collection with randomly generated values according to the following criteria:
        *   Each value must be between 1 and `MAX` (inclusive), where `MAX` is a predefined constant in your class with a value that is not shown.
        *   Each value must be divisible by 10.
        *   Each value must not be divisible by 100.
    *   Ensure that all valid values have an equal chance of being generated.
    *   Precondition: The collection is not null and has at least one element.

#### Instructions

*   **Design**: Consider how you will structure your `DataList` class, including the choice of instance variables and the design of your constructor to properly initialize the data collection.
*   **Implementation**: Implement the `repopulate` method to meet the specified criteria. Think about how you can efficiently generate values that meet the requirements and how you'll iterate through the ArrayList of ArrayLists to assign these values.
*   **Testing**: After implementing the `repopulate` method, consider writing a simple main method or unit tests to verify that your method works as expected. Generate a small collection and print the results to ensure values are correctly assigned according to the criteria.
