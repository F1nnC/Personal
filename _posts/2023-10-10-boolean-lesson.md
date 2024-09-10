---
title: Collegeboard - Boolean and If statements
author: mort
categories: ['Lesson']
tags: ['Collegeboard', 'Java', 'Unit 3']
type: hacks
week: 8
description: Lesson on booleans and if statements.
toc: True
comments: True
date: 2023-10-10 12:00:00 +0000
---

# APCSA Unit 3: College Board Learning Objectives and Standards

## Learning Objectives

The objective of today's lesson is to...

- Evaluate Boolean expressions that use relational operators in program code

## Essential Knowledge

College Board wants you to know that...

- Primitive values and reference values can be compared using relational operators (i.e., == and !=)
- Arithmetic expression values can be compared using relational operators (such as <, >, <=, >=)
- An expression involving relational operators evaluates to a Boolean value

## Warm Up

Answer the following questions as a group or individually. Write down your answers in your hacks notebook.

- What is a boolean?
It is a conditional, usually a true/false statement.
- What values can a boolean represent? How many?
It can represent two values, true or false.
- What is an example of when we'd use a boolean?
One example we could use is checking is a number is a specific value.

## Recap on Booleans

A boolean is a type of variable that can evaluate to true or false. In Java, there are various comparison operators that can be used in order to compare two values. **What are some**?

The format is `val1 <oper> val2`, and will return a boolean given the state of the system. Like all booleans, this can only return two values `true` or `false` 


```java
public class Example {

    private static boolean isAdult = false;
    private static int myAge = 17;

    public static void main(String [] args){

        if(myAge >= 18){
            System.out.println("You are an adult!");
            isAdult = true;
        } else {
            System.out.println("You are not an adult!");
        }  

        System.out.println(isAdult);
    }
}

Example.main(null);
```

    You are not an adult!
    false


## Comparison Operators

Whenever you want to make a boolean statement (such as setting a boolean to be true or false), you want to use the `"="` or `"!="` sign and not the `"=="` sign.

On the other hand, if you are ever trying to compare String objects, use the String methods such as `.equals` or `.compareTo`, NOT the Boolean expressions mentioned above. 

### Setup Class

**Note the utilization of the `compareTo` in a custom class in order to compare two classes**


```java
public class ComparisonExample implements Comparable<ComparisonExample> {
    private int comp;
    private int comp2;

    public ComparisonExample(int _comp, int _comp2) {
        this.comp = _comp;
        this.comp2 = _comp2;
    }

    @Override
    public int compareTo(ComparisonExample s) {
        return Integer.compare(this.comp, s.comp);
    }

    public static int compare(ComparisonExample a, ComparisonExample b)
    {
        if(Integer.compare(a.comp, b.comp)==0){
            return Integer.compare(a.comp2, b.comp2);
        }
        else {
            return Integer.compare(a.comp, b.comp);
        }
    }
}
```

### Comparing using compareTo

Describe this code and the code above using comments. Talk about how we define the `compareTo` in the class definition and how that compares each instance of a class using a certain comparison variables. <br>
<br>
**In your notes** Compare and contrast `Comparator<>` and `compareTo`


```java
ComparisonExample c = new ComparisonExample(2, 2);
ComparisonExample v = new ComparisonExample(2, 3);
System.out.println(c.compareTo(v)); // Allows comparison of these two instances of a class
System.out.println(ComparisonExample.compare(c, v)); // Also allows for the instances

if(ComparisonExample.compare(c, v) < 0){ // Using the comparison 
    System.out.println("This is less than!");
}
else { System.out.println("it is not"); }
```

    0
    -1
    This is less than!


### Comparing using .equals

You can use the .equals method to compare the contents of two strings. To test if the two strings are the same or not, you can use Sysout (System.out.println) so that the console will provide a value that is either true or false. 


```java
System.out.println("hello".equals("hello")); // will return true, since the strings are the same
System.out.println("Hello".equals("hello")); // will return false, as the one thing that separates these two strings is that the h is capitalized in the first string
```

    true
    false


### Comparing two arrays

