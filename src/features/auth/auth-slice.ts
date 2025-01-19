import supabase from "@/helpers/supabaseClient";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserType = {
  id: string;
  email: string;
  name: string;
  avatarURL: string;
};

type LoginCredentialsType = {
  email: string;
  password: string;
};

interface AuthState {
  user: UserType | null;
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
}

let initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  accessToken: null,
  refreshToken: null,
  loading: false,
  error: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async (credentials: LoginCredentialsType, { rejectWithValue }) => {
    try {
      const { data: authData, error: authError } =
        await supabase.auth.signInWithPassword({
          email: credentials.email,
          password: credentials.password,
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
      rejectWithValue((err as { message: string }).message);
    }
  }
);

export const signout = createAsyncThunk(
  "auth/signout",
  async (_, { rejectWithValue }) => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        throw new Error(error.message);
      }

      return null;
    } catch (err) {
      console.error(err);
      rejectWithValue((err as { message: string }).message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) =>
    builder
      // Login Cases
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        if (action.payload?.success && action.payload.authData) {
          const userData: UserType = {
            id: action.payload.authData.user?.id || "",
            email: action.payload.authData.user?.email || "",
            name: action.payload.profileData?.full_name,
            avatarURL: action.payload.profileData?.avatar_url || "",
          };
          state.user = userData;
          state.accessToken =
            action.payload.authData.session.access_token || "";
          state.refreshToken =
            action.payload.authData.session.refresh_token || "";
          state.isAuthenticated = true;
        } else {
          state.error = action.payload?.message || "Login failed";
        }
      })
      .addCase(login.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload || "Some error happened.";
      })
      // Logout Cases
      .addCase(signout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.token = null;
        state.error = null;
      })
      .addCase(signout.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      }),
});

export const { logout, clearError } = authSlice.actions;

export default authSlice.reducer;
