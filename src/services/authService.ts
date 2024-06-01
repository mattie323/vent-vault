// src/services/authService.ts

import supabase from "../lib/helper/supabaseClient";

export const signUp = async (
  firstName: string,
  lastName: string,
  username: string,
  email: string,
  password: string,
) => {
  // First, create the user using Supabase authentication
  const { user, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        firstName,
        lastName,
        username,
      },
    },
  });

  if (signUpError) {
    throw new Error(signUpError.message);
  }
  
  return user;
};
