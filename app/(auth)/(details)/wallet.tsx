import TransactionDetail from "@/components/TransactionDetail";
import { Colors } from "@/constants/Colors";
import { Pencil } from "@/constants/Icons";
import { banks } from "@/constants/Options";
import { defaultStyles } from "@/constants/Styles";
import { getTransactionsByWallet } from "@/utils/Database";
import { FlashList } from "@shopify/flash-list";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { Storage } from "expo-sqlite/kv-store";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const WalletDetails = () => {
  const { data, balance } = useLocalSearchParams<{
    data: string;
    balance: string;
  }>();

  const db = useSQLiteContext();
  const user = Storage.getItemSync("user");
  const userID = JSON.parse(user!).user_id;
  const router = useRouter();
  const walletData = JSON.parse(data);
  const activityData = getTransactionsByWallet(db, userID, walletData.id);

  const icon = banks.find((b) => b.value === walletData.type)!.icon;

  return (
    <View style={defaultStyles.pageContainer}>
      <Stack.Screen
        options={{
          headerRight: () => (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                router.push({
                  pathname: "/(auth)/(actions)/wallet",
                  params: { type: "edit", data: data, balance: balance },
                })
              }
              style={defaultStyles.arrowContainer}
            >
              <Pencil size={20} colors={Colors.dark100} />
            </TouchableOpacity>
          ),
        }}
      />
      <View style={styles.walletInfo}>
        <View style={{ gap: 8 }}>
          <View style={styles.icon}>{icon}</View>
          <Text style={defaultStyles.textTitle2}>{walletData.name}</Text>
        </View>
        <Text style={defaultStyles.textTitle1}>{balance}</Text>
      </View>

      <FlashList
        data={activityData}
        estimatedItemSize={100}
        keyExtractor={(item: any) => item.id.toString()}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        renderItem={({ item }) => <TransactionDetail data={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  walletInfo: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    gap: 12,
    marginBottom: 50,
  },
  icon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: Colors.light60,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
});

export default WalletDetails;
