import Button from "@/components/Button";
import Chip from "@/components/Chip";
import { Colors } from "@/constants/Colors";
import { banks } from "@/constants/Options";
import { defaultStyles } from "@/constants/Styles";
import BottomSheet, {
  BottomSheetFooter,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { FlashList } from "@shopify/flash-list";

import { Stack } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import { useCallback, useMemo, useRef, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

const AccountWallet = () => {
  const { type } = useLocalSearchParams<{ type: string }>();

  const [amount, setAmount] = useState<string>("0");
  const [description, setDescription] = useState<string>("");
  const [source, setSource] = useState<string>("");

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["62%"], []);
  const background = Colors.violet100;
  const title = `${type === "add" ? "Add" : "Edit"} Wallet`;

  const resetValue = () => {
    if (amount === "0") {
      setAmount("");
    } else if (amount === "") {
      setAmount("0");
    }
  };

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
    <View
      style={[defaultStyles.pageContainer, { backgroundColor: background }]}
    >
      <Stack.Screen
        options={{
          title: title,
          headerTitleStyle: styles.pageTitle,
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
              style={[styles.descriptionText, styles.descriptionInput]}
              onChangeText={setDescription}
            />
            <Text style={styles.sourceText}>Source</Text>
            <FlashList
              data={banks}
              extraData={source}
              keyExtractor={(item) => item.value}
              ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
              numColumns={4}
              renderItem={({ item }) => (
                <Chip
                  variant="outlined"
                  query={source}
                  value={item.value}
                  key={item.value}
                  icon={item.icon}
                  text={item.icon ? "" : item.label}
                  style={styles.chip}
                  selectedStyle={styles.activeChip}
                  onPress={() => setSource(item.value)}
                />
              )}
            />
          </BottomSheetView>
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
    fontSize: 16,
    fontWeight: "bold",
  },
  chip: {
    width: 75,
    height: 40,
    backgroundColor: "#F1F1FA",
    borderColor: "#F1F1FA",
    borderRadius: 8,
  },
  activeChip: {
    backgroundColor: Colors.violet20,
    borderColor: Colors.violet100,
  },
});

export default AccountWallet;
