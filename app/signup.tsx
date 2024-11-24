import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import Button from "@/components/Button";
import SignUpForm from "@/components/SignUpForm";
import { Colors } from "@/constants/Colors";
import { Google } from "@/constants/Icons";
import { defaultStyles } from "@/constants/Styles";

const SignupPage = () => {
  const router = useRouter();

  return (
    <View style={defaultStyles.pageContainer}>
      <SignUpForm />
      <View style={{ flex: 1, top: 32 }}>
        <Text style={styles.middleText}>or</Text>
        <Button
          title="Sign Up with Google"
          onPress={() => {}}
          iconLeft={<Google size={24} />}
          style={styles.google}
          textStyle={{ color: Colors.dark100 }}
          disabled={false}
          loading={false}
        />

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => router.replace("/login")}
        >
          <Text style={styles.haveAccount}>
            Already have an account? <Text style={styles.login}>Login</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  middleText: {
    ...defaultStyles.textRegular1,
    color: "#91919F",
    fontWeight: "bold",
    marginVertical: 12,
    textAlign: "center",
  },
  google: {
    backgroundColor: Colors.light100,
    borderColor: Colors.light20,
    borderWidth: 1,
  },
  haveAccount: {
    ...defaultStyles.textRegular1,
    color: "#91919F",
    textAlign: "center",
    marginTop: 24,
  },
  login: {
    ...defaultStyles.textRegular1,
    color: Colors.violet100,
    textAlign: "center",
    marginTop: 8,
    textDecorationLine: "underline",
  },
});

export default SignupPage;
