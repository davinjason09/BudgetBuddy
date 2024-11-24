import { useFonts } from "expo-font";
import { SplashScreen, Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { Colors } from "@/constants/Colors";
import { FloatingButtons } from "@/constants/FloatingButtons";
import { LeftArrow } from "@/constants/Icons";
import { defaultStyles } from "@/constants/Styles";
import CustomTabBarProvider from "@/context/CustomTabBarContext";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { SQLiteProvider } from "expo-sqlite";
import { migrateDBIfNeeded } from "@/utils/Database";

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
    <Stack
      screenOptions={{
        animation: "slide_from_right",
        statusBarAnimation: "fade",
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="signup" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(details)" options={{ headerShown: false }} />
      <Stack.Screen name="(actions)" options={{ headerShown: false }} />
      <Stack.Screen
        name="notification"
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
        name="report"
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

const RootLayoutNav = () => {
  return (
    <CustomTabBarProvider
      overlayProps={{ expandingMode: "staging" }}
      data={FloatingButtons}
    >
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SQLiteProvider databaseName="app.db" onInit={migrateDBIfNeeded}>
          <BottomSheetModalProvider>
            <RootLayout />
          </BottomSheetModalProvider>
        </SQLiteProvider>
      </GestureHandlerRootView>
    </CustomTabBarProvider>
  );
};

export default RootLayoutNav;
