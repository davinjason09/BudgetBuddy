import Svg, { Path } from "react-native-svg";
import { IconProps } from "./Types";

export const Home = ({ colors, size }: IconProps) => {
  const color = typeof colors === "string" ? colors : colors[0];

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M23.795 9.56005L21.795 7.74005L14.125 0.780046C13.575 0.288091 12.863 0.0161133 12.125 0.0161133C11.3871 0.0161133 10.675 0.288091 10.125 0.780046L2.47502 7.78005L0.475019 9.60005C0.340344 9.7367 0.247823 9.9092 0.208493 10.097C0.169163 10.2848 0.184684 10.4799 0.253204 10.6591C0.321725 10.8383 0.440353 10.994 0.594935 11.1077C0.749518 11.2213 0.93353 11.2881 1.12502 11.3C1.37831 11.2886 1.61779 11.1814 1.79502 11L2.12502 10.7V21C2.12502 21.7957 2.44109 22.5588 3.0037 23.1214C3.56631 23.684 4.32937 24 5.12502 24H19.125C19.9207 24 20.6837 23.684 21.2463 23.1214C21.8089 22.5588 22.125 21.7957 22.125 21V10.74L22.455 11.04C22.6384 11.2067 22.8772 11.2994 23.125 11.3C23.3266 11.2995 23.5234 11.2381 23.6895 11.1237C23.8555 11.0094 23.9832 10.8475 24.0556 10.6594C24.1281 10.4712 24.142 10.2656 24.0954 10.0694C24.0489 9.8732 23.9442 9.69566 23.795 9.56005Z"
        fill={color}
      />
    </Svg>
  );
};

export const Transaction = ({ colors, size }: IconProps) => {
  if (typeof colors === "string") {
    colors = [colors, colors];
  }

  return (
    <Svg width={size} height={size} viewBox="0 0 28 22">
      <Path
        d="M18.2551 12.9298V13.9298C18.2551 14.5865 18.1257 15.2366 17.8745 15.8433C17.6232 16.4499 17.2549 17.0011 16.7906 17.4654C16.3263 17.9297 15.7751 18.298 15.1685 18.5492C14.5619 18.8005 13.9117 18.9298 13.2551 18.9298H9.99507C9.97965 19.4767 9.81497 20.009 9.51886 20.469C9.22275 20.929 8.80647 21.2993 8.31507 21.5398C7.90524 21.7446 7.45322 21.8508 6.99507 21.8498C6.31734 21.8539 5.65822 21.6283 5.12507 21.2098L1.41507 18.2998C1.05374 18.0194 0.761313 17.6601 0.560145 17.2493C0.358976 16.8386 0.254395 16.3872 0.254395 15.9298C0.254395 15.4725 0.358976 15.0211 0.560145 14.6104C0.761313 14.1996 1.05374 13.8403 1.41507 13.5598L5.12507 10.6498C5.57207 10.2931 6.11173 10.0716 6.68045 10.0113C7.24917 9.95108 7.82326 10.0547 8.33507 10.3098C9.0166 10.6358 9.54147 11.2182 9.79507 11.9298H17.2251C17.3589 11.9258 17.4922 11.9487 17.617 11.9972C17.7418 12.0456 17.8556 12.1187 17.9517 12.2119C18.0477 12.3052 18.1241 12.4168 18.1762 12.5401C18.2283 12.6634 18.2551 12.796 18.2551 12.9298Z"
        fill={colors[0]}
      />
      <Path
        d="M27.9951 6.06995C27.9952 6.52728 27.8907 6.97857 27.6897 7.38934C27.4886 7.8001 27.1963 8.15946 26.8351 8.43995L23.1251 11.35C22.5845 11.77 21.9197 11.9986 21.2351 12C20.777 12.0009 20.325 11.8947 19.9151 11.69C19.2336 11.364 18.7087 10.7816 18.4551 10.07H10.9951C10.7299 10.07 10.4755 9.9646 10.288 9.77706C10.1005 9.58952 9.99512 9.33517 9.99512 9.06995V8.06995C9.99512 6.74387 10.5219 5.4721 11.4596 4.53442C12.3973 3.59674 13.669 3.06995 14.9951 3.06995H18.2551C18.2673 2.5109 18.4355 1.96638 18.7407 1.49784C19.0459 1.02929 19.476 0.655373 19.9824 0.418276C20.4888 0.18118 21.0514 0.0903436 21.6067 0.156018C22.1621 0.221693 22.688 0.441264 23.1251 0.789954L26.8351 3.69995C27.1963 3.98045 27.4886 4.33981 27.6897 4.75057C27.8907 5.16134 27.9952 5.61263 27.9951 6.06995Z"
        fill={colors[1]}
      />
    </Svg>
  );
};

