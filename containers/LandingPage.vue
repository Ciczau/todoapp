<template>
  <div class="wrapper">
    <Header :user="user" />
    <TaskManager :user="user" />
  </div>
</template>

<script>
import Cookies from "js-cookie";
import VueJwtDecode from "vue-jwt-decode";
export default {
  data() {
    return {
      user: { nick: "", email: "" },
    };
  },
  methods: {
    async getUser() {
      const res = await fetch("http://localhost:5000/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken: Cookies.get("refreshToken") }),
      });
      const data = await res.json();
      if (data.success) {
        this.user = VueJwtDecode.decode(data.token);
      }
    },
  },
  mounted() {
    this.getUser();
  },
};
</script>

<style lang="scss">
.wrapper {
  width: 100vw;

  min-height: 100vh;
  background-color: rgb(5, 5, 26);
  display: flex;
  color: white;
  flex-direction: column;
  justify-content: flex-start;
}
</style>
