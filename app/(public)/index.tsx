import CustomText from "@/components/ui/custom-text";
import FlexBox from "@/components/ui/flexbox";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const router = useRouter();
  const checkAuthSession = async () => {
    try {
      // for now navigate to welcome screen, later we will check for auth session and navigate accordingly
      // simulate 2 seconds delay to show the loading screen
      await new Promise((resolve) => setTimeout(resolve, 2000));
      router.push("/(public)/welcome");
    } catch (error) {
      console.log(error);
      router.push("/(public)/welcome");
    }
  };

  useEffect(() => {
    checkAuthSession();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlexBox flex={1} alignItems="center" justifyContent="center">
        <CustomText value="Loading..." />
      </FlexBox>
    </SafeAreaView>
  );
}
