import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const RegisterUserPage = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    if (username.trim() === '') {
      Alert.alert("Invalid Username", "Please enter a valid username");
      return;
    }
    if (password.trim() === '') {
      Alert.alert("Invalid Password", "Password cannot be empty");
      return;
    }
    
    navigation.navigate('Chats', { username });
  };

  return (
    <View style={styles.container}>
      <Icon name="dog" size={120} color="#5A3E36" style={styles.icon} />
      <Text style={styles.title}>Welcome to Petmalou!</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        placeholderTextColor="#aaa"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#aaa"
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleRegister}
      >
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#F5EEDC',
  },
  icon: {
    textAlign: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    marginBottom: 30,
    textAlign: 'center',
    color: '#5A3E36',
    fontWeight: 'bold',
  },
  input: {
    height: 45,
    borderColor: '#E4B363',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 16,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#FFB703',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default RegisterUserPage;

//INF212_MIDTERMPROJ_NUCASA_JERICK_kjUUysuer25Jhs7h212