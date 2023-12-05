import { defineStore } from "pinia";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { User } from "~/types/User";

export const useUser = defineStore("user", {
  state: () => ({
    user: { email: "", nick: "" } as User,
  }),
  actions: {
    async getUser(): Promise<void> {
      const res = await fetch("http://localhost:5000/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken: Cookies.get("refreshToken") }),
      });
      const data = await res.json();
      if (data.success) {
        this.user = jwtDecode(data.token);
      }
    },
  },
});
