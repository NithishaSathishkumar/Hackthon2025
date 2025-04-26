// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, SafeAreaView } from 'react-native';
// import Login from './Screen/login';

// export default function App() {
//   return (
//     <SafeAreaView style={styles.container}>
//        <Login/>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import AppLoading from 'expo-app-loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from './Screen/LoginScreen';
import SignupScreen from './Screen/SignupScreen';
import WelcomeScreen from './Screen/WelcomeScreen';
import { Colors } from './constants/styles';
import AuthContextProvider, {AuthContext} from './store/auth-context';
import { useContext, useEffect, useState } from 'react';
import IconButton from './components/ui/IconButton';

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  const authCTx = useContext(AuthContext);

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} options={{
        headerRight: ({ tintColor }) => <IconButton icon="exit" color={tintColor} size={24} onPress={authCTx.logout} />
      }

      } />
    </Stack.Navigator>
  );
}

function Navigation() {
  const authCTx = useContext(AuthContext);
  return (
    <NavigationContainer>
      {!authCTx.isAuthenticated && <AuthStack />}
      {authCTx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
   
  );
}

function Root() {
  const [isTryingLogin, setIsTryingLogin] = useState(true);
  const authCTx = useContext(AuthContext);

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem('token');
      
      if (storedToken) {
        authCTx.authenticate(storedToken);
      }

      setIsTryingLogin(false);
    }
    
    fetchToken();   
  }, []);

  if (isTryingLogin) {
    return <AppLoading />;
  }

  return <Navigation />;
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <Root/>
      </AuthContextProvider>
      
    </>
  );
}