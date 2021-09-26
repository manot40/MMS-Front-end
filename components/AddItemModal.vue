<template>
  <div>
    <input
      type="checkbox"
      class="modal-toggle"
      checked="checked"
      readonly
    />
    <div class="modal">
      <form class="modal-box" @submit="beginSubmit($event)">
        <h1
          class="
            mb-5
            text-left
            font-bold
            text-2xl
            antialiased
            tracking-wider
            font-display
          "
        >
          {{"TAMBAH " + state.toUpperCase() + " BARU"}}
        </h1>
        <div v-if="state === 'item'" class="flex flex-col">
          <div class="flex flex-row mb-2">
            <div class="form-control w-full">
              <label class="label">
                <span class="label-text">Nama Barang</span>
              </label>
              <input
                placeholder="Masukkan Nama Barang"
                v-model="form.name"
                class="input input-bordered flex-auto mr-2"
                required
              />
            </div>
            <div class="form-control w-1/3">
              <label class="label">
                <span class="label-text">Satuan Unit</span>
              </label>
              <select
                v-model="form.unit"
                class="select select-bordered"
                required
              >
                <option value="PCS">Pieces</option>
                <option value="KG">Kilogram</option>
                <option value="MTR">Meter</option>
                <option value="LTR">Liter</option>
                <option value="GLN">Galon</option>
                <option value="BTL">Botol/Kaleng</option>
                <option value="SET">Set</option>
                <option value="PSG">Pasang</option>
              </select>
            </div>
          </div>
          <div class="flex flex-row mb-2 space-x-2">
            <div class="form-control w-full">
              <label class="label">
                <span class="label-text">Gudang Barang</span>
              </label>
              <select
                v-model="form.warehouse"
                class="select select-bordered"
                required
              >
                <option
                  v-for="(item, index) in warehouseList"
                  :key="index"
                  :value="item._id"
                >
                  {{ item.name }}
                </option>
              </select>
            </div>
            <div class="form-control w-1/3">
              <label class="label">
                <span class="label-text">Jenis Barang</span>
              </label>
              <select
                v-model="form.type"
                class="select select-bordered"
                required
              >
                <option value="chemical">Chemical</option>
                <option value="consumable">Consumable</option>
              </select>
            </div>
            <div class="form-control w-1/4">
              <label class="label">
                <span class="label-text">Buffer Stock</span>
              </label>
              <input
                placeholder="Nilai"
                type="number"
                v-model="form.bufferStock"
                class="input input-bordered flex-auto"
                required
              />
            </div>
          </div>
        </div>
        <div class="modal-action">
          <label class="btn" @click="$emit('modalClosed')">Close</label>
          <button class="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.getWarehouseData();
  },
  data() {
    return {
      warehouseList: [],
      form: {
        name: '',
        unit: '',
        type: '',
        bufferStock: 0,
        warehouse: [],
      }
    };
  },
  props: {
    state: { type: String, default: '' },
  },
  methods: {
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
        this.warehouseList = response;
      }
    },
    async beginSubmit(e) {
      e.preventDefault();
      const data = { ...this.form };
      const response = await this.$axios
        .$post("/admin/item", { ...data })
        .then(function () {
          return true;
        })
        .catch(function () {
          return false;
        });
      if (response) {
        this.$toast.success("Submit Berhasil");
        this.$emit('modalClosed');
      } else {
        this.$toast.error("Submit Gagal");
      }
    }
  },
};
</script>

<style>
</style>