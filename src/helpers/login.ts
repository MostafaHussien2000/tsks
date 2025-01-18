import supabase from "./supabaseClient";

type userLoginProps = {
  email: string;
  password: string;
};

export const login = async ({ email, password }: userLoginProps) => {
  try {
    const { data: authData, error: authError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (authError) {
      console.error("Error Signing In: ", authError.message);
      return { success: false, message: authError.message };
    }

    const userId = authData.user?.id;

    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId);

    if (profileError) {
      console.error("Error getting profile data: ", profileError.message);
      return { success: false, message: profileError.message };
    }

    return { success: true, authData, profileData };
  } catch (err) {
    console.error(err);
    return { success: false, message: err };
  }
};
