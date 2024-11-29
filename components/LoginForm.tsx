import { defaultStyles } from "@/constants/Styles";
import { Formik } from "formik";
import { StyleSheet, Text, View } from "react-native";
import Storage from "expo-sqlite/kv-store";
import * as Crypto from "expo-crypto";
import * as Yup from "yup";

import Button from "./Button";
import InputField from "./InputField";
import { Colors } from "@/constants/Colors";
import { useState } from "react";
import { getUserData } from "@/utils/Database";
import { useSQLiteContext } from "expo-sqlite";
import { useRouter } from "expo-router";

const LoginForm = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const db = useSQLiteContext();
  const router = useRouter();
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
  });

  const handleLogin = (values: any) => {
    const userData = getUserData(db, values.email);
    console.log(userData);

    if (!userData) {
      setErrorMessage("User not found");
      return;
    }

    if (userData.password !== values.password) {
      setErrorMessage("Incorrect email or password");
      return;
    }

    console.log("Logged in");
    const details = {
      user_id: userData.user_id,
      uuid: Crypto.randomUUID(),
      timestamp: new Date().getTime(),
    };

    Storage.setItemSync("user", JSON.stringify(details));
    router.replace({
      pathname: "/(auth)/(tabs)/home",
      params: { user_id: `${userData.user_id}` },
    });
  };

  return (
    <View style={defaultStyles.pageContainer}>
      <Formik
        validationSchema={validationSchema}
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => handleLogin(values)}
      >
        {({ handleChange, handleSubmit, values, errors, touched }) => (
          <View style={{ marginTop: 56 }}>
            <View
              style={{
                marginBottom:
                  (errors.email && touched.email) || errorMessage ? 8.4 : 24,
              }}
            >
              <InputField
                placeholder="Email"
                type="email"
                value={values.email}
                onChangeText={handleChange("email")}
              />
              {((errors.email && touched.email) || errorMessage) && (
                <Text style={styles.error}>{errors.email || errorMessage}</Text>
              )}
            </View>
            <View
              style={{
                marginBottom: errors.password && touched.password ? 24.4 : 40,
              }}
            >
              <InputField
                placeholder="Password"
                type="password"
                value={values.password}
                onChangeText={handleChange("password")}
              />
              {errors.password && touched.password && (
                <Text style={styles.error}>{errors.password}</Text>
              )}
            </View>
            <Button
              onPress={() => handleSubmit()}
              title="Login"
              disabled={false}
              loading={false}
            />
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: "7.5%",
  },
  textBlack: {
    ...defaultStyles.textRegular3,
    color: Colors.dark100,
  },
  textViolet: {
    ...defaultStyles.textRegular3,
    color: Colors.violet100,
  },
  error: {
    ...defaultStyles.textTiny,
    color: Colors.red100,
    marginLeft: "7.5%",
  },
});

export default LoginForm;
