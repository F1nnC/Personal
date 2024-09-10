---
title: The difference between Value and Reference Types
author: david
categories: ['Lab Notebook']
tags: ['Java', 'Collegeboard']
type: tangibles
week: 28
description: The difference in the application and use of Value and Reference types in Java.
toc: True
comments: True
date: 2024-03-12 12:00:00 +0000
---

# Introduction
- In Java, there are two main types of data types primitive/value types and reference types.  
- We will be using the terms stack and heap here to describe memory allocation. 
    - The stack: Temporary memory were were values are stored and methods called,after a method has finished executing the memory is cleared.
    - The heap: The heap memory is the memory created by th JVM when it is started and is used while the application is still running, it is used to allocate memory to objects and JRE classes.
    - [Learn More](https://stackify.com/java-heap-vs-stack/#:~:text=Java%20Heap%20Space%20is%20used,be%20accessed%20throughout%20the%20application)
- This is not typically present explicitly in any CollegeBoard questions however is a recurring theme that will need to be understood to be able to understand and solve problems on the exam.

# Reference Types

## General Information
- Reference types are a subclass of the java.lang.Object class.
- Reference types can be defined by the user
- When two references are assigned to each other the will both point to the same object in memory.
- When objects are passed into an object the method changes the content of the object but not the location of the object in memory.
- A reference type is a reference to the actual data, that is they allow for us to be able to access objects stored elsewhere in memory. What typically occurs when we create a reference type the object is stored onto the stack and the value that corresponds to the object is stored in the heap. For instance if we create a Cat class: 


```java
public class Cat {
    String name;
    int age;
    String color;
    String occupation;

    public Cat(String name, int age, String color, String occupation) {
        this.name = name;
        this.age = age;
        this.color = color;
        this.occupation = occupation;
    }
}


public static void main(String[] args) {
    Cat MrTibbens = new Cat("Mr.Tibbens", 3, "Black", new Occupation("World Domination"));
    Cat Khajiit = new Cat("Khajiit", 5, "White", new Occupation("Thief"));
}
```

- When we create the instances `MrTibbens` and `Khajiit` of the Cat class they are stored on the stack and the values that they represent however are stored in the heap which the reference is pointing to. So this would be their respective names, age, color, occupation, etc. The object in the stack is "referring" to the value stored in the stack. 

## Main Pre-declared Reference Types

| Reference Type | Description |
|----------|----------|
| Annotation    | Provides a way to associate metadata (data about data) with program elements.     |
| Array    | Provides a fixed-size data structure that stores data elements of the same type.    |
| Class    | Designed to provide inheritance, polymorphism, and encapsulation. Usually models something in the real world and consists of a set of values that holds data and a set of methods that operates on the data. |
| Enumeration    | A reference for a set of objects that represents a related set of choices.    |
| Interface    | Provides a public API and is “implemented” by Java classes.    |
| String | Storing characters |


*Source OREILLY

### Example:


```java
public class refTest{
    public static class House{
        private int price;
        public House(int price){
            this.price = price;
        }
        public void setPrice(int newPrice){
            this.price = newPrice;
        }
        public int getPrice(){
            return this.price;
        }
    }

    public static void main(String[] args){
        House house1 = new House(0);
        house1.setPrice(500000); // setting house price to $500,000, accessing same spot in memory to change
        System.out.println("House Price: " + "$" + house1.getPrice()); // printing the house price that was set
        House house2 = new House(0);
        house2 = house1; // telling house 2 to reference the same spot in memory as house 1. price should be the same :)
        System.out.println("House Price of House 2: " + "$" + house1.getPrice()); // printing the house price that was set
    }
}
refTest.main(null);
```

    House Price: $500000
    House Price of House 2: $500000


## Value Types

# Value Types (Primitive Types)
## General Information
- Primitive types in Java consist of boolean and numeric types: char, byte, short, int, long, float, and double.
- Unlike reference types, the number of primitive types is limited and predefined in the language.
- Memory location for primitive types directly stores the actual data held by the variable, not a reference to it.
- Memory location for primitive types not stored with a class are stored temporarily on the stack. 

# Differences

1. Number and Definition:
- Reference Types: Unlimited number, defined by the user.
- Primitive Types: Limited and predefined in the language.

2. Memory Location:
- Reference Types: Stores a reference to the data in memory.
- Primitive Types: Stores the actual data held by the variable.

3. Assignment (Note the Difference!):
- Reference Types: When assigned to another reference type, both references point to the same object in memory.
- Primitive Types: When assigned to another variable of the same type, a copy of the data is made.

4. Method Parameter Passing:
- Reference Types: When an object is passed into a method, the method can change the contents of the object, but not the address/reference of the object.
- Primitive Types: When a primitive is passed into a method, only a copy of the primitive is passed. The called method does not have access to the original primitive value and can only change the copied value.

| Reference Types | Primitive Types |
|----------|----------|
| Unlimited number of reference types, as they are defined by the user. | Consists of boolean and numeric types: char, byte, short, int, long, float, and double. |
| Memory location stores a reference to the data. | Memory location stores actual data held by the primitive type. |
| When a reference type is assigned to another reference type, both will point to the same object. | When a value of a primitive is assigned to another variable of the same type, a copy is made.    |
| When an object is passed into a method, the called method can change the contents of the object passed to it but not the address of the object. | When a primitive is passed into a method, only a copy of the primitive is passed. The called method does not have access to the original primitive value and therefore cannot change it. The called method can change the copied value.|

*Source OREILLY




```java
public class PrimitiveTypesExample {
    public static void main(String[] args) {
        // Declaration and initialization of primitive variables
        boolean isJavaFun = true;
        char grade = 'A';
        byte byteValue = 127; // byte range: -128 to 127
        short shortValue = 32000; // short range: -32,768 to 32,767
        int intValue = 42;
        long longValue = 123456789L; // The 'L' indicates a long literal
        float floatValue = 3.14f; // The 'f' indicates a float literal
        double doubleValue = 2.71828;

        // Displaying values
        System.out.println("Is Java fun? " + isJavaFun);
        System.out.println("Grade: " + grade);
        System.out.println("Byte Value: " + byteValue);
        System.out.println("Short Value: " + shortValue);
        System.out.println("Int Value: " + intValue);
        System.out.println("Long Value: " + longValue);
        System.out.println("Float Value: " + floatValue);
        System.out.println("Double Value: " + doubleValue);
    }
}

PrimitiveIterator.main(null);
```

## Hacks
### Part 1


```java
public class Person {
    String name;
    int age;
    int height;
    String job;

    public Person(String name, int age, int height, String job) {
        this.name = name;
        this.age = age;
        this.height = height;
        this.job = job;
    }
}

public static void main(String[] args) {
    Person person1 = new Person("Carl", 25, 165, "Construction Worker");
    Person person2 = new Person("Adam", 29, 160, "Truck Driver");
    Person person3 = person1;
    int number = 16;
    System.out.println(number);
}
main(null);
```

    16
    


Answer the following questions based on the code above:
* a) What kind of types are person1 and person2? 
* Answer: 
* b) Do person1 and person3 point to the same value in memory?
* Answer:
* c) Is the integer "number" stored in the heap or in the stack?
* Answer:
* d) Is the value that "person1" points to stored in the heap or in the stack?
* Answer: 

### Part 2
Question 1: Primitive Types vs Reference Types (Unit 1)

Situation: You are developing a banking application where you need to represent customer information. You have decided to use both primitive types and reference types for this purpose.

(a) Define primitive types and reference types in Java. Provide examples of each.

(b) Explain the differences between primitive types and reference types in terms of memory allocation and usage in Java programs.

(c) Code:

You have a method `calculateInterest` that takes a primitive `double` type representing the principal amount and a reference type `Customer` representing the customer information. Write the method signature and the method implementation. Include comments to explain your code.

