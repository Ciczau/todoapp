<template>
  <div class="task-wrapper" v-if="this.checkUser()">
    <div class="buttons-wrapper">
      <button
        :class="{ selected: choosenPriorityFilter === 0 }"
        class="filter-button"
        @click="selectPriorityFilter(0)"
      >
        All
      </button>
      <button
        :class="{ selected: choosenPriorityFilter === 1 }"
        class="filter-button"
        @click="selectPriorityFilter(1)"
      >
        High priority
      </button>
      <button
        :class="{ selected: choosenPriorityFilter === 2 }"
        class="filter-button"
        @click="selectPriorityFilter(2)"
      >
        Low priority
      </button>
      <button
        :class="{ selected: choosenPriorityFilter === 3 }"
        class="filter-button"
        @click="selectPriorityFilter(3)"
      >
        No priority
      </button>
    </div>
    <div class="buttons-wrapper">
      <button
        :class="{ selected: choosenExecutionFilter === 0 }"
        class="filter-button"
        @click="selectExecutionFilter(0)"
      >
        All
      </button>
      <button
        :class="{ selected: choosenExecutionFilter === 1 }"
        class="filter-button"
        @click="selectExecutionFilter(1)"
      >
        To do
      </button>
      <button
        :class="{ selected: choosenExecutionFilter === 2 }"
        class="filter-button"
        @click="selectExecutionFilter(2)"
      >
        Done
      </button>
    </div>
    <div class="task" v-for="task in tasks" v-bind:key="task">
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
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiCheckCircleOutline, mdiCheckCircle } from "@mdi/js";

export default {
  data() {
    return {
      tasks: [],
      choosenPriorityFilter: 0,
      choosenExecutionFilter: 0,
      uncheckedIcon: mdiCheckCircleOutline,
      checkedIcon: mdiCheckCircle,
    };
  },
  components: {
    SvgIcon,
  },
  methods: {
    async getTasks(priorityFilterId, executionFilterId) {
      try {
        const res = await fetch("http://localhost:5000/api/tasks/get", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nick: this.user.nick,
            priorityFilter: priorityFilterId,
            executionFilter: executionFilterId,
          }),
        });
        const resData = await res.json();
        if (resData.success) {
          this.tasks = resData.tasks;
        }
      } catch (err) {}
    },
    formatData(taskDate) {
      const date = new Date(taskDate);
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
        this.getTasks(this.choosenPriorityFilter, this.choosenExecutionFilter);
      } catch (err) {}
    },
    checkUser() {
      if (Cookies.get("refreshToken")) {
        return true;
      }
      return false;
    },
    selectPriorityFilter(filterId) {
      this.choosenPriorityFilter = filterId;
    },
    selectExecutionFilter(filterId) {
      this.choosenExecutionFilter = filterId;
    },
  },
  watch: {
    user() {
      this.getTasks(0, 0);
    },
    choosenPriorityFilter(newValue) {
      this.getTasks(newValue, this.choosenExecutionFilter);
    },
    choosenExecutionFilter(newValue) {
      this.getTasks(this.choosenPriorityFilter, newValue);
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

.buttons-wrapper {
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin: 15px 0;
  padding: 15px;
  border-radius: 10px;
  background-color: rgba(128, 128, 128, 0.349);
}
.filter-button {
  padding: 5px 15px;
  outline: 0;
  border: 0;
  border-radius: 5px;
  cursor: pointer;
  color: white;
  background-color: rgb(66, 66, 163);
}
.selected {
  background-color: rgb(28, 28, 85);
}
.check-icon {
  width: 25px;
  height: 25px;
  margin: 10px;
  cursor: pointer;
}
</style>
