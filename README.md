# GeoBattle
This project was created for the Real Time Web course during the Web Design and Development minor. GeoBattle is an online multiplayer game where you have to guess a city or location based on a satellite image. The players that are the fastest with guessing the correct city will gain the most points and eventually win the game! The project uses websockets to give live feedback to the users and is built with React to handle state efficiently.

## First ideas
I first wanted to create an application where I would use live soccer data during soccer matches combined with static data (when a match would be played for example). This would be a good way to integrate websockets into an application. When I started looking for companies that can deliver the live data of soccer matches, there were not any good ones available that were free. This data is worth a lot of money (which is understandable since there is such a big market for it), and after finding this out I decided to do something else.
Making an online multiplayer game sounded like a lot of fun to me, so I started thinking about what I could make. The first thing that popped into my head was a game called [Skribbl](https://skribbl.io/), I sometimes play this with friends, it is an online multiplayer game where everyone gets a turn on drawing something, whilest the others have to guess what the word was what the person that is drawing picked. You just guess in the same chat where you can also communicate with each other. The idea of having a chat to communicate with each other but also to interact with the game appealed to me. I decided to make a same kind of game, but instead of guessing a word based on a drawing, you would have to guess a city or location based on a satellite image.

## Concept
The concept of GeoBattle is that you can create a room and invite your friends (or let random people join), and battle for the most points. A room has a set amount of rounds and time per round (decided by the person who creates the room), every round the players can guess what city is displayed and earn points when they guess correctly. At the end of the game there will be a winner (the person with the most points).

## Features 
Below is a list of features, I have used the MoSCoW method to categorize the features.

* Must haves:
    * Creating a room
    * Setting an amount of rounds
    * Setting the amount of time per round
    * Ability to only get cities from a certain continent
    * Working multi-user chat
    * Detection if the user guesses the city correctly
    * Leaderboards during a game

* Should haves:
    * Global leaderboards (all time points)
    * List of matches that are (almost) starting, so random people can join
    * Feedback how many kilometers you are off from the correct answer
    * Start the match when all players are 'ready'

* Could haves:
    * Account registration and login system
    * Authentication using several services
    * Emoji support in the chat
    * Maximum amount of messages in a small amount of time (spam prevention)

* Would haves:
    * Coming soon...

## Tech Stack
For this project I use the React framework with TypeScript and SCSS for the client side and Nodejs with regular JavaScript for the server side. Since we are working with real time data, a framework that handles state changes well (like React) is great to use since it is built for this kind of usage. If I would have to write all the code with vanilla JavaScript, it would take much more time and decrease my productivity and possibilities. I use TypeScript since I share a lot of different kind of data between all my components, with TypeScript I can write strict code where functions and components only accept the types that I want them to receive. This improves my productivity and makes debugging and preventing bugs before they actually happen a lot easier. I have only worked with TypeScript before in a single project, so it still takes some time to get used to. But I already noticed the benefits of it.

## Dependencies
Coming soon...

## Install

- Clone this repo
```
git clone https://github.com/BVictorB/real-time-web-2021 .
```
- Install all server dependencies and run the server (create a .env file with a database link if you actually want it to work locally)
```
cd server
npm i
npm run dev
```
- Install all client dependencies and run the client
```
cd client
npm i
npm start
```
