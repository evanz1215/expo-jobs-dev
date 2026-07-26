import CustomButton from "@/components/ui/custom-button";
import CustomText from "@/components/ui/custom-text";
import FlexBox from "@/components/ui/flexbox";
import { PRIMARY_COLOR } from "@/constants";
import { useRouter } from "expo-router";
import React from "react";
import { Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const WelcomePage = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlexBox flex={1} justifyContent="center" alignItems="center">
        <Image
          source={require("@/assets/images/icon.png")}
          style={{ width: 100, height: 100, marginBottom: 20 }}
        />
        <CustomText
          value="Expo Jobs"
          fontColor={PRIMARY_COLOR}
          fontWeight="bold"
          fontSize={25}
        />
        <CustomText
          value="Find your dream job with Expo Jobs"
          fontColor="#525252"
          fontWeight="bold"
        />

        <FlexBox
          style={{
            width: "100%",
          }}
          marginVertical={50}
          paddingHorizontal={20}
          gap={20}
        >
          <CustomButton onPress={() => router.push("/(public)/register")}>
            Get Started
          </CustomButton>
          <CustomButton
            mode="outlined"
            onPress={() => router.push("/(public)/login")}
          >
            Sign In
          </CustomButton>
        </FlexBox>
      </FlexBox>
    </SafeAreaView>
  );
};

export default WelcomePage;