export const Budget = ({ colors, size }: IconProps) => {
  if (typeof colors === "string") {
    colors = [colors, colors];
  }

  return (
    <Svg width={size} height={size} viewBox="0 0 25 24">
      <Path
        d="M24.125 11H13.125V0C15.9662 0.228368 18.6333 1.46063 20.6489 3.47614C22.6644 5.49166 23.8966 8.1588 24.125 11Z"
        fill={colors[0]}
      />
      <Path
        d="M24.125 13C23.926 15.2756 23.0816 17.4471 21.691 19.2594C20.3004 21.0716 18.4215 22.4493 16.275 23.2306C14.1285 24.0119 11.8036 24.1643 9.57344 23.6699C7.3433 23.1755 5.3006 22.0549 3.68538 20.4396C2.07015 18.8244 0.94949 16.7817 0.455092 14.5516C-0.0393057 12.3214 0.113094 9.99652 0.894384 7.85001C1.67567 5.7035 3.05339 3.82457 4.86565 2.43401C6.67792 1.04346 8.84942 0.199045 11.125 0V12C11.125 12.2652 11.2304 12.5196 11.4179 12.7071C11.6054 12.8946 11.8598 13 12.125 13H24.125Z"
        fill={colors[1]}
      />
    </Svg>
  );
};

export const Profile = ({ colors, size }: IconProps) => {
  if (typeof colors === "string") {
    colors = [colors, colors];
  }

  return (
    <Svg width={size} height={size} viewBox="0 0 21 24">
      <Path
        d="M10.125 12C13.4387 12 16.125 9.31371 16.125 6C16.125 2.68629 13.4387 0 10.125 0C6.81129 0 4.125 2.68629 4.125 6C4.125 9.31371 6.81129 12 10.125 12Z"
        fill={colors[0]}
      />
      <Path
        d="M13.125 13.9302H7.125C5.26848 13.9302 3.48801 14.6677 2.17525 15.9804C0.862498 17.2932 0.125 19.0737 0.125 20.9302C0.125 21.7258 0.441071 22.4889 1.00368 23.0515C1.56629 23.6141 2.32935 23.9302 3.125 23.9302H17.125C17.9206 23.9302 18.6837 23.6141 19.2463 23.0515C19.8089 22.4889 20.125 21.7258 20.125 20.9302C20.125 19.0737 19.3875 17.2932 18.0747 15.9804C16.762 14.6677 14.9815 13.9302 13.125 13.9302Z"
        fill={colors[1]}
      />
    </Svg>
  );
};

