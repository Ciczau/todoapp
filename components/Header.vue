<template>
  <header class="header">
    <Menu :user="user" :opened="isOpened" />
    <div class="show-menu-button" @click="handleMenu()">></div>
    <div>To Do</div>
    <button @click="handleModal" class="new-task-button">New task</button>
    <NewTaskModal
      v-if="isModalVisible"
      :user="user"
      :isModalVisible="this.isModalVisible"
      @isModalVisible="handleModalClose"
    />
  </header>
</template>

<script>
export default {
  data() {
    return {
      isOpened: false,
      isModalVisible: false,
    };
  },

  methods: {
    handleMenu() {
      this.isOpened = !this.isOpened;
    },
    handleModal() {
      this.isModalVisible = true;
    },
    handleModalClose() {
      this.isModalVisible = false;
    },
  },
  props: {
    user: { nick: String, email: String },
  },
};
</script>

<style>
.header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  font-size: 20px;
  color: white;
  border-bottom: 1px solid gray;
}
.new-task-button {
  padding: 5px 15px;
  background-color: rgb(83, 95, 165);
  border-radius: 5px;
  color: white;
  outline: 0;
  border: 0;
  box-shadow: 0px 0px 5px 3px #00000044;
}
.show-menu-button {
  @media screen and (min-width: 767px) {
    opacity: 0;
  }
}
</style>
