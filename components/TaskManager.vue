<template>
  <div class="task-wrapper" v-if="this.checkUser()">
    <div class="task" v-for="task in tasks" v-bind:key="task">
      <div class="check-wrapper">
        <div
          class="check"
          @click="checkTask(task)"
          :class="{ checked: task.checked }"
        ></div>
      </div>
      <div class="title">
        {{ task.title }}
      </div>
      <div class="description">{{ task.description }}</div>
      <div class="date">{{ this.formatData(task.date) }}</div>
    </div>
  </div>
  <div v-else class="warning">You are not logged in</div>
</template>

<script>
import Cookies from "js-cookie";
export default {
  data() {
    return {
      tasks: [],
    };
  },
  methods: {
    async getTasks() {
      try {
        const res = await fetch("http://localhost:5000/api/tasks/get", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ nick: this.user.nick }),
        });
        const resData = await res.json();
        console.log(resData);
        if (resData.success) {
          this.tasks = resData.tasks;
        }
      } catch (err) {}
    },
    formatData() {
      const date = new Date(); // używa bieżącej daty i czasu
      const options = { year: "numeric", month: "long", day: "numeric" };
      const formattedDate = date.toLocaleDateString("pl-PL", options);
      return formattedDate;
    },
    async checkTask(task) {
      try {
        const res = await fetch("http://localhost:5000/api/task/check", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ taskId: task._id, checked: task.checked }),
        });
        this.getTasks();
      } catch (err) {}
    },
    checkUser() {
      if (Cookies.get("refreshToken")) {
        return true;
      }
      return false;
    },
  },
  watch: {
    user() {
      this.getTasks();
    },
  },
  props: {
    user: Object,
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

.check {
  background-color: gray;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin: 15px 0 0 15px;
  cursor: pointer;
}
.checked {
  background-color: rgb(60, 214, 60);
  box-shadow: 0px 0px 5px 3px #0000000e;
}
.task-wrapper {
  color: white;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 10px 100px;
  margin-top: 30px;
  width: 100%;
  overflow: hidden;
}
.warning {
  width: 100%;
  text-align: center;
  margin: auto;
}
</style>
