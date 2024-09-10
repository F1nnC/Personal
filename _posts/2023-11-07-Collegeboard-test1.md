---
title: Test 1 Reflection
author: david
categories: ['Lab Notebook']
tags: ['Collegeboard', 'Java']
type: tangibles
week: 12
description: Test 1 reflection.
toc: True
comments: True
date: 2023-11-07 13:00:00 +0000
---

![](/assets/img/post_images/test1.png)

## Q3 SomeClass object and instance variables

![](/assets/img/post_images/test1.3.png)

Here I messed up scoping of variables, it's supposed to be public to be able to be accessed. I didn't read the question well enough.

## Q15 isSorted 1D int array implementations

![](/assets/img/post_images/test1.15.png)

Choice II has a loop control variable k that starts at 0, increments by 1, and will terminate the loop when k has the value data.length. In each iteration, there is a check to see if the current value is larger than the subsequent value. If it is, false is returned because elements would not be nondecreasing. For example, if data[k] had the value 5 and data[k + 1] had the value 4, then data would contain an instance where the values were decreasing. Unfortunately, since the indices of an array start at 0 and go through data.length – 1, when k has the value data.length – 1 an ArrayIndexOutOfBoundsException will be thrown as the condition attempts to check data[data.length – 1] and data[data.length – 1 + 1] or data[data.length].

Choice I has a loop control variable k that starts at 1, increments by 1, and will terminate the loop when k has the value data.length. In each iteration, there is a check to see if the value before the current value is larger. If it is, false is returned because the elements would not be nondecreasing. For example, if data[k – 1] had the value 5 and data[k] had the value 4, then data would contain an instance where the values were decreasing. If all the elements are checked and no decreasing pairs of elements are found (the for loop ends without returning), the method will return true. Choice II has a loop control variable k that starts at 0, increments by 1, and will terminate the loop when k has the value data.length. In each iteration, there is a check to see if the current value is larger than the subsequent value. If it is, false is returned because elements would not be nondecreasing. For example, if data[k] had the value 5 and data[k + 1] had the value 4, then data would contain an instance where the values were decreasing. Unfortunately, since the indices of an array start at 0 and go through data.length – 1, when k has the value data.length – 1 an ArrayIndexOutOfBoundsException will be thrown as the condition attempts to check data[data.length – 1] and data[data.length – 1 + 1] or data[data.length]. Choice III has a loop control variable k that starts at 0, increments by 1, and will terminate the loop when k has the value data.length – 1. In each iteration, there is a check to see if the current value is larger than the subsequent value. If it is, false is returned because elements would not be nondecreasing, otherwise true is returned. As a result, only data[0] and data[1] are examined. The remaining elements in data are not checked because the method will stop once a return statement is reached. This means that the method could return true even when there are consecutive elements in data that are nondecreasing.

## Q17 Shift elements in 1D int array

![](/assets/img/post_images/test1.17.png)

The for loop control variable k starts with the value 3, is incremented by 1 and terminates the loop when its value is arr.length – 1. In the first iteration, when k is 3, arr[3] is assigned the value arr[4]. The contents of the arr have been updated to {1, 2, 3, 5, 5, 6, 7}. In the second iteration, when k is 4, arr[4] is assigned the value arr[5]. The contents of arr have been updated to {1, 2, 3, 5, 6, 6, 7}. In the third iteration, when k is 5, arr[5] is assigned the value arr[6]. The contents of arr have been updated to {1, 2, 3, 5, 6, 7, 7}. Then k is incremented to 6 and the loop terminates. I simply started at the wrong number.

## Q20 arrayMethod with int array parameter

![](/assets/img/post_images/test1.20.png)

Since k is decremented, the last element is only used in the first iteration of the while loop. This method uses a swapping algorithm to swap elements in nums.

The variable j starts with the value 0, which is the index of the left most element in nums. The variable k starts with the value nums.length – 1, which is the index of the right most element in nums. As long as j is less than k, x is assigned the value of nums[j], this ensures that the value of nums[j] is not lost when nums[j] is assigned the value of nums[k]. Then nums[k] is assigned the value of x. This algorithm swaps the values of nums[j] and nums[k]. Then j is incremented and k is decremented, ensuring that the contents of the array nums are reversed at the conclusion of the arrayMethod method.

## Q21 findClosest method

![](/assets/img/post_images/test1.21.png)

To find the value that is closet to val, the algorithm needs to calculate the positive difference between num and val.