export const Expense = ({ colors, size }: IconProps) => {
  if (typeof colors === "string") {
    colors = [colors, colors, colors];
  }

  return (
    <Svg width={size} height={size} viewBox="0 0 25 28">
      <Path
        d="M19.125 12H5.125C3.79892 12 2.52715 12.5268 1.58947 13.4645C0.651784 14.4021 0.125 15.6739 0.125 17V23C0.125 24.3261 0.651784 25.5979 1.58947 26.5355C2.52715 27.4732 3.79892 28 5.125 28H19.125C20.4511 28 21.7229 27.4732 22.6605 26.5355C23.5982 25.5979 24.125 24.3261 24.125 23V17C24.125 15.6739 23.5982 14.4021 22.6605 13.4645C21.7229 12.5268 20.4511 12 19.125 12ZM12.125 24C11.3339 24 10.5605 23.7654 9.90272 23.3259C9.24492 22.8864 8.73223 22.2616 8.42948 21.5307C8.12673 20.7998 8.04752 19.9956 8.20186 19.2196C8.3562 18.4437 8.73716 17.731 9.29657 17.1716C9.85598 16.6122 10.5687 16.2312 11.3446 16.0769C12.1206 15.9225 12.9248 16.0017 13.6557 16.3045C14.3866 16.6072 15.0114 17.1199 15.4509 17.7777C15.8904 18.4355 16.125 19.2089 16.125 20C16.125 21.0609 15.7036 22.0783 14.9534 22.8284C14.2033 23.5786 13.1859 24 12.125 24Z"
        fill={colors[0]}
      />
      <Path
        d="M12.125 22C13.2296 22 14.125 21.1046 14.125 20C14.125 18.8954 13.2296 18 12.125 18C11.0204 18 10.125 18.8954 10.125 20C10.125 21.1046 11.0204 22 12.125 22Z"
        fill={colors[1]}
      />
      <Path
        d="M12.835 0.289939C12.742 0.196211 12.6314 0.121816 12.5095 0.0710475C12.3877 0.0202789 12.257 -0.00585938 12.125 -0.00585938C11.993 -0.00585938 11.8622 0.0202789 11.7404 0.0710475C11.6185 0.121816 11.5079 0.196211 11.415 0.289939L7.17496 4.53994C6.98136 4.72692 6.86995 4.98315 6.86527 5.25226C6.86058 5.52138 6.96299 5.78133 7.14996 5.97494C7.33694 6.16855 7.59317 6.27995 7.86229 6.28464C8.1314 6.28933 8.39136 6.18692 8.58496 5.99994L11.125 3.40994V8.99994C11.125 9.26516 11.2303 9.51951 11.4179 9.70705C11.6054 9.89458 11.8597 9.99994 12.125 9.99994C12.3902 9.99994 12.6445 9.89458 12.8321 9.70705C13.0196 9.51951 13.125 9.26516 13.125 8.99994V3.40994L15.665 5.99994C15.8512 6.18468 16.1026 6.28883 16.365 6.28994C16.5049 6.29755 16.6449 6.27567 16.7758 6.22571C16.9067 6.17575 17.0257 6.09883 17.125 5.99994C17.3112 5.81258 17.4158 5.55912 17.4158 5.29494C17.4158 5.03075 17.3112 4.7773 17.125 4.58994L12.835 0.289939Z"
        fill={colors[2]}
      />
    </Svg>
  );
};

export const Income = ({ colors, size }: IconProps) => {
  if (typeof colors === "string") {
    colors = [colors, colors, colors];
  }

  return (
    <Svg width={size} height={size} viewBox="0 0 25 28">
      <Path
        d="M19.125 12H5.125C3.79892 12 2.52715 12.5268 1.58947 13.4645C0.651784 14.4021 0.125 15.6739 0.125 17V23C0.125 24.3261 0.651784 25.5979 1.58947 26.5355C2.52715 27.4732 3.79892 28 5.125 28H19.125C20.4511 28 21.7229 27.4732 22.6605 26.5355C23.5982 25.5979 24.125 24.3261 24.125 23V17C24.125 15.6739 23.5982 14.4021 22.6605 13.4645C21.7229 12.5268 20.4511 12 19.125 12ZM12.125 24C11.3339 24 10.5605 23.7654 9.90272 23.3259C9.24492 22.8864 8.73223 22.2616 8.42948 21.5307C8.12673 20.7998 8.04752 19.9956 8.20186 19.2196C8.3562 18.4437 8.73716 17.731 9.29657 17.1716C9.85598 16.6122 10.5687 16.2312 11.3446 16.0769C12.1206 15.9225 12.9248 16.0017 13.6557 16.3045C14.3866 16.6072 15.0114 17.1199 15.4509 17.7777C15.8904 18.4355 16.125 19.2089 16.125 20C16.125 21.0609 15.7036 22.0783 14.9534 22.8284C14.2033 23.5786 13.1859 24 12.125 24Z"
        fill={colors[0]}
      />
      <Path
        d="M12.125 22C13.2296 22 14.125 21.1046 14.125 20C14.125 18.8954 13.2296 18 12.125 18C11.0204 18 10.125 18.8954 10.125 20C10.125 21.1046 11.0204 22 12.125 22Z"
        fill={colors[1]}
      />
      <Path
        d="M12.125 0C11.8598 0 11.6055 0.105357 11.4179 0.292893C11.2304 0.48043 11.125 0.734784 11.125 1V6.59L8.58503 4.05C8.39373 3.88617 8.14765 3.80057 7.89597 3.81029C7.6443 3.82001 7.40556 3.92434 7.22746 4.10244C7.04937 4.28053 6.94504 4.51927 6.93532 4.77095C6.92559 5.02262 7.0112 5.2687 7.17503 5.46L11.415 9.71C11.5072 9.79995 11.6158 9.87126 11.735 9.92C11.8584 9.97226 11.991 9.99919 12.125 9.99919C12.259 9.99919 12.3916 9.97226 12.515 9.92C12.6342 9.87126 12.7429 9.79995 12.835 9.71L17.125 5.46C17.2889 5.2687 17.3745 5.02262 17.3647 4.77095C17.355 4.51927 17.2507 4.28053 17.0726 4.10244C16.8945 3.92434 16.6558 3.82001 16.4041 3.81029C16.1524 3.80057 15.9063 3.88617 15.715 4.05L13.125 6.59V1C13.125 0.734784 13.0197 0.48043 12.8321 0.292893C12.6446 0.105357 12.3902 0 12.125 0Z"
        fill={colors[2]}
      />
    </Svg>
  );
};

