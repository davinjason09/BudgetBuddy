import { Stack } from "expo-router";
import { TouchableOpacity } from "react-native";

import { Colors } from "@/constants/Colors";
import { LeftArrow } from "@/constants/Icons";
import { defaultStyles } from "@/constants/Styles";
import { useRouter } from "expo-router";

const AuthLayout = () => {
  const router = useRouter();

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(actions)" options={{ headerShown: false }} />
      <Stack.Screen name="(details)" options={{ headerShown: false }} />
      <Stack.Screen
        name="account"
        options={{
          title: "Account",
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
              <LeftArrow size={24} colors={Colors.dark100} />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
};

export default AuthLayout;
