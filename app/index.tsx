import CustomButton from "@/components/ui/custom-button";
import CustomInput from "@/components/ui/custom-input";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        padding: 20,
        gap: 20,
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <CustomButton mode="contained">React native paper button</CustomButton>
      <CustomInput
        label="Username"
        placeholder="Enter your username"
        errorMessage="11"
      />
    </SafeAreaView>
  );
}
