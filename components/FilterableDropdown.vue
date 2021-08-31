<template>
  <div ref="wrapper" class="dropdown w-full relative fd__wrapper">
    <input type="hidden" :name="name" :value="value" />
    <input
      ref="textBox"
      type="text"
      class="
        input input-bordered
        w-56
        sm:w-full
        md:w-full
        lg:w-full
        xl:w-full
        2xl:w-full
        fd__display-textbox
      "
      :disabled="disabled"
      :value="displayText"
      :placeholder="placeholder"
      readonly="readonly"
      @click="textBoxClicked"
    />
    <div
      class="absolute z-30 top-full -left-2 p-2 -mt-px w-full"
      v-show="showList"
    >
      <ul
        class="
          list_
          p-2
          shadow-lg
          menu
          dropdown-content
          bg-base-200
          rounded-box
          w-full
          max-h-52
          overflow-x-hidden overflow-y-scroll
          z-10
        "
        tabindex="0"
      >
        <div class="fd__filter-input">
          <input
            ref="filterTextBox"
            type="text"
            class="input input-sm w-full"
            placeholder="Cari Entry..."
            :value="filterString"
            @input="e => filterString = e.target.value"
          />
        </div>
        <li
          class="
            fd__item
            p-3
            mt-2
            leading-none
            hover:bg-base-300
            rounded-xl
            cursor-pointer
          "
          v-for="item in filteredItems"
          :key="'item_' + (idKey ? item[idKey] : item)"
          :value="valueKey ? item[valueKey] : item"
          @click.stop.prevent="itemClicked(item)"
        >
          {{ textKey ? item[textKey] : item }}
        </li>
        <li
          v-if="filteredItems.length === 0"
          class="
            fd__item
            p-4
            mt-2
            leading-none
            cursor-default
            rounded-xl
          "
        >
          TIDAK DITEMUKAN
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filterString: null,
      showList: false,
    };
  },
  props: {
    name: { type: String, default: "" },
    value: { type: [String, Number, Boolean, Date], default: null },
    placeholder: { type: String, default: "" },
    disabled: { type: Boolean, default: false },
    showEmptyItem: { type: Boolean, default: false },
    emptyItemText: { type: String, default: null },
    emptyItemValue: { type: String, default: null },
    items: { type: Array, default: null },
    idKey: { type: String, default: null },
    valueKey: { type: String, default: null },
    textKey: { type: String, default: null },
    filterTargetKey: { type: String, default: null },
    ignoreCase: { type: Boolean, default: true },
  },
  computed: {
    filteredItems() {
      if (!this.filterString) return this.items;
      if (!this.items || this.items.length === 0) return [];
      const flags = this.ignoreCase ? "i" : "";
      const regexp = new RegExp(this.filterString, flags);
      return this.items.filter((x) => {
        const targetValue = this.filterTargetKey
          ? x[this.filterTargetKey]
          : JSON.stringify(x);
        return regexp.test(targetValue);
      });
    },
    selectedItem() {
      return this.items.find(
        (x) => this.value === (this.valueKey ? x[this.valueKey] : x)
      );
    },
    displayText() {
      const item = this.selectedItem;
      if (!item) return "";
      return this.textKey ? item[this.textKey] : item;
    },
  },
  methods: {
    textBoxClicked() {
      if (this.disabled) return;
      this.showList = !this.showList;
    },
    itemClicked(item) {
      if (item) {
        const value = this.valueKey ? item[this.valueKey] : item;
        this.$emit("input", value);
      } else {
        this.$emit("input", this.emptyItemValue || null);
      }
      this.reset();
    },
    reset() {
      this.showList = false;
      this.filterString = "";
    },
  },
  watch: {
    showList(val) {
      this.$nextTick(() => {
        if (val) {
          try {
            this.$refs.filterTextBox.focus();
          } catch {
            this.$toast.info("Harap pilih gudang terlebih dahulu");
          }
        }
      });
    },
  },
  mounted() {
    const $this = this;
    document.addEventListener("click", function (e) {
      const target = (e.target || e.srcElement).closest(".fd__wrapper");
      if (target === $this.$refs.wrapper) return;
      $this.reset();
    });
  },
};
</script>

<style>
.list_::-webkit-scrollbar {
  display: none;
}
</style>