<template>
  <div class="btn-group">
    <button
      v-if="totalPages > 5"
      :class="{ 'btn-active': currentPage === 1 }"
      class="btn btn-sm"
      @click="pageChanged(1)"
    >
      {{ 1 }}
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
      {{ totalPages }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    currentPage: { type: Number, default: 1 },
    totalPages: { type: Number, default: 1 }
  },
  computed: {
    pages() {
      if (this.totalPages && this.currentPage > this.totalPages)
        return "NOTHING FOUND";
      if (this.totalPages <= 5) {
        let x = [];
        for (let i = 0; i < this.totalPages; i++) {
          x.push(i + 1);
        }
        return x;
      } else {
        return this.currentPage >= 1
          ? this.currentPage <= this.totalPages
            ? [this.currentPage - 1, this.currentPage, this.currentPage + 1]
            : [this.totalPages - 3, this.totalPages - 2, this.totalPages - 1]
          : [2, 3, 4];
      }
    }
  },
  methods: {
    pageChanged(page) {
      this.$emit("pageChanged", page);
    }
  }
};
</script>

<style></style>
