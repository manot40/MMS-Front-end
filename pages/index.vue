<template>
  <div class="basic-home-container">
    <div class="w-3/4 sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/3">
      <div class="card bordered shadow-md mb-8">
        <div class="flex-row items-center space-x-4 card-body">
          <div>
            <div class="avatar">
              <div class="rounded-full w-14 h-14 shadow">
                <img
                  src="https://storage.googleapis.com/hybrid-chassis-283717.appspot.com/mms/images/avatar/default.jpg"
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
      <div class="collapse border rounded-box shadow-md mb-8" v-if="this.userRole === 'admin'">
        <input type="checkbox" />
        <div class="collapse-title flex flex-row">
          <ion-icon class="mr-2" style="font-size: 24px" name="document-text" />
          <p class="text-xl font-medium">Laporan Transaksi</p>
        </div>
        <div class="flex flex-col collapse-content items-center">
          <div class="inline-flex justify-center space-x-2 mb-4 w-11/12">
            <div class="form-control flex-1">
              <label class="label">
                <span class="label-text">Tanggal Awal</span>
              </label>
              <input type="date" v-model="reportDate.start" class="input input-bordered input-sm" />
            </div>
            <div class="form-control flex-1">
              <label class="label">
                <span class="label-text">Tanggal Akhir</span>
              </label>
              <input type="date" v-model="reportDate.end" class="input input-bordered input-sm" />
            </div>
          </div>
          <a id="dlReport" class="hidden" href="" />
          <button class="w-full self-center btn btn-primary min-w-min" @click="reportExport()">
            Download Report
          </button>
        </div>
      </div>
      <NuxtLink class="w-full mt-4 mb-4 btn btn-info" to="/input">
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
import dayjs from 'dayjs'
export default {
  data() {
    return {
      reportDate: {
        start: dayjs().startOf("months").format("YYYY-MM-DD"),
        end: dayjs().endOf("months").format("YYYY-MM-DD"),
      },
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
    async logout () {
      await this.$auth.logout();
      this.$router.push({ path: '/login' });
    },
    async reportExport () {
      const { start, end } = this.reportDate;
      await this.$axios
        .$get(`/transaction/export?startDate=${start}&endDate=${end}`, { responseType: 'blob' })
        .then(function (res) {
          const url = window.URL.createObjectURL(new Blob([res]));
          const dlReport = document.getElementById('dlReport')
          dlReport.href = url;
          dlReport.setAttribute('download', 'transactions.xlsx');
          dlReport.click();
        })
        .catch(function (err) {
          console.log(err);
          return false;
        });
    },
  },
};
</script>
