---
title: FRQ Mini-Lab 1
author: david
categories: ['Lab Notebook']
tags: ['Java', 'Collegeboard']
type: tangibles
week: 4
description: First CSA FRQ.
toc: True
comments: True
date: 2023-09-13 13:00:00 +0000
---

# FRQ 2018 Number 4

This question involves reasoning about arrays of integers. You will write two static methods, both of which are
a class named `ArrayTester`.


```java
public class ArrayTester {

    // Returns an array containing the elements of column c of arr2D in the same order as they appearin arr2D.
    // Precondition: c isa valid column index in arr2D.
    // Postcondition: arr2D is unchanged.

  public static int[] getColumn(int [] [] arr2D, int c) {
    // to be implemented in part (a)
  }

  // Returns true if and only if every value in arrl appears in arr2.
  // Precondition: arr1 and arr2 have the same length.
  // Postcondition: arrl and arr2 are unchanged.

  public static boolean hasAllVa1ues(int[] arrl, int[] arr2) { 
    // implementation not shown
  }

  // Returns true if arr contains any duplicate values;
  //         false otherwise.

  public static boolean containsDup1icates(int [] arr) {
    // implementation not shown
  }

  // Returns true if square is a Latin square as described in part (b);
  //         false otherwise.
  // Precondition: square has an equal number of rows and columns.
  //               square has at least one row.

  public static boolean isLatin(int [] [] square){
    // to be implemented in part (b)
  }
}
```

## Part A

Write a static method `getColumn`, which returns a one-dimensional array containing the elements of a
single column in a two-dimensional array. The elements in the returned array should be in the same order as
they appear in the given column. The notation `arr2D [r] [c]` represents the array element at row `r` and
column `c`.

The following code segment initializes an array and calls the `getColumn` method.


```java
int [] [] arr2D = { { 0, 1, 2 },
                    { 3, 4, 5 },
                    { 6, 7, 8 },
                    { 9, 5, 3 } };

int [] result = ArrayTester.getColumn(arr2D, 1);
```

When the code segment has completed execution, the variable `result` will have the following contents.

`result: { 1, 4, 7, 5 }`

### Answer for Part A


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

    1
    4
    7
    5


### Explanation for Answer

Coming with this answer, I decided to being by storing the variable as an integer that was defined as the length of the number of rows in the array `arr2D`. This would allows my to later iterate through the array to more easily extract the values that I wanted/needed.


```java
int[] result = new int[arr2D.length];
```

I then created a for loop which would iterate through the rows of `arr2D` gathering the value from the column that was called in the `main()` method. The iteration follows a simple yet effective integer counting approach which would set `i = 0` and go through the number of rows `arr2D.length` while `i` was less than the total number of rows in `arr2D`. The result would then be stored based on the value that was pulled from the column number that was called and the row number that the value was in, column being defined as `c` and the row number being defined as `i`.


```java
for (int i = 0; i < arr2D.length; i++) {
      result[i] = arr2D[i][c];
    }
```

The result would then be returned with a simple return statement.


```java
return result;
```

In order to make the code work in Jupyter I had to add a `main()` method in order to call the method `GetColumn()` and return the `result`. I used a simple for loop to iterate through all of the values that were stored in the array `column` and print them as a result.


```java
public static void main(String[] args) {
  int[] column = getColumn(arr2D, 1);

  for (int value : column) {
    System.out.println(value);
  }
}
```

## Part B

Write the static method `isLatin`, which returns true if a given two-dimensional square array is a
*Latin square*, and otherwise, returns `false`.

A two-dimensional square array of integers is a Latin square if the following conditions are true.

- The first row has no duplicate values.
- All values in the first row of the square appear in each row of the square.
- All values in the first row of the square appear in each column of the square.

The `ArrayTester` class provides two helper methods: `containsDuplicates` and
`hasA11Values`. The method `containsDuplicates` returns true if the given one-dimensional
array `arr` contains any duplicate values and false otherwise. The method `hasAllVa1ues` returns
`true` if and only if every value in `arrl` appears in `arr2`. You do not need to write the code for these
methods.

### Answer for Part B


