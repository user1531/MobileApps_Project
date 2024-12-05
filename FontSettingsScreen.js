import React, { useContext } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { FontSizeContext } from "./context/FontSizeContext";

const FontSettingsScreen = ({ navigation }) => {
  const { fontSize, setFontSize } = useContext(FontSizeContext);

  const increaseFontSize = () => {
    setFontSize((prevSize) => (prevSize < 30 ? prevSize + 2 : prevSize));
  };

  const decreaseFontSize = () => {
    setFontSize((prevSize) => (prevSize > 15 ? prevSize - 2 : prevSize));
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.text, { fontSize }]}>Sample Text</Text>
      <View style={styles.buttonContainer}>
        <Button title="Increase Font Size" onPress={increaseFontSize} />
        <Button title="Decrease Font Size" onPress={decreaseFontSize} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { marginBottom: 20 },
  buttonContainer: { flexDirection: "row", marginBottom: 20 },
});

export default FontSettingsScreen;
