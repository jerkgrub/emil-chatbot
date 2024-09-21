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

const DogloversPage = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Arf arf!",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "Petmalou",
          avatar:
            "https://www.shutterstock.com/image-vector/dog-head-icon-flat-style-600nw-2473358659.jpg",
        },
      },
    ]);
  }, []);

  const handleBotResponse = async (messageText) => {
    let botResponse = "";
    if (messageText.toLowerCase().includes("random fortune")) {
      botResponse = await getRandomFortune();
    } 
    
    //questions + answers
      else if (messageText.toLowerCase().includes("tell me a joke")) {
      botResponse = await getRandomJoke();
    } else if (messageText.toLowerCase().includes("what's your name")) {
      botResponse = "My name is Petmalou, your personal assistant.";
    } else if (messageText.toLowerCase().includes("how are you")) {
      botResponse = "Arff arff, I am a very happy doggo!";
    } else if (messageText.toLowerCase().includes("what is love")) {
      botResponse = "Love is... !";
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
        name: "Petmalou",
        avatar: "https://www.shutterstock.com/image-vector/dog-head-icon-flat-style-600nw-2473358659.jpg",
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
    const isCurrentUser = props.currentMessage.user._id === 1; // Check if the message is from the current user

    return (
      <View>
        <Text
          style={[
            styles.username,
            isCurrentUser ? styles.usernameRight : styles.usernameLeft,
          ]}
        >
          {props.currentMessage.user.name}
        </Text>
        <Bubble
          {...props}
          wrapperStyle={{
            right: {
              backgroundColor: "#FFB703", // Warm orange for sent messages
              borderRadius: 20, // Rounded edges
              padding: 5,
            },
            left: {
              backgroundColor: "#F5EEDC", // Light cream for received messages
              borderRadius: 20,
              padding: 5,
            },
          }}
          textStyle={{
            right: {
              color: "#fff", // White text for sent messages
            },
            left: {
              color: "#5A3E36", // Dark brown text for received messages
            },
          }}
        />
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
        name: "Petlover",
        avatar:
          "https://e7.pngegg.com/pngimages/663/283/png-clipart-shrek-shrek.png",
      }}
      renderBubble={renderBubble}
      alignTop={true}  // Ensures the messages align at the top of the screen
      listViewProps={{
        contentContainerStyle: { flexGrow: 1, justifyContent: 'flex-start' }, // Ensures the container starts at the top
        scrollEnabled: true,  // Enables scrolling in the chat
      }}
    />
  );
};

const styles = StyleSheet.create({
  username: {
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 5,
    color: "#5A3E36", // Dark brown for usernames
  },
  usernameLeft: {
    alignSelf: "flex-start", // Align to left for received messages
    marginLeft: 10, // Adjust the spacing on the left
  },
  usernameRight: {
    alignSelf: "flex-end", // Align to right for sent messages
    marginRight: 10, // Adjust the spacing on the right
  },
});

export default DogloversPage;