import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const AllChatsPage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Title and Logout button in the same row */}
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Your Chats</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.navigate('Register')}>
          <Icon name="sign-out-alt" size={20} color="#fff" style={styles.logoutIcon} />
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.chatOption}>
        <Text style={styles.chatLabel}>Dog Lovers Group 🐶
        </Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Dog Lovers')}>
          <Text style={styles.buttonText}>Join Chat</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.chatOption}>
        <Text style={styles.chatLabel}>Cat Lovers Group 🐱
        </Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Cat Lovers')}>
          <Text style={styles.buttonText}>Join Chat</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', // Align items at the top
    padding: 16,
    backgroundColor: '#EDE7E3',
  },
  headerContainer: {
    flexDirection: 'row', // Align title and button in a row
    justifyContent: 'space-between', // Space them out
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    color: '#5A3E36',
    fontWeight: 'bold',
  },
  chatOption: {
    marginVertical: 7,
    padding: 20,
    width: '100%',
    backgroundColor: '#FAF4F0',
    borderRadius: 15,
    borderColor: '#FFB703',
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  chatLabel: {
    fontSize: 20,
    marginBottom: 12,
    color: '#5A3E36',
  },
  button: {
    backgroundColor: '#FFB703',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButton: {
    flexDirection: 'row', // Icon and text in one row
    backgroundColor: '#FF6347',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  logoutIcon: {
    marginRight: 5,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AllChatsPage;