import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useContext, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { FontSizeContext } from "./context/FontSizeContext";

const ProfileDetailsScreen = ({ route, navigation }) => {
  const { fontSize } = useContext(FontSizeContext);
  const staffId = route.params.staffId;
  const [staffDetails, setStaffDetails] = useState(null);

  useFocusEffect(
    useCallback(() => {
      fetchStaffDetails();
    }, [])
  );

  const fetchStaffDetails = async () => {
    try {
      const response = await fetch(`http://localhost:3000/staff/${staffId}`);
      //const response = await fetch(`http://172.19.145.149:3000/staff/${staffId}`);
      const data = await response.json();
      setStaffDetails(data);
    } catch (error) {
      console.error("Error fetching staff details:", error);
    }
  };

  if (!staffDetails) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.name, { fontSize: fontSize + 4 }]}>
        {staffDetails.name}
      </Text>
      <Text style={[styles.info, { fontSize }]}>
        {`Phone: ${staffDetails.phone}`}
      </Text>
      <Text style={[styles.info, { fontSize }]}>
        {`Department: ${staffDetails.department.name}`}
      </Text>
      <Text style={[styles.info, { fontSize }]}>
        {`Address: ${staffDetails.address.street}, ${staffDetails.address.city}, ${staffDetails.address.state}, ${staffDetails.address.zip}, ${staffDetails.address.country}`}
      </Text>

      <TouchableOpacity
        style={[styles.button, { fontSize }]}
        onPress={() => navigation.navigate("AddEditProfile", { staffId })}
      >
        <Text
          style={{ fontSize: fontSize, color: "#ffffff", fontWeight: "bold" }}
        >
          Edit Profile
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  name: { fontWeight: "bold", marginBottom: 10 },
  info: { marginVertical: 5 },
  button: {
    backgroundColor: "#941a1d",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
});

export default ProfileDetailsScreen;
