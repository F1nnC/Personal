---
title: HashMaps, HashSets, Collections, SQL Student Lessons
author: david
categories: ['Lab Notebook']
tags: ['Java', 'Backend']
type: hacks
week: 16
description: by Tirth T, Haseeb B, Sreeja G, Ekam K, Drew R, Adan R
toc: True
comments: True
date: 2023-12-14 12:00:00 +0000
---

## Collections

### What are collections?
Collections are any group of individual objects that are represented as a single unit is known as a Java Collection of Objects. In Java, a separate framework named the “Collection Framework” has been defined in JDK 1.2 which holds all the Java Collection Classes and Interface in it. It works as an interface that defines the highest-level of shared collection behavior, and extends Iterable which allows usage of ForEach loop.

### Types of Collections

- **List:**  
    - Ordered collection
    - Allows duplicate elements
    - Example: **ArrayList** and **LinkedList**

- **Set:**  
    - Unordered collection 
    - No duplicates
    - Example: **HashSet** and **TreeSet**

- **Map:**  
    - Key-pair values
    - Each key must be unique
    - Example: **HashMap** and **TreeMap**

- **Queue:**  
    - Follows First-In-First-Out order
    - Example: **LinkedList** and **PriorityQueue**

- **Deque:**  
    - Double ended queue
    - Insertion and removal at both ends
    - Example: **ArrayDeque**

### Popcorn Hack!
Come up with a real world example in which collections are used! Write your answer below:

A library, the hashmap, contains genres and book titles and authors, lists and strings.

## HashMaps 

#### What are they? 

Hash Maps are a **data structure** with keys and values; very similar to a Python dictionary. The keys in Hash Maps have a single value assigned to them, which can be accessed by calling the key: 


```java
import java.util.HashMap;  //Hashmaps are part of the java.util package

public class PlanetDistances {
    public static void main(String[] args) {

        HashMap<String, Double> hashMap = new HashMap<>();

        // key-value pairs, where the key is the planet (a string) and the value is the double assigned to each key
        hashMap.put("Mercury", 0.39);
        hashMap.put("Venus", 0.72); //adding an element
        hashMap.put("Earth", 1.00);
        hashMap.remove("Earth", 1.00); //removing an element

        // the value 0.39 can be accessed by calling the key "Mercury"
        double value = hashMap.get("Mercury");
        boolean exists = hashMap.containsKey("Mercury"); //you can also check if a key exists
        System.out.println("Mercury is " + value + " astronomical units away from the Sun");
    }
}

PlanetDistances.main(null);
```

    Mercury is 0.39 astronomical units away from the Sun


As shown above, the data type of the keys and values must be defined when creating the Hashmap. You cannot use data types for keys or values that are different from the ones assigned to it. Also, keys must be non-null objects. However, values can be null!

<br>

Keys in a Hashmap must be unique. Otherwise the previous values of the key get overwritten.


```java
import java.util.HashMap;  

public class ShoePrices {
    public static void main(String[] args) {

        HashMap<String, Double> hashMap = new HashMap<>();

        hashMap.put("Nike", 41.97);
        hashMap.put("Nike", 80.97); //this value replaces the previous value 
        hashMap.put("Adidas", 69.99);
        hashMap.put("Vans", 55.00);

        double value = hashMap.get("Nike");
        System.out.println("A Nike shoe would cost " + value);
    }
}

ShoePrices.main(null);
```

    A Nike shoe would cost 80.97


#### Popcorn hack: what can we do if we want to assign multiple values to a single key? Do it below!: 




```java
import java.util.HashMap;
import java.util.List;
import java.util.ArrayList;

public class ShoePrices {
    public static void main(String[] args) {

        HashMap<String, List<Double>> hashMap = new HashMap<>();

        hashMap.put("Nike", new ArrayList<>());
        hashMap.get("Nike").add(41.97);
        hashMap.get("Nike").add(80.97);

        hashMap.put("Adidas", new ArrayList<>());
        hashMap.get("Adidas").add(69.99);

        hashMap.put("Vans", new ArrayList<>());
        hashMap.get("Vans").add(55.00);

        List<Double> nikePrices = hashMap.get("Nike");
        System.out.println("Nike shoe prices: " + nikePrices);

        if (nikePrices != null && !nikePrices.isEmpty()) {
            double value = nikePrices.get(0);
            System.out.println("A Nike shoe would cost " + value);
        } else {
            System.out.println("No price found for Nike shoes.");
        }
    }
}

ShoePrices.main(null);
```

    Nike shoe prices: [41.97, 80.97]
    A Nike shoe would cost 41.97


