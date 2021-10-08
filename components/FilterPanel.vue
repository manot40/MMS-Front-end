<template>
  <div class="flex sm:block md:block min-w-full mb-4 noscroll">
    <div class="min-w-[14rem] sm:mb-2 md:mb-2 mr-2">
      <div class="form-control">
        <label class="label">
          <span class="text-xs">Search item</span>
        </label>
        <form @submit.prevent="submitChange()" class="relative">
          <input
            class="
              input input-sm
              pr-14
              bg-base-200
              w-full
              sm:input-md
              md:input-md
            "
            v-model="search"
            placeholder="Enter search query..."
          />
          <button
            class="
              absolute
              top-0
              right-0
              rounded-l-none
              btn btn-primary btn-sm
              sm:btn-md
              md:btn-md
            "
          >
            go
          </button>
        </form>
      </div>
    </div>
    <div
      class="inline-flex space-x-2 w-full overflow-x-auto"
      @mousewheel="(e) => scrollCard(e)"
    >
      <div class="form-control min-w-max">
        <label class="label">
          <span class="text-xs">Sort</span>
        </label>
        <select class="select select-sm bg-base-200 pr-9" v-model="state.sort">
          <option
            v-for="field in fields"
            :key="field.value"
            :value="field.value"
          >
            {{ field.name }}
          </option>
        </select>
      </div>
      <div class="form-control min-w-max">
        <label class="label">
          <span class="text-xs">By</span>
        </label>
        <select class="select select-sm bg-base-200 pr-9" v-model="state.sortby">
          <option value="desc" selected>Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </div>
      <div class="form-control min-w-[4.8rem]">
        <label class="label">
          <span class="text-xs">Limit</span>
        </label>
        <select
          class="select select-sm bg-base-200"
          v-model="state.limit"
        >
          <option value="5">5</option>
          <option value="10" selected>10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>
      </div>
      <div class="form-control w-full">
        <label class="label">
          <span class="text-xs">Filter field</span>
        </label>
        <div class="flex w-full space-x-2">
          <select
            class="select select-sm bg-base-200 pr-9"
            v-model="filter"
          >
            <option value="" selected>Select Field</option>
            <option
              v-for="field in fields"
              :key="field.value"
              :value="field.value"
            >
              {{ field.name }}
            </option>
          </select>
          <form @submit.prevent="submitChange()" class="relative">
            <input
              class="input input-sm bg-base-200 pr-14 w-52"
              v-model="filterVal"
              placeholder="Filter value..."
            />
            <button
              class="
                absolute
                top-0
                right-0
                rounded-l-none
                btn btn-primary btn-sm
              "
            >
              go
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    fields: { type: Array, default: null },
  },
  data() {
    return {
      search: "",
      filterVal: "",
      filter: "",
      state: {
        sort: this.fields[0].value || "",
        sortby: "desc",
        limit: "10",
      },
    };
  },
  methods: {
    scrollCard(e) {
      e.preventDefault();
      const delta = Math.max(-1, Math.min(1, e.wheelDelta));
      e.currentTarget.scrollLeft -= delta * 50;
    },
    submitChange() {
      const data = {
        ...this.state,
        search: this.search,
        filter: this.filter,
        filterVal: this.filterVal,
      };
      this.$emit("filterChanged", data);
    },
  },
  watch: {
    state: {
      handler() {
        this.submitChange();
      },
      deep: true,
    },
  },
};
</script>

<style>
.noscroll ::-webkit-scrollbar {
  display: none !important;
}
</style>