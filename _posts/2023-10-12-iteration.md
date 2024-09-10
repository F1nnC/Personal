---
title: Collegeboard - Iteration
author: mort
categories: ['Lesson']
tags: ['Collegeboard', 'Java', 'Unit 4']
type: hacks
week: 8
description: while Loops, for Loops, Developing Algorithms Using Strings, Nested Iteration, Informal code analysis
toc: True
comments: True
date: 2023-10-12 12:00:00 +0000
---

# U4 | Iteration

---

# 4.1 while Loops

---

- A while loop is a fundamental control structure in programming used for repeated execution of a block of code as long as a condition is true.
- The loop starts by evaluating the condition. If the condition is true, the code inside the loop is executed.
- After each iteration, the condition is re-evaluated, and if it's still true, the loop continues.
If the condition is false initially, the loop code is never executed.
- While loops are used when you don't know in advance how many times the loop needs to execute.
- There's a risk of infinite loops if the condition never becomes false, so be cautious.
You can use variables and complex expressions as loop conditions.
- It's essential to update the loop control variable within the loop to prevent infinite loops.
- While loops are typically used for tasks such as iterating over collections or waiting for a specific condition to be met.
- You can always break out of a while loop prematurely using the break statement.

## Example of While Loops


```java
public class PyramidPattern {
    public static void main(String[] args) {
        int height = 5;
        int row = 1;

        while (row <= height) {
            int spaces = height - row;
            int stars = 2 * row - 1;

            // Print spaces
            int spaceCount = spaces;
            while (spaceCount > 0) {
                System.out.print(" ");
                spaceCount--;
            }

            // Print stars
            int starCount = stars;
            while (starCount > 0) {
                System.out.print("*");
                starCount--;
            }

            System.out.println(); // Move to the next line for the next row
            row++;
        }
    }
}

PyramidPattern.main(null);
```

        *
       ***
      *****
     *******
    *********


# 4.2 for Loops

---

- Iterative statement that checks for condition
- Repeatedly execute a a block of code as long as the condition is met
- Condition specifies amount of times

# for Loops vs. while Loops
- while Loops: use when number of iterations is unknown
- for Loops: use when number of iterations is known


```java
int i = 0;
while (i < 5) {
    System.out.println(i);
    i++;
}
```

    0
    1
    2
    3
    4



```java
for (int i = 0; i < 5; i++) {
    System.out.println(i);
}
```

    0
    1
    2
    3
    4


- Calculate and print the sum of all even numbers from 1 to a given positive integer ‘n’ (user input n)


```java
import java.util.Scanner;

class Even {
  public static void main(String[] args) {
    Scanner input = new Scanner(System.in);
    int n = input.nextInt();

    int sum = 0;

    for (int i = 2; i <= n; i += 2) {
      System.out.println(i + " ");
      sum += i;
    }

    System.out.println("Sum = " + sum);
  }
}
Even.main(null);
```

    2 
    4 
    6 
    8 
    10 
    12 
    14 
    Sum = 56


- Three parts in for loop header: variable initialization, Boolean (conditional) expression, and increment/decrement statement

Question: Which part is which?

- variable initialization (int i=0): sets variable before loop starts
- Boolean (conditional) expression (i < 5): defines condition for loop to run, in this case, the loop continues as long as i is less than 5, so loops 5 times i 05
- increment/decrement statement (i++): increases variable each time code block in the loop is executed, in this case it increases by 1
- variable can be used in the code block for other various reasons besides specifying how many times the loop will repeat
- Boolean (conditional) expression and increment/decrement statement together determine how many times the loop will repeat


# 4.3 Developing Algorithms Using Strings

---

LEARNING OBJECTIVES:
for algorithms in the context of a particular specification that involves ```string``` objects:
- identify standard algorithms
- modify standard algorithms
- develop an algorithm


**Java has many methods that are helpful when working with strings:**

* ```string .substring``` --> retrieves portion of a string
* ```string .equals``` --> compares two strings
* ```string .length``` --> returns length of a string
* ```for loop``` --> iterating through characters of a string

