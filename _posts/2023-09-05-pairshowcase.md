---
title: Pair Showcase
author: david
categories: ['Lesson']
tags: ['HTML', 'CSS', 'Javascript']
type: tangibles
week: 3
description: Pair Showcase Code and Output.
toc: True
comments: True
date: 2023-09-05 12:00:00 +0000
---

<style>
  .gameBoard {
      display: grid;
      grid-template-columns: repeat(4, 0fr);
      grid-gap: 10px;
      margin-top: 20px;
  }
  .gameCard {
      width: 100px;
      height: 100px;
      align-items: center;
      cursor: pointer;
      transform: rotateY(180deg);
      transition: transform 0.5s ease;
  }
  .gameCard.flipped {
      background-color: #fff;
  }
  .gameCard img {
    width: 100%;
    height: 100%;
    border-radius: 0px;
  }
  .gameCard.flipped {
    transform: rotateY(0deg);
  }
  .cardBack {
      width: 100%;
      height: 100%;
      background-image: url('{{ site.baseurl }}/assets/img/post_images/cardBack.png');
      background-size: cover;
      position: absolute;
      backface-visibility: hidden;
      transition: transform 0.5s ease;
  }
  .gameCard.flipped .cardBack {
      transform: rotateY(180deg);
  }
  .hidden {
  display: none;
  }
  .congratulations {
    display: none;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    text-align: center;
  }
  .congratulations h2 {
    font-size: 24px;
    margin-bottom: 10px;
  }
  .congratulations p {
    font-size: 18px;
  }
</style>

<div class="game-container">
<h1>Concentration Game</h1>
<button id="startButton">Start</button>
<main class="hidden">
  <p>Moves: <span id="moveCount">0</span></p>
  <p>Time: <span id="timer">0</span> seconds</p>
  <div class="gameBoard" id="gameBoard"></div>
  <p>Least Moves: <span id="leastMoveCount">0</span></p>
  <p>Fastest Time: <span id="fastestTime">0</span> seconds</p>
</main>
<div id="congratulations" class="hidden">
  <div class="message-box">
    <h2>Congratulations!</h2>
    <p>You won in <span id="winMoves">0</span> moves and <span id="winTime">0</span> seconds.</p>
    <button id="resetButton">Play Again</button>
  </div>
</div>

<script src="{{ site.baseurl }}/assets/js/pages/pair-showcase.js"></script>