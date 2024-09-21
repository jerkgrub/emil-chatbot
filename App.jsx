import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import RegisterUserPage from "./screens/RegisterUserPage";
import ChatscreenPage from "./screens/DogloversPage";
import AllChatsPage from "./screens/AllChatsPage";
import DogloversPage from "./screens/DogloversPage";
import CatloversPage from "./screens/CatloversPage";

const Stack = createStackNavigator();

const App = () => {
  return (
    <SafeAreaProvider style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Register">
          <Stack.Screen
            name="Register"
            component={RegisterUserPage}
            options={{ headerShown: false }} // Hide top bar
          />
          <Stack.Screen
            name="Chats"
            component={AllChatsPage}
            options={{ headerShown: false }} // Hide top bar
          />
          <Stack.Screen
            name="Dog Lovers"
            component={DogloversPage}
            options={{
              title: "Dog Lovers", // Customize the title
              headerStyle: {
                backgroundColor: "#FFB703", // Match the theme color of the app (same as button color)
              },
              headerTintColor: "#fff", // Set text and icon color to white
              headerTitleStyle: {
                fontWeight: "bold", // Make the title bold
                fontSize: 24, // Adjust font size to fit the theme
              },
              headerTitleAlign: "center", // Align title to the center
            }}
          />
          <Stack.Screen
            name="Cat Lovers"
            component={CatloversPage}
            options={{
              title: "Cat Lovers", // Customize the title
              headerStyle: {
                backgroundColor: "#FFB703", // Match the theme color of the app (same as button color)
              },
              headerTintColor: "#fff", // Set text and icon color to white
              headerTitleStyle: {
                fontWeight: "bold", // Make the title bold
                fontSize: 24, // Adjust font size to fit the theme
              },
              headerTitleAlign: "center", // Align title to the center
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
