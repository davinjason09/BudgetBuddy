import TabContainer from "@/components/TabContainer";
import { Colors } from "@/constants/Colors";
import { View, Text, StyleSheet } from "react-native";

const BudgetPage = () => {
  return (
    <TabContainer>
      <View style={styles.pageContainer}>
        <Text>Budget page</Text>
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

export default BudgetPage;
