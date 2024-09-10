---
title: Primitive Types vs Reference Types
author: david
categories: ['Lab Notebook']
tags: ['Java', 'Collegeboard']
type: tangibles
week: 28
description: practice frqs
toc: True
comments: True
date: 2024-03-19 12:00:00 +0000
---

## Question 1: Primitive Types vs Reference Types (Unit 1)

Situation: You are developing a banking application where you need to represent customer information. You have decided to use both primitive types and reference types for this purpose.

(a) Define primitive types and reference types in Java. Provide examples of each.

(b) Explain the differences between primitive types and reference types in terms of memory allocation and usage in Java programs.

(c) Code:

You have a method calculateInterest that takes a primitive double type representing the principal amount and a reference type Customer representing the customer information. Write the method signature and the method implementation. Include comments to explain your code.

### Answer

**A:** 
These are basic data types that store single values in Java. They are predefined by the language (not objects). Examples: `int`, `double`, `boolean`, `char`


```java
int num = 25;
double decimal = 1000.50;
boolean bool = true;
char character = 'M';
```

Reference types are instances of classes, interfaces, arrays, and enumerations. Examples: `String`, `Class`, `ArrayList`


```java
String name = "John";
Class class = new Class();
ArrayList<Integer> nums = new ArrayList<>();
```

**B:**
Memory:
- primitives are stored directly in stack memory, each var has it's own space
- references are stored in heap, where only the reference is stored in stack memory
Usage:
- primitives hold the actual values of something
- references hold the references to a object (like an address to the data), where methods and attributes access them

**C:**


```java
class Customer {
    private double interestRate;

    public Customer(double interestRate) {
        this.interestRate = interestRate;
    }

    public double getInterestRate() {
        return interestRate;
    }
}

public class Bank {
    // method signature
    public double calculateInterest(double principal, Customer customer) {
        double interestRate = customer.getInterestRate(); // gets the interest rate of the customer
        double interest = principal * interestRate; // primitive for storing data
        return interest;
    }

    public static void main(String[] args) {
        Customer customer = new Customer(0.05);

        double principal = 1000.0;
        Bank bank = new Bank();
        double interest = bank.calculateInterest(principal, customer);
        
        System.out.println("Interest: " + interest);
    }
}

Bank.main(null);
```

    Interest: 50.0


## Question 2: Iteration over 2D arrays (Unit 4)
Situation: You are developing a game where you need to track player scores on a 2D grid representing levels and attempts.

(a) Explain the concept of iteration over a 2D array in Java. Provide an example scenario where iterating over a 2D array is useful in a programming task.

(b) Code:

You need to implement a method calculateTotalScore that takes a 2D array scores of integers representing player scores and returns the sum of all the elements in the array. Write the method signature and the method implementation. Include comments to explain your code.

### Answer

**A:**
Iterating over an array is where you have to go through each element in the 2D array, row by row and column by column, retrieving the values for later use. This is done by nested loops, one loop iterating through each of the rows while the other iterating through each value within the rows.

One example in which 2D array iteration can be useful is in reading out stock data, which involves rows, which contain the information about the stock at a specific time, and the columns, which are each a unique attribute to the stock. Overall, being able to traverse this 2D array would allow you to store and pull out needed information about the stocks.

**B:**



```java
public class Game {
    // method used to calculate the total score from the 2d array
    public int calculateTotalScore(int[][] scores) {
        // total score
        int totalScore = 0;

        // going thru each row
        for (int i = 0; i < scores.length; i++) {
            // going thru each column in each row
            for (int j = 0; j < scores[i].length; j++) {
                // adding up the scores
                totalScore += scores[i][j];
            }
        }

        return totalScore;
    }

    public static void main(String[] args) {
        // example
        int[][] scores = {
            {10, 20, 30},
            {5, 15, 25},
            {8, 12, 18}
        };

        // create new game intance
        Game game = new Game();

        // running the calculate score method
        int totalScore = game.calculateTotalScore(scores);
        System.out.println("Total Score: " + totalScore);
    }
}

Game.main(null);
```

    Total Score: 143


## Question 5: If, While, Else (Unit 3-4)
Situation: You are developing a simple grading system where you need to determine if a given score is passing or failing.

(a) Explain the roles and usage of the if statement, while loop, and else statement in Java programming. Provide examples illustrating each.

(b) Code:

You need to implement a method printGradeStatus that takes an integer score as input and prints “Pass” if the score is greater than or equal to 60, and “Fail” otherwise. Write the method signature and the method implementation. Include comments to explain your code.

### Answer

**A:**
If Statements: this is used when a specific decision needs to be made based on certain conditions
- evaluates boolean expression and based on that executes specific code based on if the condition is true
- if condition is false, code isn't executed


```java
int x = 10;
if (x > 5) {
    System.out.println("x is greater than 5");
}
```

While Loop: repeatedly repeating over a block of code as long as a specific condition remains true
- loops if the condition is true
- stops if the condition is false


```java
int i = 0;
while (i < 5) {
    System.out.println(i);
    i++;
}
```

Else Statement: this is used with if statements, where a alternate condition is looked for in order to see if there is another action that can be performed in the case that the first condition is not met


```java
int x = 10;
if (x > 15) {
    System.out.println("x is greater than 15");
} else {
    System.out.println("x is not greater than 15");
}
```

**B:**


```java
public class GradingSystem {
    // prints grade based on score
    public void printGradeStatus(int score) {
        // checks if score is greater than or equal to 60
        if (score >= 60) {
            System.out.println("Pass, score: " + score); // passes if condition is met
        } else {
            System.out.println("Fail, score: " + score); // fails if condition is not met
        }
    }

    public static void main(String[] args) {
        // instance of grade system
        GradingSystem gradingSystem = new GradingSystem();

        gradingSystem.printGradeStatus(75);
        gradingSystem.printGradeStatus(40);
    }
}

GradingSystem.main(null);
```

    Pass, score: 75
    Fail, score: 40



```java
import java.util.Scanner;

public class GradingSystem2 {
    // prints grade based on score
    public void printGradeStatus(int score) {
        // checks if score is greater than or equal to 60
        if (score >= 60) {
            System.out.println("Pass, score: " + score); // passes if condition is met
        } else {
            System.out.println("Fail, score: " + score); // fails if condition is not met
        }
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // instance of grade system
        GradingSystem gradingSystem = new GradingSystem();

        // implementation of while loop
        while (true) {
            System.out.println("Enter the score (or enter -1 to exit): ");
            int score = scanner.nextInt();

            // check if want to exit
            if (score == -1) {
                System.out.println("Exiting the grading system...");
                break;
            }

            gradingSystem.printGradeStatus(score); // print score
        }

        scanner.close();
    }
}

GradingSystem2.main(null);
```

    Enter the score (or enter -1 to exit): 
    Fail, score: 45
    Enter the score (or enter -1 to exit): 
    Pass, score: 80
    Enter the score (or enter -1 to exit): 
    Exiting the grading system...

