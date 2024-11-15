import { FloatingButtons } from "@/constants/FloatingButtons";
import CustomTabBarProvider from "@/context/CustomTabBarContext";
import TabProvider from "@/context/TabContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <CustomTabBarProvider
      overlayProps={{ expandingMode: "staging" }}
      data={FloatingButtons}
    >
      <TabProvider>
        <Stack>
          <Stack.Screen name="index" />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </TabProvider>
    </CustomTabBarProvider>
  );
}
