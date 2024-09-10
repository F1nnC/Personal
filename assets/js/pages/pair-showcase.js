// variables for game elements
const start = document.getElementById('startButton');
const gameContainer = document.querySelector('.game-container');
const gameBoard = document.getElementById('gameBoard');
const moveCount = document.getElementById('moveCount');
const timer = document.getElementById('timer');
const fastestTime = document.getElementById('fastestTime');
const leastMoves = document.getElementById('leastMoveCount');

// starts with false to state game isn't started
let gameStarted = false;

// checks is game is started and starts game if start is clicked
start.addEventListener('click', async () => {
  if (!gameStarted) {
    await startGame();
  }
});

// hides start button and shows game
start.addEventListener("click", function() {
  this.remove();
  document.querySelector('main').classList.remove('hidden')
});

// starts and runs game
async function startGame() {
  // setting variables and fetching data
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

  setData()

  // take image for each breed twice to have matching breed
  breeds.forEach(breed => {
    images.push(breed.img)
    images.push(breed.img)
  })

  // randomly sorts images in array
  images.sort(() => Math.random() - 0.5)

  // sets variables for checking which cards are flipped, moves, pairs solved, and timer
  let flippedCards = []
  let moves = 0
  let pairs = 0
  let timerInterval
  let startTime

  // creates game board
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

  // function to reset game (clear board)
  function resetGame() {
    const gameBoard = document.getElementById('gameBoard');
      while (gameBoard.firstChild) {
        gameBoard.removeChild(gameBoard.firstChild);
      }
      // reset other game-related variables and elements
      flippedCards = [];
      moves = 0;
      pairs = 0;
      moveCount.textContent = moves;
      timer.textContent = '0';
      clearInterval(timerInterval);
      // start a new game by calling startGame()
      startGame();
      // hide the congratulations message
      document.getElementById('congratulations').classList.add('hidden');
      // show the main game container
      document.querySelector('main').classList.remove('hidden');
  }

  // checks for flipped cards and creates solved pairs
  function flipCard() {
    // if 2 are flipped
    if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
      // sends signal that they are flipped
      this.classList.add('flipped')
      flippedCards.push(this)
      // adds to moves
      moves++
      moveCount.textContent = moves

      // when two are flipped, checks if match based on index
      if (flippedCards.length === 2) {
        // sets vars for flipped cards
        const card1Index = flippedCards[0].dataset.cardIndex
        const card2Index = flippedCards[1].dataset.cardIndex

        // checks if match, if so then add to pairs and add to flipped array
        if (images[card1Index] === images[card2Index]) {
          pairs++
          flippedCards = []
        } else {
          // flip cards back over if not matched
          setTimeout(() => {
            flippedCards.forEach(card => card.classList.remove('flipped'))
            flippedCards = []
          }, 1000)
        }
      }

      // checks for win
      if (pairs === 8) {
        // stops timer
        clearInterval(timerInterval)

        // gets cookies for compare
        const fastestTime = parseInt(getCookie('fastestTime')) || Infinity
        const leastMoves = parseInt(getCookie('leastMoves')) || Infinity

        // checks if cookies are lower, if so set new high scores
        if (moves < leastMoves) {
          setCookie('leastMoves', moves)
        } else if (moves === 0) {
          setCookie('leastMoves', moves)
        }

        if (timer.textContent < fastestTime) {
          setCookie('fastestTime', timer.textContent)
        } else if (timer.textContent === 0) {
          setCookie('fastestTime', timer.textContent)
        }

        // show game win screen
        const congratulations = document.getElementById('congratulations');
        const winMoves = document.getElementById('winMoves');
        const winTime = document.getElementById('winTime');
        winMoves.textContent = moves;
        winTime.textContent = timer.textContent;
        congratulations.classList.remove('hidden');
        document.querySelector('main').classList.add('hidden');
      }
    }
  }

  // sets var for timer
  startTime = Date.now();
  timerInterval = setInterval(updateTimer, 1000)

  // timer in seconds
  function updateTimer() {
    const currentTime = Math.floor((Date.now() - startTime) / 1000)
    timer.textContent = currentTime
  }

  // function to set cookie
  function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
    console.log(document.cookie)
  }

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
}

// api fetch
async function fetchDogs() {
  const url = 'https://dog-breeds2.p.rapidapi.com/dog_breeds';
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '701410bf7emshbaf1fa99b2e4e5bp1c0ee6jsn8f8f51602e3f',
      'X-RapidAPI-Host': 'dog-breeds2.p.rapidapi.com',
    },
  };

  return fetch(url, options)
    .then(response => response.json())
    .then(data => {
      // take 8 random dogs and send to frontend
      const shuffledBreeds = data.slice().sort(() => Math.random() - 0.5);
      return shuffledBreeds.slice(0, 8);
    });
}