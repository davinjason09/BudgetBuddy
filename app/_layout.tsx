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
import { migrateDBIfNeeded } from "@/utils/Database";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { SQLiteProvider } from "expo-sqlite";

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
        animation: "fade",
        statusBarAnimation: "fade",
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="login"
        options={{
          title: "Login",
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
        name="signup"
        options={{
          title: "Sign Up",
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
        name="forgotpass"
        options={{
          title: "Forgot Password",
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
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
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
