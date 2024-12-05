import React, { useCallback, useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { FontSizeContext } from "./context/FontSizeContext";

const StaffListScreen = ({ navigation, route }) => {
  const { fontSize } = useContext(FontSizeContext);
  const [staffList, setStaffList] = useState([]);

  useFocusEffect(
    useCallback(() => {
      fetchStaffData();
    }, [])
  );

  const fetchStaffData = async () => {
    try {
      const response = await fetch("http://localhost:3000/staff");
      // const response = await fetch(`http://172.19.145.149:3000/staff`);
      const data = await response.json();
      setStaffList(data);
    } catch (error) {
      console.error("Error fetching staff data:", error);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() =>
        navigation.navigate("ProfileDetails", { staffId: item.id })
      }
    >
      <Text style={[styles.name, { fontSize: fontSize + 2 }]}>{item.name}</Text>
      <Text style={[styles.department, { fontSize }]}>
        {item.department ? item.department.name : "Unknown Department"}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={staffList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("AddEditProfile", { staffId: null })}
      >
        <Text style={styles.addButtonText}>Add</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.settingsButton}
        onPress={() => navigation.navigate("FontSettings")}
      >
        <Text style={[styles.settingsButtonText, { fontSize }]}>
          Font Settings
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  item: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
  },
  name: { fontWeight: "bold" },
  department: { color: "gray" },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#941a1d",
    padding: 15,
    borderRadius: 30,
    elevation: 5,
  },
  addButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  settingsButton: {
    position: "absolute",
    bottom: 80,
    right: 20,
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 30,
    elevation: 5,
  },
  settingsButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default StaffListScreen;
