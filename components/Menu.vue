<template>
  <div :class="{ open: isOpened, closed: !isOpened }" class="menu">
    <div class="arrow-wrapper">
      <div :class="{ open: isOpened }" class="arrow" @click="handleMenu()">
        >
      </div>
    </div>

    <div class="title">Simple ToDo App</div>

    <div class="button-wrapper" v-if="!checkUser()">
      <div class="sign-in-button" @click="redirect()">Sign in</div>
    </div>
    <div v-else class="user-info-wrapper">
      <div class="user-nick">{{ user.nick }}</div>
      <div class="user-email">{{ user.email }}</div>
    </div>
    <button class="logout-button" @click="Logout()" v-if="checkUser()">
      Logout
    </button>
  </div>
</template>

<script>
import { ref } from "vue";
import Cookies from "js-cookie";
export default {
  setup(props) {
    const isOpened = ref(props.opened);
    const isLoggedIn = ref(false);

    function handleMenu() {
      isOpened.value = !isOpened.value;
    }
    function checkUser() {
      if (Cookies.get("refreshToken")) {
        return true;
      }
      return false;
    }
    function redirect() {
      navigateTo("/login");
    }
    async function Logout() {
      //zapytanie do api o usuniecie refreshtokena
      Cookies.remove("refreshToken");
      location.reload();
    }
    return { isOpened, isLoggedIn, handleMenu, Logout, checkUser, redirect };
  },

  props: {
    user: { email: String, nick: String },
    opened: Boolean,
  },
  watch: {
    opened() {
      this.handleMenu();
    },
  },
};
</script>

<style lang="scss">
.menu {
  width: 600px;
  height: 100vh;
  position: fixed;
  box-shadow: 0px 0px 5px 3px #0000005b;
  left: 0;
  top: 0;
  max-width: 100vw;
  text-align: center;
  background-color: rgb(21, 34, 46);
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  color: white;
  padding: 15px;
  margin-left: -570px;
  align-items: flex-start;
  transition: all 0.3s ease;
  @media screen and (max-width: 1024px) {
    margin-left: -100%;
  }
}
.menu.open {
  transform: translateX(570px);
  @media screen and (max-width: 1024px) {
    transform: translateX(100%);
  }
}
.title {
  width: 100%;
  text-align: center;
  font-size: 25px;
}

.arrow-wrapper {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}

.arrow {
  cursor: pointer;
}
.arrow.open {
  transform: rotate(180deg);
  transition: 0.3s ease;
}
.button-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
}
.sign-in-button {
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 20px;
  margin-top: 30px;
  background-color: rgb(85, 85, 151);
}
.user-info-wrapper {
  width: 100%;
  text-align: center;
}
.user-nick {
  font-size: 30px;
  margin-top: 40px;
}
.user-email {
  font-size: 19px;
  margin-top: 20px;
}
.logout-button {
  margin: 30px auto;
  font-size: 25px;
  padding: 5px 15px;
  border-radius: 10px;
  outline: 0;
  border: 0;
  cursor: pointer;
  color: white;
  background-color: #756e6e5b;
}
</style>
