import Button from "@/components/Button";
import Picker from "@/components/Picker";
import SliderThumb from "@/components/SliderThumb";
import Switch from "@/components/Switch";
import { Colors } from "@/constants/Colors";
import { DownArrow } from "@/constants/Icons";
import { categories } from "@/constants/Options";
import { defaultStyles } from "@/constants/Styles";
import { addBudget, updateBudget } from "@/utils/Database";

import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Slider } from "@miblanchard/react-native-slider";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { Storage } from "expo-sqlite/kv-store";
import { useEffect, useMemo, useRef, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import Toast from "react-native-toast-message";

const AccountWallet = () => {
  const { type, month, year, data } = useLocalSearchParams<{
    type: string;
    month: string;
    year: string;
    data: string;
  }>();

  const [amount, setAmount] = useState<string>("0");
  const [category, setCategory] = useState<string>("");
  const [alert, setAlert] = useState<boolean>(false);
  const [sliderValue, setSliderValue] = useState<number>(0);

  const db = useSQLiteContext();
  const user = Storage.getItemSync("user");
  const userID = JSON.parse(user!).user_id;
  const bottomSheetRef = useRef<BottomSheet>(null);
  const background = Colors.violet100;
  const title = `${type === "add" ? "Add" : "Edit"} Budget`;
  const snapPoints = useMemo(() => {
    return alert ? ["56%"] : ["50%"];
  }, [alert]);

  useEffect(() => {
    if (type === "edit") {
      const budgetData = JSON.parse(data);
      setAmount(budgetData.amount.toString());
      setCategory(budgetData.category);
      setAlert(budgetData.alert);
      setTimeout(() => {
        setSliderValue(budgetData.percentage);
      }, 0);
    }
  }, []);

  const resetValue = () => {
    if (amount === "0") {
      setAmount("");
    } else if (amount === "") {
      setAmount("0");
    }
  };

  const addOrModifyBudget = () => {
    let error = "";

    if (parseFloat(amount) === 0) {
      error = "Please enter a valid amount";
    } else if (category === "") {
      error = "Please enter a wallet name";
    } else if (alert && !sliderValue) {
      error = "Please select a value for the alert";
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
      if (!alert) setSliderValue(101);
      addBudget(
        db,
        userID,
        parseFloat(amount),
        category,
        +month + 1,
        +year,
        +alert,
        sliderValue,
      ).catch((error) => {
        console.error(error);
      });

      router.back();
    } else {
      if (!alert) setSliderValue(101);
      const budgetData = JSON.parse(data);

      updateBudget(
        db,
        userID,
        budgetData.id,
        parseFloat(amount),
        category,
        +alert,
        sliderValue,
      ).catch((error) => {
        console.error(error);
      });

      router.navigate("/(auth)/(tabs)/budget");
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
            <Text style={styles.amountTitle}>
              How much do you want to spend?
            </Text>
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
            <BottomSheetView style={styles.alert}>
              <View style={{ gap: 4, width: "85%" }}>
                <Text style={defaultStyles.textRegular2}>Receive Alert</Text>
                <Text style={[styles.text, { fontSize: 13 }]}>
                  Receive alert when it reaches{"\n"}some point
                </Text>
              </View>
              <Switch value={alert} setValue={setAlert} />
            </BottomSheetView>
            <View style={{ width: "85%", alignSelf: "center" }}>
              <Slider
                value={sliderValue}
                minimumValue={0}
                maximumValue={100}
                step={1}
                startFromZero={true}
                containerStyle={{ height: 30 }}
                onValueChange={(value) => setSliderValue(value[0])}
                trackStyle={styles.sliderTrack}
                minimumTrackTintColor={Colors.violet100}
                renderThumbComponent={() => (
                  <SliderThumb value={sliderValue as number} />
                )}
              />
            </View>
          </BottomSheetView>
          <View style={styles.buttonContainer}>
            <Button
              title="Continue"
              onPress={addOrModifyBudget}
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
  text: {
    ...defaultStyles.textRegular2,
    color: "#91919F",
  },
  contentContainer: {
    flex: 1,
    gap: 16,
    paddingTop: 24,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    backgroundColor: Colors.light100,
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
  alert: {
    width: "85%",
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
  },
  buttonContainer: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    paddingBottom: 16,
  },
  sliderTrack: {
    backgroundColor: "#E3E5E5",
    height: 8,
    borderRadius: 4,
  },
});

export default AccountWallet;