The algorithm uses nested enhanced for loops to iterate across all the elements in mat. The variable num is assigned the value of each element. If the positive difference between num and val is less than minDiff, num is the element of mat that is closest to val so far.

## Q23 manipulate method and animals List

![](/assets/img/post_images/test1.23.png)

List is an interface, which an ArrayList implements. Please note that List is no longer tested as part of the AP CSA exam and ArrayList will be used instead. This would be the correct answer if the remove occurred before the size was calculated in the statement animals.add(animals.size()-k, animals.remove(k)); and only one iteration of the loop occurred.

List is an interface, which an ArrayList implements. Please note that List is no longer tested as part of the AP CSA exam and ArrayList will be used instead. The manipulate method contains a for loop with a loop control variable k that starts at the right most index of animals, decrements by 1 each time, until k is equal to 0. In the first iteration, when k is 5, if the element of animals at 5 (“baboon”) starts with a “b”, which it does, then this value is removed from the list and inserted at index 1. The list would then be {“bear”, “baboon”, “zebra”, “bass”, “cat”, “koala”}. In the second iteration, when k is 4, the element of animals at 4 (“cat”) does not start with a “b” and no changes are made to the list. In the third iteration, when k is 3, the element of animals at 3 (“bass”) starts with a “b”. This value is removed from the list and inserted at index 3. Since it was already at index 3, the list would not change. In the fourth iteration, when k is 2, the element of animals at 2 (“zebra”) does not start with a “b” and no changes are made to the list.  In the fifth iteration, when k is 1, the element of animals at 1 (“baboon”) starts with a “b”. It is removed from the list and inserted at index 5. The list would then be {“bear”, “zebra”, “bass”, “cat”, “koala”, “baboon”}.  Finally, k decrements to 0 which is not greater than 0 so the loop terminates.

## Q24 Translate 1D array into 2D array enhanced for

![](/assets/img/post_images/test1.24.png)

This would be the correct answer if the algorithm filled newArray in row major order instead of column major order. Since the algorithm fills newArray in column major, the value 3 is at newArray[2][0]. The first index represents the row and the second represents the column.

The enhanced for loop iterates over the array oldArray. In the first iteration, newArray[0][0] is assigned the value 1. The value of row is incremented to 1. Since 1 % 3 does not equal 0, the statements in the if are not executed. In the next iteration, newArray[1][0] is assigned the value 2. The value of row is incremented to 2. The algorithm continues to fill column 0 with the subsequent values of oldArray. Once row is 3, the if condition is true and row is assigned 0 and col is incremented to 1. The algorithm proceeds to fill column 1. When the for loop terminates, newArray contains the following values { {1, 4, 7}, {2, 5, 8}, {3, 6, 9} }. The value of newArray[0][2] is 7.

## Q26 Print odd integers in 1D array but not even

![](/assets/img/post_images/test1.26.png)

This algorithm use a for loop with a loop control variable k that has an initial value of 1, and increments by 1 until k is arr.length. While this algorithm accesses the elements of arr correctly to check whether the values are odd, the indices for arrays start at 0, meaning if arr[0] is odd, it will be skipped and not printed.

This algorithm uses an enhanced for loop to assign each element in arr to x. Using the modulus (%) operator to determine the remainder when dividing by 2, each value is checked to see if it is not even. If x is even, then x % 2 will be 0, since there is no remainder when you divide an even number by 2. If x is odd, then x % 2 will not equal 0, it will equal 1.

## Q31 mystery with 1D int array and alias

![](/assets/img/post_images/test1.31.png)

This would be the result if the assignment statement was data[k] = data[k] + data[k + 1];.

