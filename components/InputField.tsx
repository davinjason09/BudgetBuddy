import { useState } from "react";
import {
  KeyboardType,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { Colors } from "@/constants/Colors";
import { Calendar, Eye, EyeShut } from "@/constants/Icons";
import { defaultStyles } from "@/constants/Styles";
import { StyleProp } from "react-native";
import { ViewStyle } from "react-native";

type InputFieldProps = {
  autocapitalize?: "none" | "sentences" | "words" | "characters";
  placeholder?: string;
  type: "email" | "password" | "text" | "phone" | "number";
  style?: StyleProp<ViewStyle>;
  value?: string;
  editable?: boolean;
  calendar?: boolean;
  onPress?: () => void;
  removeError?: () => void;
  onChangeText?: (text: string) => void;
};

const InputField = (props: InputFieldProps) => {
  const isPassword = props.type === "password";
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const keyboard = {
    email: "email-address",
    number: "numeric",
    text: "default",
    password: "default",
    phone: "phone-pad",
  };

  return (
    <View style={{ height: 56 }}>
      <TouchableOpacity activeOpacity={1} onPress={props.onPress}>
        <TextInput
          autoCapitalize={props.autocapitalize || "none"}
          placeholder={props.placeholder}
          placeholderTextColor={"#91919F"}
          value={props.value}
          editable={props.editable}
          selectionColor={Colors.violet100}
          style={[defaultStyles.textRegular1, styles.inputField]}
          keyboardType={keyboard[props.type] as KeyboardType}
          secureTextEntry={isPassword && !showPassword}
          onChangeText={props.onChangeText}
          onFocus={props.removeError}
          onChange={props.removeError}
        />
      </TouchableOpacity>

      {isPassword && (
        <TouchableOpacity
          style={styles.showPassword}
          onPress={toggleShowPassword}
        >
          {showPassword ? (
            <EyeShut size={22} colors={"#91919F"} />
          ) : (
            <Eye size={22} colors={"#91919F"} />
          )}
        </TouchableOpacity>
      )}

      {props.calendar && (
        <TouchableOpacity style={styles.calendar} activeOpacity={1}>
          <Calendar size={22} colors={"#91919F"} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputField: {
    width: "85%",
    height: 56,
    borderRadius: 16,
    alignSelf: "center",
    paddingHorizontal: 16,
    color: Colors.dark100,
    borderWidth: 1,
    borderColor: Colors.light20,
  },
  showPassword: {
    height: 56,
    width: 56,
    justifyContent: "center",
    position: "absolute",
    right: "2%",
  },
  calendar: {
    height: 56,
    width: 56,
    justifyContent: "center",
    position: "absolute",
    right: "2%",
  },
});

export default InputField;
