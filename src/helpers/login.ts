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
      throw new Error(authError.message);
    }

    const userId = authData.user?.id;

    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId);

    if (profileError) {
      throw new Error(profileError.message);
    }

    return { success: true, authData, profileData: profileData[0] };
  } catch (err) {
    console.log((err as { message: string }).message);
    throw new Error((err as { message: string }).message);
  }
};
