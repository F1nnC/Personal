---
title: Workshop 4 - Lesson on 2D Arrays and Traversing them
author: david
categories: ['Lab Notebook']
tags: ['Java']
type: tangibles
week: 30
description: Unit 8 of CB
toc: True
comments: True
date: 2024-04-21 12:00:00 +0000
---

<h2>  8.1: Declaring + Initializing 2D Arrays; Determining their  </h2>

> Review: 
Arrays are a collection (list) of elements (primitive or object reference type data)  

So, a 2-Dimensional array is an array where the elements within that array are other arrays 

2D arrays can be better at storing certain types of information 

* Especially if the data represents a space, with rows and columns


Seating chart: 
| . | Column 1 | Column 2 | Column 3 | 
| - | - | - | - |
| Row 1 | Abby | Ben | Clara |  | 
| Row 2 | Ethan | Frank |  |  | 
| Row 3 | Isabelle | John | Kim | Leo | 

Note that this is a non-rectangular 2D array 

* Or if the data needs to be classified under categories 

| . | Month 1 | Month 2 | Month 3 | 
| - | - | - | - |
|  Winter | December | January | February |
|  Spring | March | April | May |
|  Summer | June | July | August |
|  Fall | Summer | October | November |

This is a rectangular 2D array. Non-rectangular 2D arrays are not a part of the CSA course


<h4> Declaring a 2D array </h2>

2D Arrays can be declared like this: 

`dataType[][] nameOfArray;`

<h3> Initializing a 2D array </h3>

`new dataType[r][c];`

r: number of rows (number of arrays)
<br>
c: number of columns (length of each array)


```java
public class Seasons {

    private String[][] Seasons = new String[2][3];

    // Or, if you already know what the elements should be:

    private String[][] Seasons2 = {
        {"December", "January", "February"},
        {"March", "April", "May"},
        {"June", "July", "August"},
        {"September", "October", "November"}
    };

}

```


### Size of 2D Arrays

The size of the 2D array is classified by number of rows by number of columns 

Number of rows can be found like this: 

`r = trimesterCourses.length`

This would give the number of arrays within the 2D array, since each array is an element

For number of columns: 

`c = trimesterCourses[0].length`

This finds the number of elements of the first array within the 2D array.


<h3> Accessing the Elements of a 2D Array </h3>

The elements of a 2D array can be accessed using index

`Seasons[0][2]`


**Output: February**

the value in the first bracket is the index of the rows, or which array we are accessing. In this case, the 0th index means we are accessing the first array 

The value in the second bracket is the index within the array. So we are looking for the 2nd value within the first array.


To update the element of a 2D array, all you need to do is reference its location and change the value. 






```java
public class Seasons {

    private String[][] seasons = new String[2][3];

    private static String[][] seasons2 = {
        {"December", "January", "February"},
        {"March", "April", "May"},
        {"June", "July", "August"},
        {"September", "October", "November"}
    };

    public static void main(String[] args) {
        System.out.println(seasons2[0][2]);
        seasons2[0][2] = "Changed Value";  
        System.out.println(seasons2[0][2]);
    }
}

Seasons.main(null);


```

    February
    Changed Value


### Popcorn Hack:



```java
public class TrimesterGrades {

    private static int[][] trimesterGrades = {
        {85, 90, 78, 92, 99}, // tri 1
        {92, 88, 91, 97, 80}, // tri 2
        {79, 85, 83, 95, 67}  // tri 3
    };

    public static void printArray(int[][] grid) {
        for (int i = 0; i < grid.length; i++) {
            for (int j = 0; j < grid[i].length; j++) {
                System.out.println(grid[i][j]);
            }
        }
    }

    public static void main(String args[]) {
        printArray(trimesterGrades);
        
        int newGrade = 90;
        trimesterGrades[2][2] = newGrade;
        
        System.out.println("Updated:");
        printArray(trimesterGrades);
    }
}

TrimesterGrades.main(null);
```

    85
    90
    78
    92
    99
    92
    88
    91
    97
    80
    79
    85
    83
    95
    67
    Updated:
    85
    90
    78
    92
    99
    92
    88
    91
    97
    80
    79
    85
    90
    95
    67