```java
public class ArrayTester {
  static int[][] arr2D = { { 0, 1, 2 },
                          { 3, 4, 5 },
                          { 6, 7, 8 },
                          { 9, 5, 3 } };

  public static int[] getColumn(int[][] arr2D, int c) {
    int[] result = new int[arr2D.length];

    for (int i = 0; i < arr2D.length; i++) {
      result[i] = arr2D[i][c];
    }
    return result;
  }

  public static boolean hasAllValues(int[] arr1, int[] arr2) {
    // loop checking for values in array 1
    for (int i = 0; i < arr1.length; i++) {
      // setting boolean for if a same is found
      boolean found = false;
      // setting a second loop checking values in the second array
      for (int j = 0; j < arr2.length; j++) {
        // comparing values between first and second array
        if (arr1[i] == arr2[j]) {
          // if same value is found, set var to true
          found = true;
          // if the values are the same, go back and check for next value
          break;
        }
      }
      // if all the values aren't the same
      if (!found) {
        // return false, not all the values are the same
        return false;
      }
    }
    // all values match up
    return true;
  }

  public static boolean containsDuplicates(int[] arr) {
  // loop to check every value in the array
  for (int i = 0; i < arr.length - 1; i++) {
    // second loop checking all value in the array
    for (int j = i + 1; j < arr.length; j++) {
      // checking to see if there are duplicates in the same array
      if (arr[i] == arr[j]) {
        // this means that a duplicate is found
        return true;
      }
    }
  }
  // no duplicates are found in the array
  return false;
}

  public static boolean isLatin(int[][] square){
    // checks for duplicate numbers
    if (containsDuplicates(square[0])) {
      return false;
    }

    // checks for if all rows have all values
    for (int i = 1; i < square.length; i++) {
      if (!hasAllValues(square[0], square[i])) {
        return false;
      }
    }

    // checks for if all columns have all values
    for (int c = 0; c < square[0].length; c++) {
      if (!hasAllValues(square[0], getColumn(square, c))) {
        return false;
      }
    }

    // returns true if all tests are complete and don't return false
    return true;
  }

  // prints boolean
  public static void main(String[] args) {
    boolean result = isLatin(arr2D);
    System.out.println(result);
  }
}

ArrayTester.main(null);
```

    false


### Explanation for Answer

In this answer, I began with the same `getColumn()` method as before. I then added on the the two methods that were not required to be created for the Collegeboard FRQ but were required for operation of the program, `hassAllValues()` and `containsDuplicates()`. 

For the first method, `hasAllValues()`, I simply created a comparer that takes two arrays and compared the values within them using a for loop. This is similar to the loop in the `getColumn()` method but it just has different variables. The first loop goes through all values in the first array, one by one comparing them to all the other values in the second array with the if statement. A boolean is set to true or false depending on if matching values are found or not. This is done for every value in the first array.


```java
public static boolean hasAllValues(int[] arr1, int[] arr2) {
  // loop checking for values in array 1
  for (int i = 0; i < arr1.length; i++) {
    // setting boolean for if a same is found
    boolean found = false;
    // setting a second loop checking values in the second array
    for (int j = 0; j < arr2.length; j++) {
      // comparing values between first and second array
      if (arr1[i] == arr2[j]) {
        // if same value is found, set var to true
        found = true;
        // if the values are the same, go back and check for next value
        break;
      }
    }
    // if all the values aren't the same
    if (!found) {
      // return false, not all the values are the same
      return false;
    }
  }
  // all values match up
  return true;
}
```

For the second method, `containsDuplicate()`, I created two loops once again similar to the loops in `getColumn()`, this time checking to see if there are duplicate values in the other arrays. There is a situation where there could be a duplicate value found because it checks itself but to avoid that, we set the second loop value to always be the next value in the array, not the same, with `in j = i + 1`. In summary, we check to see if the value chosen is the same as all other values in the array, and if it isn't, then we return a boolean that states there are no duplicate values in the array.


```java
public static boolean containsDuplicates(int[] arr) {
  // loop to check every value in the array
  for (int i = 0; i < arr.length - 1; i++) {
    // second loop checking all value in the array
    for (int j = i + 1; j < arr.length; j++) {
      // checking to see if there are duplicates in the same array
      if (arr[i] == arr[j]) {
        // this means that a duplicate is found
        return true;
      }
    }
  }
  // no duplicates are found in the array
  return false;
}
```

The assigned method we are supposed to create is `isLatin()`. This checks if the 2D array is a Latin square. This means that all of the number in the square have to be the same, but there can't be repeating squares in the same rows or columns, like this:

```
[1,2,3]
[2,3,1]
[3,1,2]
```

In order to do this, we set the array to be `square`. This allows us to go through each array in the 2D array and check the necessary qualities. We need to check three points for the square to be Latin: are there duplicate numbers in the arrays, do all arrays contain all values, and do all columns contain all values. First, we check if there are duplicates with `containsDuplicates()`. If there are duplicates then the statement will return a false statement and the array is a Latin square. Next, we check if all arrays have all values. We first do this for each row, having a loop that goes through the entire 2D array, checking if each row has the same or different values. We then do it for each column, this time using the `getColumn()` method to check and see as well. If there are none of the same values in each row and each column of the 2D array, then we pass all three tests and return a `true` boolean.


