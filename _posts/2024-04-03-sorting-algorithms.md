---
title: Algorythmic Sorts
author: david
categories: ['Lab Notebook']
tags: ['Java']
type: tangibles
week: 29
description: The sorts documented from algorythmic
toc: True
comments: True
date: 2024-04-03 12:00:00 +0000
---

## Flower Class


```java
import java.util.ArrayList;
import java.util.List;

public abstract class Collectable implements Comparable<Collectable> {
    public final String masterType = "Collectable";
    private String type; // extender should define their data type

    // enumerated interface
    public interface KeyTypes {
        String name();
    }

    protected abstract KeyTypes getKey(); // this method helps force usage of KeyTypes

    // getter
    public String getMasterType() {
        return masterType;
    }

    // getter
    public String getType() {
        return type;
    }

    // setter
    public void setType(String type) {
        this.type = type;
    }

    // this method is used to establish key order
    public abstract String toString();

    // this method is used to compare toString of objects
    public int compareTo(Collectable obj) {
        return this.toString().compareTo(obj.toString());
    }

    public static void print(Collectable[] objs) {
        System.out.println(objs.getClass() + " " + objs.length);

        if (objs.length > 0) {
            Collectable obj = objs[0];
            System.out.println(obj.getMasterType() + ": " + obj.getType() + " listed by " + obj.getKey());
        }

        for (Object o : objs)
            System.out.println(o);

        System.out.println();
    }
}
```


```java
public class Flower extends Collectable {
    // class data
    public static KeyTypes key = KeyType.breed; // static initializer
    public static void setOrder(KeyTypes key) { Flower.key = key; }
    public enum KeyType implements KeyTypes { breed, petals, color }

    private final String breed;
    private final int petals;
    private final String color;

    // constructor
    Flower(String breed, int petals, String color) {
        this.setType("Flower");
        this.breed = breed;
        this.petals = petals;
        this.color = color;
    }

    // can only be accessed within class
    @Override
    protected KeyTypes getKey() {
        return Flower.key;
    }

    @Override
    public String toString() {
        StringBuilder jsonBuilder = new StringBuilder();
        jsonBuilder.append("{");

        if (KeyType.breed.equals(this.getKey())) {
            jsonBuilder.append("\"breed\": \"").append(this.breed).append("\", ");
        } else if (KeyType.petals.equals(this.getKey())) {
            jsonBuilder.append("\"petals\": ").append(this.petals).append(", ");
        } else if (KeyType.color.equals(this.getKey())) {
            jsonBuilder.append("\"color\": \"").append(this.color).append("\", ");
        }

        jsonBuilder.append("\"type\": \"").append(this.getType()).append("\", ")
                .append("\"masterType\": \"").append(this.masterType).append("\"");

        jsonBuilder.append("}");
        return jsonBuilder.toString();
    }

    public void bubbleSort(List<Collectable> list) {
        int n = list.size();
        // moving through all elements of the array
        for (int i = 0; i < n - 1; i++) {
            // the last element is in place so we start at the next one
            for (int j = 0; j < n - i - 1; j++) {
                // check and swap if the values are not sorted
                if (list.get(j).compareTo(list.get(j + 1)) > 0) {
                    Collectable temp = list.get(j);
                    list.set(j, list.get(j + 1));
                    list.set(j + 1, temp);
                }
            }
        }
    }

    public void selectionSort(List<Collectable> list) {
        int n = list.size();
        // shifting boundary of unsorted array
        for (int i = 0; i < n - 1; i++) {
            // find minimum of the subarray
            int minIndex = i;
            for (int j = i + 1; j < n; j++) {
                if (list.get(j).compareTo(list.get(minIndex)) < 0) {
                    minIndex = j;
                }
            }
            // swapping the minimum with the value at index i
            Collectable temp = list.get(minIndex);
            list.set(minIndex, list.get(i));
            list.set(i, temp);
        }
    }

    public void insertionSort(List<Collectable> list) {
        int n = list.size();
        // iterating through the array
        for (int i = 1; i < n; ++i) {
            // finding the key of the array
            Collectable key = list.get(i);
            // finding compare value
            int j = i - 1;
            // moving values that are before the key and greater than the key after the key
            while (j >= 0 && list.get(j).compareTo(key) > 0) {
                list.set(j + 1, list.get(j));
                j--;
            }
            list.set(j + 1, key);
        }
    }

    public void mergeSort(List<Collectable> list) {
        if (list.size() > 1) {
            int mid = list.size() / 2;
            List<Collectable> left = new ArrayList<>(list.subList(0, mid)); // split array in halves
            List<Collectable> right = new ArrayList<>(list.subList(mid, list.size()));
    
            mergeSort(left); // sort the left with recursion
            mergeSort(right); // sort the right with recursion
    
            merge(list, left, right); // merge the sorted halves
        }
    }
    
    private void merge(List<Collectable> list, List<Collectable> left, List<Collectable> right) {
        int i = 0, j = 0, k = 0;
        // merging the left and right arrays
        while (i < left.size() && j < right.size()) {
            if (left.get(i).compareTo(right.get(j)) <= 0) {
                list.set(k++, left.get(i++));
            } else {
                list.set(k++, right.get(j++));
            }
        }
        // moving any remaining elements in the left array
        while (i < left.size()) {
            list.set(k++, left.get(i++));
        }
        // moving any remaining elements in the right array
        while (j < right.size()) {
            list.set(k++, right.get(j++));
        }
    }

    public void quickSort(List<Collectable> list, int low, int high) {
        if (low < high) {
            // this is where the list is partitioned
            int pi = partition(list, low, high);
            // sorts the elements before and after the partition
            quickSort(list, low, pi - 1);
            quickSort(list, pi + 1, high);
        }
    }
    
    private int partition(List<Collectable> list, int low, int high) {
        Collectable pivot = list.get(high); // pivot defined
        int i = low - 1; // index of the smaller element
        for (int j = low; j < high; j++) {
            // if the element is smaller than the pivot, it is moved to the left
            if (list.get(j).compareTo(pivot) < 0) {
                i++;
                // swapping the elements
                Collectable temp = list.get(i);
                list.set(i, list.get(j));
                list.set(j, temp);
            }
        }
        // swapping the pivot with the element at i + 1
        Collectable temp = list.get(i + 1);
        list.set(i + 1, list.get(high));
        list.set(high, temp);
        return i + 1;
    }    
}
```


