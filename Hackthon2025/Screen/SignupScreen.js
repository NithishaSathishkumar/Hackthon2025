import { useContext, useState } from 'react';
import { Alert } from 'react-native';
import axios from 'axios';

import AuthContent from '../components/Auth/AuthContent';
import { createUser } from '../util/auth';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { AuthContext } from '../store/auth-context';

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authCtx = useContext(AuthContext);

  async function signupHandler({ username, email, password }) { // <-- include username!
    setIsAuthenticating(true);

    try {
      const { token, data } = await createUser(email, password); // createUser still only needs email/password
      const uid = data.localId;

      authCtx.authenticate(token);

      const newData = {
        email: email,
        uid: uid,
        username: username, // <-- now properly set
      };

      // Save user data to Firebase
      await axios.put(
        `https://hackthon2025-8a00c-default-rtdb.firebaseio.com/User/${uid}.json?auth=${token}`,
        newData
      );

    } catch (error) {
      Alert.alert(
        'Authentication failed!',
        'Could not create user. Please check your input and try again later!'
      );
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Creating User..." />
  }

  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;
