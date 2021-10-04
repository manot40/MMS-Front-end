<template>
  <div>
    <div
      class="container mx-auto h-screen flex justify-center items-center -m-8"
    >
      <div class="w-1/3 sm:w-3/4 md:w-1/2 2xl:w-1/4">
        <div class="card bordered font-display shadow-md mb-8">
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
        <div
          v-if="userRole === 'admin'"
          class="collapse border rounded-box shadow-md mb-4"
        >
          <input type="checkbox" />
          <div class="collapse-title flex flex-row">
            <ion-icon class="mr-2" style="font-size: 24px" name="people" />
            <p class="text-xl font-medium">Admin Panel</p>
          </div>
          <div class="flex flex-col space-y-2 collapse-content items-center">
            <a
              class="w-full btn min-w-min"
              href="#addItem"
            >
              Tambah Item Baru
            </a>
            <button class="w-full btn min-w-min" @click="test()">
              Tambah User Baru
            </button>
          </div>
        </div>
        <div class="collapse border rounded-box shadow-md mb-8">
          <input type="checkbox" />
          <div class="collapse-title flex flex-row">
            <ion-icon
              class="mr-2"
              style="font-size: 24px"
              name="document-text"
            />
            <p class="text-xl font-medium">Laporan Transaksi</p>
          </div>
          <div class="flex flex-col collapse-content items-center">
            <div
              class="
                flex
                sm:inline-block
                sm:w-full
                sm:space-x-0
                justify-center
                space-x-2
                mb-2
              "
            >
              <div class="form-control sm:max-w-none max-w-[10.5rem]">
                <label class="label">
                  <span class="label-text">Tanggal Awal</span>
                </label>
                <input
                  type="date"
                  v-model="reportDate.start"
                  class="input input-bordered input-sm"
                />
              </div>
              <div class="form-control sm:max-w-none max-w-[10.5rem]">
                <label class="label">
                  <span class="label-text">Tanggal Akhir</span>
                </label>
                <input
                  type="date"
                  v-model="reportDate.end"
                  class="input input-bordered input-sm flex-initial"
                />
              </div>
            </div>
            <div class="form-control self-center w-full mb-5">
              <label class="label">
                <span class="label-text">Pilih Gudang</span>
              </label>
              <select
                class="select select-bordered self-center w-full"
                v-model="warehouse"
              >
                <option value="">All Warehouse</option>
                <option
                  v-for="(item, index) in warehouseList"
                  :key="index"
                  :value="item._id"
                >
                  {{ item.name }}
                </option>
              </select>
            </div>
            <a id="dlReport" class="hidden" href="" />
            <button
              class="w-full btn btn-primary min-w-min"
              @click="reportExport()"
            >
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
    <AddItemModal
      v-bind:state="modalState"
    />
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  mounted() {
    this.getWarehouseData();
  },
  data() {
    return {
      reportDate: {
        start: dayjs().startOf("months").format("YYYY-MM-DD"),
        end: dayjs().endOf("months").format("YYYY-MM-DD"),
      },
      isModalOpen: false,
      modalState: 'item',
      userName: this.$auth.user.name,
      userRole: this.$auth.user.role,
      warehouse: "",
      warehouseList: [],
    };
  },
  computed: {
    checkRole: function () {
      if (this.userRole === "admin") return "Administrator";
      if (this.userRole === "user") return "Standard User";
    },
  },
  methods: {
    async logout() {
      await this.$auth.logout();
      this.$router.push({ path: "/login" });
    },
    async getWarehouseData() {
      const response = await this.$axios
        .$get("/warehouse")
        .then(function (res) {
          return res.data;
        })
        .catch(function (err) {
          console.log(err);
          return false;
        });
      if (response) {
        this.warehouseList = response;
      }
    },
    async reportExport() {
      const { start, end } = this.reportDate;
      const { warehouse } = this;
      await this.$axios
        .$get(
          `/transaction/export?startDate=${start}&endDate=${end}&warehouse=${warehouse}`,
          { responseType: "blob" }
        )
        .then(function (res) {
          const url = window.URL.createObjectURL(new Blob([res]));
          const dlReport = document.getElementById("dlReport");
          dlReport.href = url;
          dlReport.setAttribute(
            "download",
            `transactions_${warehouse}_${start}_${end}.xlsx`
          );
          dlReport.click();
        })
        .catch(function (err) {
          console.log(err);
          return false;
        });
    },
    test() {
      console.log(this.isModalOpen);
    },
  },
};
</script>
