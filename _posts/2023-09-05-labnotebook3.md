---
title: Lab Notebook 3
author: david
categories: ['Lab Notebook']
tags: ['HTML', 'CSS', 'Javascript']
type: tangibles
week: 3
description: Week 3 lab work.
toc: True
comments: True
date: 2023-09-05 12:00:00 +0000
---

## Pair Programming

For the pair programming project we decided to create a program that uses user inputs and outputs and also stores score and fastest time using cookies. It also pulls images from a RapidAPI to the game cards, which when matched stay flipped over.

### addEvenListener()

instead of doing ```onclick()``` you can use the ```addeventlistener()``` function in order to detect a click and then trigger a series of actions. in our code we used it to start the game as well as trigger the visibility of certain elements. this allowed one button to trigger multiple functions at once.


```python
// checks is game is started and starts game if start is clicked
start.addEventListener('click', async () => {
  if (!gameStarted) {
    await startGame();
  }
});

// hides start button
start.addEventListener("click", function() {
  this.remove();
  document.querySelector('main').classList.remove('hidden')
});
```

### async function Example()

using ```async``` functions allows us to run multiple functions at once without overloading the computational power of the computer. this is important when running the timer, game rule functions, and main game function for example. the timer and other game rule functions won't lag while the main game function dominates the computational power of the computer.


```python
async function startGame() {
  // setting variables and fetching data
  const breeds = await fetchDogs();
  const images = [];
  
  // creates reset button
  document.getElementById('resetButton').addEventListener('click', resetGame);
  start.style.display = 'none'
  gameContainer.style.display = 'block'

  // ... rest of code
}
```

inside the ```async``` function we can use ```await``` in order to pause the execution of a certain function while we wait for a promise in another part of the function to be fulfilled. in this case, we make the ```fetchdogs()``` function be the mandatory function to run and the rest of the code has to wait for that function to run. this is because the data from the api is the most important piece of the game.


```python
const breeds = await fetchDogs();
const images = [];

// creates reset button
document.getElementById('resetButton').addEventListener('click', resetGame);
start.style.display = 'none'
gameContainer.style.display = 'block'

// pulls data from cookies and displays on frontend
function setData() {
  leastMoves.textContent = getCookie('leastMoves')
  fastestTime.textContent = getCookie('fastestTime')
}

// ... rest of code
```

### querySelector()

This function takes the first element that meets the the selector requirements and assigns it to a variable.


```python
const gameContainer = document.querySelector('.game-container');
```

### this.

this is keyword that refers to the current execution of a code block. this allows for privately assigned variables when having instances of a program running. with this, we can have one variable hold data multiple different ways and be used multiple times. in this case we use it to add a tag ```flipped``` to the ```classlist``` of the card that is clicked in order to count up how many cards are flipped at once in the board that is generated through iteration rather than manually. this allows for simpler code rather than having a function for each card that checks if the card is flipped.


```python
function flipCard() {
  // if 2 are flipped
  if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
    // sends signal that they are flipped
    this.classList.add('flipped')
    flippedCards.push(this)
    // adds to moves
    moves++
    moveCount.textContent = moves

// ... rest of code
  }
}
```

another example is when removing the start button from the screen after pressing it. we use the ```this``` in order to remove the button that was clicked, rather than having to call the class or id and removing it by setting the style to hidden.


```python
start.addEventListener("click", function() {
  this.remove();
  document.querySelector('main').classList.remove('hidden')
});
```

### forEach()

we use the ```foreach()``` function many times throughout our code to simplify it using iteration. in this example, the ```foreach()``` function goes through each image that the api has pulled using another ```foreach()``` function, and it assigns an index to each card for later game rule checks and it also places the image onto each of the cards, so that each card has a different image.


```python
images.forEach((img, index) => {
    // creates from of card
    const cardElement = document.createElement('div')
    cardElement.classList.add('gameCard')
    cardElement.dataset.cardIndex = index
    // creates back of card
    const cardBack = document.createElement('div')
    cardBack.classList.add('cardBack')
    cardElement.appendChild(cardBack)
    // places image in front of card
    const cardImage = document.createElement('img')
    cardImage.src = img
    cardElement.appendChild(cardImage)
    // checks if card is clicked to flip
    cardElement.addEventListener('click', flipCard)
    gameBoard.appendChild(cardElement)
  });
```

