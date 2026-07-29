import CustomButton from "@/components/ui/custom-button";
import CustomDropdown from "@/components/ui/custom-dropdown";
import CustomInput from "@/components/ui/custom-input";
import CustomText from "@/components/ui/custom-text";
import FlexBox from "@/components/ui/flexbox";
import { PRIMARY_COLOR, USER_ROLES } from "@/constants";
import { useRouter } from "expo-router";

import React from "react";
import { Controller, useForm } from "react-hook-form";
import { KeyboardAvoidingView, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const LoginScreen = () => {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      role: "",
    },
  });
  const onSubmit = (data: any) => console.log(data);

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
                value="Welcome Back"
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

              <CustomButton onPress={handleSubmit(onSubmit)}>
                Login
              </CustomButton>

              <FlexBox flexDirection="row" justifyContent="center" gap={5}>
                <CustomText
                  value="Don't have an account?"
                  fontSize={14}
                  fontWeight="bold"
                />
                <Pressable onPress={() => router.push("/(public)/register")}>
                  <CustomText
                    value="Sign Up"
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
export default LoginScreen;
