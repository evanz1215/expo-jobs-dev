import CustomButton from "@/components/ui/custom-button";
import CustomDropdown from "@/components/ui/custom-dropdown";
import CustomInput from "@/components/ui/custom-input";
import CustomText from "@/components/ui/custom-text";
import FlexBox from "@/components/ui/flexbox";
import { PRIMARY_COLOR, USER_ROLES } from "@/constants";
import { registerUser } from "@/services/user";
import { useRouter } from "expo-router";

import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { KeyboardAvoidingView, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

const RegisterScreen = () => {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "",
    },
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);

      const response = await registerUser(data);

      Toast.show({
        type: "success",
        text1: "Registration Successful",
        text2: "Please login to continue.",
      });

      setTimeout(() => {
        router.push("/(public)/login");
      }, 2000);
    } catch (error) {
      console.error("Registration error:", error);

      Toast.show({
        type: "error",
        text1: "Registration Failed",
        text2: "Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <KeyboardAvoidingView
        behavior="padding"
        style={{ flex: 1 }}
        keyboardVerticalOffset={0}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <FlexBox backgroundColor={PRIMARY_COLOR} flex={1}>
            <FlexBox gap={5} paddingHorizontal={30} paddingVertical={40}>
              <CustomText
                value="Create Account"
                fontSize={34}
                fontColor="#fff"
                fontWeight="bold"
              />
              <CustomText
                value="Please fill the form to continue"
                fontSize={14}
                fontColor="#c2c2c2"
              />
            </FlexBox>
            <FlexBox
              style={{
                borderTopRightRadius: 50,
              }}
              flex={1}
              backgroundColor="#fff"
              paddingHorizontal={30}
              paddingVertical={40}
              gap={20}
            >
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <CustomInput
                    placeholder="Name"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    label="Name"
                    errorMessage="First name is required"
                    error={!!errors.name}
                  />
                )}
                name="name"
              />

              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <CustomInput
                    placeholder="Email"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    label="Email"
                    errorMessage="Email is required"
                    error={!!errors.email}
                  />
                )}
                name="email"
              />

              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <CustomDropdown
                    options={USER_ROLES}
                    onValueChange={onChange}
                    value={value}
                    label="Role"
                    errorMessage="Role is required"
                    error={!!errors.role}
                  />
                )}
                name="role"
              />

              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <CustomInput
                    placeholder="Password"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    label="Password"
                    errorMessage="Password is required"
                    error={!!errors.password}
                    secureTextEntry
                  />
                )}
                name="password"
              />

              <CustomButton disabled={loading} onPress={handleSubmit(onSubmit)}>
                {loading ? "Registering..." : "Register"}
              </CustomButton>

              <FlexBox flexDirection="row" justifyContent="center" gap={5}>
                <CustomText
                  value="Already have an account?"
                  fontSize={14}
                  fontWeight="bold"
                />
                <Pressable onPress={() => router.push("/(public)/login")}>
                  <CustomText
                    value="Sign In"
                    fontSize={14}
                    fontColor={PRIMARY_COLOR}
                    fontWeight="bold"
                  />
                </Pressable>
              </FlexBox>
            </FlexBox>
          </FlexBox>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default RegisterScreen;
