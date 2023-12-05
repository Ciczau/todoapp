<template>
  <div class="task" @click="redirectToTask">
    <div class="check-wrapper">
      <SvgIcon
        class="check-icon"
        v-if="task.checked"
        @click="checkTask(task)"
        type="mdi"
        :path="checkedIcon"
      />
      <SvgIcon
        class="check-icon"
        v-else
        @click="checkTask(task)"
        type="mdi"
        :path="uncheckedIcon"
      />
    </div>
    <div v-if="taskmode === 'singletask'">
      <div class="header-info" v-if="task.nick === user.nick">
        You are in editing mode
      </div>
      <div class="header-info" v-else>You are only in view mode.</div>
      <div class="username">{{ user.nick }} task's</div>
    </div>
    <div class="title">
      {{ task.title }}
    </div>
    <div class="description">{{ task.description }}</div>
    <div class="date">{{ formatData(task.date) }}</div>
  </div>
</template>

<script>
import { mdiCheckCircleOutline, mdiCheckCircle } from "@mdi/js";
import SvgIcon from "@jamescoyle/vue-icon";
export default {
  data() {
    return {
      uncheckedIcon: mdiCheckCircleOutline,
      checkedIcon: mdiCheckCircle,
    };
  },
  props: ["task", "getTasks", "taskmode", "user"],
  components: {
    SvgIcon,
  },
  methods: {
    formatData(taskDate) {
      const date = new Date(taskDate);
      const options = { year: "numeric", month: "long", day: "numeric" };
      const formattedDate = date.toLocaleDateString("pl-PL", options);
      return formattedDate;
    },
    async checkTask(task) {
      try {
        await fetch("http://localhost:5000/api/task/check", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ taskId: task._id, checked: task.checked }),
        });
        this.task.checked = !this.task.checked;
        this.$emit("getTasks");
      } catch (err) {}
    },
    redirectToTask() {
      navigateTo(`/${this.task._id}`);
    },
  },
};
</script>

<style>
.task {
  background-color: rgba(128, 128, 128, 0.521);
  color: white;
  max-width: 100vw;
  width: 600px;
  display: flex;
  margin: 20px 0;
  flex-direction: column;
  border-radius: 15px;
  cursor: pointer;
  padding: 0 0 10px 0px;
  align-items: center;
  @media screen and (max-width: 767px) {
    border-radius: 0px;
  }
}
.title {
  padding: 5px;
}

.description {
  padding: 15px;
}

.check-wrapper {
  width: 100%;
}
.username {
  font-size: 25px;
  margin-bottom: 30px;
}
.check {
  background-color: gray;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin: 15px 0 0 15px;
  cursor: pointer;
}

.check-icon {
  width: 25px;
  height: 25px;
  margin: 10px;
  cursor: pointer;
}
.header-info {
  color: rgb(196, 196, 196);
  font-size: 12px;
}
</style>