export const Transfer = ({ colors, size }: IconProps) => {
  if (typeof colors === "string") {
    colors = [colors, colors, colors, colors];
  }

  return (
    <Svg width={size} height={size} viewBox="0 0 25 24">
      <Path
        d="M6.125 24C9.43871 24 12.125 21.3137 12.125 18C12.125 14.6863 9.43871 12 6.125 12C2.81129 12 0.125 14.6863 0.125 18C0.125 21.3137 2.81129 24 6.125 24Z"
        fill={colors[0]}
      />
      <Path
        d="M18.125 12C21.4387 12 24.125 9.31371 24.125 6C24.125 2.68629 21.4387 0 18.125 0C14.8113 0 12.125 2.68629 12.125 6C12.125 9.31371 14.8113 12 18.125 12Z"
        fill={colors[1]}
      />
      <Path
        d="M2.28504 10C2.38086 10.0359 2.48275 10.0529 2.58505 10.05C2.80562 10.0601 3.02334 9.99691 3.20424 9.87028C3.38513 9.74365 3.51903 9.56071 3.58505 9.35C3.94498 8.19967 4.53231 7.13336 5.31219 6.21434C6.09207 5.29532 7.04861 4.54231 8.12505 4V5C8.12505 5.26522 8.2304 5.51957 8.41794 5.70711C8.60547 5.89464 8.85983 6 9.12505 6C9.39026 6 9.64462 5.89464 9.83215 5.70711C10.0197 5.51957 10.125 5.26522 10.125 5V1C10.125 0.734784 10.0197 0.48043 9.83215 0.292893C9.64462 0.105357 9.39026 0 9.12505 0H5.12505C4.85983 0 4.60547 0.105357 4.41794 0.292893C4.2304 0.48043 4.12505 0.734784 4.12505 1C4.12505 1.26522 4.2304 1.51957 4.41794 1.70711C4.60547 1.89464 4.85983 2 5.12505 2H7.54505C6.14422 2.64011 4.89343 3.56725 3.87363 4.72141C2.85384 5.87557 2.08778 7.23101 1.62505 8.7C1.57858 8.82847 1.55893 8.96509 1.56731 9.10145C1.57569 9.2378 1.61192 9.37099 1.67376 9.4928C1.73561 9.61462 1.82175 9.72247 1.92689 9.8097C2.03202 9.89693 2.15391 9.9617 2.28504 10Z"
        fill={colors[2]}
      />
      <Path
        d="M15.125 17.9998C14.8598 17.9998 14.6054 18.1051 14.4179 18.2927C14.2304 18.4802 14.125 18.7346 14.125 18.9998V22.9998C14.125 23.265 14.2304 23.5194 14.4179 23.7069C14.6054 23.8944 14.8598 23.9998 15.125 23.9998H19.125C19.3902 23.9998 19.6446 23.8944 19.8321 23.7069C20.0196 23.5194 20.125 23.265 20.125 22.9998C20.125 22.7346 20.0196 22.4802 19.8321 22.2927C19.6446 22.1051 19.3902 21.9998 19.125 21.9998H16.695C18.2712 21.2806 19.6553 20.1992 20.7345 18.8438C21.8136 17.4883 22.5573 15.8971 22.905 14.1998C22.9313 14.0685 22.9314 13.9333 22.9054 13.8019C22.8794 13.6705 22.8278 13.5455 22.7535 13.4341C22.6792 13.3227 22.5837 13.227 22.4725 13.1524C22.3612 13.0779 22.2363 13.026 22.105 12.9998C21.9737 12.9735 21.8385 12.9734 21.7071 12.9994C21.5757 13.0254 21.4507 13.077 21.3393 13.1513C21.2279 13.2255 21.1322 13.3211 21.0577 13.4323C20.9831 13.5436 20.9313 13.6685 20.905 13.7998C20.6335 15.1355 20.0622 16.3921 19.2342 17.4748C18.4062 18.5575 17.343 19.438 16.125 20.0498V18.9998C16.125 18.7346 16.0196 18.4802 15.8321 18.2927C15.6446 18.1051 15.3902 17.9998 15.125 17.9998Z"
        fill={colors[3]}
      />
    </Svg>
  );
};