The 2D array keeps track of a students grade, grouped by each trimester. 
The student, currently in Trimester 3, retook a test in their 3rd period, which raised that grade to 90. 

Show how they would write code that changes the grade for the 3rd period class

8.2 - Traversing 2D Arrays

- Learning Objective: Using nested + enhanced for loops to traverse arrays

- How to use a nested loop to traverse a 2d array
    - Have an outer loop to iterate through each row
    - Have an inner loop that iterates through each column
    - It traverses from left to right and goes up to down (ABCDE → FGHIJ)
![image](https://github.com/John-sCC/jcc_frontend/assets/82348259/b93a73c1-8b76-4acb-a2f5-f51dc704f21c)


- How to use enhanced for loops
  - Get each row within the grid
  - Get each value within each row

![image](https://github.com/John-sCC/jcc_frontend/assets/82348259/5f02267f-8a55-4248-8a9a-ca9be24fa2cd)


- How to traverse using row-major vs column-major order
- Row-major order: get each row and then get the columns in it
    - Make the outer loop for each row and the inner loop for the columns when using nested loops
    - Get each row in the grid and then get each letter in the row when using enhanced loops
- Column-major order: get each column and then get the rows in it
    - Can’t switch the row and col vars in the print statement
    - Have to switch the order that the row and column loops are in
    - Make the outer loop for each column and the inner loop for the row 

![image](https://github.com/John-sCC/jcc_frontend/assets/82348259/dee9cdf9-9d6f-4b9c-b5e2-35cb9fa58c9b)


```java
public class RowMajorIndexing {
    public static void main(String[] args) {
        int[][] matrix = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };
        int rows = matrix.length;
        int cols = matrix[0].length;
        System.out.println("Row-major indexing:");
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                int index = i * cols + j;
                System.out.println(matrix[i][j]);
            }
        }
    }
}
RowMajorIndexing.main(null)
```

    Row-major indexing:
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
public class ColumnMajorIndexing {
    public static void main(String[] args) {
        int[][] matrix = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };
        int rows = matrix.length;
        int cols = matrix[0].length;
        System.out.println("Column-major indexing:");
        for (int j = 0; j < cols; j++) {
            for (int i = 0; i < rows; i++) {
                int index = i + j * rows;
                System.out.println(matrix[i][j]);
            }
        }
    }
}
ColumnMajorIndexing.main(null)
```

    Column-major indexing:
    1
    4
    7
    2
    5
    8
    3
    6
    9


- How to search for values in a 2d array
    - Use nested loops and in the inner loop make an if statement that returns True if a certain value is found
- Finding the max/min
    - Save the index of the extrema and in the inner loop have a comparison statement that determines that value


<img width="667" alt="image" src="https://github.com/AniCricKet/musical-guacamole/assets/91163802/84cb12be-b868-441a-96d0-51b12ff0d697">

(b) Write a static method rowSums that calculates the sums of each of the rows in a given twodimensional array and returns these sums in a one-dimensional array. The method has one parameter, a twodimensional array arr2D of int values. The array is in row-major order: arr2D[r][c] is the entry at row r and column c. The method returns a one-dimensional array with one entry for each row of arr2D such that each entry is the sum of the corresponding row in arr2D. As a reminder, each row of a two-dimensional array is a one-dimensional array. For example, if mat1 is the array represented by the following table, the call rowSums(mat1) returns the array {16, 32, 28, 20}. Assume that arraySum works as specified, regardless of what you wrote in part (a). You must use arraySum appropriately to receive full credit. Complete method rowSums below.


```java
class DiverseArray { // class mentioned in FRQ
    public static int arraySum(int[] arr) { // same method as previous part reused
        int sum = 0;
        for (int i = 0; i < arr.length; i++) {
            sum += arr[i];
        }
        return sum;
    }

    public static int[] rowSums (int[][] arr2D) { // new rowSum method
        int [] rowSums = new int[arr2D.length]; // initializing the array for the row sums
        for (int j = 0; j < arr2D.length; j++) { // for loop going through each array to find the sum
            rowSums[j] = arraySum(arr2D[j]); // placing the resulting sum from the arraySum method into the rowSums array
        }
        return rowSums; // returning array of values for the rowSums
    }
}

int[][] mat1 = { {1, 3, 2, 7, 3}, {10, 10, 4, 6, 2}, {5, 3, 5, 9, 6}, {7, 6, 4, 2, 1} }; // example matrix from frq
int [] rowSumsJava = DiverseArray.rowSums(mat1);
System.out.println("Row Sums: " + rowSumsJava); // printing out array, printed bad because of ipynb
for (int k = 0; k < rowSumsJava.length; k++) { // fixed by iterating through each value in the row and printing out
    System.out.println("Row " + k + " Sum: " + rowSumsJava[k]);
}
```

    Row Sums: [I@7a4e0073
    Row 0 Sum: 16
    Row 1 Sum: 32
    Row 2 Sum: 28
    Row 3 Sum: 20


![image](https://github.com/AniCricKet/musical-guacamole/assets/91163802/40654587-a7af-4918-ab01-5000ba097a9b)

(c) A two-dimensional array is diverse if no two of its rows have entries that sum to the same value. In the following examples, the array mat1 is diverse because each row sum is different, but the array mat2 is not diverse because the first and last rows have the same sum.Assume that arraySum and rowSums work as specified, regardless of what you wrote in parts (a) and (b). You must use rowSums appropriately to receive full credit. Complete method isDiverse below.


```java
class DiverseArray { // class mentioned in FRQ
    public static int arraySum(int[] arr) { 
        int sum = 0;
        for (int i = 0; i < arr.length; i++) {
            sum += arr[i];
        }
        return sum;
    }

    public static int[] rowSums (int[][] arr2D) { // same method as previous part reused
        int [] rowSums = new int[arr2D.length];
        for (int j = 0; j < arr2D.length; j++) {
            rowSums[j] = arraySum(arr2D[j]);
        }
        return rowSums;
    }

    public static boolean isDiverse(int[][] arr2D) { // new isDiverse method
        int[] sums = rowSums(arr2D); // makes array of the row sums from the matrix
        for (int k = 0; k < sums.length; k++) { // iterates through each value of the sums array
            for (int l = k + 1; l < sums.length; l++) { // looks through each other value to the current value it's on
                if (sums[k] == sums[l]) { // compares the two 
                    return false; // when the condition is false
                }
            }
        }
        return true; // if no values are equal, return true
    }
}

int[][] mat1 = { {1, 3, 2, 7, 3}, {10, 10, 4, 6, 2}, {5, 3, 5, 9, 6}, {7, 6, 4, 2, 1} }; // matrix that would return true
int[][] mat2 = { {1, 1, 5, 3, 4}, {12, 7, 6, 1, 9}, {8, 11, 10, 2, 5}, {3, 2, 3, 0, 6} }; // matrix that would return false

// printing out all data as before
int [] rowSumsJava1 = DiverseArray.rowSums(mat1);
for (int m = 0; m < rowSumsJava1.length; m++) {
    System.out.println("Row " + m + " Sum: " + rowSumsJava1[m]);
}
System.out.println("Array 1 Diversity: " + DiverseArray.isDiverse(mat1));
int [] rowSumsJava2 = DiverseArray.rowSums(mat2);
for (int n = 0; n < rowSumsJava2.length; n++) {
    System.out.println("Row " + n + " Sum: " + rowSumsJava2[n]);
}
System.out.println("Array 2 Diversity: " + DiverseArray.isDiverse(mat2));
```

    Row 0 Sum: 16
    Row 1 Sum: 32
    Row 2 Sum: 28
    Row 3 Sum: 20
    Array 1 Diversity: true
    Row 0 Sum: 14
    Row 1 Sum: 35
    Row 2 Sum: 36
    Row 3 Sum: 14
    Array 2 Diversity: false

