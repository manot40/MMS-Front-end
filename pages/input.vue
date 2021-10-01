<template>
  <div class="container mx-auto flex justify-center items-center mt-12">
    <div class="flex flex-col mx-auto w-1/2 sm:w-11/12 md:w-10/12 lg:w-2/3">
      <h1 class="mb-2 text-left font-display font-bold text-3xl antialiased tracking-wider">
        INPUT TRANSAKSI BARU
      </h1>
      <p class="mb-8 text-left font-display antialiased tracking-wider">
        Masuk sebagai: {{ this.$auth.user.name }}
      </p>
      <div class="flex mb-2 w-1/3 sm:w-full">
        <div class="form-control w-full mr-4">
          <label class="label">
            <span class="label-text">Tanggal Transaksi</span>
          </label>
          <input
            type="date"
            v-model="form.txDate"
            class="input input-bordered"
          />
        </div>
        <div class="form-control w-full mr-4">
          <label class="label">
            <span class="label-text">Pilih Gudang</span>
          </label>
          <select
            class="select select-bordered"
            v-model="form.warehouse"
            @change="getItemsData()"
          >
            <option
              v-for="(item, index) in preload.warehouse"
              :key="index"
              :value="item._id"
            >
              {{ item.name }}
            </option>
          </select>
        </div>
      </div>
      <div class="flex mb-8 w-1/3 sm:w-full">
        <div class="form-control w-full mr-4">
          <label class="label">
            <span class="label-text">Deskripsi</span>
          </label>
          <input
            type="text"
            placeholder="Masukan Deskripsi"
            class="input input-bordered"
            v-model="form.description"
          />
        </div>
        <div class="form-control w-full mr-4">
          <label class="label">
            <span class="label-text">Jenis</span>
          </label>
          <select class="select select-bordered" v-model="form.type">
            <option selected="selected" value="out">Keluar</option>
            <option selected="selected" value="in">Masuk</option>
          </select>
        </div>
      </div>
      <div class="overflow-x-auto">
        <table class="table mb-8 font-display">
          <thead>
            <tr>
              <th></th>
              <th class="w-full">Item Name</th>
              <th>Quantity</th>
              <th>
                <button class="btn btn-info font-sans btn-sm" @click="addTblData()">
                  <p class="font-bold">Tambah Baris</p>
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in form.items" :key="index">
              <td/>
              <td>
                <FilterableDropdown
                  v-model="form.items[index].item"
                  :items="preload.items"
                  :showEmptyItem="true"
                  :disabled="false"
                  :ignoreCase="true"
                  placeholder="Pilih Item"
                  idKey="_id"
                  valueKey="_id"
                  textKey="name"
                  filterTargetKey="name"
                  style="min-width: 16rem"
                />
              </td>
              <td>
                <input
                  type="number"
                  placeholder="Quantity"
                  class="input input-bordered"
                  v-model.trim="form.items[index].quantity"
                  style="max-width: 8rem"
                  :key="index"
                />
              </td>
              <td>
                <button
                  v-show="form.items.length > 1"
                  class="btn btn-sm btn-error"
                  @click="rmTblData(index)"
                >
                  <ion-icon class="text-lg" name="trash-sharp"></ion-icon>
                </button>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th></th>
              <th>Item Name</th>
              <th>Quantity</th>
              <th>
                <button class="btn btn-info font-sans btn-sm">
                  <p class="font-bold" @click="addTblData()">Tambah Baris</p>
                </button>
              </th>
            </tr>
          </tfoot>
        </table>
      </div>
      <button
        class="btn w-full mx-auto mt-2"
        v-bind:class="{ loading: isLoading }"
        :disabled="isLoading"
        @click="beginSubmit()"
      >
        Submit
      </button>
    </div>
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
      isLoading: false,
      preload: {
        warehouse: [],
        items: [],
      },
      form: {
        txDate: dayjs().format("YYYY-MM-DD"),
        description: dayjs().format("[Transaksi] DD MMMM"),
        type: "out",
        warehouse: "",
        items: [{ item: "", quantity: "" }],
      },
    };
  },
  methods: {
    rmTblData(item) {
      this.form.items.splice(item, 1);
    },
    addTblData() {
      this.form.items.push({ item: "", quantity: "" });
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
        this.preload.warehouse = response;
      }
    },
    async getItemsData() {
      const warehouse = this.form.warehouse;
      const { data } = await this.$axios
        .$get(`/item/?warehouse=${warehouse}`)
        .then(function (res) {
          return res;
        })
        .catch(function (err) {
          console.log(err);
          return false;
        });
      if (data) {
        this.preload.items = [...data];
      } else {
        this.$toast.info("Gudang tidak memiliki daftar produk");
        this.preload.items = [];
      }
    },
    async beginSubmit() {
      this.isLoading = true;
      const data = { ...this.form };
      const response = await this.$axios
        .$post("/transaction", { ...data })
        .then(function () {
          return true;
        })
        .catch(function () {
          return false;
        });
      if (response) {
        this.isLoading = false;
        this.$toast.success("Submit Berhasil");
        this.resetForm();
      } else {
        this.isLoading = false;
        this.$toast.error("Submit Gagal.");
      }
    },
    resetForm() {
      this.form = {
        txDate: dayjs().format("YYYY-MM-DD"),
        description: dayjs().format("[Transaksi] DD MMMM"),
        type: "out",
        warehouse: "",
        items: [{ item: "", quantity: "" }],
      };
      this.preload.items = [];
    },
  },
};
</script>
