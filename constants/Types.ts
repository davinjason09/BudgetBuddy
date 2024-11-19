import React from "react";
import { StyleProp, TextStyle, ViewStyle } from "react-native";

export type IconProps = {
  colors: string | string[];
  size: number;
};

export type ButtonProps = {
  onPress?: () => void;
  onLongPress?: () => void;
  title: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  disabled: boolean;
  activeOpacity?: number;
  loading: boolean;
};

export type PickerProps = {
  value: any;
  data: any[];
  isEditable?: boolean;
  placeholder?: string;
  labelField: string;
  valueField: string;
  style?: StyleProp<ViewStyle>;
  iconRight?: React.JSX.Element;
  iconLeft?: React.JSX.Element;
  onChange: (item: any) => void;
};

export type CustomTabBarPassThroughParams = {
  params?: any;
};

export type CustomTabBarOverlayProps = {
  iconSize?: number;
  overlayRadius?: number;
  expandingMode?: "staging" | "flat";
};

export type CustomTabBarExtrasRender = (
  props: CustomTabBarPassThroughParams,
) => React.ReactNode;

export type CustomTabBarContextProps = {
  data: CustomTabBarExtrasRender[];
  opened: boolean;
  overlayProps?: CustomTabBarOverlayProps;
  toggleOpened: () => void;
};

export type OverviewProps = {
  type: "income" | "expense";
  amount: number;
  overviewStyle?: StyleProp<ViewStyle>;
};

export type AttachmentProps = {
  data: string;
  setData: (data: string) => void;
};

export type SwitchProps = {
  value: boolean;
  setValue: (value: boolean) => void;
  activeColor?: string;
  inactiveColor?: string;
};
