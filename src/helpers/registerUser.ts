import supabase from "./supabaseClient";

type userRegisterProps = {
  full_name: string;
  email: string;
  password: string;
  avatar_url: string;
};

export const registerUser = async ({
  full_name,
  email,
  password,
  avatar_url,
}: userRegisterProps) => {
  try {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: "http://localhost:5174/",
      },
    });

    if (authError) {
      console.error("Error signing up: ", authError.message);
      return { success: false, error: authError.message };
    }

    const userId = authData.user?.id;

    const { error: profileError } = await supabase.from("profiles").insert({
      id: userId,
      full_name,
      avatar_url,
    });

    if (profileError) {
      console.error("Error inserting profile: ", profileError.message);
      return { success: false, error: profileError.message };
    }

    const { data: profileData, error: profileFetchingError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId);

    if (profileFetchingError) {
      console.error(
        "Error Fetching Profile Data: ",
        profileFetchingError.message
      );
      return { success: false, error: profileFetchingError.message };
    }

    return { authData, profileData: profileData[0] };
  } catch (err) {
    console.error("Unexpected Error: ", err);
    return { success: false, error: "Unexpected error occurred." };
  }
};
