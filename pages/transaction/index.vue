<template>
  <div class="container mx-auto mt-12">
    <div
      class="
        flex flex-col
        mx-auto
        w-2/3
        sm:w-11/12
        md:w-10/12
        lg:w-10/12
        font-display
      "
    >
      <h1 class="mb-6 text-left font-bold text-3xl antialiased tracking-wider">
        DAFTAR TRANSAKSI
      </h1>
      <FilterPanel
        :fields="dataFields"
        @filterChanged="filterChanged($event)"
      />
      <div class="overflow-x-auto mb-4">
        <table class="table w-full">
          <thead>
            <tr>
              <th />
              <th>Kode Transaksi</th>
              <th>Tanggal</th>
              <th>Gudang</th>
              <th>Jenis</th>
              <th>Status</th>
              <th>Keterangan</th>
              <th />
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
              <td>
                <p
                  :class="{ 'badge-outline': trx.type === 'out' }"
                  class="badge text-xs font-bold w-12"
                >
                  {{ trx.type.toUpperCase() }}
                </p>
              </td>
              <td>
                <p
                  :class="[
                    { 'badge-error': trx.status === 'closed' },
                    { 'badge-success': trx.status === 'posted' },
                    { 'badge-info': trx.status === 'draft' },
                  ]"
                  class="badge text-xs font-bold w-16"
                >
                  {{ trx.status.toUpperCase() }}
                </p>
              </td>
              <td>
                <p class="max-w-prose">
                  {{ trx.description }}
                </p>
              </td>
              <td>
                <span class="btn btn-sm btn-info mr-1">
                  <ion-icon class="text-lg" name="create-outline" />
                </span>
                <span
                  v-if="$auth.user.role === 'admin'"
                  class="btn btn-sm btn-error"
                >
                  <ion-icon class="text-lg" name="trash-outline" />
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="self-center">
        <PaginationButton
          :currentPage="state.currentPage"
          :totalPages="state.totalPages"
          @pageChanged="pageChanged($event)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  created() {
    this.fetchTransactions();
  },
  data() {
    return {
      transactions: [],
      dataFields: [
        { name: "Tanggal", value: "txDate" },
        { name: "Kode Transaksi", value: "txId" },
        { name: "Gudang", value: "warehouse" },
        { name: "Jenis", value: "type" },
        { name: "Status", value: "status" },
      ],
      state: {
        totalPages: null,
        currentPage: 1,
      },
      filter: {
        search: "",
        sort: "txDate",
        sortby: "desc",
        limit: "10",
        filter: "",
        filterVal: "",
      },
    };
  },
  methods: {
    pageChanged(page) {
      const query = this.$route.query;
      this.$router.push({
        query: {
          ...query,
          page,
        },
      });
    },
    filterChanged(filter) {
      this.filter = filter;
      this.pageChanged();
      this.fetchTransactions(1);
    },
    async fetchTransactions(override) {
      const page = override || parseInt(this.$route.query.page) || 1;
      const { data, totalPages } = await this.$axios
        .$get(
          `/transaction/` +
            `?page=${page}` +
            `&limit=${this.filter.limit}` +
            `&sort=${this.filter.sort}` +
            `&sortby=${this.filter.sortby}` +
            `&search=${this.filter.search}` +
            (this.filter.filter && `&filter[${this.filter.filter}]=${this.filter.filterVal}`)
        )
        .then(function (res) {
          return res;
        })
        .catch(function (err) {
          console.log(err);
          return false;
        });
      if (data) {
        const payload = data.map((el) => ({
          _id: el._id,
          txId: el.txId.replace(/(TRX-IN-|TRX-OUT-)/i, ""),
          txDate: dayjs(el.txDate).format("DD/MM/YYYY"),
          warehouse: el.warehouse.name,
          type: el.type,
          status: el.status,
          description: el.description,
        }));
        this.state.currentPage = page;
        this.state.totalPages = totalPages;
        this.transactions = [...payload];
      }
    },
  },
  watch: {
    "$route.query.page"() {
      this.fetchTransactions();
    },
  },
};
</script>
