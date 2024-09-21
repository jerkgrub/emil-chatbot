//Chatscreen.js
 
import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import { View, Text, StyleSheet } from "react-native";
 
// Helper functions to get fortune and joke
const getRandomFortune = async () => {
  try {
    const response = await fetch("https://aphorismcookie.herokuapp.com/");
    if (!response.ok) {
      console.log("Error fetching fortune:", response.statusText);
      return "Could not retrieve fortune.";
    }
    const data = await response.json();
    return data.data.message; // Correctly extract the fortune message
  } catch (error) {
    console.log("Error:", error);
    return "Could not retrieve fortune.";
  }
};
 
const getRandomJoke = async () => {
  try {
    const response = await fetch("https://icanhazdadjoke.com/slack", {
      headers: { Accept: "application/json" },
    });
    if (!response.ok) {
      console.log("Error fetching joke:", response.statusText);
      return "Could not retrieve a joke.";
    }
    const data = await response.json();
    return data.attachments[0].text; // Correctly extract the joke message
  } catch (error) {
    console.log("Error:", error);
    return "Could not retrieve a joke.";
  }
};
 
const CatloversPage = () => {
  const [messages, setMessages] = useState([]);
 
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "I am so tired from building",
        createdAt: new Date(),
        user: {
          _id: 4,
          name: "Peasant",
          avatar:
            "https://avatars.akamai.steamstatic.com/803972c85800d31df389b21a5f447f1aff81e9a1_full.jpg",
        },
      },
    ]);
  }, []);
 
  const handleBotResponse = async (messageText) => {
    let botResponse = "";
    if (messageText.toLowerCase().includes("random fortune")) {
      botResponse = await getRandomFortune();
    } else if (messageText.toLowerCase().includes("tell me a joke")) {
      botResponse = await getRandomJoke();
    } else if (messageText.toLowerCase().includes("what's your name")) {
      botResponse = "My name is JarvisBot, your personal assistant.";
    } else if (messageText.toLowerCase().includes("how are you")) {
      botResponse = "I'm a bot, I always feel great!";
    } else if (messageText.toLowerCase().includes("what is love")) {
      botResponse = "Love is... a complex set of emotions!";
    } else if (messageText.toLowerCase().includes("what's the weather")) {
      botResponse = "I can't check weather right now, but it’s always sunny in my world!";
    } else if (messageText.toLowerCase().includes("what's the time")) {
      botResponse = new Date().toLocaleTimeString();
    } else if (messageText.toLowerCase().includes("give me advice")) {
      botResponse = "Stay positive and work hard. Great things take time!";
    } else if (messageText.toLowerCase().includes("why is the sky blue")) {
      botResponse = "It's due to Rayleigh scattering. Sunlight is scattered by air molecules and blue light is scattered more!";
    } else {
      botResponse = "I don't have an answer for that, but I'm learning!";
    }
 
    const botMessage = {
      _id: Math.floor(Math.random() * 1000000),
      text: botResponse,
      createdAt: new Date(),
      user: {
        _id: 2,
        name: "JarvisBot",
        avatar: "https://example.com/bot-avatar.png",
      },
    };
 
    setMessages((previousMessages) => GiftedChat.append(previousMessages, [botMessage]));
  };
 
  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) => GiftedChat.append(previousMessages, messages));
    const userMessage = messages[0].text;
    handleBotResponse(userMessage);
  }, []);
 
  const renderBubble = (props) => {
    return (
      <View>
        <Text style={styles.username}>{props.currentMessage.user.name}</Text>
        <Bubble {...props} />
      </View>
    );
  };
 
  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      showUserAvatar={true}
      user={{
        _id: 1,
        avatar:
          "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/c10a26e2-8af9-43b4-b871-1c7dbe15b650/dgaqe0n-9ade0d8a-6639-4fe7-baa9-94f66d777095.jpg",
      }}
      renderBubble={renderBubble}
    />
  );
};
 
const styles = StyleSheet.create({
  username: {
    fontWeight: "bold",
    fontSize: 12,
    marginLeft: 10,
    marginBottom: 5,
    color: "#555",
  },
});
 
export default CatloversPage;