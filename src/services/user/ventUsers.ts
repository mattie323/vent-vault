import supabase from "../../lib/helper/supabaseClient";
import { ventUser } from "../../models/ventUser";

export async function ventUserSignIn({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
  
    if (error) {
      throw error;
    }
  
    return data.user;
  }
