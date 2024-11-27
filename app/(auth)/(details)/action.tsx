import Button from "@/components/Button";
import { Colors } from "@/constants/Colors";
import { Trash } from "@/constants/Icons";
import { defaultStyles } from "@/constants/Styles";
import { getTransactionByID, getWalletName } from "@/utils/Database";
import { formatDayDate, formatTime } from "@/utils/DateFormat";
import { toTitleCase } from "@/utils/Utils";
import { Stack } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import {
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { StyleSheet, Image, Text, View } from "react-native";

const ActionDetails = () => {
  const { data } = useLocalSearchParams<{ data: string }>();
  const { width } = useWindowDimensions();

  const db = useSQLiteContext();

  const transaction = getTransactionByID(db, Number(data));
  const date = formatDayDate(new Date(transaction!.created_at));
  const time = formatTime(new Date(transaction!.created_at), "en-GB");
  const wallet = getWalletName(db, transaction!.wallet_id);
  const hasAttachment = transaction!.attachment !== "No attachment provided";

  let background = "";
  if (transaction!.type === "income") {
    background = Colors.green100;
  } else if (transaction!.type === "expense") {
    background = Colors.red100;
  } else {
    background = Colors.blue100;
  }

  return (
    <View style={defaultStyles.pageContainer}>
      <Stack.Screen
        options={{
          headerRight: () => (
            <TouchableOpacity
              activeOpacity={0.8}
              style={defaultStyles.arrowContainer}
            >
              <Trash size={20} colors={Colors.light100} />
            </TouchableOpacity>
          ),
        }}
      />
      <View style={[styles.container, { backgroundColor: background }]}>
        <View style={styles.infoContainer}>
          <View style={{ height: 80, justifyContent: "center" }}>
            <Text style={styles.amount}>${Math.abs(transaction!.amount)}</Text>
          </View>
          <Text style={styles.description}>{transaction!.description}</Text>
          <Text style={styles.time}>
            {date} {time}
          </Text>
        </View>
      </View>
      <View style={styles.details}>
        <View style={styles.detailItems}>
          <Text style={styles.detailTitle}>Type</Text>
          <Text style={defaultStyles.textRegular2}>
            {toTitleCase(transaction!.type)}
          </Text>
        </View>

        <View style={styles.detailItems}>
          <Text style={styles.detailTitle}>Category</Text>
          <Text style={defaultStyles.textRegular2}>
            {toTitleCase(transaction!.category)}
          </Text>
        </View>
        <View style={styles.detailItems}>
          <Text style={styles.detailTitle}>Wallet</Text>
          <Text style={defaultStyles.textRegular2}>{wallet!.name}</Text>
        </View>
      </View>

      <View style={styles.dash} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{ gap: 16, paddingTop: 16 }}
        showsVerticalScrollIndicator={false}
        bounces={false}
        bouncesZoom={false}
        overScrollMode="never"
      >
        <Text style={styles.srcollTitle}>Description</Text>
        <Text style={defaultStyles.textRegular1}>
          {transaction!.description}
        </Text>
        <Text style={styles.srcollTitle}>Attachment</Text>
        {hasAttachment ? (
          <Image
            source={{ uri: `data:image/png;base64,${transaction!.attachment}` }}
            style={{
              width: width * 0.85,
              height: width * 0.85,
              borderRadius: 8,
              marginBottom: 85,
            }}
          />
        ) : (
          <Text>No attachment provided</Text>
        )}
      </ScrollView>
      <View style={styles.button}>
        <Button
          title="Edit"
          onPress={() => {}}
          disabled={false}
          loading={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "35%",
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  infoContainer: {
    top: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  details: {
    flexDirection: "row",
    position: "absolute",
    top: 230,
    justifyContent: "space-between",
    alignItems: "center",
    width: "85%",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderColor: Colors.light40,
    backgroundColor: Colors.light100,
    borderWidth: 1.5,
    alignSelf: "center",
  },
  detailItems: {
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
  detailTitle: {
    ...defaultStyles.textRegular3,
    color: "#91919F",
  },
  detailValue: {
    ...defaultStyles.textRegular2,
  },
  amount: {
    ...defaultStyles.textTitle1,
    fontWeight: "bold",
    fontSize: 48,
    color: Colors.light100,
  },
  description: {
    ...defaultStyles.textRegular1,
    color: Colors.light100,
    marginBottom: 8,
  },
  time: {
    ...defaultStyles.textRegular1,
    color: Colors.light100,
    fontSize: 13,
  },
  dash: {
    width: "85%",
    marginTop: 50,
    height: 1,
    borderColor: "#91919F",
    borderWidth: 0.5,
    borderStyle: "dashed",
    alignSelf: "center",
  },
  scroll: {
    width: "85%",
    alignSelf: "center",
  },
  srcollTitle: {
    ...defaultStyles.textRegular2,
    color: "#91919F",
  },
  button: {
    position: "absolute",
    bottom: 16,
    alignSelf: "center",
    width: "100%",
  },
});

export default ActionDetails;
