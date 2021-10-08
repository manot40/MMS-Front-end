<template>
  <div class="btn-group">
    <button
      v-if="totalPages > 5"
      :class="{ 'btn-active': currentPage === 1 }"
      class="btn btn-sm"
      @click="pageChanged(1)"
    >
      {{ currentPage > 3 ? "«" : "1" }}
    </button>
    <button
      v-if="totalPages > 5 && currentPage >= 4 && currentPage - 1 > 0"
      class="btn btn-sm btn-disabled"
    >
      ...
    </button>
    <button
      v-for="page in pages"
      :key="'key_' + page"
      :class="{ 'btn-active': currentPage === page }"
      class="btn btn-sm"
      @click="pageChanged(page)"
    >
      {{ page }}
    </button>
    <button
      v-if="totalPages > 5 && currentPage + 2 < totalPages"
      class="btn btn-sm btn-disabled"
    >
      ...
    </button>
    <button
      v-if="totalPages > 5"
      :class="{ 'btn-active': currentPage === totalPages }"
      class="btn btn-sm"
      @click="pageChanged(totalPages)"
    >
      {{ totalPages > (currentPage + 2) ? "»" : totalPages }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    currentPage: { type: Number, default: 1 },
    totalPages: { type: Number, default: 1 },
  },
  computed: {
    pages() {
      if (this.totalPages <= 5) {
        return this.numbersToArray(this.totalPages);
      } else {
        return this.currentPage > 3
          ? this.currentPage + 1 < this.totalPages
            ? [this.currentPage - 1, this.currentPage, this.currentPage + 1]
            : [this.totalPages - 3, this.totalPages - 2, this.totalPages - 1]
          : [2, 3, 4];
      }
    },
  },
  methods: {
    numbersToArray(num) {
      let i = 0;
      let x = [];
      while (i < num) {
        i++;
        x.push(i);
      }
      return x;
    },
    pageChanged(page) {
      if (page !== this.currentPage) this.$emit("pageChanged", page);
    },
  },
};
</script>

<style></style>
