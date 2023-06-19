import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ShopDetail from './screens/ShopDetail';
import RecipeScreen from './screens/RecipeScreen';
import RecipeDetail from './screens/RecipeDetail';

const Stack = createNativeStackNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    'Montserrat': require('./assets/fonts/Montserrat-Regular.ttf'), // change this to the correct path
  });

  if (!fontsLoaded) {
    return <View />;
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
          <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />
          <Stack.Screen options={{ headerShown: false }} name="ShopDetail" component={ShopDetail} />
          <Stack.Screen options={{ headerShown: false }} name="Recipe" component={RecipeScreen} />
          <Stack.Screen options={{ headerShown: false }} name="RecipeDetail" component={RecipeDetail} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
