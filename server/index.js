const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const axios = require('axios');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",  
    methods: ["GET", "POST"]
  }
});

const getRandomFortune = async () => {
  try {
    const response = await axios.get("https://aphorismcookie.herokuapp.com/");
    return response.data.data.message;
  } catch (error) {
    console.log("Error fetching fortune:", error);
    return "Could not retrieve fortune.";
  }
};

const getRandomJoke = async () => {
  try {
    const response = await axios.get("https://icanhazdadjoke.com/slack", {
      headers: { Accept: "application/json" }
    });
    return response.data.attachments[0].text;
  } catch (error) {
    console.log("Error fetching joke:", error);
    return "Could not retrieve a joke.";
  }
};

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('talkToBot', async (message) => {
    let response = '';

    if (message.toLowerCase().includes("random fortune")) {
      response = await getRandomFortune();
    } else if (message.toLowerCase().includes("hey bot tell me a joke")) {
      response = await getRandomJoke();
    } else if (message.toLowerCase().includes("latest game trend of 2024")) {
      response = `Hi ${socket.username || 'User'}, the current game trend of 2024 is Space Marines 2.`;
    } else {
      response = "Sorry, I don't understand that request.";
    }

    socket.emit('botResponse', response);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

//INF212_MIDTERMPROJ_NUCASA_JERICK_kjUUysuer25Jhs7h212