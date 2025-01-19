import supabase from "@/helpers/supabaseClient";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { login as authLogin } from "@/helpers/login";
import { signout as authSignout } from "@/helpers/signout";

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
      const response = await authLogin({
        email: credentials.email,
        password: credentials.password,
      });

      return response;
    } catch (err) {
      throw rejectWithValue((err as { message: string }).message);
    }
  }
);

export const signout = createAsyncThunk(
  "auth/signout",
  async (_, { rejectWithValue }) => {
    try {
      await authSignout();

      return null;
    } catch (err) {
      throw rejectWithValue((err as { message: string }).message);
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
      /* Login Cases
      ============== */
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
        // Stop Loading
        state.loading = false;

        console.log(action);

        // Store User Data
        const userData: UserType = {
          id: action.payload.authData.user?.id || "",
          email: action.payload.authData.user?.email || "",
          name: action.payload.profileData?.full_name,
          avatarURL: action.payload.profileData?.avatar_url || "",
        };
        state.user = userData;

        // Store Tokens
        state.accessToken = action.payload.authData.session.access_token || "";
        state.refreshToken =
          action.payload.authData.session.refresh_token || "";

        // Set Auth Status
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload || "Some error happened.";
      })

      /* Logout Cases
      =============== */
      .addCase(signout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.accessToken = null;
        state.refreshToken = null;
        state.error = null;
      })
      .addCase(signout.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      }),
});

export const { logout, clearError } = authSlice.actions;

export default authSlice.reducer;
