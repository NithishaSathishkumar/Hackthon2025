import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, ImageBackground, TextInput } from 'react-native';
import { AuthContext } from '../store/auth-context';

function WelcomeScreen({ navigation }) {
  const [fetchedMessage, setFetchedMessage] = useState('');
  const [newMessage, setNewMessage] = useState(''); // To store new data input by the user
  const authCTx = useContext(AuthContext);
  const token = authCTx.token;

  // Function to handle POST request
  const addDataToFirebase = () => {
    const currentDate = new Date().toISOString(); // Get current date in ISO format
    const newData = {
      message: newMessage, // Data entered by the user
      date: currentDate,   // Add the current date to the data
    };

    // POST request to add data to Firebase
    axios
      .post('https://hackthon2025-8a00c-default-rtdb.firebaseio.com/User.json?auth=' + token, newData)
      .then((response) => {
        console.log('Data added to Firebase successfully!');
        console.log('Firebase response:', response.data); // Firebase will return a unique key for the new entry
        if (response.data) {
          console.log('Data was successfully added with key:', response.data.name);
        }
        
        // After adding data, fetch the updated data from Firebase
        fetchDataFromFirebase();
      })
      .catch((error) => {
        console.error('Error adding data to Firebase:', error);
      });
  };

  // Function to fetch data from Firebase
  const fetchDataFromFirebase = () => {
    axios
      .get('https://hackthon2025-8a00c-default-rtdb.firebaseio.com/User.json?auth=' + token)
      .then((response) => {
        setFetchedMessage(response.data); // Update the state with the fetched data
      })
      .catch((error) => {
        console.log('Error fetching data:', error);
      });
  };

  // Fetch data when the component is mounted
  useEffect(() => {
    fetchDataFromFirebase();
  }, [token]);

  // Handle the Enter key press (submit form)
  const handleSubmit = () => {
    if (newMessage.trim()) {
      addDataToFirebase();
      setNewMessage(''); // Clear the input after submission
    }
  };

  return (
    <ImageBackground
      source={require('../background/HomePageBackground.png')}
      style={styles.backgroundImage}
      resizeMode="contain"
    >
      <SafeAreaView style={styles.container}>
        {/* Text input to enter new message */}
        <TextInput
          style={styles.input}
          placeholder="Enter a new message"
          value={newMessage}
          onChangeText={setNewMessage}
          onSubmitEditing={handleSubmit} // Trigger the handleSubmit when Enter is pressed
        />

      <Text>{JSON.stringify(fetchedMessage)}</Text>

        {/* Button to add new data */}
        <Button title="Add Data to Firebase" onPress={addDataToFirebase} />

        {/* Navigation Buttons */}
        <Button title="Go to Camera" onPress={() => navigation.navigate('Camera')} />
        <Button title="Go to Overview" onPress={() => navigation.navigate('Overview')} />
        <Button title="Go to My Tasks" onPress={() => navigation.navigate('MyTasks')} />
        <Button title="Go to Challenge Start" onPress={() => navigation.navigate('ChallengeStart')} />
      </SafeAreaView>
    </ImageBackground>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  messageText: {
    fontSize: 16,
    marginBottom: 20,
    color: '#fff',
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // For readability
    borderRadius: 5,
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 8,
    color: '#000',
  },
});