### Date.

This default object from Javascript that allows for easier time and date manipulation. In this case, we use it as a timer to count seconds so that we don't have to worry about the logic behind counting seconds.


```python
 // sets var for timer
 startTime = Date.now();
 timerInterval = setInterval(updateTimer, 1000)

 // timer in seconds
 function updateTimer() {
   const currentTime = Math.floor((Date.now() - startTime) / 1000)
   timer.textContent = currentTime
 }
```

### Cookies

These are how the data is stored from one session to another on the same device. We use them to store the fastest times and the lowest number of moves.

the first part is setting the cookies, which is a function that takes in the name and the value of the cookie. we can also make the cookie expire after a certain number of days, however this is not needed. we then set how to calculate the expiration time if we do need it and then we set to how and where the cookie is stored with ````${name}=${value};expires=${expires.toutcstring()};path=/````, where ```{name}``` and ```{value}``` are where the data is stores and then the rest is the expiration time and the ```path=/``` is to store it in the root directory of the website so that the entire website has access to it.


```python
// function to set cookie
function setCookie(name, value, days) {
  const expires = new Date();
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
  console.log(document.cookie)
}
```

Getting the cookie is important when retrieving the stored information. The data in the list of cookies is split with the semi-colon and then the of is pulled into the frontend by the name of the cookie that is being stored.


```python
// gets cookies from stored data
function getCookie(name) {
  const cookies = document.cookie.split(';')
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim()
    if (cookie.startsWith(`${name}=`)) {
      return cookie.substring(name.length + 1)
    }
  }
  return null
}
```

## JQuery

this is an example of a data table made using jquery. there is a runtime link instead of an output because there were errors in locating the ```datatable()``` function.


```python
%%html

<head>
  <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.25/css/jquery.dataTables.min.css">
  <script type="text/javascript" language="javascript" src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
  <script type="text/javascript" language="javascript" src="https://cdn.datatables.net/1.10.25/js/jquery.dataTables.min.js"></script>
</head>

<table id="table" class="table">
  <thead id="head">
      <tr>
          <th>Category</th>
          <th>Common Name</th>
          <th>Climate</th>
          <th>Family</th>
          <th>Latin Name</th>
          <th>Image</th>
      </tr>
  </thead>
  <tbody id="body"></tbody>
</table>


<script>
  const settings = {
    async: true,
    crossDomain: true,
    url: 'https://house-plants2.p.rapidapi.com/all-lite',
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '701410bf7emshbaf1fa99b2e4e5bp1c0ee6jsn8f8f51602e3f',
      'X-RapidAPI-Host': 'house-plants2.p.rapidapi.com'
    }
  };
  
  $.ajax(settings).done(function (response) {
    console.log(response);


    for (const row of response) {

const commonName = Array.isArray(row["Common name"]) ? row["Common name"].join(', ') : row["Common name"];
const latinName = Array.isArray(row["Latin name"]) ? row["Latin name"].join(', ') : row["Latin name"];

      $('#body').append('<tr><td>' + 
          row.Categories + '</td><td>' + 
          commonName + '</td><td>' + 
          row.Climat + '</td><td>' +
          row.Family + '</td><td>' + 
          latinName + '</td><td>' + 
          '<img src="' + row.Img +'">' + '</td></tr>');
    }
    $("#table").DataTable();
  });

    
</script>
```

[Runtime]({{ site.baseurl }}/dataTable.html)

### Why jQuery

jQuery is a much better formatted table that iteratively generates when loading. This allows it to take large amounts of data, like from an API, and display it for everyone to see. This is very important when wanting to save time. It also allows for there to be search and also allows for sorting based on the categories provided. This is again useful for looking through data manually when the looking through a large database.

### Why Not Markdown or HTML

With HTML and Markdown, it is better to create such tables for smaller data sets. Although you can generate larger tables with Python and Javascript, you still don't get imbedded search and sort features like in jQuery and this leads to a worse UI for large data sets.

### Some Interesting Things I DId

- ```array.isarray()``` - this checks whether a given value is an array or not and then it can complete certain tasks
- ```row["common name"].join(', ')``` - this joins the arrays if there is an array under this variable
- ```: row["common name"]``` - if it is not an array, then the value is returned as it was initially found
