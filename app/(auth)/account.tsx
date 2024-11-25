import Button from "@/components/Button";
import { Colors } from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { useRouter } from "expo-router";
import { useWindowDimensions } from "react-native";
import { Image, StyleSheet, Text, View } from "react-native";

const Account = () => {
  const { width } = useWindowDimensions();
  const background = require("@/assets/images/Account_Background.png");
  const router = useRouter();

  const addWallet = () => {
    router.push({
      pathname: "/(actions)/wallet",
      params: { type: "add" },
    });
  };

  return (
    <View style={[defaultStyles.pageContainer]}>
      <View style={styles.contentContainer}>
        <View style={styles.info}>
          <Image source={background} width={width} style={styles.background} />
          <Text style={styles.balanceTitle}>Account Balance</Text>
          <Text style={styles.balance}>$9400</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Button
          title="+ Add New Wallet"
          onPress={addWallet}
          disabled={false}
          loading={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  footer: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 16,
  },
  info: {
    justifyContent: "center",
    alignItems: "center",
    top: 140,
  },
  background: {
    position: "absolute",
  },
  balanceTitle: {
    ...defaultStyles.textRegular1,
    fontWeight: "bold",
    color: "#91919F",
    alignSelf: "center",
    marginBottom: 8,
  },
  balance: {
    ...defaultStyles.textTitle1,
    color: Colors.dark75,
    alignSelf: "center",
    fontSize: 48,
  },
});

export default Account;
