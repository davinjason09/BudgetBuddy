import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Overview from "@/components/Overview";
import TabContainer from "@/components/TabContainer";
import { Colors } from "@/constants/Colors";
import { Bell } from "@/constants/Icons";
import { defaultStyles } from "@/constants/Styles";

const HomePage = () => {
  const inset = useSafeAreaInsets();
  const image = require("@/assets/images/Default_Avatar.png");

  return (
    <TabContainer>
      <StatusBar style="dark" />
      <View style={[defaultStyles.pageContainer]}>
        <View style={styles.info}>
          <View
            style={[styles.titleRow, styles.row, { paddingTop: inset.top }]}
          >
            <Image source={image} style={styles.avatar} />
            <Bell colors={Colors.violet100} size={24} />
          </View>
          <View style={{ justifyContent: "center", alignSelf: "center" }}>
            <Text style={styles.balanceTitle}>Account Balance</Text>
            <Text style={styles.balance}>$9400</Text>
          </View>
          <View style={[styles.row, { paddingTop: 27, gap: 16 }]}>
            <Overview type="income" amount={5000} />
            <Overview type="expense" amount={1200} />
          </View>
        </View>
      </View>
    </TabContainer>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
  },
  titleRow: {
    width: "100%",
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  info: {
    height: "42.5%",
    backgroundColor: "#FFF6E5",
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  balanceTitle: {
    ...defaultStyles.textRegular1,
    color: "#91919F",
    alignSelf: "center",
    marginBottom: 9,
  },
  balance: {
    ...defaultStyles.textTitle1,
    color: Colors.dark75,
    alignSelf: "center",
    fontSize: 48,
  },
});

export default HomePage;