export const Plus = ({ colors, size }: IconProps) => {
  if (typeof colors === "object") {
    colors = colors[0];
  }

  return (
    <Svg width={size} height={size} viewBox="0 0 20 20">
      <Path
        d="m10.9753 10.8992 0 8.0045c-.0008.2642-.1061.5172-.293.7041-.1868.1868-.4399.2921-.7041.293-.2642-.0008-.5174-.1061-.7041-.2929-.1868-.1868-.2922-.44-.2929-.7041l0-8.0045-8.0044 0c-.2642-.0007-.5173-.1061-.7041-.2929-.1868-.1868-.2921-.4399-.2929-.7041.0008-.2642.1061-.5173.2929-.7041s.4399-.2921.7041-.2929l8.0044 0v-8.0044c.0194-.2511.1329-.4856.3177-.6567.1848-.1711.4274-.2661.6793-.2661.2519 0 .4944.095.6793.2661.1848.1711.2983.4056.3177.6567l0 8.0044 8.0045 0c.1374-.0107.2755.0072.4057.0525.1301.0452.2496.117.3507.2106.1011.0936.1819.2072.237.3334.0552.1263.0836.2626.0837.4004s-.0285.2741-.0837.4005c-.0552.1263-.1359.2398-.237.3335-.1012.0936-.2206.1653-.3507.2106-.1302.0453-.2683.0631-.4057.0526l-8.0045 0z"
        fill={colors}
      />
    </Svg>
  );
};

export const Bell = ({ colors, size }: IconProps) => {
  if (typeof colors === "string") {
    colors = [colors, colors];
  }

  return (
    <Svg width={size} height={size} viewBox="0 0 21 25">
      <Path
        d="M20.125 18.5C19.9858 19.2171 19.597 19.8616 19.0276 20.3193C18.4583 20.777 17.7453 21.0181 17.015 21H3.23501C2.50477 21.0181 1.79171 20.777 1.22238 20.3193C0.653051 19.8616 0.264265 19.2171 0.125015 18.5C0.0216261 17.885 0.112458 17.2531 0.384878 16.6921C0.657297 16.1312 1.09776 15.669 1.64501 15.37C1.79286 15.2883 1.91565 15.1679 2.00022 15.0216C2.08479 14.8754 2.12793 14.7089 2.12501 14.54V11C2.12226 9.40408 2.5969 7.84382 3.4879 6.51978C4.37891 5.19575 5.64556 4.16847 7.12501 3.57C7.12899 2.77435 7.44888 2.01287 8.0143 1.45307C8.57972 0.893275 9.34437 0.58102 10.14 0.584998C10.9357 0.588977 11.6971 0.908862 12.2569 1.47428C12.8167 2.03971 13.129 2.80435 13.125 3.6C14.6173 4.25496 15.8855 5.33179 16.7739 6.69803C17.6622 8.06428 18.1318 9.66037 18.125 11.29V14.54C18.1181 14.7049 18.1552 14.8688 18.2325 15.0146C18.3098 15.1605 18.4246 15.2832 18.565 15.37C19.1196 15.6631 19.5684 16.1227 19.8483 16.6842C20.1281 17.2456 20.2249 17.8807 20.125 18.5Z"
        fill={colors[0]}
      />
      <Path
        d="M10.1251 25C10.8231 24.9958 11.5079 24.809 12.1114 24.4581C12.7149 24.1072 13.216 23.6046 13.5651 23H6.68506C7.03408 23.6046 7.53524 24.1072 8.13872 24.4581C8.7422 24.809 9.427 24.9958 10.1251 25Z"
        fill={colors[1]}
      />
    </Svg>
  );
};

