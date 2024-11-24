import Checkbox from "expo-checkbox";
import { Formik } from "formik";
import { StyleSheet, Text, View } from "react-native";
import * as Yup from "yup";

import { Colors } from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import Button from "./Button";
import InputField from "./InputField";

const SignUpForm = () => {
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters")
      .matches(/^[A-Za-z\s]*$/, "Name must only contain letters and spaces"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
    checkbox: Yup.boolean()
      .oneOf([true], "You must accept the terms and conditions")
      .required("You must accept the terms and conditions"),
  });

  return (
    <View style={defaultStyles.pageContainer}>
      <Formik
        validationSchema={validationSchema}
        initialValues={{ name: "", email: "", password: "", checkbox: false }}
        onSubmit={(values) => console.log(values)}
      >
        {({
          handleChange,
          handleSubmit,
          setFieldValue,
          values,
          errors,
          touched,
        }) => (
          <View style={{ marginTop: 56 }}>
            <View style={{ marginBottom: errors.name ? 8.4 : 24 }}>
              <InputField
                autocapitalize="words"
                placeholder="Name"
                type="text"
                value={values.name}
                onChangeText={handleChange("name")}
              />
              {errors.name && touched.name && (
                <Text style={styles.error}>{errors.name}</Text>
              )}
            </View>
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
            <View style={{ marginBottom: errors.password ? 8.4 : 24 }}>
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
            <View style={{ marginBottom: errors.checkbox ? 12.4 : 28 }}>
              <View style={styles.checkboxRow}>
                <Checkbox
                  value={values.checkbox}
                  onValueChange={(value) => setFieldValue("checkbox", value)}
                  color={Colors.violet100}
                />
                <Text style={{ marginLeft: 10 }}>
                  <Text style={styles.textBlack}>
                    By signing up, you agree to the
                  </Text>
                  <Text style={styles.textViolet}>
                    {" Terms of\nService and Privacy Policy"}
                  </Text>
                </Text>
              </View>
              {errors.checkbox && touched.checkbox && (
                <Text style={styles.error}>{errors.checkbox}</Text>
              )}
            </View>
            <Button
              onPress={() => handleSubmit()}
              title="Sign Up"
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

export default SignUpForm;
