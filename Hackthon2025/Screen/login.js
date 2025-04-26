// login.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function Login({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Welcome! Please log in.</Text>
      <Button
        title="Go to Camera"
        onPress={() => navigation.navigate('Camera')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,                     // ← full screen
    justifyContent: 'center',
    alignItems: 'center',
  },
});