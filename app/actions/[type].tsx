import { Stack, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import Attachment from "@/components/Attachment";
import Button from "@/components/Button";
import Picker from "@/components/Picker";
import Switch from "@/components/Switch";
import { Colors } from "@/constants/Colors";
import { DownArrow, Transaction } from "@/constants/Icons";
import { banks, categories } from "@/constants/Options";
import { defaultStyles } from "@/constants/Styles";
import BottomSheet, {
  BottomSheetFooter,
  BottomSheetScrollView,
  BottomSheetView,
} from "@gorhom/bottom-sheet";

const Actions = () => {
  const { type } = useLocalSearchParams<{ type: string }>();

  const [fileData, setFileData] = useState<string>("");
  const [amount, setAmount] = useState<string>("0");
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [wallet, setWallet] = useState<string>("");
  const [repeat, setRepeat] = useState<boolean>(false);

  const title = type.charAt(0).toUpperCase() + type.slice(1);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => {
    if (type === "transfer") return fileData ? ["70%", "90%"] : ["70%"];
    else return fileData ? ["77%", "100%"] : ["77%"];
  }, [fileData]);

  const resetValue = () => {
    if (amount === "0") {
      setAmount("");
    } else if (amount === "") {
      setAmount("0");
    }
  };

  useEffect(() => {
    if (fileData === "") bottomSheetRef.current?.snapToIndex(0);
  }, [fileData]);

  let background: string;

  if (type === "income") {
    background = Colors.green100;
  } else if (type === "expense") {
    background = Colors.red100;
  } else {
    background = Colors.blue100;
  }

  const renderFooter = useCallback(
    (props: any) => (
      <BottomSheetFooter {...props} bottomInset={16}>
        <Button
          title="Continue"
          disabled={false}
          loading={false}
          onPress={() => console.log("Add Transaction")}
        />
      </BottomSheetFooter>
    ),
    [],
  );

  return (
    <KeyboardAvoidingView
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
          footerComponent={renderFooter}
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
                onFocus={resetValue}
                onBlur={resetValue}
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
              {type === "transfer" ? (
                <View style={styles.transfer}>
                  <TextInput
                    placeholder="From"
                    placeholderTextColor={Colors.light20}
                    cursorColor={background}
                    style={[styles.transferText, styles.transferInput]}
                    onChangeText={setFrom}
                  />
                  <TextInput
                    placeholder="To"
                    placeholderTextColor={Colors.light20}
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
                  onChange={setCategory}
                  iconRight={<DownArrow colors={"#91919F"} size={24} />}
                />
              )}
              <TextInput
                placeholder="Description"
                placeholderTextColor={Colors.light20}
                cursorColor={background}
                style={[styles.descriptionText, styles.descriptionInput]}
                onChangeText={setDescription}
              />
              <Picker
                value={wallet}
                data={banks}
                isEditable={true}
                placeholder="Wallet"
                labelField="label"
                valueField="value"
                onChange={setWallet}
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
      </View>
    </KeyboardAvoidingView>
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
});

export default Actions;