The code below compares the contents of two arrays to see if they are equal. It uses the `equals` method. However, as we see below, this is rather shallow as opposed to deep comparison.


```java
  int arr1[] = { 1, 2, 3 };
  int arr2[] = { 1, 2, 3 };

  if (Arrays.equals(arr1, arr2)){

      System.out.println("Same");
  }
  else {
      System.out.println("Not same");
  }

```

    Same


## Deep Equality

All of the methods you just saw are examples of **regular equality.** Whereas regular equality methods such as the .equals method compares the content of the objects themselves to check if they are equal (i.e. point to the same object), deep equality methods such as the .deepequals method compares the content of nested objects or arrays to determine equality. 


```java
import java.util.Arrays;

public class DeepEquality {

    public static void main(String[] args) {
        
        String[][] fruit1 = {
            {"apple", "banana"},
            {"orange", "grape"}
        };

        String[][] fruit2 = {
            {"apple", "banana"},
            {"orange", "grape"}
        };

        // Regular comparison (compares array references, not contents)
        System.out.println("Regular/shallow equality result: " + (fruit1.equals(fruit2))); // will output false since the arrays do not reference the same object

        // Deep comparison (compares array contents, not just references)
        System.out.println("Deep equality result: " + (Arrays.deepEquals(fruit1, fruit2))); // will output true since the arrays have the same content
    }
}

DeepEquality.main(null);
```

    Regular/shallow equality result: false
    Deep equality result: true


## Challenge!

Identify the issue(s) in the code below (hint: try running it yourself). Then, make the necessary corrections to ensure that the program runs as intended.


```java
public class Challenge {

    private static boolean isName = false;
    private static String name = new String("John");


    public static void main(String [] args){

        Scanner sc = new Scanner(System.in);

        System.out.println("Guess my name!");

        String guess = sc.nextLine();
        System.out.println("Your guess: "+guess);

    
        if (name.equals(guess)) { 
            isName = true;
        } else {
            System.out.println("Wrong! L Cope");
        }

        System.out.println(isName);

    }
}

Challenge.main(null);
```

    Guess my name!
    Your guess: John
    true


# Your Homework

Now that you know what boolean expressions are and how to write them, as well as several comparison methods, your task is to write a class that uses either the compareTo or comparator and compare. Then create two instances of these classes and demonstrate using if statements. 




BONUS: Create a program that checks if a year is a leap year or not.

Here is how the method should work: 

(1) Prompt the user to input any year that they would like <br>
(2) Determine if the year is a leap year or not <br>
(3) Print the necessary dialogue (ex. [year] is/is not a leap year) AND return the value of any boolean(s) used



```java
import java.util.Scanner;

class Year {
    private int year;

    public Year(int year) {
        this.year = year;
    }

    public boolean LeapYear() {
        return (year % 4 == 0);
    }

    public int compareTo(Year otherYear) {
        return Integer.compare(this.year, otherYear.year);
    }
}

public class LeapYear {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);

        System.out.println("Enter year: ");
        int yearValue = input.nextInt();
        int yearValue2 = input.nextInt();

        Year year1 = new Year(yearValue);
        Year year2 = new Year(yearValue2);

        boolean isLeapYear = year1.LeapYear();
        boolean isLeapYear2 = year2.LeapYear();
        int comparisonResult = year1.compareTo(year2);

        if (isLeapYear) {
            System.out.println(yearValue + " is a leap year.");
        } else {
            System.out.println(yearValue + " is not a leap year.");
        }

        if (isLeapYear2) {
          System.out.println(yearValue2 + " is a leap year.");
        } else {
            System.out.println(yearValue2 + " is not a leap year.");
        }

        if (comparisonResult < 0) {
            System.out.println(yearValue + " < " + yearValue2);
        } else if (comparisonResult > 0) {
            System.out.println(yearValue + " > " + yearValue2);
        } else {
            System.out.println(yearValue + " = " + yearValue2);
        }
    }
}

LeapYear.main(null);
```

    Enter year: 
    1200 is a leap year.
    2000 is a leap year.
    1200 < 2000