```java
import java.util.ArrayList;
import java.util.List;

public class CreateGarden {
    // test data
    public static List<Collectable> flowers() {
        List<Collectable> flowerList = new ArrayList<>();
        flowerList.add(new Flower("Lotus", 5, "White"));
        flowerList.add(new Flower("Camellia", 3, "Yellow"));
        flowerList.add(new Flower("Ghost Orchid", 7, "Grey"));
        flowerList.add(new Flower("Chocolate Cosmos", 2, "Brown"));
        flowerList.add(new Flower("Corpse Flower", 4, "Orange"));
        flowerList.add(new Flower("Jade Vine", 9, "Green"));
        flowerList.add(new Flower("Juliet Rose", 6, "Red"));
        flowerList.add(new Flower("Pasqueflower", 8, "Blue"));
        flowerList.add(new Flower("Campion", 1, "Pink"));
        flowerList.add(new Flower("Franklin Tree", 9, "Purple"));
        return flowerList;
    }
}

CreateGarden.flowers();
```




    [{"breed": "Lotus", "type": "Flower", "masterType": "Collectable"}, {"breed": "Camellia", "type": "Flower", "masterType": "Collectable"}, {"breed": "Ghost Orchid", "type": "Flower", "masterType": "Collectable"}, {"breed": "Chocolate Cosmos", "type": "Flower", "masterType": "Collectable"}, {"breed": "Corpse Flower", "type": "Flower", "masterType": "Collectable"}, {"breed": "Jade Vine", "type": "Flower", "masterType": "Collectable"}, {"breed": "Juliet Rose", "type": "Flower", "masterType": "Collectable"}, {"breed": "Pasqueflower", "type": "Flower", "masterType": "Collectable"}, {"breed": "Campion", "type": "Flower", "masterType": "Collectable"}, {"breed": "Franklin Tree", "type": "Flower", "masterType": "Collectable"}]



