<template>
  <div class="modal-wrapper">
    <div class="modal-background" @click="closeModal" />
    <form class="modal" @submit="onSubmit">
      <input
        class="input"
        placeholder="Title"
        v-model="title.value"
        :ref="title.ref"
      />
      <p v-if="title.error" class="error">{{ title.error.message }}</p>
      <input
        class="input"
        v-model="description.value"
        :ref="description.ref"
        placeholder="Description"
      />
      <p v-if="description.error" class="error">
        {{ description.error.message }}
      </p>
      <input
        class="input"
        placeholder="Date"
        v-model="date.value"
        :ref="date.ref"
      />
      <p v-if="date.error" class="error">{{ date.error.message }}</p>
      <p>Choose priority:</p>
      <select
        class="priority-select"
        :ref="priority.ref"
        v-model="priority.value"
      >
        <option value="" selected disabled hidden>Choose option</option>
        <option value="1">High priority</option>
        <option value="2">Low Priority</option>
        <option value="3">No priority</option>
      </select>
      <p v-if="priority.error" class="error">{{ priority.error.message }}</p>
      <input type="submit" value="Add new task" class="addtask-button" />
    </form>
  </div>
</template>

<script>
import { useForm } from "vue-hooks-form";

export default {
  setup(props) {
    const { useField, handleSubmit } = useForm({ defaultValues: {} });

    const title = useField("title", {
      rule: { required: true, message: "Field required" },
    });
    const description = useField("description", {
      rule: { required: true, message: "Field required" },
    });
    const date = useField("date", {
      rule: { required: true, message: "Field required" },
    });
    const priority = useField("priority", {
      rule: { required: true, message: "Priority required" },
    });
    async function onSubmit(data) {
      try {
        const res = await fetch("http://localhost:5000/api/task/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nick: props.user.nick,
            title: data.title,
            description: data.description,
            date: data.date,
            priority: Number(data.priority),
          }),
        });
        const resData = await res.json();
        if (resData.success) {
          location.reload();
        }
      } catch (err) {
        console.log(err);
      }
    }

    return {
      onSubmit: handleSubmit(onSubmit),
      title,
      description,
      date,
      priority,
    };
  },

  methods: {
    closeModal() {
      this.$emit("isModalVisible", false);
    },
  },
  props: {
    user: { email: String, nick: String },
    isModalVisible: true,
  },
};
</script>

<style lang="scss">
.modal-wrapper {
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-background {
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.459);
}
.modal {
  border-radius: 15px;
  background-color: rgb(63, 62, 62);
  padding: 15px;
  width: 600px;
  display: flex;
  position: relative;
  z-index: 2;
  flex-direction: column;
  align-items: center;
}
.input {
  padding: 15px;
  width: 80%;
  border-radius: 5px;
  outline: 0;
  border: 0;
  margin: 10px;
}
.addtask-button {
  padding: 5px 15px;
  border-radius: 5px;
  background-color: rgb(179, 174, 174);
  outline: 0;
  border: 0;
  margin-top: 10px;
  color: white;
}
.error {
  color: red;
  font-size: 12px;
}
.priority-select {
  border: 0;
  outline: 0;
  padding: 5px;
  margin: 15px 0;
  border-radius: 5px;
}
</style>
