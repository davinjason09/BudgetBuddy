import { LinearGradient } from "expo-linear-gradient";
import { useSQLiteContext } from "expo-sqlite";
import { Storage } from "expo-sqlite/kv-store";
import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Overview from "@/components/Overview";
import TabContainer from "@/components/TabContainer";
import { Colors } from "@/constants/Colors";
import { Bell } from "@/constants/Icons";
import { defaultStyles } from "@/constants/Styles";
import { getUserAvatar } from "@/utils/Database";

const HomePage = () => {
  const user = Storage.getItemSync("user");
  const user_id = JSON.parse(user!).user_id;
  const db = useSQLiteContext();
  const inset = useSafeAreaInsets();
  const image = getUserAvatar(db, user_id);
  const month = new Date().toLocaleString("id-ID", { month: "long" });

  return (
    <TabContainer>
      <StatusBar style="dark" />
      <View style={[defaultStyles.pageContainer]}>
        <LinearGradient
          style={styles.info}
          colors={["#FFF6E5", "#FFF6E5", "#FFF6E5", Colors.light100]}
        >
          <View
            style={[styles.titleRow, styles.row, { paddingTop: inset.top }]}
          >
            <View style={styles.avatarOverlay}>
              <Image
                source={{ uri: `data:image/png;base64,${image?.avatar}` }}
                style={styles.avatar}
              />
            </View>
            <View style={styles.month}>
              <Text
                style={[defaultStyles.textRegular2, { fontWeight: "bold" }]}
              >
                {month}
              </Text>
            </View>
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
        </LinearGradient>
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
  month: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderColor: "#E4E4ED",
    borderWidth: 1,
    height: 40,
    borderRadius: 20,
  },
  info: {
    height: "42.5%",
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  avatarOverlay: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: Colors.violet80,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  balanceTitle: {
    ...defaultStyles.textRegular1,
    fontWeight: "bold",
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
