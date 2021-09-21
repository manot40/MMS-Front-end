<template>
  <div class="container mx-auto flex justify-center items-center mt-12">
    <div class="block mx-auto w-11/12 md:w-10/12 lg:w-2/3 xl:w-2/3 2xl:w-2/3">
      <h1 class="mb-2 text-left font-bold text-3xl antialiased tracking-wider">
        INPUT TRANSAKSI BARU
      </h1>
      <p class="mb-8 text-left font-light antialiased tracking-wider">
        Saat ini anda masuk sebagai: {{ this.$auth.user.name }}
      </p>
      <div class="flex xl:w-1/2 2xl:w-1/2">
        <div class="form-control mr-4">
          <label class="label">
            <span class="label-text">Tanggal Transaksi</span>
          </label>
          <input
            type="date"
            v-model="form.txDate"
            class="input input-bordered w-full"
          />
        </div>
        <div class="form-control mr-4">
          <label class="label">
            <span class="label-text">Pilih Gudang</span>
          </label>
          <select
            class="select select-bordered w-full max-w-xs"
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
      <div class="flex mb-8 xl:w-1/2 2xl:w-1/2">
        <div class="form-control mr-4">
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
        <div class="form-control mr-4">
          <label class="label">
            <span class="label-text">Jenis</span>
          </label>
          <select
            class="select select-bordered w-full max-w-xs"
            v-model="form.type"
          >
            <option selected="selected" value="out">Keluar</option>
            <option selected="selected" value="in">Masuk</option>
          </select>
        </div>
      </div>
      <div class="overflow-x-auto">
        <table class="table">
          <thead>
            <tr>
              <th></th>
              <th class="w-2/3">Item Name</th>
              <th>Quantity</th>
              <th>
                <button class="btn btn-info btn-sm" @click="addTblData()">
                  <p class="font-bold">Tambah Baris</p>
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in form.items" :key="index">
              <th scope="row" />
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
                />
              </td>
              <td>
                <input
                  type="number"
                  placeholder="Quantity"
                  class="
                    input input-bordered
                    w-28
                    sm:w-full
                    md:w-full
                    lg:w-full
                    xl:w-full
                    2xl:w-full
                  "
                  v-model.trim="form.items[index].quantity"
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
                <button class="btn btn-info btn-sm">
                  <p class="font-bold" @click="addTblData()">Tambah Baris</p>
                </button>
              </th>
            </tr>
          </tfoot>
        </table>
      </div>
      <button
        class="mt-8 btn w-full"
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
        items: [
          { item: "", quantity: "" },
          { item: "", quantity: "" },
        ],
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
          return res;
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
      const response = await this.$axios
        .$get(`/item/?warehouse=${warehouse}`)
        .then(function (res) {
          return res;
        })
        .catch(function (err) {
          console.log(err);
          return false;
        });
      if (response) {
        this.preload.items = response.data;
      }
    },
    async beginSubmit() {
      this.isLoading = true;
      const data = {
        txDate: dayjs(this.form.txDate).format("YYYY-MM-DDThh:mm:ss.SSSZ"),
        description: this.form.description,
        type: this.form.type,
        warehouse: this.form.warehouse,
        items: this.form.items,
      };
      const response = await this.$axios
        .$post("/transaction", {
          txDate: data.txDate,
          description: data.description,
          type: data.type,
          warehouse: data.warehouse,
          items: data.items,
        })
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
        items: [
          { item: "", quantity: "" },
          { item: "", quantity: "" },
        ],
      }
    },
  },
};
</script>
