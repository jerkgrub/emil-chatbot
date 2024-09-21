import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import RegisterUserPage from "./screens/RegisterUserPage";
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
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Chats"
            component={AllChatsPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Dog Lovers"
            component={DogloversPage}
            options={{
              title: "Dog Lovers",
              headerStyle: {
                backgroundColor: "#FFB703",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
                fontSize: 24,
              },
              headerTitleAlign: "center",
            }}
          />
          <Stack.Screen
            name="Cat Lovers"
            component={CatloversPage}
            options={{
              title: "Cat Lovers",
              headerStyle: {
                backgroundColor: "#FFB703",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
                fontSize: 24,
              },
              headerTitleAlign: "center",
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

//INF212_MIDTERMPROJ_NUCASA_JERICK_kjUUysuer25Jhs7h212