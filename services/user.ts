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

export const loginUser = async (payload: {
  email: string;
  password: string;
  role: string;
}) => {
  try {
    // step 1 : sign in user with supabase auth
    const response = await supabaseConfig.auth.signInWithPassword({
      email: payload.email,
      password: payload.password,
    });

    if (response.error) {
      throw response.error;
    }

    const email = response.data.user?.email;

    const dbRecord = await supabaseConfig
      .from("user_profiles")
      .select("*")
      .eq("email", email)
      .single();

    if (dbRecord.error) {
      throw dbRecord.error;
    }

    const user = dbRecord.data as IUser;

    if (user.role !== payload.role) {
      throw new Error("User role does not match");
    }

    return {
      success: true,
      data: user,
      message: "User logged in successfully.",
    };
  } catch (error) {
    throw error;
  }
};