export const LeftArrow = ({ colors, size }: IconProps) => {
  if (typeof colors === "object") {
    colors = colors[0];
  }

  return (
    <Svg width={size} height={size} viewBox="0 0 25 18">
      <Path
        d="M23.125 8H2.715l5.41-5.36a1 1 0 1 0-1.41-1.42l-5.71 5.66a3 3 0 0 0 0 4.24l5.66 5.66a1 1 0 0 0 1.41-1.42L2.715 10h20.41a1 1 0 1 0 0-2Z"
        fill={colors}
      />
    </Svg>
  );
};

export const DownArrow = ({ colors, size }: IconProps) => {
  if (typeof colors === "object") {
    colors = colors[0];
  }

  return (
    <Svg width={size} height={size} viewBox="0 0 20 10">
      <Path
        d="M10.125 9.41A5 5 0 0 1 6.585 8L.935 2.29A1 1 0 0 1 2.345.88l5.66 5.66a3.08 3.08 0 0 0 4.24 0l5.66-5.66a1 1 0 0 1 1.41 1.41L13.665 8a5 5 0 0 1-3.54 1.41Z"
        fill={colors}
      />
    </Svg>
  );
};

export const PaperClip = ({ colors, size }: IconProps) => {
  if (typeof colors === "object") {
    colors = colors[0];
  }

  return (
    <Svg width={size} height={size} viewBox="0 0 20 22">
      <Path
        d="M5.595 22a5 5 0 0 1-3.54-8.54l8.48-8.48a3.002 3.002 0 1 1 4.25 4.24l-8.49 8.49a1 1 0 1 1-1.41-1.42l8.48-8.48a1 1 0 1 0-1.41-1.42l-8.49 8.44a3.001 3.001 0 1 0 4.25 4.24l8.48-8.48a5.003 5.003 0 0 0-7.07-7.08l-4.95 5a1 1 0 0 1-1.41-1.41l4.95-5a7 7 0 0 1 9.9 9.9l-8.49 8.48A5.002 5.002 0 0 1 5.595 22Z"
        fill={colors}
      />
    </Svg>
  );
};

export const Camera = ({ colors, size }: IconProps) => {
  if (typeof colors === "string") {
    colors = [colors, colors];
  }

  return (
    <Svg width={size} height={size} viewBox="0 0 29 24">
      <Path d="M14.125 18a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z" fill={colors[0]} />
      <Path
        d="M23.125 4h-.76a1 1 0 0 1-.9-.55l-.34-.69A5 5 0 0 0 16.655 0h-5.06a5 5 0 0 0-4.47 2.76l-.34.69a1 1 0 0 1-.9.55h-.76a5 5 0 0 0-5 5v10a5 5 0 0 0 5 5h18a5 5 0 0 0 5-5V9a5 5 0 0 0-5-5Zm-9 16a7 7 0 1 1 0-14 7 7 0 0 1 0 14Zm9-10a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"
        fill={colors[1]}
      />
    </Svg>
  );
};

export const Picture = ({ colors, size }: IconProps) => {
  if (typeof colors === "string") {
    colors = [colors, colors];
  }

  return (
    <Svg width={size} height={size} viewBox="0 0 29 24">
      <Path
        d="M21.125 12.28a3 3 0 0 0-4.24 0L5.125 24h18a5 5 0 0 0 4.65-3.2c0-.12.09-.25.13-.38l.12-.42c.034-.162.057-.325.07-.49a.533.533 0 0 0 0-.13.09.09 0 0 0 0-.05l-6.97-7.05Z"
        fill={colors[0]}
      />
      <Path
        d="M28.125 4.52a5 5 0 0 0-5-4.52h-18a5 5 0 0 0-5 4.52 3.15 3.15 0 0 0 0 .48v14c-.01.17-.01.34 0 .51.024.172.057.342.1.51a7 7 0 0 0 1.8 2.86c.262.212.547.393.85.54l12.57-12.56a5 5 0 0 1 7.08 0l5.6 5.6V5c.012-.16.012-.32 0-.48ZM6.125 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z"
        fill={colors[1]}
      />
    </Svg>
  );
};

