/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../lib/helper/supabaseClient";
import { useUserStore } from "./useUserStore";
import { ventUser } from "../../models/ventUser";

function useUserAuthService() {
  const navigate = useNavigate();
  const { user, setUser, clearUser } = useUserStore();

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      console.log("Session: ", session);

      if (session?.user) {
        const { data: user, error: userError } = await supabase
          .from<ventUser>("users")
          .select("id, email, firstName, lastName")
          .eq("id", session.user.id)
          .single();

        if (user) {
          setUser(user);
        }
        if (userError) console.error("User Error: ", userError);
      } else {
        setUser(null);
      }
      if (error) console.error("Session Error: ", error);
    };
    getSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth State Changed: ", event, session);
      if (session?.user) {
        supabase
          .from<ventUser>("users")
          .select("id, email, firstName, lastName")
          .eq("id", session.user.id)
          .single()
          .then(({ data: user, error: userError }) => {
            if (user) {
              setUser(user);
            }
            if (userError) console.error("User Fetch Error: ", userError);
          });
      } else {
        setUser(null);
        navigate("/");
      }
    });

    return () => subscription.unsubscribe();
  }, [setUser, navigate]);

  const logOut = async () => {
    await supabase.auth.signOut();
    clearUser();
    navigate("/");
  };

  return { user, logOut };
}

export default useUserAuthService;
