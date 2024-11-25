import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Button from "@/components/Button";
import Chip from "@/components/Chip";
import TabContainer from "@/components/TabContainer";
import { Colors } from "@/constants/Colors";
import { Calendar, DownArrow, Filter, RightChevron } from "@/constants/Icons";
import { filters, sorts } from "@/constants/Options";
import { defaultStyles } from "@/constants/Styles";
import {
  BottomSheetBackdrop,
  BottomSheetFooter,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { FlashList } from "@shopify/flash-list";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const TransactionPage = () => {
  const inset = useSafeAreaInsets();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["68%"], []);

  const [date, setDate] = useState<Date>(new Date());
  const [open, setOpen] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>("income");
  const [sort, setSort] = useState<string>("highest");

  useEffect(() => {
    console.log("Current query:", filter);
  }, [filter]);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        pressBehavior={"close"}
      />
    ),
    [],
  );

  const renderFooter = useCallback(
    (props: any) => (
      <BottomSheetFooter {...props} bottomInset={16}>
        <Button
          title="Apply"
          onPress={() => {}}
          disabled={false}
          loading={false}
        />
      </BottomSheetFooter>
    ),
    [],
  );

  const handlePress = () => {
    bottomSheetModalRef.current?.present();
  };

  const resetValue = () => {
    setFilter("income");
    setSort("highest");
  };

  return (
    <TabContainer>
      <View style={[defaultStyles.pageContainer, { paddingTop: inset.top }]}>
        <View style={styles.row}>
          <View>
            <Button
              title="Today"
              onPress={() => setOpen(true)}
              iconLeft={<Calendar size={22} colors={Colors.dark100} />}
              iconRight={<DownArrow size={22} colors={Colors.dark100} />}
              style={styles.selectorButton}
              textStyle={styles.selectorText}
              disabled={false}
              loading={false}
            />
          </View>
          <TouchableOpacity style={styles.filter} onPress={handlePress}>
            <Filter size={20} colors={Colors.dark100} />
          </TouchableOpacity>
        </View>

        <Button
          title="See your financial report"
          onPress={() => {}}
          iconRight={<RightChevron size={20} colors={Colors.violet100} />}
          style={styles.button}
          textStyle={styles.buttonText}
          disabled={false}
          loading={false}
        />
      </View>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        footerComponent={renderFooter}
        handleIndicatorStyle={{ backgroundColor: Colors.violet40, width: 36 }}
        backgroundStyle={{ borderTopLeftRadius: 32, borderTopRightRadius: 32 }}
        enableOverDrag={false}
        enableDynamicSizing={false}
      >
        <BottomSheetView style={{ paddingHorizontal: 16, gap: 16 }}>
          <BottomSheetView style={[styles.row, { paddingHorizontal: 0 }]}>
            <Text style={[defaultStyles.textTitle3, { fontWeight: "bold" }]}>
              Filter transaction
            </Text>
            <Button
              title="Reset"
              onPress={resetValue}
              style={styles.reset}
              textStyle={[styles.buttonText, { fontSize: 14 }]}
              disabled={false}
              loading={false}
            />
          </BottomSheetView>
          <Text style={[defaultStyles.textTitle3, { fontWeight: "bold" }]}>
            Filter by
          </Text>
          <FlashList
            data={filters}
            extraData={filter}
            keyExtractor={(item) => item.value}
            estimatedItemSize={3}
            horizontal
            ItemSeparatorComponent={() => <View style={{ width: 8 }} />}
            renderItem={({ item }) => (
              <Chip
                variant="outlined"
                query={filter}
                text={item.label}
                value={item.value}
                style={{ width: 104, height: 42 }}
                onPress={(value) => setFilter(value)}
              />
            )}
          />
          <Text style={[defaultStyles.textTitle3, { fontWeight: "bold" }]}>
            Sort by
          </Text>
          <BottomSheetView style={{ width: "100%", height: 98 }}>
            <FlashList
              data={sorts}
              extraData={sort}
              keyExtractor={(item) => item.value}
              estimatedItemSize={4}
              ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
              numColumns={3}
              renderItem={({ item }) => (
                <Chip
                  variant="outlined"
                  query={sort}
                  text={item.label}
                  value={item.value}
                  style={{ width: 100, height: 42 }}
                  onPress={(value) => setSort(value)}
                />
              )}
            />
          </BottomSheetView>
          <Text style={[defaultStyles.textTitle3, { fontWeight: "bold" }]}>
            Category
          </Text>
        </BottomSheetView>
      </BottomSheetModal>
    </TabContainer>
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
    width: 144,
    height: 40,
    gap: 8,
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
  filter: {
    width: 40,
    height: 40,
    borderRadius: 8,
    borderColor: Colors.light40,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: "91%",
    alignSelf: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.violet20,
    paddingHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
  },
  buttonText: {
    ...defaultStyles.textRegular2,
    color: Colors.violet100,
    fontSize: 18,
  },
  reset: {
    width: 72,
    height: 32,
    backgroundColor: Colors.violet20,
  },
});

export default TransactionPage;
