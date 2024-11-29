import { Stack, useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";

import { Colors } from "@/constants/Colors";
import { LeftArrow } from "@/constants/Icons";
import { defaultStyles } from "@/constants/Styles";

const DetailsLayout = () => {
  const router = useRouter();

  return (
    <Stack>
      <Stack.Screen
        name="action"
        options={{
          title: "Transaction Details",
          headerTitleAlign: "center",
          headerShadowVisible: false,
          headerTitleStyle: [
            defaultStyles.textTitle3,
            { color: Colors.light100 },
          ],
          headerTransparent: true,
          headerLeft: () => (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => router.back()}
              style={defaultStyles.arrowContainer}
            >
              <LeftArrow size={24} colors={Colors.light100} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="budget"
        options={{
          title: "Budget Details",
          headerTitleAlign: "center",
          headerShadowVisible: false,
          headerTitleStyle: defaultStyles.textTitle3,
          headerLeft: () => (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => router.back()}
              style={defaultStyles.arrowContainer}
            >
              <LeftArrow size={24} colors={Colors.dark100} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="wallet"
        options={{
          title: "Account Details",
          headerTitleAlign: "center",
          headerShadowVisible: false,
          headerTitleStyle: defaultStyles.textTitle3,
          headerLeft: () => (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => router.back()}
              style={defaultStyles.arrowContainer}
            >
              <LeftArrow size={24} colors={Colors.dark100} />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
};

export default DetailsLayout;
