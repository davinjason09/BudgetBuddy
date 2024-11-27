import * as ImagePicker from "expo-image-picker";
import { useCallback, useMemo, useRef } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Colors } from "@/constants/Colors";
import { Camera, Cross, Document, PaperClip, Picture } from "@/constants/Icons";
import { defaultStyles } from "@/constants/Styles";
import { AttachmentProps } from "@/constants/Types";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import Button from "./Button";

const screenWidth = Dimensions.get("window").width;

const Attachment = (props: AttachmentProps) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["25%"], []);
  const { data, setData } = props;

  const handlePress = () => {
    bottomSheetModalRef.current?.present();
  };

  const renderBackdrop = useCallback(
    (props: any) => <BottomSheetBackdrop {...props} pressBehavior={"close"} />,
    [],
  );

  const handleCamera = async () => {
    setTimeout(() => {
      bottomSheetModalRef.current?.dismiss();
    }, 1000);

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"],
      aspect: [1, 1],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setData(result.assets[0].base64!);
    }
  };

  const pickImage = async () => {
    setTimeout(() => {
      bottomSheetModalRef.current?.dismiss();
    }, 250);

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      aspect: [1, 1],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setData(result.assets[0].base64!);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {data && data !== "No attachment provided" ? (
        <View style={styles.dataPreview}>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity style={styles.close} onPress={() => setData("")}>
              <Cross size={12} colors={Colors.light100} />
            </TouchableOpacity>
            <Image
              source={{ uri: `data:image/jpg;base64,${data}` }}
              style={{
                width: screenWidth * 0.85,
                height: screenWidth * 0.85,
                borderRadius: 8,
              }}
            />
          </View>
        </View>
      ) : (
        <TouchableOpacity style={styles.container} onPress={handlePress}>
          <PaperClip size={22} colors={"#91919F"} />
          <Text style={styles.text}>Attachment</Text>
        </TouchableOpacity>
      )}

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        handleIndicatorStyle={{ backgroundColor: Colors.violet40, width: 36 }}
        backgroundStyle={{ borderTopLeftRadius: 32, borderTopRightRadius: 32 }}
        enableOverDrag={false}
      >
        <BottomSheetView style={styles.options}>
          <Button
            title="Camera"
            iconLeft={<Camera size={26} colors={Colors.violet100} />}
            disabled={false}
            loading={false}
            style={styles.button}
            textStyle={styles.buttonText}
            onPress={handleCamera}
          />
          <Button
            title="Image"
            iconLeft={<Picture size={26} colors={Colors.violet100} />}
            disabled={false}
            loading={false}
            style={styles.button}
            textStyle={styles.buttonText}
            onPress={pickImage}
          />
          <Button
            title="Document"
            iconLeft={<Document size={26} colors={Colors.violet100} />}
            disabled={false}
            loading={false}
            style={styles.button}
            textStyle={styles.buttonText}
            onPress={() => console.log("Document")}
          />
        </BottomSheetView>
      </BottomSheetModal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    height: 56,
    borderWidth: 1,
    borderRadius: 16,
    borderColor: Colors.light20,
    borderStyle: "dashed",
    width: "85%",
  },
  text: {
    ...defaultStyles.textRegular2,
    color: "#91919F",
  },
  options: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  button: {
    flexDirection: "column",
    backgroundColor: Colors.violet20,
    height: 90,
    width: 105,
    gap: 8,
  },
  buttonText: {
    color: Colors.violet100,
    fontSize: 16,
  },
  dataPreview: {
    alignSelf: "center",
    width: "85%",
    height: "85%",
    borderRadius: 8,
    paddingTop: 5,
  },
  close: {
    position: "absolute",
    backgroundColor: Colors.dark100 + "80",
    justifyContent: "center",
    alignItems: "center",
    width: 24,
    height: 24,
    borderRadius: 12,
    top: -5,
    right: -5,
    zIndex: 2,
  },
});

export default Attachment;
