import { Colors } from "@/constants/Colors";
import { FloatingButtons } from "@/constants/FloatingButtons";
import { LeftArrow } from "@/constants/Icons";
import { defaultStyles } from "@/constants/Styles";
import CustomTabBarProvider from "@/context/CustomTabBarContext";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { useFonts } from "expo-font";
import { SplashScreen, useRouter } from "expo-router";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const RootLayout = () => {
  SplashScreen.preventAutoHideAsync();

  const router = useRouter();
  const [fontLoaded, fontError] = useFonts({
    Inter: require("@/assets/fonts/Inter-Regular.ttf"),
  });

  useEffect(() => {
    if (fontError) {
      throw fontError;
    }
  }, [fontError]);

  useEffect(() => {
    if (fontLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontLoaded]);

  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="actions/[type]"
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
    </Stack>
  );
};

const RootLayoutNav = () => {
  return (
    <CustomTabBarProvider
      overlayProps={{ expandingMode: "staging" }}
      data={FloatingButtons}
    >
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <RootLayout />
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </CustomTabBarProvider>
  );
};

export default RootLayoutNav;
