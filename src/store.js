import { create } from "zustand";

export const useStore = create((set) => ({
  isLoggedIn: false,
  participants: [],
  login: () => {
    set((state) => ({
      isLoggedIn: true,
    }));
  },
  logOut: () => {
    set((state) => ({
      isLoggedIn: false,
    }));
  },
  setParticipants: (data) =>{
    set((state) => ({
      participants: data
    }))
  }
}));