```java
public static boolean isLatin(int[][] square){
    // checks for duplicate numbers
    if (containsDuplicates(square[0])) {
      return false;
    }

    // checks for if all rows have all values
    for (int i = 1; i < square.length; i++) {
      if (!hasAllValues(square[0], square[i])) {
        return false;
      }
    }

    // checks for if all columns have all values
    for (int c = 0; c < square[0].length; c++) {
      if (!hasAllValues(square[0], getColumn(square, c))) {
        return false;
      }
    }

    // returns true if all tests are complete and don't return false
    return true;
  }
```

To actually run the code, we need a `main()` method, which in this case prints the boolean result from the method `isLatin()`.


```java
public static void main(String[] args) {
    boolean result = isLatin(arr2D);
    System.out.println(result);
  }
```

For this specific array, we can test and see which condition isn't met with strings. Here is a working example below:


```java
public class ArrayTester {
  static int[][] arr2D = { { 0, 1, 2 },
                          { 3, 4, 5 },
                          { 6, 7, 8 },
                          { 9, 5, 3 } };

  public static int[] getColumn(int[][] arr2D, int c) {
    int[] result = new int[arr2D.length];

    for (int i = 0; i < arr2D.length; i++) {
      result[i] = arr2D[i][c];
    }
    return result;
  }

  public static boolean hasAllValues(int[] arr1, int[] arr2) {
    for (int i = 0; i < arr1.length; i++) {
      boolean found = false;
      for (int j = 0; j < arr2.length; j++) {
        if (arr1[i] == arr2[j]) {
          found = true;
          break;
        }
      }
      if (!found) {
        return false;
      }
    }
    return true;
  }

  public static boolean containsDuplicates(int[] arr) {
    for (int i = 0; i < arr.length; i++) {
      for (int j = i + 1; j < arr.length; j++) {
        if (arr[i] == arr[j]) {
          return true;
        }
      }
    }
    return false;
  }

  public static String isLatin(int[][] square){
    if (containsDuplicates(square[0])) {
      return "doesn't contain all values in each array";
    }

    for (int i = 1; i < square.length; i++) {
      if (!hasAllValues(square[0], square[i])) {
        return "has a duplicate value in the same row";
      }
    }

    for (int c = 0; c < square[0].length; c++) {
      if (!hasAllValues(square[0], getColumn(square, c))) {
        return "has a duplicate value in the same column";
      }
    }

    return "This is a Latin square";
  }

  public static void main(String[] args) {
    String result = isLatin(arr2D);
    System.out.println(result);
  }
}

ArrayTester.main(null);
```

    has a duplicate value in the same row


## Correct Latin Square

We can start by checking the Latin square: 

```
{ 0, 1, 2 }
{ 1, 2, 0 }
{ 2, 0, 1 }
```

This is a Latin square because all rows and columns have the same numbers, and not row or column has the same repeating number. Overall, this will tell us if the code is working properly or not.


```java
public class ArrayTester {
  static int[][] arr2D = { { 0, 1, 2 },
                          { 1, 2, 0 },
                          { 2, 0, 1 } };

  public static int[] getColumn(int[][] arr2D, int c) {
    int[] result = new int[arr2D.length];

    for (int i = 0; i < arr2D.length; i++) {
      result[i] = arr2D[i][c];
    }
    return result;
  }

  public static boolean containsDuplicates(int[] arr) {
    for (int i = 0; i < arr.length; i++) {
      for (int j = i + 1; j < arr.length; j++) {
        if (arr[i] == arr[j]) {
          return true;
        }
      }
    }
    return false;
  }

  public static boolean hasAllValues(int[] arr1, int[] arr2) {
    for (int i = 0; i < arr1.length; i++) {
      boolean found = false;
      for (int j = 0; j < arr2.length; j++) {
        if (arr1[i] == arr2[j]) {
          found = true;
          break;
        }
      }
      if (!found) {
        return false;
      }
    }
    return true;
  }

  public static String isLatin(int[][] square){
    if (containsDuplicates(square[0])) {
      return "doesn't contain all values in each array";
    }

    for (int i = 1; i < square.length; i++) {
      if (!hasAllValues(square[0], square[i])) {
        return "has a duplicate value in the same row";
      }
    }

    for (int c = 0; c < square[0].length; c++) {
      if (!hasAllValues(square[0], getColumn(square, c))) {
        return "has a duplicate value in the same column";
      }
    }

    return "This is a Latin square";
  }

  public static void main(String[] args) {
    String result = isLatin(arr2D);
    System.out.println(result);
  }
}

ArrayTester.main(null);
```

    This is a Latin square


