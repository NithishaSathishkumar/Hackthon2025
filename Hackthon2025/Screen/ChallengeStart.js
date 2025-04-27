// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
// import { useNavigation } from '@react-navigation/native';

// export default function ChallengeStart() {
//     const [friend, setFriend] = useState('');
//     const navigation = useNavigation();

//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>Good Habit, Better Life!</Text>

//             {/* Custom Start the Challenge Button */}
//             <TouchableOpacity
//                 style={styles.startButton}
//                 onPress={() => navigation.navigate('ChallengeDetail')}
//             >
//                 <Text style={styles.startButtonText}>Start the Challenge</Text>
//             </TouchableOpacity>

//             {/* Find a new friend */}
//             <Text style={styles.label}>Find a New Friend?</Text>
//             <TextInput
//                 style={styles.input}
//                 placeholder="Enter friend's username or email"
//                 value={friend}
//                 onChangeText={setFriend}
//             />
//             <TouchableOpacity
//                 style={styles.addButton}
//                 onPress={() => alert('This will add friend later!')}
//             >
//                 <Text style={styles.addButtonText}>Add Friend</Text>
//             </TouchableOpacity>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         paddingHorizontal: 20,
//         paddingTop: 60,
//         backgroundColor: '#FFE5B4',
//     },
//     title: {
//         marginTop: 20,
//         fontSize: 28,
//         fontWeight: 'bold',
//         color: '#D2691E',
//         textAlign: 'center',
//         marginBottom: 70,
//     },
//     label: {
//         fontSize: 20,
//         color: '#8B4513',
//         marginBottom: 12,
//         marginLeft: 5,
//     },
//     input: {
//         borderWidth: 1,
//         borderColor: '#D2691E',
//         borderRadius: 12,
//         backgroundColor: '#FFF8F0',
//         padding: 10,
//         marginBottom: 20,
//         height: 50,
//     },
//     startButton: {
//         marginBottom: 70,
//         backgroundColor: '#FFDAB9',
//         paddingVertical: 18,
//         borderRadius: 12,
//         alignItems: 'center',
//         justifyContent: 'center',

//     },
//     startButtonText: {
//         fontSize: 22,
//         color: '#8B4513',
//         fontWeight: 'bold',
//     },
//     addButton: {
//         backgroundColor: '#FFDAB9',
//         paddingVertical: 18,
//         borderRadius: 12,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     addButtonText: {
//         fontSize: 22,
//         color: '#8B4513',
//         fontWeight: 'bold',
//     },
// });

import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../store/auth-context';

export default function ChallengeStart() {
  const [friend, setFriend] = useState(''); // To store the friend's email/username
  const [friendData, setFriendData] = useState(null); // To store fetched friend data
  const navigation = useNavigation();
  const authCTx = useContext(AuthContext);
  const token = authCTx.token;

  // Function to fetch data based on friend input
  const fetchFriendData = () => {
    axios
      .get(`https://hackthon2025-8a00c-default-rtdb.firebaseio.com/User.json?auth=${token}`)
      .then((response) => {
        const data = response.data;

        // Find the friend by email or username
        const foundFriend = Object.values(data).find(
          (user) => user.email === friend || user.username === friend
        );

        if (foundFriend) {
          // If friend is found, update the state with their data
          setFriendData(foundFriend);
        } else {
          // If friend is not found, display an alert or a message
          setFriendData(null);
          alert('Friend not found');
        }
      })
      .catch((error) => {
        console.log('Error fetching data:', error);
        alert('Error fetching friend data');
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Good Habit, Better Life!</Text>

      {/* Custom Start the Challenge Button */}
      <TouchableOpacity
        style={styles.startButton}
        onPress={() => navigation.navigate('ChallengeDetail')}
      >
        <Text style={styles.startButtonText}>Start the Challenge</Text>
      </TouchableOpacity>

      {/* Find a new friend */}
      <Text style={styles.label}>Find a New Friend?</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter friend's username or email"
        value={friend}
        onChangeText={setFriend}
        autoCapitalize="none"      
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={fetchFriendData} // Fetch data when "Add Friend" is pressed
      >
        <Text style={styles.addButtonText}>Add Friend</Text>
      </TouchableOpacity>

      {/* Display friend's data if found */}
      {friendData && (
        <View style={styles.friendInfoContainer}>
          <Text style={styles.friendInfoText}>Username: {friendData.username}</Text>
          <Text style={styles.friendInfoText}>Email: {friendData.email}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
    backgroundColor: '#FFE5B4',
  },
  title: {
    marginTop: 20,
    fontSize: 28,
    fontWeight: 'bold',
    color: '#D2691E',
    textAlign: 'center',
    marginBottom: 70,
  },
  label: {
    fontSize: 20,
    color: '#8B4513',
    marginBottom: 12,
    marginLeft: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D2691E',
    borderRadius: 12,
    backgroundColor: '#FFF8F0',
    padding: 10,
    marginBottom: 20,
    height: 50,
  },
  startButton: {
    marginBottom: 70,
    backgroundColor: '#FFDAB9',
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  startButtonText: {
    fontSize: 22,
    color: '#8B4513',
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#FFDAB9',
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    fontSize: 22,
    color: '#8B4513',
    fontWeight: 'bold',
  },
  friendInfoContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#FFDAB9',
    borderRadius: 8,
  },
  friendInfoText: {
    fontSize: 18,
    color: '#8B4513',
    marginBottom: 8,
  },
});

