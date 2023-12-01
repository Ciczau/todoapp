import type { set } from 'nuxt/dist/app/compat/capi'; import type { set } from
'nuxt/dist/app/compat/capi'; import type { set } from
'nuxt/dist/app/compat/capi';
<template>
  <form class="loginregister-form" @submit="onSubmit">
    <div class="title" v-if="type === 'login'">Log onto your account!</div>
    <div class="title" v-else>Join us!</div>
    <input
      v-if="type === 'register'"
      class="input"
      v-model="email.value"
      placeholder="Email"
      :ref="email.ref"
    />
    <p class="error-message" v-if="email?.error && type === 'register'">
      {{ email?.error.message }}
    </p>
    <input
      class="input"
      type="text"
      placeholder="Nick"
      v-model="nick.value"
      :ref="nick.ref"
    />
    <p class="error-message" v-if="nick.error">{{ nick.error.message }}</p>
    <input
      class="input"
      type="text"
      placeholder="Password"
      v-model="password.value"
      :ref="password.ref"
    />
    <p class="error-message" v-if="password.error">
      {{ password.error.message }}
    </p>
    <NuxtLink to="/register" v-if="type === 'login'" class="redirect-button"
      >Want to register? Click me!
    </NuxtLink>
    <NuxtLink to="/login" v-else class="redirect-button"
      >Want to login? Click me!</NuxtLink
    >
    <input type="submit" value="Submit" class="submit-button" />
  </form>
</template>

<script>
import { useForm } from "vue-hooks-form";
import Cookies from "js-cookie";

export default {
  setup(props) {
    const { useField, handleSubmit } = useForm({
      defaultValues: {},
    });

    const nick = useField("nick", {
      rule: { required: true, message: "Field required!" },
    });
    const email = computed(() => {
      return props.type === "register"
        ? useField("email", {
            rule: { required: true, message: "Field required!" },
          })
        : null;
    });
    const password = useField("password", {
      rule: { required: true, message: "Field required!" },
    });

    async function onSubmit(data) {
      try {
        const res = await fetch(`http://localhost:5000/api/${props.type}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: data.email,
            nick: data.nick,
            password: data.password,
          }),
        });
        const responseData = await res.json();
        console.log(responseData);
        if (responseData.success) {
          if (props.type === "register") {
            navigateTo("/");
          } else {
            const expire = new Date();
            expire.setTime(expire.getTime() + 60 * 60 * 24 * 1000 * 365);

            Cookies.set("refreshToken", responseData.refreshToken, {
              expires: expire,
            });
            navigateTo("/");
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
    return { onSubmit: handleSubmit(onSubmit), nick, email, password };
  },
  props: {
    type: String,
  },
};
</script>

<style lang="scss">
.loginregister-form {
  padding: 15px;
  background-color: rgb(34, 33, 33);
  color: white;
  border-radius: 5px;
  width: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  max-width: 100vw;
  @media screen and (max-width: 500px) {
    border-radius: 0;
    height: 100vh;
  }
}

.input {
  padding: 15px;
  width: 80%;
  border-radius: 5px;
  outline: 0;
  border: 0;
  font-size: 18px;
  margin: 10px 0;
}

.submit-button {
  padding: 5px 15px;
  font-size: 18px;
  border: 0;
  background-color: rgb(66, 65, 65);
  color: white;
  margin-top: 30px;
}

.redirect-button {
  text-decoration: none;
  color: white;
}

.error-message {
  color: red;
}
</style>
