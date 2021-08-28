<template>
  <div class="container mx-auto flex justify-center items-center mt-12">
    <div class="block mx-auto w-11/12 md:w-10/12 lg:w-2/3 xl:w-2/3 2xl:w-2/3">
      <h1 class="mb-2 text-left font-bold text-3xl antialiased tracking-wider">
        IMPORT ITEM DATA
      </h1>
      <p class="mb-8 text-left font-light antialiased tracking-wider">
        Upload file excel yang berisikan list data untuk di impor ke database
      </p>
      <div class="flex mb-8 xl:w-1/2 2xl:w-1/2">
        <div class="flex-1 relative mr-4">
          <input
            type="file"
            id="file"
            ref="file"
            @change="chooseFile($event)"
            hidden
          />
          <input
            type="text"
            placeholder="File for import"
            v-model="upload.name"
            class="w-full pr-16 input input-primary input-bordered"
            disabled
          />
          <label
            for="file"
            class="absolute top-0 right-0 rounded-l-none btn btn-primary"
          >
            <ion-icon class="text-lg" name="folder-outline"></ion-icon>
          </label>
        </div>
        <button
          class="flex-1 btn"
          type="submit"
          v-bind:class="{ loading: isLoading }"
          :disabled="isLoading"
          @click="loadExcelData"
        >
          Submit
        </button>
      </div>
      <div class="overflow-x-auto max-h-96">
        <table v-if="items.length" class="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Item Name</th>
              <th>Measure Unit</th>
              <th>Item Type</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) of items" :key="JSON.stringify(item)">
              <th scope="row" />
              <td>{{ item.name }}</td>
              <td>{{ item.unit }}</td>
              <td>{{ item.type }}</td>
              <td>
                <button class="btn btn-sm btn-error" @click="rmTblData(index)">
                  <ion-icon class="text-lg" name="trash-sharp"></ion-icon>
                </button>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th></th>
              <th>Item Name</th>
              <th>Measure Unit</th>
              <th>Item Type</th>
              <th></th>
            </tr>
          </tfoot>
        </table>
      </div>
      <button
        class="mt-8 btn w-full"
        v-if="items.length"
        v-bind:class="{ loading: isLoading }"
        :disabled="isLoading"
      >
        Submit
      </button>
    </div>
    <!-- <div class="form-control m-auto w-3/4 xs:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4">
      <form @submit.prevent="beginImport">
        <div class="card shadow-lg bg-base-200 p-4 mb-4" v-for="item of items" :key="item">
            <input
            type="text"
            placeholder="Item name"
            class="input input-sm input-ghost w-full mb-4 p-0 font-bold"
            v-model="item.name"
            required
            />
            <div class="inline-flex">
                <input
                type="text"
                placeholder="Item unit"
                class="flex-1 input input-bordered w-full m-2"
                name="password"
                v-model="item.unit"
                required
                />
                <input
                type="text"
                placeholder="Item type"
                class="flex-1 input input-bordered w-full m-2"
                name="password"
                v-model="item.type"
                required
                />
            </div>
        </div>
        <button
        class="mt-4 btn w-full"
        type="submit"
        v-bind:class="{ loading: isLoading }"
        :disabled="isLoading"
        >
          Submit
        </button>
      </form>
    </div> -->
  </div>
</template>

<script>
export default {
  auth: "guest",
  beforeMount() {},
  data() {
    return {
      isLoading: false,
      isUploading: false,
      upload: {
        file: "",
        name: "",
      },
      items: [],
    };
  },
  methods: {
    rmTblData(item) {
      this.items.splice(item, 1);
    },
    chooseFile(event) {
      try {
        this.upload.name = event.target.files[0].name;
        this.upload.file = event.target.files[0];
      } catch {}
    },
    async loadExcelData() {
      this.isUploading = true;
      let formData = new FormData();
      formData.append("importFile", this.upload.file);
      const response = await this.$axios
        .$post("/install/import/items", formData, {
          headers: {
            "Content-type": "multipart/form-data",
          },
        })
        .then(function (res) {
          return res.items;
        })
        .catch(function (err) {
          return err;
        });
      if (response.length) {
        this.isUploading = false;
        this.items = response;
      } else {
        console.log(response);
        this.isUploading = false;
        this.$toast.error(
          "Server cannot handling this request at this moment."
        );
      }
    },
    async beginImport() {},
  },
};
</script>