## Finding a substring within a string

We can use the "window" method:

A "window" is created the same length as the substring. We then iterate through the main string in sections and compare to the substring

For example:

## I T E R A T E
> with substring "ERA"


```java
public class StringFinder {
    public static void main(String[] args) {
        String word = "iterate";
        String sub = "rate";
        boolean found = false; // will be set to true once substring is found

        for (int i = 0; i <= word.length() - sub.length(); i++) { //iterating forwards: starting at first index (0) and going to the length of the word.. let's try word.length
            String portion = word.substring(i, i + sub.length());
            if (portion.equals(sub)) // make sure you use .equals!!
                found = true;
        }

        if (found)
            System.out.println("substring is found within string!");
        else
            System.out.println("substring is NOT within string");
    }

    }

    StringFinder.main(null);
```

    substring is found within string!


### POPCORN HACK: Run the code.. what happened? How can we fix it?

Tell us below!

You would have to subtract substring length from word length to make sure the substring is extracted from the bounds of the main string.

### Another issue:

## I T E R A T E
What if our substring was the word "RATE"? Note that RATE is at the end of the whole string
- You have to set i <= word.length() - sub.length() because `rate` is found at the very end of the string, so the very end of the bounds need to be included.

### HACKS

**Create a algorithm similar to the one above. Except this time, use iteration to count the number of vowels within the main string.**

HINT: Use the boolean expressions we have learned in previous lessons. Which would you use when comparing your "window" with multiple options of substrings?


```java
public class VowelFinder {
    public static void main(String[] args) {
        String word = "iterate";
        int vowels = 0;

        for (int i = 0; i < word.length(); i++) {
            char currentChar = word.charAt(i);
            if (isVowel(currentChar)) {
                vowels++;
            }
        }
        System.out.println("Vowels: " + vowels);
    }
    
    public static boolean isVowel(char c) {
        char lowerC = Character.toLowerCase(c);
        return lowerC == 'a' || lowerC == 'e' || lowerC == 'i' || lowerC == 'o' || lowerC == 'u';
    }
}

VowelFinder.main(null);
```

    Vowels: 4


# 4.4 Nested Iteration

**nested iteration**
>occurs when we have a loop inside of another loop, similar to nested conditional statements in unit 3

When you have one loop inside another, the inner loop has to finish all its rounds before the outer loop moves to the next round. If the inner loop has a "stop" command, it only stops for that round of the outer loop. The next time the outer loop starts a new round, the inner loop starts over.

If you have two nested loops without stops, and the outer one runs n times while the inner one runs m times each time the outer one goes around, the inner loop will run m times n times, which is m * n times in total. This rule also applies if you have more than two nested loops. To find the total number of times the innermost loop runs, just multiply how many times each loop runs per round.


```java
public class NestedLoopsDemo {
    public static void main(String[] args) {
        int n = 3; //numb of times the outside loop runs
        int m = 2; //numb of times the inside loop runs

        //the nested loops
        for (int i = 1; i <= n; i++) {
            System.out.println("Outer loop iteration: " + i);
            for (int j = 1; j <= m; j++) {
                System.out.println("Inner loop iteration: " + j);
            }
        }
    }
}
NestedLoopsDemo.main(null)
```

    Outer loop iteration: 1
    Inner loop iteration: 1
    Inner loop iteration: 2
    Outer loop iteration: 2
    Inner loop iteration: 1
    Inner loop iteration: 2
    Outer loop iteration: 3
    Inner loop iteration: 1
    Inner loop iteration: 2


### Break Statement

**break statement**
>is used to exit a loop prematurely, typically when a certain condition is met. In the case of nested loops, it can be used to break out of the innermost loop.


