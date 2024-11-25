import SettingOptions from "@/components/SettingOptions";
import TabContainer from "@/components/TabContainer";
import { Colors } from "@/constants/Colors";
import { Gear, Logout, Pencil, Upload, Wallet } from "@/constants/Icons";
import { defaultStyles } from "@/constants/Styles";
import { View, Image, Text, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ProfilePage = () => {
  const inset = useSafeAreaInsets();
  const image = require("@/assets/images/Default_Avatar.png");

  return (
    <TabContainer>
      <View style={[styles.pageContainer, { paddingTop: inset.top }]}>
        <View style={styles.row}>
          <Image source={image} style={styles.avatar} />
          <View style={{ flexDirection: "column", flex: 1 }}>
            <Text style={[defaultStyles.textRegular3, { color: "#91919F" }]}>
              Username
            </Text>
            <Text style={defaultStyles.textTitle2}>John Doe</Text>
          </View>
          <Pencil size={24} colors={Colors.dark100} />
        </View>
        <SettingOptions
          name="Account"
          top
          iconBackground={Colors.violet20}
          icon={<Wallet size={24} colors={Colors.violet100} />}
          path="/(auth)/account"
        />
        <SettingOptions
          name="Settings"
          iconBackground={Colors.violet20}
          icon={<Gear size={24} colors={Colors.violet100} />}
        />
        <SettingOptions
          name="Export Data"
          iconBackground={Colors.violet20}
          icon={<Upload size={24} colors={Colors.violet100} />}
        />
        <SettingOptions
          name="Logout"
          bottom
          iconBackground={Colors.red20}
          icon={<Logout size={24} colors={Colors.red100} />}
          path="/"
        />
      </View>
    </TabContainer>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F6F6F6",
  },
  row: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
    gap: 15,
    paddingTop: 30,
    paddingBottom: 40,
    paddingHorizontal: 32,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
});

export default ProfilePage;
