# GeoBattle
This project was created for the Real Time Web course during the Web Design and Development minor. GeoBattle is an online multiplayer game where you have to guess a city or location based on a satellite image. The players that are the fastest with guessing the correct city will gain the most points and eventually win the game! The project uses websockets to give live feedback to the users and is built with React to handle state efficiently.

## :speech_balloon: First ideas
I first wanted to create an application where I would use live soccer data during soccer matches combined with static data (when a match would be played for example). This would be a good way to integrate websockets into an application. When I started looking for companies that can deliver the live data of soccer matches, there were not any good ones available that were free. This data is worth a lot of money (which is understandable since there is such a big market for it), and after finding this out I decided to do something else.
Making an online multiplayer game sounded like a lot of fun to me, so I started thinking about what I could make. The first thing that popped into my head was a game called [Skribbl](https://skribbl.io/), I sometimes play this with friends, it is an online multiplayer game where everyone gets a turn on drawing something, whilest the others have to guess what the word was what the person that is drawing picked. You just guess in the same chat where you can also communicate with each other. The idea of having a chat to communicate with each other but also to interact with the game appealed to me. I decided to make a same kind of game, but instead of guessing a word based on a drawing, you would have to guess a city or location based on a satellite image.

## :rocket: Concept
The concept of GeoBattle is that you can create a room and invite your friends (or let random people join), and battle for the most points. A room has a set amount of rounds and time per round (decided by the person who creates the room), every round the players can guess what city is displayed and earn points when they guess correctly. At the end of the game there will be a winner (the person with the most points).

## :clipboard: Features 
Below is a list of features, I have used the MoSCoW method to categorize the features.

* Must haves:
  - [X] Creating a room
  - [X] Setting an amount of rounds
  - [X] Setting the amount of time per round
  - [X] Ability to only get cities from a certain continent
  - [X] Working multi-user chat
  - [X] Detection if the user guesses the city correctly
  - [X] Leaderboards during a game

* Should haves:
  - [ ] Global leaderboards (all time points)
  - [X] List of matches that are (almost) starting, so random people can join
  - [X] Feedback how many kilometers you are off from the correct answer
  - [X] Start the match when all players are 'ready'

* Could haves:
  - [X] Account registration and login system
  - [X] Emoji support in the chat
  - [ ] Maximum amount of messages in a small amount of time (spam prevention)

* Would haves:
  - [ ] Authentication using several services
  - [ ] Adding or following other people

## :books: Tech Stack
For this project I use the React framework with TypeScript and SCSS for the client side and Nodejs with regular JavaScript for the server side. Since we are working with real time data, a framework that handles state changes well (like React) is great to use since it is built for this kind of usage. If I would have to write all the code with vanilla JavaScript, it would take much more time and decrease my productivity and possibilities. I use TypeScript since I share a lot of different kind of data between all my components, with TypeScript I can write strict code where functions and components only accept the types that I want them to receive. This improves my productivity and makes debugging and preventing bugs before they actually happen a lot easier. I have only worked with TypeScript before in a single project, so it still takes some time to get used to. But I already noticed the benefits of it.

I have also split up the server and client side code into two different folders, this is because I want to keep a clear overview of my code and keep my structure clean. This has been really beneficial for me, since I also host the server side code on [Heroku](https://heroku.com/) and the client side code on [Vercel](https://vercel.com/).

##  :repeat: Data lifecycle diagram
All the data that moves around between the client, server, database and API.  
![Data lifecycle diagram](https://user-images.githubusercontent.com/10921830/116404257-c3b03880-a82e-11eb-8098-da8d3fdad1cd.png)

## :paperclip: API
I have used the [positionstack API](https://positionstack.com/) for this project. This API can do forward and reverse geocoding. This allows you to get coordinates of a location (and other information) when you do a request (forward geocoding) and get the name of a location when you already have the coordinates (reverse geocoding). This is great for my project since I have to check if people guess the correct location.  
I have implemented the API in multiple ways:
- Checking if a user guessed a location correctly (convert text to coordinates and checking the distance from the origional coordinates after that)
- Adding new locations using the admin panel
- Displaying the correct city to the client
The API has 25000 free requests per month (which is more than enough for development), and getting an API key is easy as pie, you just have to register.  

Example requests:

### :arrow_right: Forward geocoding  
Request url: http://api.positionstack.com/v1/forward?access_key=API_KEY&query=amsterdam  
API response:
```json
{
  "latitude": 52.37243,
  "longitude": 4.89973,
  "type": "locality",
  "name": "Amsterdam",
  "number": null,
  "postal_code": null,
  "street": null,
  "confidence": 1,
  "region": "Noord-Holland",
  "region_code": "NH",
  "county": null,
  "locality": "Amsterdam",
  "administrative_area": null,
  "neighbourhood": null,
  "country": "Netherlands",
  "country_code": "NLD",
  "continent": "Europe",
  "label": "Amsterdam, NH, Netherlands"
}
```

### :arrow_left: Reverse geocoding  
Request url: http://api.positionstack.com/v1/reverse?access_key=API_KEY&query=48.858705,2.342865
API response:
```json
{
  "latitude": 48.858588,
  "longitude": 2.342931,
  "type": "address",
  "distance": 0.014,
  "name": "2 Rue Du Pont Neuf",
  "number": "2",
  "postal_code": "75001",
  "street": "Rue Du Pont Neuf",
  "confidence": 0.8,
  "region": "Paris",
  "region_code": "VP",
  "county": null,
  "locality": "Paris",
  "administrative_area": "Paris",
  "neighbourhood": "Saint-Germain l'Auxerrois",
  "country": "France",
  "country_code": "FRA",
  "continent": "Europe",
  "label": "2 Rue Du Pont Neuf, Paris, France"
}
```

## :fireworks: Socket events

## :wrench: Dependencies
Here are some dependencies that I've used during this project.

### Leaflet

### Socket.io

### JWT

### Mongoose


## :inbox_tray: Install

- Clone this repo
```
git clone https://github.com/BVictorB/geobattle .
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
