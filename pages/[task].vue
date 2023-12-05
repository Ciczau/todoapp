<template>
  <div class="wrapper">
    <div v-if="task && task.success">
      <Task :task="task.task" :taskmode="'singletask'" :user="userStore.user" />
    </div>
    <div v-else>This task does not exists</div>
  </div>
</template>

<script>
import { useUser } from "../server/api/users";

export default {
  async setup() {
    const route = useRoute();
    const { data: task } = await useAsyncData("task", () =>
      $fetch("/api/task/get", {
        baseURL: "http://localhost:5000",
        method: "POST",
        body: JSON.stringify({
          taskId: route.params.task,
        }),
      })
    );
    return { task };
  },
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

  height: 100vh;
  background-color: rgb(94, 94, 107);
  display: flex;
  color: white;
  align-items: center;
  justify-content: center;
}
</style>
