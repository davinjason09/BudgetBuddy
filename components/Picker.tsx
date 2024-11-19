import { Colors } from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { PickerProps } from "@/constants/Types";
import { StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

const Picker = (props: PickerProps) => {
  const {
    value,
    data,
    isEditable,
    placeholder,
    labelField,
    valueField,
    style,
    iconLeft,
    iconRight,
    onChange,
  } = props;

  return (
    <Dropdown
      style={[styles.dropdown, style]}
      placeholder={placeholder}
      placeholderStyle={[styles.text, { color: "#91919F" }]}
      selectedTextStyle={styles.text}
      containerStyle={styles.container}
      itemContainerStyle={{ borderRadius: 16 }}
      itemTextStyle={styles.text}
      data={data}
      labelField={labelField}
      valueField={valueField}
      value={value}
      onChange={(item) => onChange(item.value)}
      showsVerticalScrollIndicator={false}
      disable={!isEditable}
      renderLeftIcon={() => iconLeft}
      renderRightIcon={() => iconRight}
    />
  );
};

const styles = StyleSheet.create({
  dropdown: {
    width: "85%",
    borderRadius: 16,
    borderColor: Colors.light20,
    borderWidth: 1,
    justifyContent: "center",
    alignSelf: "center",
    paddingHorizontal: 16,
    height: 56,
  },
  container: {
    backgroundColor: Colors.light100,
    borderRadius: 16,
  },
  text: {
    ...defaultStyles.textRegular2,
    fontSize: 18,
  },
});

export default Picker;
