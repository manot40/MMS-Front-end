<template>
  <div
    class="
      container
      mx-auto
      h-screen
      flex
      justify-center
      items-center
      font-display
      -m-8
    "
  >
    <div class="form-control m-auto w-1/4 sm:w-2/3 md:w-1/2 lg:w-1/3">
      <h1
        class="mb-8 text-center font-bold text-3xl antialiased tracking-wider"
      >
        LOGIN
      </h1>
      <form @submit.prevent="userLogin">
        <input
          type="text"
          placeholder="Username"
          class="input input-bordered w-full mb-4"
          v-model="login.username"
          required
        />
        <input
          type="password"
          placeholder="Password"
          class="input input-bordered w-full"
          name="password"
          v-model="login.password"
          required
        />
        <label class="cursor-pointer label mt-2 mb-8">
          <span class="label-text">Keep logged in</span>
          <input
            type="checkbox"
            checked="checked"
            class="checkbox"
            v-model="login.rememberMe"
          />
        </label>
        <button
          class="btn w-full font-sans"
          type="submit"
          v-bind:class="{ loading: isLoading }"
          :disabled="isLoading"
        >
          Submit
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  auth: "guest",
  beforeMount() {
    if (this.$store.state.auth.loggedIn) this.$router.push({ path: "/" });
  },
  data() {
    return {
      isLoading: false,
      login: {
        username: "",
        password: "",
        rememberMe: true,
      },
    };
  },
  methods: {
    async userLogin() {
      this.isLoading = true;
      await this.$auth
        .loginWith("local", { data: this.login })
        .then((res) => {
          this.$auth.setUserToken(res.data.accessToken, res.data.refreshToken);
          this.isLoading = false;
        })
        .catch((err) => {
          const code = err.toString().slice(-3);
          if (code === "401") {
            this.$toast.error("Username atau Password salah!");
          } else if (code === "400") {
            this.$toast.error("Username/Password yang dimasukkan invalid!");
          } else {
            this.$toast.error("Server Error, mohon coba lagi nanti");
          }
          this.isLoading = false;
        });
    },
  },
};
</script>
