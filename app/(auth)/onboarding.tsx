import Button from "@/components/Button";
import { defaultStyles } from "@/constants/Styles";
import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

const Onboarding = () => {
  const router = useRouter();

  return (
    <View style={defaultStyles.pageContainer}>
      <View style={{ width: "85%", alignSelf: "center", gap: 36 }}>
        <Text style={styles.heading}>Let's setup your account!</Text>
        <Text style={styles.subheading}>
          Account can be your bank, credit card or your wallet.
        </Text>
      </View>
      <View style={styles.button}>
        <Button
          title="Let's go"
          onPress={() =>
            router.replace({
              pathname: "/(auth)/(actions)/wallet",
              params: { type: "add", from: "onboarding" },
            })
          }
          loading={false}
          disabled={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    bottom: 24,
    width: "100%",
  },
  heading: {
    ...defaultStyles.textTitle1,
    fontSize: 36,
    marginTop: 104,
  },
  subheading: {
    ...defaultStyles.textRegular3,
    fontSize: 14,
  },
});

export default Onboarding;
