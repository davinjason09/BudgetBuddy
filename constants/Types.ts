import React from "react";

export type AddButtonProps = {
  opened: boolean;
  toggleOpened: () => void;
};

export type IconProps = {
  colors: string | string[];
  size: number;
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
