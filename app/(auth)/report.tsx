import Button from "@/components/Button";
import CategoryInfo from "@/components/CategoryInfo";
import DonutChart from "@/components/DonutChart";
import DropDown from "@/components/DropdownMonthSelector";
import LineGraph from "@/components/LineGraph";
import Picker from "@/components/Picker";
import SwitchSelector, { SwitchItem } from "@/components/SwitchSelector";
import TransactionInfo from "@/components/TransactionInfo";
import { Colors } from "@/constants/Colors";
import { DownArrow, Graph, PieChart, Sort } from "@/constants/Icons";
import { months, types } from "@/constants/Options";
import { defaultStyles } from "@/constants/Styles";
import {
  getMonthlyTransactionsByType,
  getMonthlyTransactionSumByCategory,
} from "@/utils/Database";
import { getGraphData } from "@/utils/GraphData";

import { FlashList } from "@shopify/flash-list";
import { useSQLiteContext } from "expo-sqlite";
import { Storage } from "expo-sqlite/kv-store";
import { useEffect, useRef, useState } from "react";
import { useWindowDimensions } from "react-native";
import { StyleSheet, Text, View } from "react-native";

const Report = () => {
  const { width } = useWindowDimensions();

  const [open, setOpen] = useState<boolean>(false);
  const [dropdown, setDropdown] = useState<boolean>(false);
  const [type, setType] = useState<string>("expense");
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [monthID, setMonthID] = useState<number>(new Date().getMonth());
  const [value, setValue] = useState<number>(0);
  const [dataType, setDataType] = useState<string>("transaction");

  const db = useSQLiteContext();
  const userID = JSON.parse(Storage.getItemSync("user")!).user_id;
  const currentYear = new Date().getFullYear();
  const flashListRef = useRef<FlashList<any>>(null);

  useEffect(() => {
    if (open) setDropdown(true);
    else setTimeout(() => setDropdown(false), 300);
  }, [open]);

  useEffect(() => {
    if (flashListRef.current)
      flashListRef.current.scrollToIndex({ index: value, animated: true });
  }, [value]);

  const data = getGraphData({
    monthID,
    year,
    type,
    id: value,
  });

  const transactionData =
    dataType === "transaction"
      ? getMonthlyTransactionsByType(db, userID, monthID + 1, year, type)
      : getMonthlyTransactionSumByCategory(db, userID, monthID + 1, year, type);

  const sum = transactionData.reduce(
    (acc: number, item: any) => acc + item.amount,
    0,
  );

  const graphOptions: SwitchItem[] = [
    {
      id: 0,
      icon: (selected) => (
        <Graph
          size={28}
          colors={selected ? Colors.light100 : Colors.violet100}
        />
      ),
      value: 0,
    },
    {
      id: 1,
      icon: (selected) => (
        <PieChart
          size={24}
          colors={selected ? Colors.light100 : Colors.violet100}
        />
      ),
      value: 1,
    },
  ];

  const typeOptions: SwitchItem[] = [
    { id: 0, value: "expense", name: "Expense" },
    { id: 1, value: "income", name: "Income" },
  ];

  const graph = [
    { id: 1, item: <LineGraph data={data} width={width} />, value: 100 },
    { id: 2, item: <DonutChart data={data} />, value: 200 },
  ];

  return (
    <View style={defaultStyles.pageContainer}>
      <View style={styles.row}>
        <Button
          title={`${months[monthID].short}${year === currentYear ? "" : ` ${year}`}`}
          onPress={() => setOpen(true)}
          iconLeft={<DownArrow size={20} colors={Colors.violet100} />}
          style={styles.selectorButton}
          textStyle={styles.selectorText}
          disabled={false}
          loading={false}
        />
        <SwitchSelector
          items={graphOptions}
          value={value}
          onChange={(value) => setValue(value)}
          containerStyle={styles.graphSwitch}
          sliderStyle={styles.graphSelected}
        />
      </View>

      <FlashList
        data={graph}
        horizontal
        estimatedItemSize={200}
        ref={flashListRef}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <View
            style={{
              width,
              height: 200,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {item.item}
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />

      <SwitchSelector
        items={typeOptions}
        value={type}
        onChange={(value) => setType(value)}
        containerStyle={styles.typeSwitch}
        sliderStyle={styles.typeSelected}
        textStyle={defaultStyles.textRegular1}
        activeTextStyle={{ color: Colors.light100 }}
      />

      <View style={[styles.row, { paddingVertical: 0, paddingTop: 12 }]}>
        <Picker
          iconLeft={<DownArrow size={20} colors={Colors.violet100} />}
          data={types}
          value={dataType}
          onChange={(value) => setDataType(value)}
          isEditable={true}
          labelField="label"
          valueField="value"
          style={{ width: 170, height: 40 }}
        />
        <View style={styles.filter}>
          <Sort size={20} colors={Colors.dark100} />
        </View>
      </View>

      <FlashList
        data={transactionData}
        estimatedItemSize={100}
        contentContainerStyle={{ paddingVertical: 12 }}
        keyExtractor={(item: any) => item.id?.toString() || item.category}
        renderItem={({ item }) =>
          dataType === "transaction" ? (
            <TransactionInfo data={item} />
          ) : (
            <CategoryInfo data={item} sum={sum} />
          )
        }
        ItemSeparatorComponent={() => (
          <View style={{ height: dataType === "transaction" ? 8 : 24 }} />
        )}
        ListFooterComponent={() => <View style={{ height: 24 }} />}
      />

      {dropdown && (
        <DropDown
          backdropPress={() => setOpen(false)}
          opened={open}
          year={year}
          setYear={setYear}
          monthID={monthID}
          setMonthID={setMonthID}
          style={{ top: 60 }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  selectorButton: {
    paddingHorizontal: 10,
    justifyContent: "space-between",
    minWidth: 75,
    maxWidth: 90,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.light40,
    backgroundColor: Colors.light100,
  },
  selectorText: {
    ...defaultStyles.textRegular3,
    color: Colors.dark100,
    fontSize: 18,
  },
  graphSwitch: {
    width: 96,
    height: 48,
    borderColor: Colors.light40,
    borderRadius: 8,
    borderWidth: 1,
    backgroundColor: Colors.light100,
  },
  graphSelected: {
    backgroundColor: Colors.violet100,
    borderRadius: 0,
  },
  typeSwitch: {
    width: "91%",
    height: 56,
    alignSelf: "center",
    borderRadius: 32,
    backgroundColor: Colors.light60,
  },
  typeSelected: {
    backgroundColor: Colors.violet100,
    borderRadius: 32,
    height: 48,
  },
  filter: {
    width: 40,
    height: 40,
    borderRadius: 8,
    borderColor: Colors.light40,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Report;
