import supabase from "../../lib/helper/supabaseClient";
import { ventUser } from "../../models/ventUser";


export const fetchUserProfile = async (
  userId: string
): Promise<ventUser | null> => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('id, firstName, lastName, email')
      .eq('id', userId)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data ?? null;
  } catch (error) {
    console.error('Fetch User Profile Error:', error);
    throw new Error('Failed to fetch user profile.');
  }
};

export const updateUserProfile = async (
  userId: string,
  profileData: Partial<ventUser>
): Promise<void> => {
  try {
    const { error } = await supabase
      .from('users')
      .update(profileData)
      .eq('id', userId);

    if (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    console.error('Update Profile Error:', error);
    throw new Error('Failed to update profile.');
  }
};