export const Document = ({ colors, size }: IconProps) => {
  if (typeof colors === "string") {
    colors = [colors, colors];
  }

  return (
    <Svg width={size} height={size} viewBox="0 0 24 28">
      <Path
        d="M24 10v13a5 5 0 0 1-5 5H5a5 5 0 0 1-5-5V5a5 5 0 0 1 5-5h9v7a3 3 0 0 0 3 3h7Z"
        fill={colors[0]}
      />
      <Path
        d="M23.91 8H17a1 1 0 0 1-1-1V.09a5.76 5.76 0 0 1 3.12 1.62l3.17 3.17A5.79 5.79 0 0 1 23.91 8Z"
        fill={colors[1]}
      />
    </Svg>
  );
};

export const Wallet = ({ colors, size }: IconProps) => {
  if (typeof colors === "string") {
    colors = [colors, colors];
  }

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M19.91 4.09A4.6 4.6 0 0 0 19 4H7a1 1 0 0 1 0-2h12a5 5 0 0 0-4-2H5a5 5 0 0 0-4 2 4.94 4.94 0 0 0-1 3v14a5 5 0 0 0 5 5h14a5 5 0 0 0 5-5V9a5 5 0 0 0-4.09-4.91ZM17.24 17c-.08.01-.16.01-.24 0a3 3 0 0 1 0-6 2.77 2.77 0 0 1 1 .18 3 3 0 0 1-.76 5.8V17Z"
        fill={colors[0]}
      />
      <Path d="M17 15a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" fill={colors[1]} />
    </Svg>
  );
};

export const Gear = ({ colors, size }: IconProps) => {
  if (typeof colors === "string") {
    colors = [colors, colors];
  }

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" fill={colors[0]} />
      <Path
        d="m21.79 13-.38-.23a.94.94 0 0 1 0-1.62l.38-.23a3 3 0 0 0 1.1-4.09l-1-1.74A3 3 0 0 0 17.79 4l-.32.18A1 1 0 0 1 16 3.36V3a3 3 0 0 0-3-3h-2a3 3 0 0 0-3 3v.36a1 1 0 0 1-1.48.86L6.21 4a3 3 0 0 0-4.1 1.09l-1 1.74A3 3 0 0 0 2.21 11l.38.23a.94.94 0 0 1 0 1.62l-.38.15a3 3 0 0 0-1.1 4.09l1 1.74A2.999 2.999 0 0 0 6.21 20l.31-.17a1 1 0 0 1 1 0 1 1 0 0 1 .49.84V21a3 3 0 0 0 3 3h2a3 3 0 0 0 3-3v-.37a1 1 0 0 1 1.5-.84l.31.18a3 3 0 0 0 4.1-1.09l1-1.74A3.002 3.002 0 0 0 21.79 13ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Z"
        fill={colors[1]}
      />
    </Svg>
  );
};

export const Upload = ({ colors, size }: IconProps) => {
  if (typeof colors === "object") {
    colors = colors[0];
  }

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        stroke={colors}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 17V1.24M4.93 7.24l5.66-5.65a2 2 0 0 1 2.82 0l5.66 5.65M23 17v4a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-4"
      />
    </Svg>
  );
};

export const Logout = ({ colors, size }: IconProps) => {
  if (typeof colors === "object") {
    colors = colors[0];
  }

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        stroke={colors}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 4V3a2 2 0 0 0-2-2H3a2 2 0 0 0-2 2v18a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1M7 12h15.83M19.59 7.76l2.82 2.83a2 2 0 0 1 0 2.82l-2.82 2.83"
      />
    </Svg>
  );
};

export const Pencil = ({ colors, size }: IconProps) => {
  if (typeof colors === "object") {
    colors = colors[0];
  }

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        stroke={colors}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="m20.315 8.46-12 12a2.06 2.06 0 0 1-1 .54l-3.54.71a2 2 0 0 1-2.35-2.35l.7-3.51a2.06 2.06 0 0 1 .54-1L14.505 3a4.15 4.15 0 0 1 5.94 0 4 4 0 0 1-.13 5.51v-.05Z"
      />
    </Svg>
  );
};
