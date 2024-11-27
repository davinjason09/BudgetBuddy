import Button from "@/components/Button";
import Chip from "@/components/Chip";
import { Colors } from "@/constants/Colors";
import { banks } from "@/constants/Options";
import { defaultStyles } from "@/constants/Styles";
import { addTransaction, addWallet, updateWallet } from "@/utils/Database";
import { formatDateToISO } from "@/utils/DateFormat";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { FlashList } from "@shopify/flash-list";

import { router, Stack } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { Storage } from "expo-sqlite/kv-store";
import { useEffect, useMemo, useRef, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import Toast from "react-native-toast-message";

const AccountWallet = () => {
  const { type, data, balance } = useLocalSearchParams<{
    type: string;
    data: string;
    balance: string;
  }>();

  const [amount, setAmount] = useState<string>("0");
  const [walletName, setWalletName] = useState<string>("");
  const [source, setSource] = useState<string>("");

  const db = useSQLiteContext();
  const user = Storage.getItemSync("user");
  const userID = JSON.parse(user!).user_id;
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["65%"], []);
  const background = Colors.violet100;
  const title = `${type === "add" ? "Add" : "Edit"} Wallet`;

  useEffect(() => {
    if (type === "edit") {
      const walletData = JSON.parse(data);
      const balanceText = balance.replace("$", "");
      setAmount(balanceText);
      setWalletName(walletData.name);
      setSource(walletData.type);
    }
  }, []);

  const resetValue = () => {
    if (amount === "0") {
      setAmount("");
    } else if (amount === "") {
      setAmount("0");
    }
  };

  const addOrModifyWallet = () => {
    console.log("Add or Modify Wallet");
    let error = "";

    if (parseFloat(amount) === 0) {
      error = "Please enter a valid amount";
    } else if (walletName === "") {
      error = "Please enter a wallet name";
    } else if (source === "") {
      error = "Please select a source";
    }

    if (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error,
      });

      return;
    }

    if (type === "add") {
      addWallet(db, userID, walletName, source, parseFloat(amount));
      console.log("Wallet added");
      router.back();
    } else {
      const delta = parseFloat(amount) - parseFloat(balance.replace("$", ""));
      const newName = walletName;
      const oldName = JSON.parse(data).name;
      const walletID = JSON.parse(data).id;

      updateWallet(db, userID, oldName, newName, parseFloat(amount));

      if (delta !== 0) {
        const type = delta > 0 ? "income" : "expense";
        const description = `Wallet manual ${type === "income" ? "top-up" : "withdrawal"}`;
        addTransaction(
          db,
          userID,
          delta,
          formatDateToISO(new Date()),
          type,
          "other",
          description,
          walletID,
          "No attachment provided",
        );
      }
      console.log("Wallet modified", delta);
      router.back();
    }
  };

  return (
    <View
      style={[defaultStyles.pageContainer, { backgroundColor: background }]}
    >
      <Stack.Screen
        options={{
          title: title,
          headerTitleStyle: styles.pageTitle,
          headerRight: () => null,
        }}
      />
      <View style={{ flex: 1, justifyContent: "space-between" }}>
        <BottomSheet
          ref={bottomSheetRef}
          index={0}
          snapPoints={snapPoints}
          backgroundStyle={{ backgroundColor: "transparent" }}
          handleIndicatorStyle={{ backgroundColor: "transparent" }}
          enableOverDrag={false}
          enablePanDownToClose={false}
          enableDynamicSizing={false}
        >
          <BottomSheetView style={styles.amountContainer}>
            <Text style={styles.amountTitle}>Balance</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.amountText}>$</Text>
              <TextInput
                style={[styles.amountText, styles.amountInput]}
                value={amount}
                cursorColor={Colors.light100}
                onChangeText={setAmount}
                onFocus={resetValue}
                onBlur={resetValue}
                keyboardType="number-pad"
              />
            </View>
          </BottomSheetView>
          <BottomSheetView style={styles.contentContainer}>
            <TextInput
              placeholder="Name"
              placeholderTextColor={Colors.light20}
              cursorColor={background}
              value={walletName}
              style={[styles.descriptionText, styles.descriptionInput]}
              onChangeText={setWalletName}
            />
            <Text style={styles.sourceText}>Source</Text>
            <FlashList
              data={banks}
              extraData={source}
              keyExtractor={(item) => item.value}
              estimatedItemSize={8}
              ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
              numColumns={4}
              renderItem={({ item }) => (
                <Chip
                  variant="outlined"
                  editable={type === "add"}
                  query={source}
                  value={item.value}
                  key={item.value}
                  icon={item.icon && item.label !== "Other" ? item.icon : null}
                  text={item.icon && item.label !== "Other" ? "" : item.label}
                  style={styles.chip}
                  selectedStyle={styles.activeChip}
                  onPress={() => setSource(item.value)}
                />
              )}
            />
          </BottomSheetView>
          <View style={styles.buttonContainer}>
            <Button
              title="Continue"
              onPress={addOrModifyWallet}
              disabled={false}
              loading={false}
            />
          </View>
        </BottomSheet>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pageTitle: {
    ...defaultStyles.textTitle3,
    color: Colors.light100,
  },
  amountContainer: {
    paddingHorizontal: 26,
    paddingBottom: 16,
    alignItems: "flex-start",
  },
  amountTitle: {
    ...defaultStyles.textRegular1,
    color: Colors.light100,
    fontSize: 18,
    opacity: 0.64,
  },
  amountText: {
    ...defaultStyles.textTitleX,
    color: Colors.light100,
  },
  amountInput: {
    padding: 0,
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    gap: 16,
    paddingHorizontal: 20,
    paddingTop: 24,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    backgroundColor: Colors.light100,
    justifyContent: "center",
  },
  descriptionText: {
    ...defaultStyles.textRegular1,
    color: Colors.dark100,
    fontSize: 18,
  },
  descriptionInput: {
    height: 56,
    width: "100%",
    alignSelf: "center",
    borderRadius: 16,
    borderColor: Colors.light20,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  sourceText: {
    ...defaultStyles.textRegular1,
    color: Colors.dark100,
    fontSize: 18,
    fontWeight: "bold",
  },
  chip: {
    width: 70,
    height: 45,
    backgroundColor: "#F1F1FA",
    borderColor: "#F1F1FA",
    borderRadius: 8,
    marginHorizontal: 4,
  },
  activeChip: {
    backgroundColor: Colors.violet20,
    borderColor: Colors.violet100,
  },
  buttonContainer: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    paddingBottom: 16,
  },
});

export default AccountWallet;
