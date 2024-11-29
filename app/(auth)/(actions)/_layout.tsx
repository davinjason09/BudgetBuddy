import { Stack, useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";

import { Colors } from "@/constants/Colors";
import { LeftArrow } from "@/constants/Icons";
import { defaultStyles } from "@/constants/Styles";

const ActionLayout = () => {
  const router = useRouter();

  return (
    <Stack>
      <Stack.Screen
        name="type"
        options={{
          headerTitleAlign: "center",
          headerShadowVisible: false,
          headerTitleStyle: defaultStyles.textTitle3,
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
          headerTitleAlign: "center",
          headerShadowVisible: false,
          headerTitleStyle: defaultStyles.textTitle3,
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
        name="wallet"
        options={{
          headerTitleAlign: "center",
          headerShadowVisible: false,
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
    </Stack>
  );
};

export default ActionLayout;
