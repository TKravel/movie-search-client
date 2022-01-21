# Movie app client code

A streaming availability app built with React.js. Search for movies on Netflix or Prime Video while filtering results by year range and genre.

## Server code

To protect the API key requests are forwarded from a Express server. Server code can be found at https://github.com/TKravel/movie-search-server

## Requirements

1. Client and server code installed
2. Rapid API account (https://rapidapi.com)
3. Streaming Availability API Pro subscription (https://rapidapi.com/movie-of-the-night-movie-of-the-night-default/api/streaming-availability)
   ..1. Streaming Availability API key

## Installation

Clone this repository. From the root of the directory run:

```bash
npm install
npm start
```

Create a .env file in the clients root directory with the following variable

```javascript
REACT_APP_SERVER = 'The URL from where the backend is being served from';
```

Clone the server repository the from the root of the directory run:

```bash
npm install
```

Create a .dotenv file in the server root directory
Follow the server README to set up enivorment variables then run:

```bash
node index.js
```

## Demo

A working demo can be found at https://jovial-goldwasser-b2768b.netlify.app
