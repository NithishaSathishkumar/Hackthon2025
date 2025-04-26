import axios from 'axios';
import React from 'react';
import { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, Button, SafeAreaView } from 'react-native';
import { AuthContext } from '../store/auth-context';

function WelcomeScreen({navigation}) {
  const [fetchedMessage, setFetchedMessage] = useState('');
  const authCTx = useContext(AuthContext);
  const token = authCTx.token;

  useEffect(() => {
    axios.get(
      'https://hackthon2025-8a00c-default-rtdb.firebaseio.com/message.json?auth=' + token
    ).then((respone) => {
      setFetchedMessage(respone.data);
    });
  }, [token]);
  
  return (
    // <View style={styles.rootContainer}>
    //   <Text style={styles.title}>Welcome!</Text>
    //   <Text>You authenticated successfully!</Text>
    //   <Text>{fetchedMessage}</Text>
    // </View>
    <SafeAreaView style={styles.container}>
      <Button
        title="Go to Camera"
        onPress={() => navigation.navigate('Camera')}
      />
      <Button
        title="Go to Overview"
        onPress={() => navigation.navigate('Overview')}
      />
      <Button
        title="Go to My Tasks"
        onPress={() => navigation.navigate('MyTasks')}
      />
      <Button
        title="Go to Challenge Start"
        onPress={() => navigation.navigate('ChallengeStart')}
      />

    </SafeAreaView>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});