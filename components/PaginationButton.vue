<template>
  <div class="btn-group">
    <button
      v-if="totalPages > 5 && page >= 3 && page - 1 > 0"
      :class="{ 'btn-active': page === 1 }"
      class="btn btn-sm"
      @click="pageChanged(1)"
    >
      {{ 1 }}
    </button>
    <button
      v-if="totalPages > 5 && page >= 4 && page - 1 > 0"
      class="btn btn-sm btn-disabled"
    >
      ...
    </button>
    <button
      v-for="i in pages"
      :key="'key_' + i"
      :class="{ 'btn-active': page === i }"
      class="btn btn-sm"
      @click="pageChanged(i)"
    >
      {{ i }}
    </button>
    <button
      v-if="totalPages > 5 && page + 2 < totalPages"
      class="btn btn-sm btn-disabled"
    >
      ...
    </button>
    <button
      v-if="totalPages > 5"
      :class="{ 'btn-active': page === totalPages }"
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
    page: { type: Number, default: 1 },
    totalPages: { type: Number, default: 1 }
  },
  computed: {
    pages() {
      if (this.totalPages && this.page > this.totalPages)
        return "NOTHING FOUND";
      if (this.totalPages <= 5) {
        let x = [];
        for (let i = 0; i < this.totalPages; i++) {
          x.push(i + 1);
        }
        return x;
      } else {
        return this.page - 1 > 0
          ? this.page + 1 < this.totalPages
            ? [this.page - 1, this.page, this.page + 1]
            : [this.totalPages - 3, this.totalPages - 2, this.totalPages - 1]
          : [1, 2, 3];
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
