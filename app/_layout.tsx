import { useFonts } from "expo-font";
import { Slot, Stack, useRouter } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { Storage } from "expo-sqlite/kv-store";
import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as SplashScreen from "expo-splash-screen";

import { Colors } from "@/constants/Colors";
import { FloatingButtons } from "@/constants/FloatingButtons";
import { LeftArrow } from "@/constants/Icons";
import { defaultStyles } from "@/constants/Styles";
import CustomTabBarProvider from "@/context/CustomTabBarContext";
import { migrateDBIfNeeded } from "@/utils/Database";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { StatusBar } from "expo-status-bar";
import Toast from "react-native-toast-message";

const RootLayout = () => {
  SplashScreen.preventAutoHideAsync();

  const router = useRouter();
  const [isMounted, setMounted] = useState(false);
  const [isUserChecked, setUserChecked] = useState(false);
  const [fontLoaded, fontError] = useFonts({
    Inter: require("@/assets/fonts/Inter-Regular.ttf"),
  });

  const checkUser = () => {
    const user = Storage.getItemSync("user");
    let interval = 0;

    if (user) {
      const info = JSON.parse(user);
      console.log(info);
      const now = new Date().getTime();
      interval = now - new Date(info.timestamp).getTime();
    }

    console.log(interval);
    if (interval && interval < 1000 * 60 * 60 * 24 * 7) {
      console.log("User is logged in");
      router.replace("/(auth)/(tabs)/home");
    } else {
      console.log("User is not logged in");
      Storage.removeItem("user");
      router.replace("/");
    }

    setUserChecked(true);
  };

  useEffect(() => {
    if (fontError) {
      throw fontError;
    }
  }, [fontError]);

  useEffect(() => {
    if (fontLoaded) {
      setMounted(true);
    }
  }, [fontLoaded]);

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    if (fontLoaded && isUserChecked) {
      console.log("Hiding splash screen");
      SplashScreen.hideAsync();
    }
  }, [fontLoaded, isUserChecked]);

  if (!isMounted || !isUserChecked) return <Slot />;

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
            <StatusBar style="auto" />
            <Toast />
          </BottomSheetModalProvider>
        </SQLiteProvider>
      </GestureHandlerRootView>
    </CustomTabBarProvider>
  );
};

export default RootLayoutNav;
