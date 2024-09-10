---
title: FRQ Mini-lab Notes and Grading
author: david
categories: ['Hacks']
tags: ['Collegeboard', 'FRQS', 'Java']
type: tangibles
week: 5
description: Notes on Collegeboard FRQs and how to present.
toc: True
comments: True
date: 2023-09-21 12:00:00 +0000
---

## Raw Collaboration Notes

### Classes (2022)
- creating book class and textbook class extending information
- addition on top of title and price
- running constructor from parents class
- using override to override function
- checking the textbook title and price and edition
- creating and editing textbooks
- super (references parent class)
- @override - marker allows to override a function in java (operates like child function)
- public vs private - private can't be used outside of class that it is defined in
- getters and setters - manages variables with encapsulation

### Methods and Control Structures (2022)
- given classes and you have to write methods
- nesting statements to check whether pre-requisites are met
- loops nesting if statements to run a piece of code multiple times
- calling methods is needed
- knowing how to program logic (if statements, loops)

### ArrayList (2022)
- setting private variables that are used in specific class
- .length finds the number of values in the array that is in question
- iteration through data using `i` to go through an entire list

### Classes (2015)
- differentiating between capitals and length
- class, constructor, methods
- private header
- StringBuilder() - builds strings easier
- get basics done and that will lead to the rest being done

## Notes on FRQ Types

There are 4 main types of FRQS on the AP CSA exam:
- Classes and Objects
- Methods and Control Structures
- Array/ArrayList
- 2D Array

### Classes and Objects
> Work with class definitions, instance variables, constructors, and methods.

This is the very basics structure of Java, knowing how all of these parts work are vital to completing every other FRQ, as well as this one. These are some basic definitions:

- Class Definitions - a blueprint/template for creating objects(instances); defines structure and behavior of objects
  > contains instance variables and methods that define and control what the program does
- Instance Variables - attributes/properties that an object can have to complete it's function
  > each instance has it's own variables, that can be the same but with different attributes/properties
- Constructors - special methods that are called when an object is created; set initial values of variables
  > have the same name but have different attributes created in each instance they are called
- Methods - functions that are defined in classes to specify action that objects complete
  > they are operations inside the classes; have parameters and return values

Knowing these definitions will be extremely helpful when doing this FRQ. Below is an example representing these definitions in code.



```java
class SuperClass {
  public void printString() {
    // original example string
    System.out.println("New String");
  }
}

// class definition
public class Example extends SuperClass {
  // instance variables
  private String x;
  private double y;
  private int z;

  // constructor used to initialize the instance variables
  public Example(String x, double y, int z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  // getter methods
  public String getVar1() {
    return x;
  }

  public double getVar2() {
    return y;
  }

  public int getVar3() {
    return z;
  }

  @Override
  public void printString() {
    System.out.println("Override String");
  }

  public static void main(String[] args) {
    Example example = new Example("string", 3.25, 67);

    //usage of getter methods
    String var1 = example.getVar1();
    double var2 = example.getVar2();
    int var3 = example.getVar3();

    // printing variables
    System.out.println(var1);
    System.out.println(var2);
    System.out.println(var3);
    System.out.println(" ");

    // calling superClass
    SuperClass superClass = new SuperClass();
    
    // printing original and overridden string
    superClass.printString();
    example.printString();
  }
}

Example.main(null)


```

    string
    3.25
    67
     
    New String
    Override String


### Methods and Control Structures
> Writing methods with control structures like loops and conditionals is another important skill to have.

Some control structures include:
- Loops - these are used to loop through code, such as for loops, which use an integer `i` and counting as they go through data
- Booleans - these simply compare things and based on that return true of false statements

Here are some examples of both:


