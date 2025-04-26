import { Text, TextInput, View, StyleSheet, SafeAreaView } from "react-native";

function Login() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Login</Text>
    </SafeAreaView>
  );
} 

export default Login;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'red',

    },
});