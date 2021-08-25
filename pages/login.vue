<template>
  <div class="container mx-auto h-screen flex justify-center items-center -m-8">
    <div class="form-control m-auto w-3/4 xs:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4">
      <h1 class="mb-8 text-center font-bold text-3xl antialiased tracking-wider">LOGIN</h1>
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
          <span class="label-text">Remember me</span> 
          <input type="checkbox" checked="checked" class="checkbox checkbox-primary" v-model="isRemember">
        </label>
        <button
          class="btn btn-wide w-full"
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
      isRemember: true,
      login: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    async userLogin() {
      this.isLoading = true;
      if(!this.isRemember) console.log(JSON.stringify(this.$auth));
      await this.$auth
        .loginWith("local", { data: this.login })
        .then((res) => {
          this.$auth.setUserToken(res.data.accessToken, res.data.refreshToken);
          this.isLoading = false;
        })
        .catch((err) => {
          this.$toast.error("Invalid Username or Password");
          this.isLoading = false;
        });
    },
  },
};
</script>
