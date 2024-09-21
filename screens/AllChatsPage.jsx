import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const AllChatsPage = ({ navigation, route }) => {
  const { username } = route.params || {}; 

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Welcome, {username || 'Guest'}</Text> 
        <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.navigate('Register')}>
          <Icon name="sign-out-alt" size={20} color="#fff" style={styles.logoutIcon} />
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.chatOption}>
        <Text style={styles.chatLabel}>Dogmalou (For Dog Lovers) 🐶</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Dog Lovers', { username })}>
          <Text style={styles.buttonText}>Join Chat</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.chatOption}>
        <Text style={styles.chatLabel}>Catmalou (For Cat Lovers)  🐱</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Cat Lovers', { username })}>
          <Text style={styles.buttonText}>Join Chat</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 16,
    backgroundColor: '#EDE7E3',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 0,
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
    flexDirection: 'row',
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

//INF212_MIDTERMPROJ_NUCASA_JERICK_kjUUysuer25Jhs7h212