import { defaultStyles } from "@/constants/Styles";
import { Formik } from "formik";
import { StyleSheet, Text, View } from "react-native";
import * as Yup from "yup";
import Button from "./Button";
import InputField from "./InputField";
import { Colors } from "@/constants/Colors";

const LoginForm = () => {
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
  });

  return (
    <View style={defaultStyles.pageContainer}>
      <Formik
        validationSchema={validationSchema}
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => console.log(values)}
      >
        {({ handleChange, handleSubmit, values, errors, touched }) => (
          <View style={{ marginTop: 56 }}>
            <View style={{ marginBottom: errors.email ? 8.4 : 24 }}>
              <InputField
                placeholder="Email"
                type="email"
                value={values.email}
                onChangeText={handleChange("email")}
              />
              {errors.email && touched.email && (
                <Text style={styles.error}>{errors.email}</Text>
              )}
            </View>
            <View style={{ marginBottom: errors.password ? 24.4 : 40 }}>
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