```java
public class BreakExample {
    public static void main(String[] args) {
        for (int i = 1; i <= 3; i++) {
            System.out.println("Outer loop iteration " + i);

            for (int j = 1; j <= 3; j++) {
                System.out.println("Inner loop iteration " + j);

                if (i == 2 && j == 2) {
                    System.out.println("Breaking inner loop");
                    break; //break out of the inside loop when i is 2 and j is 2.
                }
            }
        }
    }
}
BreakExample.main(null)
```

    Outer loop iteration 1
    Inner loop iteration 1
    Inner loop iteration 2
    Inner loop iteration 3
    Outer loop iteration 2
    Inner loop iteration 1
    Inner loop iteration 2
    Breaking inner loop
    Outer loop iteration 3
    Inner loop iteration 1
    Inner loop iteration 2
    Inner loop iteration 3


### Popcorn HACK

When the targetNumber is found, you can print a message and use the break statement to exit the loop. When it's not found, you can print a message indicating that the number was not found.


```java
public class BreakHack {
    public static void main(String[] args) {
        int targetNumber = 42; //numb we want
        int[] numbers = {10, 20, 30, 40, 50, 60, 70}; //numb array

        for (int number : numbers) {
            if (number == targetNumber) {
                //if numb is found
                //print message to break out loop
                System.out.println("found");
                break;
            }
        }
        //if numb isnt found
        //print message showing numb wasnt found if you want
        System.out.println("not found");
    }
}
BreakHack.main(null);
```

    not found


### Continue Statement

**continue statement**
>is used to skip the current iteration of a loop and move to the next iteration. In the case of nested loops, it applies to the innermost loop.


```java
public class ContinueExample {
    public static void main(String[] args) {
        for (int i = 1; i <= 3; i++) {
            System.out.println("Outer loop iteration " + i);

            for (int j = 1; j <= 3; j++) {
                if (i == 2 && j == 2) {
                    System.out.println("Skipping inner loop iteration " + j);
                    continue; //skip the iteration when i is 2 and j is 2.
                }
                System.out.println("Inner loop iteration " + j);
            }
        }
    }
}
ContinueExample.main(null)
```

    Outer loop iteration 1
    Inner loop iteration 1
    Inner loop iteration 2
    Inner loop iteration 3
    Outer loop iteration 2
    Inner loop iteration 1
    Skipping inner loop iteration 2
    Inner loop iteration 3
    Outer loop iteration 3
    Inner loop iteration 1
    Inner loop iteration 2
    Inner loop iteration 3


### Patterns and Shapes


```java
import java.util.Scanner;

public class InteractivePyramid {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("Enter the symbol you want to use: ");
        char symbol = scanner.next().charAt(0);

        System.out.println("Enter the number of rows for the pyramid: ");
        int numRows = scanner.nextInt();

        for (int i = 1; i <= numRows; i++) {
            //print space before the symbol
            for (int j = 1; j <= numRows - i; j++) {
                System.out.print(" ");
            }

            //print
            for (int k = 1; k <= 2 * i - 1; k++) {
                System.out.print(symbol);
            }

            System.out.println(); //next line
        }
        scanner.close();
    }
}
InteractivePyramid.main(null)
```

    Enter the symbol you want to use: 
    Enter the number of rows for the pyramid: 
        f
       fff
      fffff
     fffffff
    fffffffff


## Hacks

1. **Modify pyramid code:**

- Create different patterns (other then pyramid) by modifying nested loop structure


