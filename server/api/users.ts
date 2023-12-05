import { ref } from "vue";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { User } from "~/types/User";
import { defineStore } from "pinia";

export const useUser = defineStore("user", () => {
  const user = ref({ email: "", nick: "" } as User);

  async function getUser(): Promise<void> {
    const res = await fetch("http://localhost:5000/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken: Cookies.get("refreshToken") }),
    });
    const data = await res.json();
    if (data.success) {
      user.value = jwtDecode(data.token);
    }
  }

  return { user, getUser };
});
