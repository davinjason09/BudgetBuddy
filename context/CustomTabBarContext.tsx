import {
  CustomTabBarContextProps,
  CustomTabBarOverlayProps,
} from "@/constants/Types";
import { createContext, useContext, useState } from "react";

export const CustomTabBarContext = createContext<CustomTabBarContextProps>({
  data: [],
  opened: false,
  toggleOpened: () => {},
});

type Props = Pick<CustomTabBarContextProps, "data"> & {
  children: React.ReactNode;
  overlayProps?: CustomTabBarOverlayProps;
};

const CustomTabBarProvider = ({ children, data, overlayProps }: Props) => {
  const [opened, setOpened] = useState(false);

  const toggleOpened = () => {
    setOpened(!opened);
  };

  return (
    <CustomTabBarContext.Provider
      value={{
        data,
        opened,
        overlayProps,
        toggleOpened,
      }}
    >
      {children}
    </CustomTabBarContext.Provider>
  );
};

export default CustomTabBarProvider;
export const useCustomTabBar = () => useContext(CustomTabBarContext);
