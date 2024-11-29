import { Check } from "@/constants/Icons";
import { defaultStyles } from "@/constants/Styles";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

const AllSet = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.replace("/(auth)/(tabs)/home");
    }, 3000);
  }, []);

  return (
    <View style={[defaultStyles.pageContainer, styles.center]}>
      <Check size={96} />
      <Text style={defaultStyles.textTitle2}>You are set!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    width: "100%",
    gap: 32,
  },
});

export default AllSet;