```java
import java.util.Scanner;

public class Draw {
  public static void main(String[] args) {
    Scanner scanner = new Scanner(System.in);

      System.out.println("Choose a pattern to create:");
      System.out.println("1. Pyramid");
      System.out.println("2. Inverted Pyramid");
      System.out.println("3. Right Triangle");
      System.out.println("4. Hollow Pyramid");
      System.out.println("5. Diamond");
      int choice = scanner.nextInt();

      System.out.println("Enter the symbol you want to use: ");
      char symbol = scanner.next().charAt(0);

      System.out.println("Enter the number of rows for the pyramid: ");
      int numRows = scanner.nextInt();

      switch (choice) {
          case 1:
              createPyramid(symbol, numRows);
              break;
          case 2:
              createInvertedPyramid(symbol, numRows);
              break;
          case 3:
              createRightTriangle(symbol, numRows);
              break;
          case 4:
              createHollowPyramid(symbol, numRows);
              break;
          case 5:
              createDiamond(symbol, numRows);
              break;
          default:
              System.out.println("Invalid choice.");
      }
      scanner.close();
    }
  public static void createPyramid(char symbol, int numRows) {
    for (int i = 1; i <= numRows; i++) {
      for (int j = 1; j <= numRows - i; j++) {
        System.out.print(" ");
      }
      for (int k = 1; k <= 2 * i - 1; k++) {
        System.out.print(symbol);
      }

      System.out.println(); 
    }
  }
  public static void createInvertedPyramid(char symbol, int numRows) {
    for (int i = numRows; i >= 1; i--) {
      for (int j = 1; j <= numRows - i; j++) {
        System.out.print(" ");
      }
      for (int k = 1; k <= 2 * i - 1; k++) {
        System.out.print(symbol);
      }
      System.out.println();
    }
  }

  public static void createRightTriangle(char symbol, int numRows) {
    for (int i = 1; i <= numRows; i++) {
      for (int j = 1; j <= i; j++) {
        System.out.print(symbol);
      }
      System.out.println();
    }
  }

  public static void createHollowPyramid(char symbol, int numRows) {
    for (int i = 1; i <= numRows; i++) {
      for (int j = 1; j <= numRows - i; j++) {
        System.out.print(" ");
      }
      for (int k = 1; k <= 2 * i - 1; k++) {
        if (k == 1 || k == 2 * i - 1 || i == numRows) {
          System.out.print(symbol);
        } else {
          System.out.print(" ");
        }
      }
      System.out.println();
    }
  }

  public static void createDiamond(char symbol, int numRows) {
    for (int i = 1; i <= numRows; i++) {
      for (int j = 1; j <= numRows - i; j++) {
        System.out.print(" ");
      }
      for (int k = 1; k <= 2 * i - 1; k++) {
        System.out.print(symbol);
      }
      System.out.println();
    }
    for (int i = numRows - 1; i >= 1; i--) {
      for (int j = 1; j <= numRows - i; j++) {
        System.out.print(" ");
      }
      for (int k = 1; k <= 2 * i - 1; k++) {
        System.out.print(symbol);
      }
      System.out.println();
    }
  } 
}

Draw.main(null)
```

    Choose a pattern to create:
    1. Pyramid
    2. Inverted Pyramid
    3. Right Triangle
    4. Hollow Pyramid
    5. Diamond
    Enter the symbol you want to use: 
    Enter the number of rows for the pyramid: 
           j
          j j
         j   j
        j     j
       j       j
      j         j
     j           j
    jjjjjjjjjjjjjjj


2. **Questions**

- What is a nested iteration, continue statement, and break statement (in your own words)?

  - Nested iteration is when there is a loop inside a loop, where the outer loop iterates the inner loop. When the inner loop iterates it's number of times the outer loop iterates to the next iteration to iterate the inner loop again. Continue statements are basically a step back, moving back to skip a part of the code if conditions are met. Break statements entirely exit the loop, ending the program at that step.

- Create a simple example of a continue statement **or** break statement


```java
import java.util.Scanner;

public class IntChecker {
  public static void main(String[] args) {
    Scanner scan = new Scanner(System.in);

    System.out.println("Pick a number between 1-10");
    int choice = scan.nextInt();
    int i = 1;
    int count = 0;
    while (count <= 10) {
      if (choice == i) {
        System.out.println("You guessed the number.");
        break;
      } else {
        System.out.println("Keep guessing.");
        choice = scan.nextInt();
        count++;
      }
    }
    scan.close();
  }
}

IntChecker.main(null);
```

    Pick a number between 1-10
    Keep guessing.
    Keep guessing.
    You guessed the number.


---

# 4.5 Informal Code Analysis

<b>Learning objective</b>: Compute statement execution counts & informal run-time comparison of iterative statements

<b>Essential Knowledge</b>: A statement execution count indicates the number of times a statement is executed by the program

## What IS informal code analysis?

Answer: It is analyzing code without actually running it.


