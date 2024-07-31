import { useLocalStorage } from "@/services/LocalStorage";
import { UserType } from "@/types/UserType";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: (): UserType =>
    useLocalStorage().get("user")
      ? (JSON.parse(useLocalStorage().get("user") as string) as UserType)
      : {
          id: null,
          username: null,
          email: null,
          language: null,
          createdAt: null,
          updatedAt: null,
        },
  getters: {
    userIsLoggedIn: (state) => state.id !== null,
  },
  actions: {
    login(user: UserType) {
      useLocalStorage().set("user", JSON.stringify(user));
      this.id = user.id;
      this.username = user.username;
      this.email = user.email;
      this.language = user.language;
      this.createdAt = user.createdAt;
      this.updatedAt = user.updatedAt;
    },
    logout() {
      useLocalStorage().remove("user");
      this.id = null;
      this.username = null;
      this.email = null;
      this.language = null;
      this.createdAt = null;
      this.updatedAt = null;
    },
    setLanguage(language: string) {
      useLocalStorage().set("user", JSON.stringify({ ...this, language }));
      this.language = language;
    },
  },
});
