import { supabaseConfig } from "@/config/supabase-config";
import { IUser } from "@/interfaces";

export const registerUser = async (payload: Partial<IUser>) => {
  try {
    // step 1 : register user with supabase auth
    const response = await supabaseConfig.auth.signUp({
      email: payload.email!,
      password: payload.password!,
    });

    if (response.error) {
      throw response.error;
    }

    const dbPayload = {
      name: payload.name,
      profile_picture_url: "",
      email: payload.email,
      resume_url: "",
      role: payload.role,
    };

    // step 2 : insert user details in user_profiles table
    const { error } = await supabaseConfig
      .from("user_profiles")
      .insert(dbPayload);

    if (error) {
      throw error;
    }

    return {
      success: true,
      data: null,
      message: "User registered successfully",
    };
  } catch (error) {
    throw error;
  }
};
