import supabase from "./supabaseClient";

export const signout = async () => {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) throw new Error(error.message);
  } catch (err) {
    throw new Error((err as { message: string }).message);
  }
};
