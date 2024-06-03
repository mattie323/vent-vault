import { create } from "zustand";
import { persist } from "zustand/middleware";

import supabase from "../../lib/helper/supabaseClient";

interface Vent {
  id: string;
  title: string;
  feeling: string;
  message: string;
  user_id: string;
}

interface VentState {
  vents: Vent[];
  addVent: (vent: Vent) => void;
  removeVent: (id: string) => void;
  clearVents: () => void;
  fetchVents: (user_id: string) => void;
  resetVents: () => void;
}

const useVentStore = create<VentState>()(
  persist(
    (set, get) => ({
      vents: [],
      addVent: async (vent) => {
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();
        if (sessionError) {
          console.error(sessionError);
          return;
        }

        const user = session?.user;
        if (!user) {
          console.error("User is not authenticated");
          return;
        }

        set({ vents: [...get().vents, { ...vent, user_id: user.id }] });

        const { error } = await supabase
          .from("vents")
          .insert([{ ...vent, user_id: user.id }]);
        if (error) {
          console.error(error);
        } else {
          console.log("vent added successfully");
        }
      },

      removeVent: async (id) => {
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();
        if (sessionError) {
          console.error(sessionError);
          return;
        }

        const user = session?.user;
        if (!user) {
          console.error("User is not authenticated");
          return;
        }

        set({ vents: get().vents.filter((vent) => vent.id !== id) });

        const { error } = await supabase
          .from("vents")
          .delete()
          .eq("user_id", user.id)
          .eq("id", id);
        if (error) {
          console.error(error);
        } else {
          console.log("vent removed successfully");
        }
      },

      clearVents: async () => {
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();
        if (sessionError) {
          console.error(sessionError);
          return;
        }

        const user = session?.user;
        if (!user) {
          console.error("User is not authenticated");
          return;
        }

        const { error } = await supabase
          .from("vents")
          .delete()
          .eq("user_id", user.id);
        if (error) {
          console.error(error);
        } else {
          set({ vents: [] });
          console.log("vents cleared");
        }
      },

      fetchVents: async (user_id) => {
        const { data, error } = await supabase
          .from("vents")
          .select("*")
          .eq("user_id", user_id);
        if (error) {
          console.error(error);
          return;
        }

        set({ vents: data || [] });
      },

      resetVents: () => {
        set({ vents: [] });
      },
    }),
    {
      name: "vent-store",
    },
  ),
);

export default useVentStore;
