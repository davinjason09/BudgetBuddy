import TabContainer from "@/components/TabContainer";
import { Colors } from "@/constants/Colors";
import { View, Text, StyleSheet } from "react-native";

const ProfilePage = () => {
  return (
    <TabContainer>
      <View style={styles.pageContainer}>
        <Text>Profile page</Text>
      </View>
    </TabContainer>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.light100,
  },
});

export default ProfilePage;