Note that collisions can still occur when two keys produce the same hash code. Hash codes are assigned to each key through a hash function (this is called hashing). They are used to determine what the key-value pair's index should be iwthin the Hashmaps. A bad hash function may cause collisions to occur, in which case the function would need to be adjusted. 

HashMaps do not store the input order of the key-value pairs, and there is no guarantee the pairs will always be stored in the same order. Therefore if something needs to be found within a HashMap, iteration must be used. This can be done through `keySet()`, `values()`, or `entrySet()`


<br>

**keySet()** -- provides access to the set of keys. Useful for if you only need to access keys w/out values 


```java
import java.util.HashMap;
import java.util.Set;

public class OscarWinners {
    public static void main(String[] args) {

        HashMap<String, Integer> oscarWinnersYear = new HashMap<>();

        oscarWinnersYear.put("Nomadland", 2020);
        oscarWinnersYear.put("Parasite", 2019);
        oscarWinnersYear.put("Green Book", 2018);
        oscarWinnersYear.put("The Shape of Water", 2017);

        Set<String> oscarWinners = oscarWinnersYear.keySet(); //using keySet to get keys 

        System.out.println("List of Oscar winners " + oscarWinners);
    }
}

OscarWinners.main(null);
```

    List of Oscar winners [Nomadland, Parasite, Green Book, The Shape of Water]


**values()** -- returns set of values, without any keys 


```java
import java.util.HashMap;
import java.util.Set;

public class OscarWinners {
    public static void main(String[] args) {

        HashMap<String, Integer> oscarWinnersYear = new HashMap<>();

        oscarWinnersYear.put("Nomadland", 2020);
        oscarWinnersYear.put("Parasite", 2019);
        oscarWinnersYear.put("Green Book", 2018);
        oscarWinnersYear.put("The Shape of Water", 2017);

        Collection<Integer> oscarWinnerYears = oscarWinnersYear.values(); //using values to get values 

        System.out.println("Years movies won Oscars " + oscarWinnerYears);
    }
}

OscarWinners.main(null);
```

    Years movies won Oscars [2020, 2019, 2018, 2017]


**entryset()** -- returns keys and values in the form of objects. Useful for when working with key-value pair relationships


```java
import java.util.HashMap;
import java.util.Set;

public class OscarWinners {
    public static void main(String[] args) {

        HashMap<String, Integer> oscarWinnersYear = new HashMap<>();

        oscarWinnersYear.put("Nomadland", 2020);
        oscarWinnersYear.put("Parasite", 2019);
        oscarWinnersYear.put("Green Book", 2018);
        oscarWinnersYear.put("The Shape of Water", 2017);

        Set<Map.Entry<String, Integer>> oscarWinnersAndYears = oscarWinnersYear.entrySet(); //using values to get values 

        System.out.println("Oscars and their years " + oscarWinnersAndYears);
    }
}

OscarWinners.main(null);
```

    Oscars and their years [Nomadland=2020, Parasite=2019, Green Book=2018, The Shape of Water=2017]


HashMaps have a time complexity of O(1) on average!

## HashSet

### What is a hashset?
- A hashset is a data structure that stores only unique values and does not allow duplicates. You can also think of it as a set of keys with no values.  


```java
import java.util.HashSet;
import java.util.Set;

public class Colors{
    static Set<String> colors = new HashSet<>();

    public static void main(String[] args) {
        colors.add("Red");
        colors.add("Blue");
        colors.add("Green");
        System.out.println(colors);
    }
}

Colors.main(null);
```

    [Red, Blue, Green]


### What if we add duplicates?
- If we try add duplicates, the hashset will simply not add the duplicate value and return false as seen bellow. 


```java
public class ColorsButDifferent{
    static Set<String> colors = new HashSet<>();

    public static void main(String[] args) {
        System.out.println(colors.add("Blue"));
        System.out.println(colors.add("Green"));
        System.out.println(colors.add("Green"));
        System.out.println(colors);
    }
}

ColorsButDifferent.main(null);
```

    true
    true
    false
    [Blue, Green]