Passing a reference parameter results in the formal parameter and the actual parameter being aliases. They both refer to the same object. Any updates made to the referenced array when mystery is called are being made on the single array that is reference by both data and values. The for loop has a loop control variable k that starts at 0, increments by 1 for each iteration, and the loop terminates once k is data.length – 1. In each iteration of the loop, the element at index k + 1 is assigned the sum of the values at index k and k + 1. In the first iteration, data[1] is assigned 5 + 2 (data[[0] + data[1]) or 7. Changing the array referenced by both data and values to be {5, 7, 1, 3, 8}. In the second iteration, data[2] is assigned 8, changing the array to {5, 7, 8, 3, 8}. In the third iteration, data[3] is assigned 11, changing the array to {5, 7, 8, 11, 8}. In the fourth and final iteration, data[4] is assigned 19, changing the array to {5, 7, 8, 11, 19}. Since call by value is used when calling mystery and passing an array, the reference to the array values is passed, meaning data will be assigned this same reference. This establishes an aliasing relationship where both values and data are referencing the same array and no copy of the array is made. Any updates made when mystery is called are being made on the single array that is reference by both data and values.

## Q33 Print sum after while loop

![](/assets/img/post_images/test1.33.png)

This would be correct if the boolean condition was changed from an or (||) to an and (&&). Since k is never incremented, the or (||) will always be true since k will always be less than 4 and an infinite loop will occur.

Since k is never changed in the body of the while loop, it will always be 1 and less than 4. In a boolean expression with or (||) if one of the two expressions is true, the expression is true. This will cause an infinite loop.

## Q34 Point and Circle Classes

![](/assets/img/post_images/test1.34.png)

Choice III uses the default Point constructor to assign center a new Point with x and y both equal to 0. It attempts to update x and y, however since they are private instance variables in Point, they are not able to be accessed directly in Circle. This code will cause a compile time error.

Choice I uses the no parameter Point constructor to assign center a new Point with x and y both equal to 0, instead of x assigned the value a and y assigned the value b. Choice II correctly uses the two parameter Point constructor to create a new Point with x assigned the value a and y assigned the value b. Choice III uses the no parameter Point constructor to assign center a new Point with x and y both equal to 0. It attempts to update x and y, however since they are private instance variables in Point, they are not able to be accessed directly in Circle. This code will cause a compile time error.

## Q36 test method with multi-way selection

![](/assets/img/post_images/test1.36.png)

When x is 8, y will be assigned the value 3, since 8 is even. When x is 9, y will be assigned the value 1, since 9 is odd and not greater than 9. When x is 12, y will be assigned the value 3, since 12 is even. This set of values does not test the conditions when x is odd and greater than 9 and y is assigned the value 5.

The first conditional tests to see if x is even, if it is, y will be assigned the value 3. The value 8 is an even number and will test this condition. If x is not even, then the second test will check if x is greater than 9. If x is an odd number greater than 9, then y will be assigned the value 5. The value 11 is an odd number greater than 9. If x is an odd number but not greater than 9, then y is assigned the value 1. The value 9 is an odd number that is not greater than 9.

## Q39 recur method with int parameter

![](/assets/img/post_images/test1.39.png)

The value of recur(9) is 18. However, this call was made within another recursive call and is not the final return value.

The call recur(27) returns the value of recur(recur(9)) since 27 is greater than 10. The call recur(9) returns 18, since 9 is less than or equal to 10. Therefore, recur(recur(9)) is recur(18). The call recur(18) returns recur(recur(6)) since 18 is greater than 10. The call recur(6) returns 12, since 6 is less than or equal to 10. Therefore, recur(recur(6)) is recur(12). The call recur(12) returns recur(recur(4)) since 12 is greater than 10. The call recur(4) returns 8, since 4 is less than or equal to 10. Therefore, recur(recur(4)) is recur(8). The call recur(8) returns 16, since 8 is less than or equal to 10.  Therefore, recur(27)returns the value of 16.

## Q40 whatsItDo with String parameter and substrings

![](/assets/img/post_images/test1.40.png)

This would be the output if the System.out.println(temp); line was before the recursive call to whatsItDo(temp); When the recursive call whatsItDo(temp); is executed, the current sequence of statements are paused.

The call whatsItDo(“WATCH”) assigns to temp a substring of “WATCH” starting at 0 and ending at 4 – 1 or 3, which is “WATC”. Next the call whatsItDo(“WATC”) is made. The call whatsItDo(“WATC”), sets its local temp to “WAT” and calls whatsItDo(“WAT”). The call whatsItDo(“WAT”), sets its local temp to “WA” and calls whatsItDo(“WA”). The call whatsItDo(“WA”), sets its local temp to “W” and calls whatsItDo(“W”). The call whatsItDo(“W”) reaches the base case and doesn’t do anything since the length of “W” is 1. Then we need to finish the call to whatsItDo(“WA”), which prints the value of its local temp, “W”.  Then we need to finish the call to whatsItDo(“WAT”), which prints the value of its local temp, “WA”. Then we need to finish the call to whatsItDo(“WATC”), which prints the value of its local temp, “WAT”. Then we need to finish the call to whatsItDo(“WATCH”), which prints the value of its local temp, “WATC”. And the recursive calls are complete.