### Failure Points

We can also test different fail cases where a square does not fulfill the parameters to be considered a Latin square.

#### Repeating Value in Row

The first instance is where there is a duplicate value in the same row. We can test this by setting a square up in the following way:

```
{ 0, 1, 2 }
{ 1, 2, 0 }
{ 2, 0, 1 }
{ 1, 1, 0 }
```

Testing it we get:


```java
public class ArrayTester {
  static int[][] arr2D = { { 0, 1, 2 },
                          { 1, 2, 0 },
                          { 2, 0, 1 },
                          { 1, 1, 0 } };

  public static int[] getColumn(int[][] arr2D, int c) {
    int[] result = new int[arr2D.length];

    for (int i = 0; i < arr2D.length; i++) {
      result[i] = arr2D[i][c];
    }
    return result;
  }

  public static boolean containsDuplicates(int[] arr) {
    for (int i = 0; i < arr.length; i++) {
      for (int j = i + 1; j < arr.length; j++) {
        if (arr[i] == arr[j]) {
          return true;
        }
      }
    }
    return false;
  }

  public static boolean hasAllValues(int[] arr1, int[] arr2) {
    for (int i = 0; i < arr1.length; i++) {
      boolean found = false;
      for (int j = 0; j < arr2.length; j++) {
        if (arr1[i] == arr2[j]) {
          found = true;
          break;
        }
      }
      if (!found) {
        return false;
      }
    }
    return true;
  }

  public static String isLatin(int[][] square){
    if (containsDuplicates(square[0])) {
      return "doesn't contain all values in each array";
    }

    for (int i = 1; i < square.length; i++) {
      if (!hasAllValues(square[0], square[i])) {
        return "has a duplicate value in the same row";
      }
    }

    for (int c = 0; c < square[0].length; c++) {
      if (!hasAllValues(square[0], getColumn(square, c))) {
        return "has a duplicate value in the same column";
      }
    }

    return "This is a Latin square";
  }

  public static void main(String[] args) {
    String result = isLatin(arr2D);
    System.out.println(result);
  }
}

ArrayTester.main(null);
```

    has a duplicate value in the same row


In this case the last row has duplicate numbers `1`, making this not a Latin square.

#### Repeating Value in Column

Another instance in which this code would return the array as not a Latin square is when the values of the column repeat. We can test this by setting the array up like so:

```
{ 1, 2, 0 }
{ 0, 1, 2 }
{ 1, 2, 0 }
```

Testing it we get:


```java
public class ArrayTester {
  static int[][] arr2D = { { 1, 2, 0 },
                          { 0, 1, 2 },
                          { 1, 2, 0 } };

  public static int[] getColumn(int[][] arr2D, int c) {
    int[] result = new int[arr2D.length];

    for (int i = 0; i < arr2D.length; i++) {
      result[i] = arr2D[i][c];
    }
    return result;
  }

  public static boolean containsDuplicates(int[] arr) {
    for (int i = 0; i < arr.length; i++) {
      for (int j = i + 1; j < arr.length; j++) {
        if (arr[i] == arr[j]) {
          return true;
        }
      }
    }
    return false;
  }

  public static boolean hasAllValues(int[] arr1, int[] arr2) {
    for (int i = 0; i < arr1.length; i++) {
      boolean found = false;
      for (int j = 0; j < arr2.length; j++) {
        if (arr1[i] == arr2[j]) {
          found = true;
          break;
        }
      }
      if (!found) {
        return false;
      }
    }
    return true;
  }

  public static String isLatin(int[][] square){
    if (containsDuplicates(square[0])) {
      return "doesn't contain all values in each array";
    }

    for (int i = 1; i < square.length; i++) {
      if (!hasAllValues(square[0], square[i])) {
        return "has a duplicate value in the same row";
      }
    }

    for (int c = 0; c < square[0].length; c++) {
      if (!hasAllValues(square[0], getColumn(square, c))) {
        return "has a duplicate value in the same column";
      }
    }

    return "This is a Latin square";
  }

  public static void main(String[] args) {
    String result = isLatin(arr2D);
    System.out.println(result);
  }
}

ArrayTester.main(null);
```

    has a duplicate value in the same column


In this case, the values in the first column have duplicates in the first and third row, this being `1`. This is also true for the rest of the values in the first and third rows.
