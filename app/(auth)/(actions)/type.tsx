import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { Storage } from "expo-sqlite/kv-store";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import Toast from "react-native-toast-message";

import Attachment from "@/components/Attachment";
import Button from "@/components/Button";
import InputField from "@/components/InputField";
import Picker from "@/components/Picker";
import Switch from "@/components/Switch";
import { Colors } from "@/constants/Colors";
import { DownArrow, Transaction } from "@/constants/Icons";
import { categories } from "@/constants/Options";
import { defaultStyles } from "@/constants/Styles";
import {
  addTransaction,
  getTransactionByID,
  updateTransaction,
  updateWalletBalance,
} from "@/utils/Database";
import { formatDate, formatDateToISO } from "@/utils/DateFormat";
import { getUserWallets } from "@/utils/Utils";

const Actions = () => {
  const { type, id, action } = useLocalSearchParams<{
    type: string;
    id: string;
    action: string;
  }>();

  const db = useSQLiteContext();
  const router = useRouter();
  const user = JSON.parse(Storage.getItemSync("user")!);
  const userID = user.user_id;
  const userWallets = useMemo(() => getUserWallets(db, userID), [db, userID]);

  const [fileData, setFileData] = useState<string>("");
  const [amount, setAmount] = useState<string>("0");
  const [originalAmount, setOriginalAmount] = useState<string>("0");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [wallet, setWallet] = useState<number>(0);
  const [repeat, setRepeat] = useState<boolean>(false);
  const [openDatePicker, setOpenDatePicker] = useState<boolean>(false);

  const bottomSheetRef = useRef<BottomSheet>(null);
  const title = useMemo(
    () => type.charAt(0).toUpperCase() + type.slice(1),
    [type],
  );
  const snapPoints = useMemo(() => {
    const baseSnap = type === "transfer" ? ["80%"] : ["87%"];
    return fileData ? [...baseSnap, "92%"] : baseSnap;
  }, [fileData, type]);

  const resetAmount = useCallback(() => {
    setAmount((prev) => (prev === "0" ? "" : prev || "0"));
  }, []);

  const handleTransaction = () => {
    console.log("Add Transaction");
    let error = "";

    if (parseFloat(amount) <= 0) {
      error = "Please enter an amount";
    } else if (!selectedDate) {
      error = "Please select a date";
    } else if (!category) {
      error = "Please select a category";
    } else if (!wallet) {
      error = "Please select a wallet";
    }

    if (description === "") setDescription("No description provided");
    if (fileData === "") setFileData("No attachment provided");

    console.log(error);
    if (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error,
      });

      return;
    }

    if (action === "add") {
      addTransaction(
        db,
        userID,
        parseFloat(amount),
        formatDateToISO(selectedDate),
        type,
        category,
        description,
        wallet,
        fileData,
      ).catch((error) => {
        console.log("Error adding transaction: ", error);
      });

      const delta =
        type === "income" ? parseFloat(amount) : -parseFloat(amount);
      updateWalletBalance(db, userID, wallet, delta);
    } else {
      updateTransaction(
        db,
        +id,
        parseFloat(amount),
        formatDateToISO(selectedDate),
        type,
        category,
        description,
        fileData,
      ).catch((error) => {
        console.log("Error updating transaction: ", error);
      });

      const delta = Math.abs(parseFloat(amount) - parseFloat(originalAmount));
      const less = parseFloat(amount) < parseFloat(originalAmount);
      const sign = type === "income" ? 1 : -1;
      const balance = less ? -delta * sign : delta * sign;
      updateWalletBalance(db, userID, wallet, balance);
    }

    router.back();
  };

  useEffect(() => {
    if (fileData === "") bottomSheetRef.current?.snapToIndex(0);
  }, [snapPoints]);

  useEffect(() => {
    if (id && action === "edit") {
      const data = getTransactionByID(db, +id);
      if (data) {
        setOriginalAmount(data.amount.toString());
        setAmount(data.amount.toString());
        setSelectedDate(new Date(data.date));
        setCategory(data.category);
        setWallet(data.wallet_id);
        setDescription(data.description);
        setFileData(data.attachment);
      }
    }
  }, [id]);

  let background: string;

  if (type === "income") {
    background = Colors.green100;
  } else if (type === "expense") {
    background = Colors.red100;
  } else {
    background = Colors.blue100;
  }

  return (
    <View
      style={[defaultStyles.pageContainer, { backgroundColor: background }]}
    >
      <Stack.Screen
        options={{
          title: title,
          headerTitleStyle: { color: Colors.light100 },
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
            <Text style={styles.amountTitle}>How Much</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.amountText}>$</Text>
              <TextInput
                style={[styles.amountText, styles.amountInput]}
                value={amount}
                cursorColor={Colors.light100}
                onChangeText={setAmount}
                onFocus={resetAmount}
                onBlur={resetAmount}
                keyboardType="number-pad"
              />
            </View>
          </BottomSheetView>
          <BottomSheetView style={styles.contentContainer}>
            <BottomSheetScrollView
              contentContainerStyle={{ gap: 16 }}
              keyboardDismissMode={"interactive"}
              keyboardShouldPersistTaps={"handled"}
              showsVerticalScrollIndicator={false}
            >
              <InputField
                placeholder="Date"
                calendar
                value={formatDate(selectedDate)}
                editable={false}
                type="number"
                onPress={() => setOpenDatePicker(true)}
              />
              {openDatePicker && (
                <DateTimePicker
                  mode="date"
                  display="default"
                  maximumDate={new Date()}
                  minimumDate={new Date(1900, 0, 1)}
                  value={selectedDate || new Date()}
                  onChange={(_, selectedDate) => {
                    setOpenDatePicker(false);
                    setSelectedDate(selectedDate || new Date());
                  }}
                />
              )}
              {type === "transfer" ? (
                <View style={styles.transfer}>
                  <TextInput
                    placeholder="From"
                    placeholderTextColor={Colors.light20}
                    value={from}
                    cursorColor={background}
                    style={[styles.transferText, styles.transferInput]}
                    onChangeText={setFrom}
                  />
                  <TextInput
                    placeholder="To"
                    placeholderTextColor={Colors.light20}
                    value={to}
                    cursorColor={background}
                    style={[styles.transferText, styles.transferInput]}
                    onChangeText={setTo}
                  />
                  <View style={styles.transferIcon}>
                    <Transaction
                      size={24}
                      colors={[Colors.violet40, Colors.violet100]}
                    />
                  </View>
                </View>
              ) : (
                <Picker
                  value={category}
                  data={categories}
                  isEditable={true}
                  placeholder="Category"
                  labelField="label"
                  valueField="value"
                  onChange={(item) => setCategory(item)}
                  iconRight={<DownArrow colors={"#91919F"} size={24} />}
                />
              )}
              <InputField
                placeholder="Description"
                selectionColor={background}
                value={description}
                editable={true}
                type="text"
                onChangeText={setDescription}
              />
              <Picker
                value={wallet}
                data={userWallets}
                isEditable={true}
                placeholder="Wallet"
                labelField="label"
                valueField="value"
                onChange={(item) => setWallet(item)}
                iconRight={<DownArrow colors={"#91919F"} size={24} />}
              />
              <Attachment data={fileData} setData={setFileData} />
              {type !== "transfer" && (
                <BottomSheetView style={styles.repeat}>
                  <View style={{ gap: 4 }}>
                    <Text style={defaultStyles.textRegular2}>Repeat</Text>
                    <Text style={[styles.text, { fontSize: 13 }]}>
                      Repeat transaction
                    </Text>
                  </View>
                  <Switch value={repeat} setValue={setRepeat} />
                </BottomSheetView>
              )}
              {fileData && <View style={{ height: 70 }} />}
            </BottomSheetScrollView>
          </BottomSheetView>
        </BottomSheet>
        <View style={styles.buttonContainer}>
          <Button
            title="Continue"
            disabled={false}
            loading={false}
            onPress={handleTransaction}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    paddingTop: 24,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    backgroundColor: Colors.light100,
  },
  transfer: {
    flexDirection: "row",
    width: "85%",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
  },
  transferIcon: {
    position: "absolute",
    backgroundColor: Colors.light100,
    justifyContent: "center",
    alignItems: "center",
    left: "43.5%",
    width: 40,
    height: 40,
    borderRadius: 20,
    borderColor: Colors.light20,
    borderWidth: 1,
  },
  transferText: {
    ...defaultStyles.textRegular1,
    color: Colors.dark100,
    fontSize: 18,
  },
  transferInput: {
    height: 56,
    width: "47%",
    alignSelf: "center",
    borderRadius: 16,
    borderColor: Colors.light20,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  descriptionText: {
    ...defaultStyles.textRegular1,
    color: Colors.dark100,
    fontSize: 18,
  },
  descriptionInput: {
    height: 56,
    width: "85%",
    alignSelf: "center",
    borderRadius: 16,
    borderColor: Colors.light20,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  container: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    height: 56,
    borderWidth: 1,
    borderRadius: 16,
    borderColor: Colors.light20,
    borderStyle: "dashed",
    width: "85%",
  },
  text: {
    ...defaultStyles.textRegular2,
    color: "#91919F",
  },
  repeat: {
    width: "85%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
    paddingHorizontal: 16,
  },
  buttonContainer: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    paddingBottom: 16,
  },
});

export default Actions;
