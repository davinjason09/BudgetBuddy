import CustomBottomTabWrapper from "@/components/CustomBottomTabWrapper";
import CustomTabBarButton from "@/components/CustomTabBarButton";
import { Colors } from "@/constants/Colors";
import { Budget, Home, Plus, Profile, Transaction } from "@/constants/Icons";
import { useCustomTabBar } from "@/context/CustomTabBarContext";
import { BottomTabBar } from "@react-navigation/bottom-tabs";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Svg, { Path } from "react-native-svg";
import { Tabs } from "expo-router";

const TabLayout = () => {
  const { opened, toggleOpened } = useCustomTabBar();

  const TabBarButton = (props: any) => (
    <TouchableOpacity
      onPress={props.onPress}
      activeOpacity={1}
      style={{ justifyContent: "center", alignItems: "center", zIndex: 10 }}
    >
      {props.children}
    </TouchableOpacity>
  );

  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: Colors.violet100,
        tabBarInactiveTintColor: Colors.inactive,
        tabBarButton: (props) => <TabBarButton {...props} />,
      }}
      tabBar={(props) => (
        <CustomBottomTabWrapper params={props.navigation}>
          <BottomTabBar {...props} />
        </CustomBottomTabWrapper>
      )}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarItemStyle: {
            paddingTop: 15,
            backgroundColor: Colors.light80,
            borderTopLeftRadius: 20,
          },
          tabBarIcon: ({ color }) => <Home colors={color} size={24} />,
        }}
        listeners={{
          tabPress: (e) => opened && e.preventDefault(),
        }}
      />
      <Tabs.Screen
        name="transaction"
        options={{
          title: "Transaction",
          tabBarItemStyle: {
            paddingTop: 15,
            backgroundColor: Colors.light80,
            borderTopRightRadius: 10,
          },
          tabBarIcon: ({ color }) => <Transaction colors={color} size={24} />,
        }}
        listeners={{
          tabPress: (e) => opened && e.preventDefault(),
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          tabBarButton: () => (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Svg
                width={90}
                height={70}
                viewBox="0 0 90 70"
                style={{ position: "absolute", top: 0 }}
              >
                <Path
                  d="M45 55C25.118 55 9 38.8823 9 19c0-1.9012.147-3.7679.431-5.5895C10.398 7.2082 6.289 0 .012 0H0V70h90V0h-.012c-6.277 0-10.386 7.2082-9.419 13.4105C80.853 15.2321 81 17.0988 81 19c0 19.8823-16.118 36-36 36Z"
                  fill={Colors.light80}
                />
              </Svg>
              <CustomTabBarButton
                rotationDegree={45}
                style={styles.floatingButton}
                opened={opened}
                toggleOpened={toggleOpened}
              >
                <Plus size={24} colors={Colors.light100} />
              </CustomTabBarButton>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="budget"
        options={{
          title: "Budget",
          tabBarItemStyle: {
            paddingTop: 15,
            backgroundColor: Colors.light80,
            borderTopLeftRadius: 10,
          },
          tabBarIcon: ({ color }) => <Budget colors={color} size={24} />,
        }}
        listeners={{
          tabPress: (e) => opened && e.preventDefault(),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarItemStyle: {
            paddingTop: 15,
            backgroundColor: Colors.light80,
            borderTopRightRadius: 20,
          },
          tabBarIcon: ({ color }) => <Profile colors={color} size={24} />,
        }}
        listeners={{
          tabPress: (e) => opened && e.preventDefault(),
        }}
      />
    </Tabs>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    height: 70,
    elevation: 0,
    borderTopWidth: 0,
    backgroundColor: "transparent",
  },
  floatingButton: {
    backgroundColor: Colors.violet100,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignSelf: "center",
  },
});

export default TabLayout;