```java
public class Main {
  // creates a boolean checking for even numbers
  public static boolean isEven(int number) {
    return number % 2 == 0;
  }

  public static void main(String[] args) {
    // creates number array
    int[] numbers = {1, 3, 6, 9, 11, 14, 17};
    
    // sets boolean as false for even numbers
    boolean foundEven = false;

    // uses for loop to iterate through array
    for (int number : numbers) {
      // checks for if number is even, setting boolean
      if (isEven(number)) {
        foundEven = true;
        break; 
      }
    }

    // if/else statement printing result of boolean
    if (foundEven) {
      System.out.println("Has 1+ even numbers");
    } else {
      System.out.println("No even numbers");
    }
  }

  public static void main2(String[] args) {
    // creates number array
    int[] numbers = {1, 3, 5, 9, 11, 13, 17};
    
    // sets boolean as false for even numbers
    boolean foundEven = false;

    // uses for loop to iterate through array
    for (int number : numbers) {
      // checks for if number is even, setting boolean
      if (isEven(number)) {
        foundEven = true;
        break; 
      }
    }

    // if/else statement printing result of boolean
    if (foundEven) {
      System.out.println("Has 1+ even numbers");
    } else {
      System.out.println("No even numbers");
    }
  }
}

// two examples showing outputs
Main.main(null);
Main.main2(null);
```

    Has 1+ even numbers
    No even numbers


### ArrayLists
> Working with ArrayLists, manipulating hashmaps.

For this FRQ you mainly need to know how to use `java.util.ArrayList` and how to manipulate the list with adding, taking away, changing the values, and other things.

Here is an example:


```java
// import Java Lib
import java.util.ArrayList;

public class ArrayLists {
  public static void main(String[] args) {
    // creates arrayList of numbers
    ArrayList<Integer> list = new ArrayList<>();

    // initialize values used
    list.add(5);
    list.add(10);
    list.add(15);

    // print original
    System.out.println("Original: " + list);

    // adding new values
    list.add(20);
    System.out.println("Adding value: " + list);

    // removing value with specific index
    int indexRemove = 1;
    // removes specific index and print
    list.remove(indexRemove);
    System.out.println("Removing index '" + indexRemove + "'': " + list);

    // change specific index with new number
    // setting index to change and new number
    int indexChange = 2;
    int newValue = 25;
    // editing specific index
    list.set(indexChange, newValue);
    System.out.println("Changing index '" + indexChange + "' to " + newValue + ": " + list);

    // adding list
    int sum = sum(list);
    // printing sum
    System.out.println("Sum: " + sum);
  }

  // simple addition of arrayList
  public static int sum(ArrayList<Integer> list) {
    int sum = 0;
    // uses for loop to iterate through list and add to sum var
    for (int num : list) {
      sum += num;
    }
    return sum;
  }
}

ArrayLists.main(null)
```

    Original: [5, 10, 15]
    Adding value: [5, 10, 15, 20]
    Removing index '1'': [5, 15, 20]
    Changing index '2' to 25: [5, 15, 25]
    Sum: 45


### 2D Arrays
> In this FRQ, you will need to search through 2D arrays, manipulating and finding things based on them.

This can include finding specific numbers in a row or column and also changing values in the array or processing the information in the array.

Below is an example from my FRQ, finding the numbers in a certain column:


```java
public class ArrayTester {
  static int[][] arr2D = { { 0, 1, 2 },
                          { 3, 4, 5 },
                          { 6, 7, 8 },
                          { 9, 5, 3 } };

  public static int[] getColumn(int[][] arr2D, int c) {
    // creates var that stores result, and is the length of overall array (length = number of rows)
    int[] result = new int[arr2D.length];

    // sets index to 0
    // when i < number of rows
    // adds 1 to i after each iteration
    for (int i = 0; i < arr2D.length; i++) {
      // gathers data from the row number it is on, from the addressed column
      // stores in the var result
      result[i] = arr2D[i][c];
    }
    // returns values of results
    return result;
  }


  public static void main(String[] args) {
    
    System.out.println("This is the 2D Array in question:");
    // use for loop to print entire array
    for (int i = 0; i < arr2D.length; i++) {
      // iterate through columns within each row
      for (int j = 0; j < arr2D[i].length; j++) {
        System.out.print(arr2D[i][j] + " ");
      }
      // print new line after each row
      System.out.println();
    }

    System.out.println(" ");

    System.out.println("This is the second (index of 1) column printed separately:");
    // same as:
    // int [] result = ArrayTester.getColumn(arr2D, 1);
    int[] column = getColumn(arr2D, 1);

    // go through result and print
    for (int value : column) {
      // print result
      System.out.println(value);
    }
  }
}

ArrayTester.main(null);
```

    This is the 2D Array in question:
    0 1 2 
    3 4 5 
    6 7 8 
    9 5 3 
     
    This is the second (index of 1) column printed separately:
    1
    4
    7
    5

