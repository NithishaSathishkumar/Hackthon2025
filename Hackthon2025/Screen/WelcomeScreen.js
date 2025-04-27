// import axios from 'axios';
// import React, { useContext, useEffect, useState } from 'react';
// import { StyleSheet, Text, View, Button, SafeAreaView, ImageBackground, TextInput } from 'react-native';
// import { AuthContext } from '../store/auth-context';

// function WelcomeScreen({ navigation }) {
//   const [fetchedMessage, setFetchedMessage] = useState('');
//   const [newMessage, setNewMessage] = useState(''); // To store new data input by the user
//   const authCTx = useContext(AuthContext);
//   const token = authCTx.token;

//   //Function to fetch data from Firebase
//   const fetchDataFromFirebase = () => {
//     axios
//       .get('https://hackthon2025-8a00c-default-rtdb.firebaseio.com/User.json?auth=' + token)
//       .then((response) => {
//         setFetchedMessage(response.data); // Update the state with the fetched data
//       })
//       .catch((error) => {
//         console.log('Error fetching data:', error);
//       });
//   };

//   //Fetch data when the component is mounted
//   useEffect(() => {
//     fetchDataFromFirebase();
//   }, [token]);

//   // Handle the Enter key press (submit form)
//   const handleSubmit = () => {
//     if (newMessage.trim()) {
//       addDataToFirebase();
//       setNewMessage(''); // Clear the input after submission
//     }
//   };

//   return (
//     <ImageBackground
//       source={require('../background/HomePageBackground.png')}
//       style={styles.backgroundImage}
//       resizeMode="contain"
      
//     >
//       <SafeAreaView style={styles.container}>

//         {/* Navigation Buttons */}
//         <Button title="Go to Camera" onPress={() => navigation.navigate('Camera')} />
//         <Button title="Go to Overview" onPress={() => navigation.navigate('Overview')} />
//         <Button title="Go to My Tasks" onPress={() => navigation.navigate('MyTasks')} />
//         <Button title="Go to Challenge Start" onPress={() => navigation.navigate('ChallengeStart')} />
//       </SafeAreaView>
//     </ImageBackground>
//   );
// }

// export default WelcomeScreen;

// const styles = StyleSheet.create({
//   backgroundImage: {
//     flex: 1,
//     width: '100%',
//     height: '100%',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 16,
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginBottom: 8,
//   },
//   messageText: {
//     fontSize: 16,
//     marginBottom: 20,
//     color: '#fff',
//     padding: 10,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)', // For readability
//     borderRadius: 5,
//   },
//   input: {
//     height: 40,
//     width: '80%',
//     borderColor: '#ccc',
//     borderWidth: 1,
//     marginBottom: 20,
//     paddingHorizontal: 8,
//     color: '#000',
//   },
// });

// import axios from 'axios';
// import React, { useContext, useEffect, useState } from 'react';
// import { StyleSheet, Text, View, Button, SafeAreaView, ImageBackground, TextInput } from 'react-native';
// import { AuthContext } from '../store/auth-context';

// function WelcomeScreen({ navigation }) {
//   const [fetchedMessage, setFetchedMessage] = useState('');
//   const [newMessage, setNewMessage] = useState(''); // To store new data input by the user
//   const authCTx = useContext(AuthContext);
//   const token = authCTx.token;

//   //Function to fetch data from Firebase
//   const fetchDataFromFirebase = () => {
//     axios
//       .get('https://hackthon2025-8a00c-default-rtdb.firebaseio.com/User.json?auth=' + token)
//       .then((response) => {
//         setFetchedMessage(response.data); // Update the state with the fetched data
//       })
//       .catch((error) => {
//         console.log('Error fetching data:', error);
//       });
//   };

//   //Fetch data when the component is mounted
//   useEffect(() => {
//     fetchDataFromFirebase();
//   }, [token]);

//   // Handle the Enter key press (submit form)
//   const handleSubmit = () => {
//     if (newMessage.trim()) {
//       addDataToFirebase();
//       setNewMessage(''); // Clear the input after submission
//     }
//   };
  
//   return (
//     <ImageBackground
//       source={require('../background/HomePageBackground.png')}
//       style={styles.backgroundImage}
//       resizeMode="contain"
//     >
//       <SafeAreaView style={styles.container}>
//         {/* Display fetched message */}
//         {fetchedMessage && (
          
//   <Text style={styles.messageText}>{JSON.stringify(fetchedMessage)}</Text>
// )}

//         {/* Navigation Buttons */}
//         <Button title="Go to Camera" onPress={() => navigation.navigate('Camera')} />
//         <Button title="Go to Overview" onPress={() => navigation.navigate('Overview')} />
//         <Button title="Go to My Tasks" onPress={() => navigation.navigate('MyTasks')} />
//         <Button title="Go to Challenge Start" onPress={() => navigation.navigate('ChallengeStart')} />
//       </SafeAreaView>
//     </ImageBackground>
//   );
// }

// export default WelcomeScreen;

// const styles = StyleSheet.create({
//   backgroundImage: {
//     flex: 1,
//     width: '100%',
//     height: '100%',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 16,
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginBottom: 8,
//   },
//   messageText: {
//     fontSize: 16,
//     marginBottom: 20,
//     color: '#fff',
//     padding: 10,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)', // For readability
//     borderRadius: 5,
//   },
//   input: {
//     height: 40,
//     width: '80%',
//     borderColor: '#ccc',
//     borderWidth: 1,
//     marginBottom: 20,
//     paddingHorizontal: 8,
//     color: '#000',
//   },
// });

import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, ImageBackground, TextInput } from 'react-native';
import { AuthContext } from '../store/auth-context';

function WelcomeScreen({ navigation }) {
  const [fetchedMessage, setFetchedMessage] = useState('');
  const [newMessage, setNewMessage] = useState(''); // To store new data input by the user
  const authCTx = useContext(AuthContext);
  const token = authCTx.token;
  const emailToFind = 'sathish@gmail.com'; // Email you want to search for

  // Function to fetch data from Firebase
  const fetchDataFromFirebase = () => {
    axios
      .get('https://hackthon2025-8a00c-default-rtdb.firebaseio.com/User.json?auth=' + token)
      .then((response) => {
        const data = response.data;
        console.log(data)

        // Find the user by email
        const user = Object.values(data).find(user => user.email === emailToFind);
        
        if (user) {
          // You can store the entire user data or just a specific field like 'username'
          setFetchedMessage(user.username || 'No username available'); // Example: setting the username
        } else {
          setFetchedMessage('User not found');
        }
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
        {/* Display fetched message */}
        {fetchedMessage && (
          <Text style={styles.messageText}>{fetchedMessage}</Text>
        )}

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
