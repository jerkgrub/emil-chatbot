import React, { useState, useEffect, useCallback } from 'react';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { View, Text, StyleSheet } from 'react-native';
import { io } from 'socket.io-client'; 

const DogloversPage = ({ route }) => {
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const { username = 'Friend' } = route.params || {}; 

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
          name: 'Dogmalou',
          avatar: 'https://www.shutterstock.com/image-vector/dog-head-icon-flat-style-600nw-2473358659.jpg',
        },
      };
      setMessages((previousMessages) => GiftedChat.append(previousMessages, [botMessage]));
    });

    return () => newSocket.close();
  }, []);

  const handleBotResponse = useCallback(async (messageText) => {
    let botResponse = "";

    if (messageText.toLowerCase().includes("random fortune")) {
      socket.emit('talkToBot', "give me a random fortune");
    } else if (messageText.toLowerCase().includes("tell me a joke")) {
      socket.emit('talkToBot', "hey bot tell me a joke");
    } else if (messageText.toLowerCase().includes("what's your name")) {
      botResponse = `My name is Dogmalou, your fluffy friend and loyal assistant, ${username}!`;
    } else if (messageText.toLowerCase().includes("how are you")) {
      botResponse = `Arff arff! I'm pawsome as always, ${username}!`;
    } else if (messageText.toLowerCase().includes("what is love")) {
      botResponse = "Love is a warm belly rub and a wagging tail!";
    } else if (messageText.toLowerCase().includes("what's the weather")) {
      botResponse = `I can't check the weather right now, but it’s always sunny when you're around, ${username}!`;
    } else if (messageText.toLowerCase().includes("what's the time")) {
      botResponse = new Date().toLocaleTimeString();
    } else if (messageText.toLowerCase().includes("give me advice")) {
      botResponse = `Stay loyal, bark less, and chase after your dreams, ${username}!`;
    } else if (messageText.toLowerCase().includes("why is the sky blue")) {
      botResponse = "The sky is blue because it’s the same color as my favorite ball!";
    } else if (messageText.toLowerCase().includes("how can i be happy")) {
      botResponse = `Happiness is a long walk, good company, and maybe a tasty treat or two, ${username}!`;
    } else if (messageText.toLowerCase().includes("what do dogs dream about")) {
      botResponse = "We dream about chasing squirrels, running through fields, and getting endless belly rubs!";
    } else {
      botResponse = `I don't have an answer for that, but I'm a good boy who's always learning, ${username}!`;
    }

    if (botResponse) {
      const botMessage = {
        _id: Math.floor(Math.random() * 1000000),
        text: botResponse,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "Dogmalou",
          avatar: 'https://www.shutterstock.com/image-vector/dog-head-icon-flat-style-600nw-2473358659.jpg',
        },
      };
      setMessages((previousMessages) => GiftedChat.append(previousMessages, [botMessage]));
    }
  }, [socket, username]);

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

export default DogloversPage;

//INF212_MIDTERMPROJ_NUCASA_JERICK_kjUUysuer25Jhs7h212