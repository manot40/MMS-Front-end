<template>
  <div class="basic-home-container">
    <div class="w-3/4 sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/3">
      <div class="card bordered shadow-xl mb-8">
        <div class="flex-row items-center space-x-4 card-body">
          <div>
            <div class="avatar">
              <div class="rounded-full w-14 h-14 shadow">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/f/f7/Facebook_default_male_avatar.gif"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div>
            <h2 class="card-title">{{ userName }}</h2>
            <p>{{ checkRole }}</p>
          </div>
        </div>
      </div>
      <NuxtLink class="w-full mb-4 btn btn-info" to="/input">
        <ion-icon class="mr-2 text-xl" name="create-outline"></ion-icon>
        Input Transaksi
      </NuxtLink>
      <button
        class="
          bottom-0
          w-full
          btn btn-outline
          text-error
          border-error
          hover:bg-error
          hover:border-error
        "
        @click="logout()"
      >
        Log Out
      </button>
    </div>
  </div>
</template>

<script>
export default {
  middleware: ["auth"],
  data() {
    return {
      userName: this.$auth.user.name,
      userRole: this.$auth.user.role,
    };
  },
  computed: {
    checkRole: function () {
      if (this.userRole === "admin") return "Administrator";
      if (this.userRole === "user") return "Standard User";
    },
  },
  methods: {
    logout: async function () {
      await this.$auth.logout();
      this.$router.push({ path: '/login' });
    },
  },
};
</script>
