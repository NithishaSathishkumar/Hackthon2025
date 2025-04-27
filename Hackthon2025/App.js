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
import CameraApp from './Screen/camera';
import Overview from './Screen/overview';
import MyTasks from './Screen/mytasks';
import ChallengeDetail from './Screen/ChallengeDetail';
import ChallengeStart from './Screen/ChallengeStart';

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
        //headerShown: false,
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      {/* <Stack.Screen
        name="Welcome"
        component={WelcomeScreen} options={{
          headerRight: ({ tintColor }) =>
            <IconButton
              icon="exit"
              color={tintColor}
              size={24}
              onPress={authCTx.logout}
            />
      }

      } /> */}

      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="exit"
              color={tintColor}
              size={24}
              onPress={authCTx.logout}
            />
          ),
        }}
      />
      <Stack.Screen name="Camera" component={CameraApp} />
      <Stack.Screen name="Overview" component={Overview} />
      <Stack.Screen name="MyTasks" component={MyTasks} />
      <Stack.Screen name="ChallengeStart" component={ChallengeStart} />
      <Stack.Screen name="ChallengeDetail" component={ChallengeDetail} />

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