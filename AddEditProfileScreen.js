import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { FontSizeContext } from "./context/FontSizeContext";

const AddEditProfileScreen = ({ route, navigation }) => {
  const { fontSize } = useContext(FontSizeContext);
  const staffId = route.params.staffId;
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState("");
  const [departments, setDepartments] = useState([]);
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");

  useEffect(() => {
    if (staffId) {
      loadStaffData();
    }
  }, [staffId]);

  useEffect(() => {
    fetchDepartments();
  }, []);

  const loadStaffData = async () => {
    try {
      const response = await fetch(`http://localhost:3000/staff/${staffId}`);
      const data = await response.json();
      setName(data.name);
      setPhone(data.phone);
      setDepartment(data.department?.id || "");
      setStreet(data.address.street);
      setCity(data.address.city);
      setState(data.address.state);
      setZip(data.address.zip);
      setCountry(data.address.country);
    } catch (error) {
      console.error("Error loading staff data:", error);
    }
  };

  const fetchDepartments = async () => {
    try {
      const response = await fetch(`http://localhost:3000/departments`);
      // const response = await fetch(`http://172.19.145.149:3000/departments`);
      const data = await response.json();
      setDepartments(data);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  const handleSubmit = async () => {
    const profileData = {
      name,
      phone,
      department: parseInt(department),
      address: { street, city, state, zip, country },
    };

    try {
      const response = await fetch(
        `http://localhost:3000/staff${staffId ? `/${staffId}` : ""}`,
        // `http://172.19.145.149:3000/staff${staffId ? `/${staffId}` : ""}`,
        {
          method: staffId ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(profileData),
        }
      );

      if (response.ok) {
        Alert.alert(
          "Success",
          staffId ? "Profile updated" : "New profile added"
        );
        navigation.goBack();
      } else {
        Alert.alert("Error", "Failed to save profile");
      }
    } catch (error) {
      console.error("Error saving profile data:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { fontSize: fontSize }]}>Name</Text>
      <TextInput
        placeholder="Enter name"
        value={name}
        onChangeText={setName}
        style={[styles.input, { fontSize: fontSize }]}
      />

      <Text style={[styles.label, { fontSize: fontSize }]}>Phone</Text>
      <TextInput
        placeholder="Enter phone number"
        value={phone}
        onChangeText={setPhone}
        style={[styles.input, { fontSize: fontSize }]}
        keyboardType="phone-pad"
      />

      <Text style={[styles.label, { fontSize: fontSize }]}>Department</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={department}
          onValueChange={(itemValue) => setDepartment(itemValue)}
          style={{ fontSize: fontSize }}
        >
          <Picker.Item label="Select Department" value="" />
          {departments.map((dept) => (
            <Picker.Item key={dept.id} label={dept.name} value={dept.id} />
          ))}
        </Picker>
      </View>

      <Text style={[styles.label, { fontSize: fontSize }]}>Street</Text>
      <TextInput
        placeholder="Enter street"
        value={street}
        onChangeText={setStreet}
        style={[styles.input, { fontSize: fontSize }]}
      />

      <Text style={[styles.label, { fontSize: fontSize }]}>City</Text>
      <TextInput
        placeholder="Enter city"
        value={city}
        onChangeText={setCity}
        style={[styles.input, { fontSize: fontSize }]}
      />

      <Text style={[styles.label, { fontSize: fontSize }]}>State</Text>
      <TextInput
        placeholder="Enter state"
        value={state}
        onChangeText={setState}
        style={[styles.input, { fontSize: fontSize }]}
      />

      <Text style={[styles.label, { fontSize: fontSize }]}>Zip Code</Text>
      <TextInput
        placeholder="Enter zip code"
        value={zip}
        onChangeText={setZip}
        style={[styles.input, { fontSize: fontSize }]}
        keyboardType="number-pad"
      />

      <Text style={[styles.label, { fontSize: fontSize }]}>Country</Text>
      <TextInput
        placeholder="Enter country"
        value={country}
        onChangeText={setCountry}
        style={[styles.input, { fontSize: fontSize }]}
      />

      {/* <Button
        title={staffId ? "Update Profile" : "Add Profile"}
        onPress={handleSubmit}
      /> */}
      <TouchableOpacity
        style={[styles.button, { fontSize: fontSize }]}
        onPress={handleSubmit}
      >
        <Text
          style={{ fontSize: fontSize, color: "#ffffff", fontWeight: "bold" }}
        >
          {staffId ? "Update Profile" : "Add Profile"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  label: { fontWeight: "bold", marginBottom: 5 },
  input: { borderBottomWidth: 1, marginBottom: 15, padding: 5 },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#941a1d",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
});

export default AddEditProfileScreen;
