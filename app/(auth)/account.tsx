import Button from "@/components/Button";
import WalletInfo from "@/components/WalletInfo";
import { Colors } from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import {
  addTransaction,
  getAllWallets,
  getCurrentBalance,
} from "@/utils/Database";
import { useIsFocused } from "@react-navigation/native";
import { FlashList } from "@shopify/flash-list";
import { useFocusEffect } from "expo-router";
import { useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { Storage } from "expo-sqlite/kv-store";
import { useCallback, useState } from "react";
import { useWindowDimensions } from "react-native";
import { Image, StyleSheet, Text, View } from "react-native";

const Account = () => {
  const { width } = useWindowDimensions();

  const [wallets, setWallets] = useState<any[]>([]);

  const db = useSQLiteContext();
  const isFocused = useIsFocused();
  const router = useRouter();
  const user = Storage.getItemSync("user");
  const userID = JSON.parse(user!).user_id;
  const background = require("@/assets/images/Account_Background.png");
  const balance = getCurrentBalance(db, userID);

  useFocusEffect(
    useCallback(() => {
      if (isFocused) setWallets(getAllWallets(db, userID));
      console.log(wallets);
    }, [isFocused]),
  );

  const addWallet = () => {
    router.push({
      pathname: "/(auth)/(actions)/wallet",
      params: { type: "add" },
    });
  };

  return (
    <View style={[defaultStyles.pageContainer, { gap: 16 }]}>
      <View style={{ flex: 1 }}>
        <View style={styles.info}>
          <Image source={background} width={width} />
          <View style={{ position: "absolute" }}>
            <Text style={styles.balanceTitle}>Account Balance</Text>
            <Text style={styles.balance}>${balance!.balance}</Text>
          </View>
        </View>

        <View style={styles.flashListContainer}>
          <FlashList
            data={wallets}
            estimatedItemSize={15}
            keyExtractor={(item) => item.name + item.type}
            ItemSeparatorComponent={() => (
              <View style={defaultStyles.separator} />
            )}
            renderItem={({ item }) => <WalletInfo data={item} />}
          />
        </View>
      </View>

      <View style={styles.button}>
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
    position: "absolute",
    backgroundColor: Colors.red100,
    bottom: 16,
    flex: 1,
  },
  info: {
    justifyContent: "center",
    alignItems: "center",
  },
  flashListContainer: {
    height: 500,
    marginTop: 16,
    marginBottom: 80,
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
  button: {
    position: "absolute",
    bottom: 110,
    alignSelf: "center",
    width: "100%",
  },
});

export default Account;