## Bubble Sort

Here is my implementation of bubble sort:


```java
List<Collectable> flowerList = CreateGarden.flowers();
Flower.setOrder(Flower.KeyType.breed);
System.out.println("Original: " + flowerList);

// breed
Flower flower = new Flower("", 0, "");
flower.bubbleSort(flowerList);
System.out.println("Sorted by Breed: " + flowerList);

// petals
Flower.setOrder(Flower.KeyType.petals);
flower.bubbleSort(flowerList);
System.out.println("Sorted by Petals: " + flowerList);

// color
Flower.setOrder(Flower.KeyType.color);
flower.bubbleSort(flowerList);
System.out.println("Sorted by Color: " + flowerList);
```

    Original: [{"breed": "Lotus", "type": "Flower", "masterType": "Collectable"}, {"breed": "Camellia", "type": "Flower", "masterType": "Collectable"}, {"breed": "Ghost Orchid", "type": "Flower", "masterType": "Collectable"}, {"breed": "Chocolate Cosmos", "type": "Flower", "masterType": "Collectable"}, {"breed": "Corpse Flower", "type": "Flower", "masterType": "Collectable"}, {"breed": "Jade Vine", "type": "Flower", "masterType": "Collectable"}, {"breed": "Juliet Rose", "type": "Flower", "masterType": "Collectable"}, {"breed": "Pasqueflower", "type": "Flower", "masterType": "Collectable"}, {"breed": "Campion", "type": "Flower", "masterType": "Collectable"}, {"breed": "Franklin Tree", "type": "Flower", "masterType": "Collectable"}]
    Sorted by Breed: [{"breed": "Camellia", "type": "Flower", "masterType": "Collectable"}, {"breed": "Campion", "type": "Flower", "masterType": "Collectable"}, {"breed": "Chocolate Cosmos", "type": "Flower", "masterType": "Collectable"}, {"breed": "Corpse Flower", "type": "Flower", "masterType": "Collectable"}, {"breed": "Franklin Tree", "type": "Flower", "masterType": "Collectable"}, {"breed": "Ghost Orchid", "type": "Flower", "masterType": "Collectable"}, {"breed": "Jade Vine", "type": "Flower", "masterType": "Collectable"}, {"breed": "Juliet Rose", "type": "Flower", "masterType": "Collectable"}, {"breed": "Lotus", "type": "Flower", "masterType": "Collectable"}, {"breed": "Pasqueflower", "type": "Flower", "masterType": "Collectable"}]
    Sorted by Petals: [{"petals": 1, "type": "Flower", "masterType": "Collectable"}, {"petals": 2, "type": "Flower", "masterType": "Collectable"}, {"petals": 3, "type": "Flower", "masterType": "Collectable"}, {"petals": 4, "type": "Flower", "masterType": "Collectable"}, {"petals": 5, "type": "Flower", "masterType": "Collectable"}, {"petals": 6, "type": "Flower", "masterType": "Collectable"}, {"petals": 7, "type": "Flower", "masterType": "Collectable"}, {"petals": 8, "type": "Flower", "masterType": "Collectable"}, {"petals": 9, "type": "Flower", "masterType": "Collectable"}, {"petals": 9, "type": "Flower", "masterType": "Collectable"}]
    Sorted by Color: [{"color": "Blue", "type": "Flower", "masterType": "Collectable"}, {"color": "Brown", "type": "Flower", "masterType": "Collectable"}, {"color": "Green", "type": "Flower", "masterType": "Collectable"}, {"color": "Grey", "type": "Flower", "masterType": "Collectable"}, {"color": "Orange", "type": "Flower", "masterType": "Collectable"}, {"color": "Pink", "type": "Flower", "masterType": "Collectable"}, {"color": "Purple", "type": "Flower", "masterType": "Collectable"}, {"color": "Red", "type": "Flower", "masterType": "Collectable"}, {"color": "White", "type": "Flower", "masterType": "Collectable"}, {"color": "Yellow", "type": "Flower", "masterType": "Collectable"}]


With this sort, we essentially iterate through the list and compare the breeds that are next to each other and this goes on until the list is sorted.

## Selection Sort

This is my implementation of selection sort:


```java
List<Collectable> flowerList = CreateGarden.flowers();
Flower.setOrder(Flower.KeyType.breed);
System.out.println("Original: " + flowerList);

// breed
Flower flower = new Flower("", 0, "");
flower.selectionSort(flowerList);
System.out.println("Sorted by Breed: " + flowerList);

// petals
Flower.setOrder(Flower.KeyType.petals);
flower.selectionSort(flowerList);
System.out.println("Sorted by Petals: " + flowerList);

// color
Flower.setOrder(Flower.KeyType.color);
flower.selectionSort(flowerList);
System.out.println("Sorted by Color: " + flowerList);
```

    Original: [{"breed": "Lotus", "type": "Flower", "masterType": "Collectable"}, {"breed": "Camellia", "type": "Flower", "masterType": "Collectable"}, {"breed": "Ghost Orchid", "type": "Flower", "masterType": "Collectable"}, {"breed": "Chocolate Cosmos", "type": "Flower", "masterType": "Collectable"}, {"breed": "Corpse Flower", "type": "Flower", "masterType": "Collectable"}, {"breed": "Jade Vine", "type": "Flower", "masterType": "Collectable"}, {"breed": "Juliet Rose", "type": "Flower", "masterType": "Collectable"}, {"breed": "Pasqueflower", "type": "Flower", "masterType": "Collectable"}, {"breed": "Campion", "type": "Flower", "masterType": "Collectable"}, {"breed": "Franklin Tree", "type": "Flower", "masterType": "Collectable"}]
    Sorted by Breed: [{"breed": "Camellia", "type": "Flower", "masterType": "Collectable"}, {"breed": "Campion", "type": "Flower", "masterType": "Collectable"}, {"breed": "Chocolate Cosmos", "type": "Flower", "masterType": "Collectable"}, {"breed": "Corpse Flower", "type": "Flower", "masterType": "Collectable"}, {"breed": "Franklin Tree", "type": "Flower", "masterType": "Collectable"}, {"breed": "Ghost Orchid", "type": "Flower", "masterType": "Collectable"}, {"breed": "Jade Vine", "type": "Flower", "masterType": "Collectable"}, {"breed": "Juliet Rose", "type": "Flower", "masterType": "Collectable"}, {"breed": "Lotus", "type": "Flower", "masterType": "Collectable"}, {"breed": "Pasqueflower", "type": "Flower", "masterType": "Collectable"}]
    Sorted by Petals: [{"petals": 1, "type": "Flower", "masterType": "Collectable"}, {"petals": 2, "type": "Flower", "masterType": "Collectable"}, {"petals": 3, "type": "Flower", "masterType": "Collectable"}, {"petals": 4, "type": "Flower", "masterType": "Collectable"}, {"petals": 5, "type": "Flower", "masterType": "Collectable"}, {"petals": 6, "type": "Flower", "masterType": "Collectable"}, {"petals": 7, "type": "Flower", "masterType": "Collectable"}, {"petals": 8, "type": "Flower", "masterType": "Collectable"}, {"petals": 9, "type": "Flower", "masterType": "Collectable"}, {"petals": 9, "type": "Flower", "masterType": "Collectable"}]
    Sorted by Color: [{"color": "Blue", "type": "Flower", "masterType": "Collectable"}, {"color": "Brown", "type": "Flower", "masterType": "Collectable"}, {"color": "Green", "type": "Flower", "masterType": "Collectable"}, {"color": "Grey", "type": "Flower", "masterType": "Collectable"}, {"color": "Orange", "type": "Flower", "masterType": "Collectable"}, {"color": "Pink", "type": "Flower", "masterType": "Collectable"}, {"color": "Purple", "type": "Flower", "masterType": "Collectable"}, {"color": "Red", "type": "Flower", "masterType": "Collectable"}, {"color": "White", "type": "Flower", "masterType": "Collectable"}, {"color": "Yellow", "type": "Flower", "masterType": "Collectable"}]


This sort breaks the sort into a subarray and then based on that finds the minimum of that subarray and moves it to the front of the subarray, shifting the boundary and going on and on until the boundary reaches the end of the array.

## Insertion Sort

This is insertion sort:


```java
List<Collectable> flowerList = CreateGarden.flowers();
Flower.setOrder(Flower.KeyType.breed);
System.out.println("Original: " + flowerList);

// breed
Flower flower = new Flower("", 0, "");
flower.insertionSort(flowerList);
System.out.println("Sorted by Breed: " + flowerList);

// petals
Flower.setOrder(Flower.KeyType.petals);
flower.insertionSort(flowerList);
System.out.println("Sorted by Petals: " + flowerList);

// color
Flower.setOrder(Flower.KeyType.color);
flower.insertionSort(flowerList);
System.out.println("Sorted by Color: " + flowerList);
```

    Original: [{"breed": "Lotus", "type": "Flower", "masterType": "Collectable"}, {"breed": "Camellia", "type": "Flower", "masterType": "Collectable"}, {"breed": "Ghost Orchid", "type": "Flower", "masterType": "Collectable"}, {"breed": "Chocolate Cosmos", "type": "Flower", "masterType": "Collectable"}, {"breed": "Corpse Flower", "type": "Flower", "masterType": "Collectable"}, {"breed": "Jade Vine", "type": "Flower", "masterType": "Collectable"}, {"breed": "Juliet Rose", "type": "Flower", "masterType": "Collectable"}, {"breed": "Pasqueflower", "type": "Flower", "masterType": "Collectable"}, {"breed": "Campion", "type": "Flower", "masterType": "Collectable"}, {"breed": "Franklin Tree", "type": "Flower", "masterType": "Collectable"}]
    Sorted by Breed: [{"breed": "Camellia", "type": "Flower", "masterType": "Collectable"}, {"breed": "Campion", "type": "Flower", "masterType": "Collectable"}, {"breed": "Chocolate Cosmos", "type": "Flower", "masterType": "Collectable"}, {"breed": "Corpse Flower", "type": "Flower", "masterType": "Collectable"}, {"breed": "Franklin Tree", "type": "Flower", "masterType": "Collectable"}, {"breed": "Ghost Orchid", "type": "Flower", "masterType": "Collectable"}, {"breed": "Jade Vine", "type": "Flower", "masterType": "Collectable"}, {"breed": "Juliet Rose", "type": "Flower", "masterType": "Collectable"}, {"breed": "Lotus", "type": "Flower", "masterType": "Collectable"}, {"breed": "Pasqueflower", "type": "Flower", "masterType": "Collectable"}]
    Sorted by Petals: [{"petals": 1, "type": "Flower", "masterType": "Collectable"}, {"petals": 2, "type": "Flower", "masterType": "Collectable"}, {"petals": 3, "type": "Flower", "masterType": "Collectable"}, {"petals": 4, "type": "Flower", "masterType": "Collectable"}, {"petals": 5, "type": "Flower", "masterType": "Collectable"}, {"petals": 6, "type": "Flower", "masterType": "Collectable"}, {"petals": 7, "type": "Flower", "masterType": "Collectable"}, {"petals": 8, "type": "Flower", "masterType": "Collectable"}, {"petals": 9, "type": "Flower", "masterType": "Collectable"}, {"petals": 9, "type": "Flower", "masterType": "Collectable"}]
    Sorted by Color: [{"color": "Blue", "type": "Flower", "masterType": "Collectable"}, {"color": "Brown", "type": "Flower", "masterType": "Collectable"}, {"color": "Green", "type": "Flower", "masterType": "Collectable"}, {"color": "Grey", "type": "Flower", "masterType": "Collectable"}, {"color": "Orange", "type": "Flower", "masterType": "Collectable"}, {"color": "Pink", "type": "Flower", "masterType": "Collectable"}, {"color": "Purple", "type": "Flower", "masterType": "Collectable"}, {"color": "Red", "type": "Flower", "masterType": "Collectable"}, {"color": "White", "type": "Flower", "masterType": "Collectable"}, {"color": "Yellow", "type": "Flower", "masterType": "Collectable"}]


How this one works is that the values that are before the key and greater than the key are moved to after the key and the rest of the values stay before the key and as the key moves through the array, the array sorts.

## Merge Sort

This is merge:


```java
List<Collectable> flowerList = CreateGarden.flowers();
Flower.setOrder(Flower.KeyType.breed);
System.out.println("Original: " + flowerList);

// breed
Flower flower = new Flower("", 0, "");
flower.mergeSort(flowerList);
System.out.println("Sorted by Breed: " + flowerList);

// petals
Flower.setOrder(Flower.KeyType.petals);
flower.mergeSort(flowerList);
System.out.println("Sorted by Petals: " + flowerList);

// color
Flower.setOrder(Flower.KeyType.color);
flower.mergeSort(flowerList);
System.out.println("Sorted by Color: " + flowerList);
```

    Original: [{"breed": "Lotus", "type": "Flower", "masterType": "Collectable"}, {"breed": "Camellia", "type": "Flower", "masterType": "Collectable"}, {"breed": "Ghost Orchid", "type": "Flower", "masterType": "Collectable"}, {"breed": "Chocolate Cosmos", "type": "Flower", "masterType": "Collectable"}, {"breed": "Corpse Flower", "type": "Flower", "masterType": "Collectable"}, {"breed": "Jade Vine", "type": "Flower", "masterType": "Collectable"}, {"breed": "Juliet Rose", "type": "Flower", "masterType": "Collectable"}, {"breed": "Pasqueflower", "type": "Flower", "masterType": "Collectable"}, {"breed": "Campion", "type": "Flower", "masterType": "Collectable"}, {"breed": "Franklin Tree", "type": "Flower", "masterType": "Collectable"}]
    Sorted by Breed: [{"breed": "Camellia", "type": "Flower", "masterType": "Collectable"}, {"breed": "Campion", "type": "Flower", "masterType": "Collectable"}, {"breed": "Chocolate Cosmos", "type": "Flower", "masterType": "Collectable"}, {"breed": "Corpse Flower", "type": "Flower", "masterType": "Collectable"}, {"breed": "Franklin Tree", "type": "Flower", "masterType": "Collectable"}, {"breed": "Ghost Orchid", "type": "Flower", "masterType": "Collectable"}, {"breed": "Jade Vine", "type": "Flower", "masterType": "Collectable"}, {"breed": "Juliet Rose", "type": "Flower", "masterType": "Collectable"}, {"breed": "Lotus", "type": "Flower", "masterType": "Collectable"}, {"breed": "Pasqueflower", "type": "Flower", "masterType": "Collectable"}]
    Sorted by Petals: [{"petals": 1, "type": "Flower", "masterType": "Collectable"}, {"petals": 2, "type": "Flower", "masterType": "Collectable"}, {"petals": 3, "type": "Flower", "masterType": "Collectable"}, {"petals": 4, "type": "Flower", "masterType": "Collectable"}, {"petals": 5, "type": "Flower", "masterType": "Collectable"}, {"petals": 6, "type": "Flower", "masterType": "Collectable"}, {"petals": 7, "type": "Flower", "masterType": "Collectable"}, {"petals": 8, "type": "Flower", "masterType": "Collectable"}, {"petals": 9, "type": "Flower", "masterType": "Collectable"}, {"petals": 9, "type": "Flower", "masterType": "Collectable"}]
    Sorted by Color: [{"color": "Blue", "type": "Flower", "masterType": "Collectable"}, {"color": "Brown", "type": "Flower", "masterType": "Collectable"}, {"color": "Green", "type": "Flower", "masterType": "Collectable"}, {"color": "Grey", "type": "Flower", "masterType": "Collectable"}, {"color": "Orange", "type": "Flower", "masterType": "Collectable"}, {"color": "Pink", "type": "Flower", "masterType": "Collectable"}, {"color": "Purple", "type": "Flower", "masterType": "Collectable"}, {"color": "Red", "type": "Flower", "masterType": "Collectable"}, {"color": "White", "type": "Flower", "masterType": "Collectable"}, {"color": "Yellow", "type": "Flower", "masterType": "Collectable"}]


This algorithm takes the array and splits it into halves an infinite number of times until there are only pairs. From there the values are broken down and compared to the other value around them to see if they are greater than or less than and then they are moved respectively. If the values are the same, they are not moved.

## Quick Sort

This is quick sort:


```java
List<Collectable> flowerList = CreateGarden.flowers();
Flower.setOrder(Flower.KeyType.breed);
System.out.println("Original: " + flowerList);

// breed
Flower flower = new Flower("", 0, "");
flower.quickSort(flowerList, 0, flowerList.size() - 1);
System.out.println("Sorted by Breed: " + flowerList);

// petals
Flower.setOrder(Flower.KeyType.petals);
flower.quickSort(flowerList, 0, flowerList.size() - 1);
System.out.println("Sorted by Petals: " + flowerList);

// color
Flower.setOrder(Flower.KeyType.color);
flower.quickSort(flowerList, 0, flowerList.size() - 1);
System.out.println("Sorted by Color: " + flowerList);

```

    Original: [{"breed": "Lotus", "type": "Flower", "masterType": "Collectable"}, {"breed": "Camellia", "type": "Flower", "masterType": "Collectable"}, {"breed": "Ghost Orchid", "type": "Flower", "masterType": "Collectable"}, {"breed": "Chocolate Cosmos", "type": "Flower", "masterType": "Collectable"}, {"breed": "Corpse Flower", "type": "Flower", "masterType": "Collectable"}, {"breed": "Jade Vine", "type": "Flower", "masterType": "Collectable"}, {"breed": "Juliet Rose", "type": "Flower", "masterType": "Collectable"}, {"breed": "Pasqueflower", "type": "Flower", "masterType": "Collectable"}, {"breed": "Campion", "type": "Flower", "masterType": "Collectable"}, {"breed": "Franklin Tree", "type": "Flower", "masterType": "Collectable"}]
    Sorted by Breed: [{"breed": "Camellia", "type": "Flower", "masterType": "Collectable"}, {"breed": "Campion", "type": "Flower", "masterType": "Collectable"}, {"breed": "Chocolate Cosmos", "type": "Flower", "masterType": "Collectable"}, {"breed": "Corpse Flower", "type": "Flower", "masterType": "Collectable"}, {"breed": "Franklin Tree", "type": "Flower", "masterType": "Collectable"}, {"breed": "Ghost Orchid", "type": "Flower", "masterType": "Collectable"}, {"breed": "Jade Vine", "type": "Flower", "masterType": "Collectable"}, {"breed": "Juliet Rose", "type": "Flower", "masterType": "Collectable"}, {"breed": "Lotus", "type": "Flower", "masterType": "Collectable"}, {"breed": "Pasqueflower", "type": "Flower", "masterType": "Collectable"}]
    Sorted by Petals: [{"petals": 1, "type": "Flower", "masterType": "Collectable"}, {"petals": 2, "type": "Flower", "masterType": "Collectable"}, {"petals": 3, "type": "Flower", "masterType": "Collectable"}, {"petals": 4, "type": "Flower", "masterType": "Collectable"}, {"petals": 5, "type": "Flower", "masterType": "Collectable"}, {"petals": 6, "type": "Flower", "masterType": "Collectable"}, {"petals": 7, "type": "Flower", "masterType": "Collectable"}, {"petals": 8, "type": "Flower", "masterType": "Collectable"}, {"petals": 9, "type": "Flower", "masterType": "Collectable"}, {"petals": 9, "type": "Flower", "masterType": "Collectable"}]
    Sorted by Color: [{"color": "Blue", "type": "Flower", "masterType": "Collectable"}, {"color": "Brown", "type": "Flower", "masterType": "Collectable"}, {"color": "Green", "type": "Flower", "masterType": "Collectable"}, {"color": "Grey", "type": "Flower", "masterType": "Collectable"}, {"color": "Orange", "type": "Flower", "masterType": "Collectable"}, {"color": "Pink", "type": "Flower", "masterType": "Collectable"}, {"color": "Purple", "type": "Flower", "masterType": "Collectable"}, {"color": "Red", "type": "Flower", "masterType": "Collectable"}, {"color": "White", "type": "Flower", "masterType": "Collectable"}, {"color": "Yellow", "type": "Flower", "masterType": "Collectable"}]


In this sort, there is a pivot which is used to sort so that the two values that are next to each other are compared and then sorted out and this occurs until the entire array is sorted.
