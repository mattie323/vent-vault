/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
import { useState, useEffect } from 'react';
import { fetchUserProfile } from './ventUsers';
import { ventUser } from '../../models/ventUser';

const useUserProfile = (userId: string) => {
  const [userProfile, setUserProfile] = useState<ventUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const profile = await fetchUserProfile(userId);
        setUserProfile(profile);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      getUserProfile();
    }
  }, [userId]);

  return { userProfile, loading, error };
};

export default useUserProfile;