```java
// CODE EXAMPLE #1 (for loop)
public class InformalCodeAnalysis {
    public static void main(String[] args) {
        int count = 0;
        for (int k = 0; k < 30; k++)
        {
            if (k % 3 == 0) // statement 1
            {
                count++; // statement 2
                System.out.println(k);
            }
        }
    }
}
InformalCodeAnalysis.main(null);
```

    0
    3
    6
    9
    12
    15
    18
    21
    24
    27


<b>How many times will statement 1 execute? </b>

Answer: 10 times

<b>How many times will statement 2 execute?</b>

Answer: 10 times


```java
// CODE EXAMPLE #2 (for loop)
public class InformalCodeAnalysis {
    public static void main(String[] args) {
        int count = 0;
        for (int k = 4; k < 30; k+=3)
        {
            count++; // statement 3
            System.out.println(k);
        }
    }
}
InformalCodeAnalysis.main(null);
```

    4
    7
    10
    13
    16
    19
    22
    25
    28


<b>How many times will statement 3 execute?</b>

Answer: 9 times


```java
// Rewrite the code segment below to have a faster run-time based on statement execution counts
for (int k = 0; k < 135; k+=5)
{
   System.out.println(k);
}
```

    0
    5
    10
    15
    20
    25
    30
    35
    40
    45
    50
    55
    60
    65
    70
    75
    80
    85
    90
    95
    100
    105
    110
    115
    120
    125
    130



```java
// CODE EXAMPLE #3 (while loop)

int num = (int)(Math.random() * 10);
while (num % 2 != 0)
{
    num = (int)(Math.random() * 10); // statement 4
    System.out.println(num);
}
```

    1
    3
    6


<b>What is the min/max number of times statement 4 will execute?</b>

Answer: Minimum - 1; Maximum - infinite


```java
// CODE EXAMPLE #4 (nested loop)
int i = 1;

for (int outer = 0; outer < 3; outer++)
{
    for (int inner = 0; inner < 4; inner++)
    {
        // statement #5
        System.out.println(inner);
    }
}
```

    0
    1
    2
    3
    0
    1
    2
    3
    0
    1
    2
    3


<b>How many times will statement #5 execute?</b>

Answer: 12 times


```java
// CODE EXAMPLE #5 (nested loop)

int k = 0;
while (k < 5)
{
    int x = (int)(Math.random() * 6) + 1;
    while (x != 6)
    {
        // statement #6
        x = (int)(Math.random() * 6) + 1;
        System.out.println(x);
    }
    k++;
}
```

    6
    2
    6
    5
    2
    4
    5
    1
    2
    2
    3
    5
    6
    1
    3
    3
    4
    6


<b>How many times will statement #6 execute?</b>

Answer: random times, depends on random number generated

# 4.5 Hacks


<b>#1 How many times will statement #1 and statement #2 execute in the code segments below? </b>

- Statement 1: 1000
- Statement 2: 44


```java
for (int k = 0; k < 1000; k++)
{
    // statement #1
}
```


```java
for (int k = 6; k < 50; k++)
{
    // statement #2
}
```

<b>#2 How many times will statement #3 execute for the code segment below?</b>

- Statement 3: 4 per iteration -> 28 total


```java
int k = 1;
while (k <=7)
{
    for (int z = 0; z < 4; z++)
    {
        // statement #3
    }
    k++;
}
```

<b>#3 Create 3 seperate code segments that execute a statement 10 times using: </b>

(a) a for loop

(b) a while loop

(c) a nested loop


```java
// 3a code
for (int i = 0; i < 10; i++) {
  System.out.println(i);
}
```

    0
    1
    2
    3
    4
    5
    6
    7
    8
    9



```java
// 3b code
int i = 0;

while (i < 10) {
  i++;
  System.out.println(i);
}
```

    1
    2
    3
    4
    5
    6
    7
    8
    9
    10



```java
// 3c code
int i = 0;

while (i < 10) {
  for (int k = 0; k < 10; k++) {
    System.out.println(k);
    i++;
  }
}
```

    0
    1
    2
    3
    4
    5
    6
    7
    8
    9

