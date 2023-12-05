<template>
  <div class="wrapper">
    <div v-if="userStore.user !== null">{{ userStore.user.email }}</div>
    <div></div>
  </div>
</template>

<script>
import { useUser } from "../server/api/users";

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
  background-color: rgb(94, 94, 107);
  display: flex;
  color: white;
  flex-direction: column;
  justify-content: flex-start;
}
</style>
