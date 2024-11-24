import { RelativePathString, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  Image,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Button from "@/components/Button";
import { Colors } from "@/constants/Colors";
import { slides } from "@/constants/Options";
import { defaultStyles } from "@/constants/Styles";

export default function Index() {
  const { width, height } = useWindowDimensions();
  const { top } = useSafeAreaInsets();

  const router = useRouter();

  const data: number[] = [...new Array(3).keys()];
  const slideArray = slides;

  const renderItem = ({ item }: { item: number }) => {
    return (
      <View style={styles.carousel}>
        <Image
          source={slideArray[item].image}
          width={width}
          style={{ alignSelf: "center" }}
        />
        <View style={styles.carouselText}>
          <Text style={[defaultStyles.textTitle1, { textAlign: "center" }]}>
            {slideArray[item].title}
          </Text>
          <Text
            style={[
              defaultStyles.textRegular1,
              { color: "#91919F", textAlign: "center" },
            ]}
          >
            {slideArray[item].description}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={[defaultStyles.pageContainer, { paddingTop: top }]}>
      <StatusBar style="dark" />
      <View style={{ flex: 1 }}>
        <Carousel
          loop
          width={width}
          height={height * 0.67}
          data={data}
          autoPlayInterval={5000}
          autoPlay
          style={{
            top: 24,
            width: "100%",
            height: height * 0.67,
            alignItems: "center",
            justifyContent: "center",
          }}
          scrollAnimationDuration={1000}
          renderItem={renderItem}
        />
      </View>
      <View style={{ gap: 16, marginBottom: 24 }}>
        <Button
          title="Sign Up"
          onPress={() => router.push("/signup")}
          disabled={false}
          loading={false}
        />
        <Button
          title="Login"
          onPress={() => router.push("/login")}
          style={defaultStyles.secondaryButton}
          textStyle={{ color: Colors.violet100 }}
          disabled={false}
          loading={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  carousel: {
    flex: 1,
    alignItems: "center",
    gap: 16,
  },
  carouselText: {
    width: "75%",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
});
