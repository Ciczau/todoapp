<template>
  <div class="wrapper">
    <Header :user="userStore.user" />
    <TaskManager :user="userStore.user" />
  </div>
</template>

<script>
import Cookies from "js-cookie";
import VueJwtDecode from "vue-jwt-decode";
import { useUser } from "~/server/api/users";
export default {
  computed: {
    userStore() {
      return useUser();
    },
  },
  async mounted() {
    const user = useUser();
    await user.getUser();
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