### Order?
- Hashsets are not ordered and do not store the order in which the values were added that means that if values are removed their order will not be preserved. 


```java
public class Fruits{
    static Set<String> fruits = new HashSet<>();

    public static void main(String[] args) {
        fruits.add("Apple");
        fruits.add("Banana");
        fruits.add("Orange");
        System.out.println(fruits);

        fruits.remove("Banana");

        System.out.println(fruits);
    }
}

Fruits.main(null);
```

    [Apple, Orange, Banana]
    [Apple, Orange]


### How do you know if a value is in a hashset?
- You can use the contains method to check if a value is in a hashset.


```java
public class Fruits{
    static Set<String> fruits = new HashSet<>();

    public static void main(String[] args) {
        fruits.add("Apple");
        fruits.add("Banana");
        fruits.add("Orange");

        System.out.println(fruits.contains("Apple"));
    }
}

Fruits.main(null);
```

    true


### Other methods
- clear() - removes all values from the hashset
- isEmpty() - returns true if the hashset is empty
- size() - returns the number of values in the hashset
- toArray() - returns an array of the values in the hashset



```java
public class Fruits{
    static Set<String> fruits = new HashSet<>();

    public static void main(String[] args) {
        fruits.add("Apple");
        fruits.add("Banana");
        fruits.add("Orange");
        System.out.println(fruits);

        System.out.println();
        System.out.println("Length of Hashmap: " + fruits.size());
        
        System.out.println();
        System.out.println("Array Version of Hashmap: " + fruits.toArray());

        System.out.println();
        fruits.clear();
        System.out.println("Hashmap After Clearing " + fruits);

    }
}

Fruits.main(null);
```

    [Apple, Orange, Banana]
    
    Length of Hashmap: 3
    
    Array Version of Hashmap: [Ljava.lang.Object;@665e264a
    
    Hashmap After Clearing []


### Iterations
- You can iterate through a hashset using a for each loop or an iterator. The order of the values is not guaranteed and can change as values are removed or added.
- These two methods are can be called using the `iterator()` and `forEach()` methods. For the `forEach()` method you can pass in a lambda expression (a lambda expression is an anonymous function) or a method reference.


```java
// foreach loop to iterate through a set

public class Fruits{
    static Set<String> fruits = new HashSet<>();

    public static void main(String[] args) {
        fruits.add("Apple");
        fruits.add("Banana");
        fruits.add("Orange");
        System.out.println(fruits);

        // Using foreach loop to iterate through the set and print each fruit as it goes
        fruits.forEach(fruit -> System.out.println(fruit));
    }
}

Fruits.main(null);

```

    [Apple, Orange, Banana]
    Apple
    Orange
    Banana



```java
// Different version of foreach loop to iterate through a set

public class Cheeses{
    static Set<String> cheeses = new HashSet<>();

    public static void main(String[] args) {
        cheeses.add("Cheddar");
        cheeses.add("Brie");
        cheeses.add("Gouda");
        System.out.println(cheeses);

        cheeses.forEach(cheese -> {
            if(cheese.equals("Brie")) {
                System.out.println("I love " + cheese);
            } else {
                System.out.println("I like " + cheese);
            }
        });
    }
}

Cheeses.main(null);
```

    [Brie, Cheddar, Gouda]
    I love Brie
    I like Cheddar
    I like Gouda



```java
// using iterator to iterate through a set

import java.util.Iterator;

public class Games{
    static Set<String> games = new HashSet<>();

    public static void main(String[] args) {
        games.add("Monopoly");
        games.add("Scrabble");
        games.add("Sorry");
        System.out.println(games);
        System.out.println();

        Iterator<String> iterator = games.iterator();
        while(iterator.hasNext()) {
            System.out.println(iterator.next());
        }
    }
}

Games.main(null);
```

    [Sorry, Monopoly, Scrabble]
    
    Sorry
    Monopoly
    Scrabble


### How to check for equality?
- You can check if two hashsets are equal by using the `equals()` method. This method will return true if the hashsets contain the same values and false if they do not.


```java
public class Pokemon {
    public static void main(String[] args) {
        Set<String> pokemonSet1 = new HashSet<>();
        Set<String> pokemonSet2 = new HashSet<>();

        // Populate the sets
        pokemonSet1.add("Pikachu");
        pokemonSet1.add("Charmander");
        pokemonSet1.add("Pikaman");

        pokemonSet2.add("Pikachu");
        pokemonSet2.add("Charmander");
        pokemonSet2.add("Pikaman");

        // Check equality
        boolean areEqual = pokemonSet1.equals(pokemonSet2);
        System.out.println("Are the sets equal? " + areEqual);
    }
}

Pokemon.main(null);

```

    Are the sets equal? true


### Other kinds of hashsets
- There are other kinds of hashsets that are similar to the hashset but have some differences. These include the linkedhashset and the treeset. 
- The linkedhashset is similar to the hashset but it maintains the order in which the values were added. 
- The treeset is similar to the hashset but it sorts the values in ascending order.


```java
// LinkedHashSet

import java.util.LinkedHashSet;
import java.util.Set;

public class LinkedHashSetExample {
    public static void main(String[] args) {
        Set<String> linkedHashSet = new LinkedHashSet<>();

        // Add elements
        linkedHashSet.add("Pikachu");
        linkedHashSet.add("Charmander");
        linkedHashSet.add("Pikaman");

        // Iterate through the LinkedHashSet
        System.out.println("LinkedHashSet: ");
        linkedHashSet.forEach(pokemon -> System.out.println(pokemon));
        System.out.println();

        linkedHashSet.remove("Pikachu");
        System.out.println("New hashset: " + linkedHashSet);
    }
}

LinkedHashSetExample.main(null);
```

    LinkedHashSet: 
    Pikachu
    Charmander
    Pikaman
    
    New hashset: [Charmander, Pikaman]



```java
// TreeSet
import java.util.Set;
import java.util.TreeSet;

public class TreeSetExample {
    public static void main(String[] args) {
        Set<String> treeSet = new TreeSet<>();

        // Add elements
        treeSet.add("Alberquerque, New Mexico");
        treeSet.add("Pikachu");
        treeSet.add("Charmander");
        treeSet.add("Pikaman");

        // Iterate through the TreeSet
        treeSet.forEach(pokemon -> System.out.println(pokemon));
        // The values for the TreeSet are sorted alphabetically
    }
}

TreeSetExample.main(null);
```

    Alberquerque, New Mexico
    Charmander
    Pikachu
    Pikaman


## SQL

SQL is a programming language focused on managing and manipulating relational (table-based) databases. It acts as the backbone for many of this class's project backends, allowing users to create, read, update and delete data efficiently. To get a better idea of how data is formatted with JPA to be stored in an SQL database, we'll be looking at the `Person` object in the [lesson backend](https://github.com/Tirth-Thakkar/LessonBackend). Follow along in this notebook.

### Person Object Setup

(see .../mvc/person/Person.java)

After the first three tags, which specify to Lombok that `@AllArgsConstructor` and `@NoArgsConstructor` methods should be created

The `@Entity` tag indicates that Person objects will be stored as entities in a database. Generally, entities' attributes are represented by values in columns in the SQLite table.


```java
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Convert(attributeName ="person", converter = JsonType.class)
public class Person //...
```

The `@Id` tag specifies to that this value will be used as the unique identifier for each object in the database, and `@GeneratedValue(strategy = GenerationType.AUTO)` allows these ID's to be automatically generated when a new Person is created. In order for data to be most easily differentiated and manipulated in a database, IDs are deeply important to use.


```java
@Id
@GeneratedValue(strategy = GenerationType.AUTO)
private Long id;
```

### Person JPA Repository Setup

(see .../mvc/person/PersonJpaRepository.java)

JPA is a great asset when creating an SQL database because it can provide methods that help you modify its contents. If a specific object has a `JpaRepository` interface made that extends the base JPA repository, it allows you to access many useful JPA methods.


```java
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

// ...

public interface PersonJpaRepository extends JpaRepository<Person, Long> // ...
```

#### Popcorn Hack!

List all of the JPA methods that you see in the PersonJpaRepository.java file and what their purpose is.

- `Person findByEmail(String email)` - find Person entity by email
- `List<Person> findAllByOrderByNameAsc()` - find all persons and orders result by name in ascending order
- `List<Person> findByNameContainingIgnoreCaseOrEmailContainingIgnoreCase(String name, String email)` - find persons whose name or email contains specified strings, ignoring case
- `Person findByEmailAndPassword(String email, String password)` - finds Person entity by email and password
- `List<Person> findByLikeTermNative(String term)` - custom native SQL query to find persons whose name or email is similar to given term

#### Custom JPA Queries

You can create custom JPA queries that utilize SQL to serve a specific purpose outside of the existing JPA methods. See the example below from PersonJpaRepository.java:


```java
@Query(
        value = "SELECT * FROM Person p WHERE p.name LIKE ?1 or p.email LIKE ?1",
        nativeQuery = true)
List<Person> findByLikeTermNative(String term);
```

Going step-by-step:
- The `@Query` indicates a custom query is being created
- `value` is a String containing an SQL query that will be run with the method `findByLikeTermNative`
    - `?1` is a placeholder for a parameter (in this case the String `term` from the method declaration)
- `nativeQuery` is set to true, indicating that the value uses native SQL rather than JPQL (Java Persistence Query Language)

Using a custom SQL query like this would be a great way to show understanding on the homework.

### Many-to-Many Relationship

(see .../mvc/person/Person.java)

A "Many-to-Many" relationship (shown in the @ManyToMany tag) indicates that entities on both sides of a relationship can have multiple connections with each other.

This condition allows for one object to be related to multiple different objects, and those different objects on the other side of the relationship can have their own relationship to other objects.


```java
@ManyToMany(fetch = EAGER)
private Collection<PersonRole> roles = new ArrayList<>();
```

(fetch = EAGER) specifies that, whenever a `Person` object is loaded, its corresponding `PersonRole` objects should be loaded simultaneously.

Objects in a "many-to-many" relationship often use "join tables" to represent the connections between these objects.

```text
| person_id | role_id |
|-----------|---------|
| 1         | 1       |
| 1         | 2       |
| 2         | 2       |
| 3         | 1       |
| 3         | 3       |
```

This is what a "join table" may look like with multiple interconnected people and roles. There is a table in the backend repository's SQLite.db called `person_roles` that acts as a join table for the two roles, but you'll notice that it's empty. If you can show it filled up, that sounds like a good reason to give extra points.

#### Popcorn Hack!

Explain in your own words what the relationship between `Person` objects and `PersonRole` objects is. Why is this relevant to collections? (Hint: In the code above, multiple `PersonRole` objects are stored within a `Person` object's roles attribute.)

Each person can have multiple roles and each role can be assigned to multiple people. Collections like arraylists can be used to store and assign these roles to people, within hashmaps.

### Many-to-One Relationship

On the other hand, there is also a "Many-to-One" relationship that can exist between two objects. It means that multiple instances of one entity (the "many" side) are associated with a single instance of another entity (the "one" side). This can be seen applied to the `Note` object in relation to the `Person` object.


```java
@ManyToOne(fetch = FetchType.LAZY, optional = false)
@JoinColumn(name = "tutorial_id", nullable = false) // notice this!
@OnDelete(action = OnDeleteAction.CASCADE)
@JsonIgnore
private Person person;
```

Notice the `@JoinColumn(name = "tutorial_id", nullable = false)` tag. Then, check the `note` table in the sqlite.db file.

#### Popcorn Hack!

Where do you see "tutorial_id" on the table? What does it represent in relation to the leftmost "id" column?
- `tutorial_id` is at the very right and it represents the id of the person.

### Storing HashMaps with jsonb

JSONB is a binary representation of JSON data. It is a data type used in some relational databases (such as SQL databases) to store JSON documents in a more efficient and flexible way compared to traditional JSON. Within SQL databases, this data from the JSON can often be filtered, searched and/or extracted using provided functions.


```java
@JdbcTypeCode(SqlTypes.JSON)
@Column(columnDefinition = "jsonb")
private Map<String,Map<String, Object>> stats = new HashMap<>(); 
```

JSONB allows for the storage of nested and dynamic data structures. In the context of `Person` object stats, it means that each person can store activity data with the formatted date as the key, and the structure of this JSON data can be modified or extended without altering the database schema.

You can view the way this data is structured in the `person` sqlite.db table.

## Homework

- Complete all popcorn hacks throughout this lesson
- Using the [Person](https://github.com/Tirth-Thakkar/LessonBackend/tree/master/src/main/java/com/nighthawk/spring_portfolio/mvc/person) object as inspiration, create your own UNIQUE SQL database with at least 3 object entries that incorporates either a "many-to-many" relationship with another object (hint: Person and PersonRole) OR uses the JSONB column definition to store more complex data (such as a HashMap) as an attribute (hint: stats in Person object).
    - Show a clear screenshot of your SQLite table (using SQLite viewer) on your blog for credit.
    - Using past group project materials is valid for this homework as long as the expectations are met.

### Ideas for 1.0/1.0

- Incorporating both a "many-to-many" relationship and a JSONB column with information would be great.
- Implementing JPA repository methods (think CRUD methods, custom queries, etc.) would show interest in modifying SQL database data.
- Take extra notes on this lesson that show deeper research into Collections and SQL.

## Many-to-Many with JSONB across two classes (cars and people)

![Person](/assets/img/post_images/person.png)
![](/assets/img/post_images/cars.png)
![](/assets/img/post_images/relationship.png)

### Car.java


```java
package com.nighthawk.spring_portfolio.mvc.person;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Car {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotEmpty
    private String make;

    @NotEmpty
    private String model;

    private int year;

    @ManyToMany(mappedBy = "cars", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private List<Person> persons = new ArrayList<>();

    public Car(String make, String model, int year) {
        this.make = make;
        this.model = model;
        this.year = year;
    }
}
```

### CarJPA


```java
package com.nighthawk.spring_portfolio.mvc.person;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/*
Extends the JpaRepository interface from Spring Data JPA.
-- Java Persistent API (JPA) - Hibernate: map, store, update and retrieve database
-- JpaRepository defines standard CRUD methods
-- Via JPA the developer can retrieve database from relational databases to Java objects and vice versa.
 */
public interface CarJpaRepository extends JpaRepository<Car, Long> {
    List<Car> findAllByOrderByMakeAsc();
}
```

### Person


```java
package com.nighthawk.spring_portfolio.mvc.person;


import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.format.annotation.DateTimeFormat;

import com.vladmihalcea.hibernate.type.json.JsonType;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.Period;
import java.time.ZoneId;
import java.util.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Convert(attributeName = "person", converter = JsonType.class)
public class Person {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotEmpty
    @Size(min = 5)
    @Column(unique = true)
    @Email
    private String email;

    @NonNull
    @Size(min = 2, max = 30, message = "Name (2 to 30 chars)")
    private String name;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date dob;

    @ManyToMany(fetch = FetchType.EAGER, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(
            name = "person_car",
            joinColumns = @JoinColumn(name = "person_id"),
            inverseJoinColumns = @JoinColumn(name = "car_id")
    )
    private Collection<Car> cars = new ArrayList<>();

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(columnDefinition = "jsonb")
    private Map<String, Map<String, Object>> stats = new HashMap<>();

    public Person(String email, String name, Date dob) {
        this.email = email;
        this.name = name;
        this.dob = dob;
    }

    public int getAge() {
        if (this.dob != null) {
            LocalDate birthDay = this.dob.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
            return Period.between(birthDay, LocalDate.now()).getYears();
        }
        return -1;
    }

    public static Person[] init(CarJpaRepository carRepository, PersonJpaRepository personRepository) {

        Car car1 = new Car("Toyota", "Camry", 2022);
        Car car2 = new Car("Honda", "Civic", 2021);
        Car car3 = new Car("Ford", "Mustang", 2020);
    
        Person p1 = new Person();
        p1.setName("Bob Smith");
        p1.setEmail("bobs@gmail.com");
        try {
            Date d = new SimpleDateFormat("MM-dd-yyyy").parse("06-28-4678");
            p1.setDob(d);
        } catch (Exception e) {
        }
    
        Person p2 = new Person();
        p2.setName("John Doe");
        p2.setEmail("joed@gmail.com");
        try {
            Date d = new SimpleDateFormat("MM-dd-yyyy").parse("09-16-1639");
            p2.setDob(d);
        } catch (Exception e) {
        }
    
        Person p3 = new Person();
        p3.setName("Joe Joe");
        p3.setEmail("niko@gmail.com");
        try {
            Date d = new SimpleDateFormat("MM-dd-yyyy").parse("04-08-2004");
            p3.setDob(d);
        } catch (Exception e) {
        }
    
        p1.getCars().addAll(Arrays.asList(car1, car2));
        p2.getCars().add(car1);
        p3.getCars().addAll(Arrays.asList(car1, car3));

        car1.getPersons().addAll(Arrays.asList(p1, p2, p3));
        car2.getPersons().addAll(Arrays.asList(p1));
        car3.getPersons().addAll(Arrays.asList(p3));

        Map<String, Object> statsMap = new HashMap<>();
        statsMap.put("calories", 2200);
        statsMap.put("steps", 8000);

        p1.getStats().put("2022-11-13", statsMap);
        p2.getStats().put("2022-11-13", statsMap);
        p3.getStats().put("2022-11-13", statsMap);

        carRepository.saveAll(Arrays.asList(car1, car2, car3));
        personRepository.saveAll(Arrays.asList(p1, p2, p3));

        return new Person[]{p1, p2, p3};
        }

    public static void main(String[] args) {
        // // Call the init method with the application context
        // Person[] persons = init(carRepo, personRepo);

        // for (Person person : persons) {
        //     System.out.println(person);
        // }
    }
}
```

### PersonJPA


```java
package com.nighthawk.spring_portfolio.mvc.person;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/*
Extends the JpaRepository interface from Spring Data JPA.
-- Java Persistent API (JPA) - Hibernate: map, store, update and retrieve database
-- JpaRepository defines standard CRUD methods
-- Via JPA the developer can retrieve database from relational databases to Java objects and vice versa.
 */
public interface PersonJpaRepository extends JpaRepository<Person, Long> {
    Person findByEmail(String email);

    List<Person> findAllByOrderByNameAsc();

    // JPA query, findBy does JPA magic with "Name", "Containing", "Or", "Email", "IgnoreCase"
    List<Person> findByNameContainingIgnoreCaseOrEmailContainingIgnoreCase(String name, String email);

    /* Custom JPA query articles, there are articles that show custom SQL as well
       https://springframework.guru/spring-data-jpa-query/
       https://docs.spring.io/spring-data/jpa/docs/current/reference/html/#jpa.query-methods
    */
    // Custom JPA query
    @Query(
            value = "SELECT * FROM Person p WHERE p.name LIKE ?1 or p.email LIKE ?1",
            nativeQuery = true)
    List<Person> findByLikeTermNative(String term);
    /*
      https://www.baeldung.com/spring-data-jpa-query
    */
}
```

### API Controller


```java
package com.nighthawk.spring_portfolio.mvc.person;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.text.SimpleDateFormat;

@RestController
@RequestMapping("/api/person")
public class PersonApiController {

    // Autowired enables Control to connect POJO Object through JPA
    @Autowired
    private PersonJpaRepository repository;

    @Autowired
    private PersonDetailsService personDetailsService;

    /*
    GET List of People
     */
    @GetMapping("/")
    public ResponseEntity<List<Person>> getPeople() {
        return new ResponseEntity<>( repository.findAllByOrderByNameAsc(), HttpStatus.OK);
    }

    /*
    GET individual Person using ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<Person> getPerson(@PathVariable long id) {
        Optional<Person> optional = repository.findById(id);
        if (optional.isPresent()) {  // Good ID
            Person person = optional.get();  // value from findByID
            return new ResponseEntity<>(person, HttpStatus.OK);  // OK HTTP response: status code, headers, and body
        }
        // Bad ID
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);       
    }

    /*
    DELETE individual Person using ID
     */
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Person> deletePerson(@PathVariable long id) {
        Optional<Person> optional = repository.findById(id);
        if (optional.isPresent()) {  // Good ID
            Person person = optional.get();  // value from findByID
            repository.deleteById(id);  // value from findByID
            return new ResponseEntity<>(person, HttpStatus.OK);  // OK HTTP response: status code, headers, and body
        }
        // Bad ID
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST); 
    }

    /*
    POST Aa record by Requesting Parameters from URI
     */
    @PostMapping( "/post")
    public ResponseEntity<Object> postPerson(@RequestParam("email") String email,
                                             @RequestParam("name") String name,
                                             @RequestParam("dob") String dobString) {
        Date dob;
        try {
            dob = new SimpleDateFormat("MM-dd-yyyy").parse(dobString);
        } catch (Exception e) {
            return new ResponseEntity<>(dobString +" error; try MM-dd-yyyy", HttpStatus.BAD_REQUEST);
        }
        // A person object WITHOUT ID will create a new record with default roles as student
        Person person = new Person(email, name, dob);
        personDetailsService.save(person);
        return new ResponseEntity<>(email +" is created successfully", HttpStatus.CREATED);
    }

    /*
    The personSearch API looks across database for partial match to term (k,v) passed by RequestEntity body
     */
    @PostMapping(value = "/search", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> personSearch(@RequestBody final Map<String,String> map) {
        // extract term from RequestEntity
        String term = (String) map.get("term");

        // JPA query to filter on term
        List<Person> list = repository.findByNameContainingIgnoreCaseOrEmailContainingIgnoreCase(term, term);

        // return resulting list and status, error checking should be added
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    /*
    The personStats API adds stats by Date to Person table 
    */
    @PostMapping(value = "/setStats", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Person> personStats(@RequestBody final Map<String,Object> stat_map) {
        // find ID
        long id=Long.parseLong((String)stat_map.get("id"));  
        Optional<Person> optional = repository.findById((id));
        if (optional.isPresent()) {  // Good ID
            Person person = optional.get();  // value from findByID

            // Extract Attributes from JSON
            Map<String, Object> attributeMap = new HashMap<>();
            for (Map.Entry<String,Object> entry : stat_map.entrySet())  {
                // Add all attribute other thaN "date" to the "attribute_map"
                if (!entry.getKey().equals("date") && !entry.getKey().equals("id"))
                    attributeMap.put(entry.getKey(), entry.getValue());
            }

            // Set Date and Attributes to SQL HashMap
            Map<String, Map<String, Object>> date_map = new HashMap<>();
            date_map.put( (String) stat_map.get("date"), attributeMap );
            person.setStats(date_map);  // BUG, needs to be customized to replace if existing or append if new
            repository.save(person);  // conclude by writing the stats updates

            // return Person with update Stats
            return new ResponseEntity<>(person, HttpStatus.OK);
        }
        // return Bad ID
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST); 
    }
}

```

### PersonDetailsServices


```java
package com.nighthawk.spring_portfolio.mvc.person;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
@Transactional
public class PersonDetailsService implements UserDetailsService {

    private final PersonJpaRepository personJpaRepository;

    @Autowired
    public PersonDetailsService(
            PersonJpaRepository personJpaRepository) {
        this.personJpaRepository = personJpaRepository;
    }
    
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Person person = personJpaRepository.findByEmail(email);
        if (person == null) {
            throw new UsernameNotFoundException("User not found with username: " + email);
        }
        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        return new org.springframework.security.core.userdetails.User(person.getEmail(), "", authorities);
    }

    public List<Person> listAll() {
        return personJpaRepository.findAllByOrderByNameAsc();
    }

    public List<Person> list(String name, String email) {
        return personJpaRepository.findByNameContainingIgnoreCaseOrEmailContainingIgnoreCase(name, email);
    }

    public List<Person> listLike(String term) {
        return personJpaRepository.findByNameContainingIgnoreCaseOrEmailContainingIgnoreCase(term, term);
    }

    public List<Person> listLikeNative(String term) {
        String likeTerm = String.format("%%%s%%", term);
        return personJpaRepository.findByLikeTermNative(likeTerm);
    }

    public void save(Person person) {
        personJpaRepository.save(person);
    }

    public Person get(long id) {
        return personJpaRepository.findById(id).orElse(null);
    }

    public Person getByEmail(String email) {
        return personJpaRepository.findByEmail(email);
    }

    public void delete(long id) {
        personJpaRepository.deleteById(id);
    }

    public void addCarToPerson(String email, Car car) {
        Person person = personJpaRepository.findByEmail(email);
        if (person != null) {
            person.getCars().add(car);
            car.getPersons().add(person);
            personJpaRepository.save(person);
        }
    }
}

```
