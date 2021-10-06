<template>
  <div class="container mx-auto mt-12">
    <div class="flex flex-col mx-auto w-2/3 sm:w-11/12 md:w-10/12">
      <h1
        class="mb-2 text-left font-display font-bold text-3xl antialiased tracking-wider"
      >
        DAFTAR TRANSAKSI
      </h1>
      <div class="overflow-x-auto mb-4">
        <table class="table w-full">
          <thead>
            <tr>
              <th />
              <th>Kode Transaksi</th>
              <th>Tanggal Transaksi</th>
              <th>Gudang</th>
              <th>Jenis</th>
              <th>Status</th>
              <th>Keterangan</th>
            </tr>
          </thead>
          <tbody class="text-sm">
            <tr v-for="trx in transactions" :key="trx._id">
              <td />
              <td>
                {{ trx.txId }}
              </td>
              <td>
                {{ trx.txDate }}
              </td>
              <td>
                {{ trx.warehouse }}
              </td>
              <td class="p-2 rounded-md">
                {{ trx.type }}
              </td>
              <td>
                {{ trx.status }}
              </td>
              <td>
                {{ trx.description }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="btn-group self-center">
        <button
          v-for="i in state.btnGroup"
          :key="'key_' + i"
          :class="{ 'btn-active': state.currentPage === i }"
          class="btn btn-sm"
          @click="fetchTransactions(i)"
        >
          {{ i }}
        </button>
        <button
          v-if="
            state.totalPages > 5 &&
              this.state.currentPage + 1 < this.state.totalPages
          "
          class="btn btn-sm btn-disabled"
        >
          ...
        </button>
        <button
          v-if="state.totalPages > 5"
          :class="{ 'btn-active': state.currentPage === state.totalPages }"
          class="btn btn-sm"
          @click="fetchTransactions(state.totalPages)"
        >
          {{ state.totalPages }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  created() {
    this.fetchTransactions(1).then(() => {
      if (this.state.totalPages <= 5) {
        let i = 0;
        while (i < this.state.totalPages) {
          i++;
          this.state.btnGroup.push(i);
        }
      } else {
        this.state.btnGroup = [1, 2, 3];
      }
    });
  },
  data() {
    return {
      transactions: [
        {
          _id: "",
          txId: "",
          txDate: "",
          warehouse: "",
          type: "",
          status: "",
          description: ""
        }
      ],
      state: {
        btnGroup: [],
        limit: 3,
        totalPages: "",
        currentPage: 1
      },
      query: {}
    };
  },
  methods: {
    async fetchTransactions(page) {
      const toast = this.$toast;
      const { data, totalPages } = await this.$axios
        .$get(`/transaction/?page=${page}&limit=${this.state.limit}`)
        .then(function(res) {
          return res;
        })
        .catch(function(err) {
          toast.error(err);
          return false;
        });
      if (data) {
        const payload = data.map(el => ({
          _id: el._id,
          txId: el.txId,
          txDate: dayjs(el.txDate).format("DD/MM/YYYY"),
          warehouse: el.warehouse.name,
          type: el.type,
          status: el.status,
          description: el.description
        }));
        this.state.currentPage = page;
        this.state.totalPages = totalPages;
        this.transactions = [...payload];
        this.state.totalPages > 5 &&
          page + 1 < this.state.totalPages &&
          page - 1 > 0 &&
          (this.state.btnGroup = [page - 1, page, page + 1]);
      }
    }
  }
};
</script>
