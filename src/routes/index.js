//React
import React from "react";

//Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

//Screen
import HomeBottomTabNavigator from "./homeBottomTabNavigator";
import CreatePost from "../screens/CreatePost";

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={HomeBottomTabNavigator} />
        <Stack.Screen
          options={{ headerShown: true, title: "Post" }}
          name="CreatePost"
          component={CreatePost}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
