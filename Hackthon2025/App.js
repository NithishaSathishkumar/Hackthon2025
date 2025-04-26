// App.js
import React from 'react';
import { Button, SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './Screen/login';
import CameraApp from './Screen/camera';
import Overview from './Screen/overview';
import MyTasks from './Screen/mytasks';

const Stack = createNativeStackNavigator();


function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Button
        title="Go to Camera"
        onPress={() => navigation.navigate('Camera')}
      />
      <Button
        title="Go to Login"
        onPress={() => navigation.navigate('Login')}
      />
      {/* add more buttons for other screens */}
      <Button
        title="Go to Overview"
        onPress={() => navigation.navigate('Overview')}
      />

      <Button
        title="Go to My Tasks"
        onPress={() => navigation.navigate('MyTasks')}
      />

    </SafeAreaView>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerTitleAlign: 'center' }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Camera" component={CameraApp} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Overview" component={Overview} />
        <Stack.Screen name="MyTasks" component={MyTasks} />
        {/* register more screens here */}
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});