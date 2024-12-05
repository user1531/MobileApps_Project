import React, { useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import StaffListScreen from "./StaffListScreen";
import ProfileDetailsScreen from "./ProfileDetailsScreen";
import AddEditProfileScreen from "./AddEditProfileScreen";
import FontSettingsScreen from "./FontSettingsScreen";
import { FontSizeProvider, FontSizeContext } from "./context/FontSizeContext";
// import logo from "./assets/logo.png";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <FontSizeProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </FontSizeProvider>
  );
}

function AppNavigator() {
  const { fontSize } = useContext(FontSizeContext);

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: {
          fontSize: fontSize + 4,
        },
      }}
    >
      <Stack.Screen name="StaffList" component={StaffListScreen} />
      <Stack.Screen name="ProfileDetails" component={ProfileDetailsScreen} />
      <Stack.Screen name="AddEditProfile" component={AddEditProfileScreen} />
      <Stack.Screen name="FontSettings" component={FontSettingsScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
