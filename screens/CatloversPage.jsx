import React, { useState, useEffect, useCallback } from 'react';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { View, Text, StyleSheet } from 'react-native';
import { io } from 'socket.io-client'; 

const CatloversPage = () => {
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io('http://192.168.1.7:4000');
    setSocket(newSocket);

    newSocket.on('botResponse', (response) => {
      const botMessage = {
        _id: Math.floor(Math.random() * 1000000),
        text: response,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Catmalou',
          avatar: 'https://i.pinimg.com/736x/47/e3/53/47e3536772c155020b3693b417c51f7e.jpg',
        },
      };
      setMessages((previousMessages) => GiftedChat.append(previousMessages, [botMessage]));
    });

    return () => newSocket.close();
  }, []);

  const handleBotResponse = useCallback((messageText) => {
    let botResponse = "";

    if (messageText.toLowerCase().includes("random fortune")) {
      socket.emit('talkToBot', "give me a random fortune"); 
    } else if (messageText.toLowerCase().includes("tell me a joke")) {
      socket.emit('talkToBot', "hey bot tell me a joke"); 
    } else if (messageText.toLowerCase().includes("what's your name")) {
      botResponse = "I am Whiskers, the feline overlord of this chat.";
    } else if (messageText.toLowerCase().includes("how are you")) {
      botResponse = "Purrfect, just enjoying my ninth life!";
    } else if (messageText.toLowerCase().includes("what is love")) {
      botResponse = "Love is when humans finally understand that we are in charge.";
    } else if (messageText.toLowerCase().includes("what's the weather")) {
      botResponse = "It's always sunny when I'm napping by the window, but I don't care much about the weather unless it rains!";
    } else if (messageText.toLowerCase().includes("what's the time")) {
      botResponse = new Date().toLocaleTimeString();
    } else if (messageText.toLowerCase().includes("give me advice")) {
      botResponse = "Take naps often, stay curious, and always demand attention on your own terms.";
    } else if (messageText.toLowerCase().includes("why is the sky blue")) {
      botResponse = "The sky is blue to complement the elegance of my fur, obviously.";
    } else if (messageText.toLowerCase().includes("how can i be happy")) {
      botResponse = "Happiness is finding the perfect sunspot and a warm lap to sit on.";
    } else if (messageText.toLowerCase().includes("what do cats dream about")) {
      botResponse = "We dream about catching the red dot, endless belly rubs (but only for a minute), and always landing on our feet.";
    } else {
      botResponse = "I don't have an answer for that, but I'm curious like any cat!";
    }

    if (botResponse) {
      const botMessage = {
        _id: Math.floor(Math.random() * 1000000),
        text: botResponse,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "Catmalou",
          avatar: 'https://i.pinimg.com/736x/47/e3/53/47e3536772c155020b3693b417c51f7e.jpg',
        },
      };
      setMessages((previousMessages) => GiftedChat.append(previousMessages, [botMessage]));
    }
  }, [socket]);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) => GiftedChat.append(previousMessages, messages));
    const userMessage = messages[0].text;
    handleBotResponse(userMessage);
  }, [handleBotResponse]);

  const renderBubble = (props) => {
    const isCurrentUser = props.currentMessage.user._id === 1;

    return (
      <View>
        <Text
          style={[styles.username, isCurrentUser ? styles.usernameRight : styles.usernameLeft]}
        >
          {props.currentMessage.user.name}
        </Text>
        <Bubble
          {...props}
          wrapperStyle={{
            right: { backgroundColor: '#FFB703', borderRadius: 20, padding: 5 },
            left: { backgroundColor: '#F5EEDC', borderRadius: 20, padding: 5 },
          }}
          textStyle={{
            right: { color: '#fff' },
            left: { color: '#5A3E36' },
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
        name: 'You',
        avatar: 'https://e7.pngegg.com/pngimages/663/283/png-clipart-shrek-shrek.png',
      }}
      renderBubble={renderBubble}
      alignTop={true}
      listViewProps={{
        contentContainerStyle: { flexGrow: 1, justifyContent: 'flex-start' },
        scrollEnabled: true,
      }}
    />
  );
};

const styles = StyleSheet.create({
  username: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 5,
    color: '#5A3E36',
  },
  usernameLeft: { alignSelf: 'flex-start', marginLeft: 10 },
  usernameRight: { alignSelf: 'flex-end', marginRight: 10 },
});

export default CatloversPage;
