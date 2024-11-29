import { StyleProp, TextStyle, ViewStyle } from "react-native";

export type TransactionDetails = {
  id: number;
  amount: number;
  date: string;
  type: string;
  category: string;
  wallet_id: number;
  description: string;
  created_at: string;
};

export type WalletInfo = {
  id: number;
  name: string;
  balance: number;
  type: string;
};

export type BudgetInfo = {
  id: number;
  amount: number;
  month: number;
  year: number;
  category: string;
  alert: number;
  percentage: number;
};

export type IconProps = {
  colors?: string | string[];
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

export type ChipProps = {
  variant: "default" | "outlined";
  query: any;
  text?: string;
  icon?: React.ReactNode;
  value: any;
  onPress: (value: any) => void;
  editable: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  selectedStyle?: StyleProp<ViewStyle>;
};

export type MonthYearSelectorProps = {
  type: "monthYear" | "year";
  maximum?: string;
  minimum?: string;
  monthID?: number;
  year: number;
  setMonthID?: (monthID: number) => void;
  setYear: (year: number) => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  arrowColor?: string;
  arrowType: "arrow" | "chevron";
};

export type TransactionInfoProps = {
  data: TransactionDetails;
};

export type WalletInfoProps = {
  data: WalletInfo;
};

export type BudgetInfoProps = {
  data: BudgetInfo;
};

export type CustomTabBarOverlayProps = {
  iconSize?: number;
  overlayRadius?: number;
  expandingMode?: "staging" | "flat";
};

export type CustomTabBarExtrasRender = () => React.ReactNode;

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
