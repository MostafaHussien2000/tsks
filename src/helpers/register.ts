import supabase from "./supabaseClient";

type userRegisterProps = {
  full_name: string;
  email: string;
  password: string;
  avatar_url: string;
};

export const register = async ({
  full_name,
  email,
  password,
  avatar_url,
}: userRegisterProps) => {
  try {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      throw new Error(authError.message);
    }

    const userId = authData.user?.id;

    const { error: profileCreationError } = await supabase
      .from("profiles")
      .insert({
        id: userId,
        full_name,
        avatar_url,
      });

    if (profileCreationError) {
      throw new Error(profileCreationError.message);
    }

    return null;
  } catch (err) {
    throw new Error((err as { message: string }).message);
  }
};
