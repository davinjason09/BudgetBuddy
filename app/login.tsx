import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import LoginForm from "@/components/LoginForm";
import { Colors } from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";

const LoginPage = () => {
  const router = useRouter();

  return (
    <View style={defaultStyles.pageContainer}>
      <LoginForm />
      <View style={{ flex: 1, top: -48 }}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => router.push("/forgotpass")}
        >
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => router.replace("/signup")}
        >
          <Text style={styles.haveAccount}>
            Don't have an account yet? <Text style={styles.login}>Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  haveAccount: {
    ...defaultStyles.textRegular1,
    color: "#91919F",
    textAlign: "center",
  },
  login: {
    ...defaultStyles.textRegular1,
    color: Colors.violet100,
    textAlign: "center",
    marginTop: 8,
    textDecorationLine: "underline",
  },
  forgot: {
    ...defaultStyles.textTitle3,
    color: Colors.violet100,
    textAlign: "center",
    marginBottom: 36,
  },
});

export default LoginPage;
