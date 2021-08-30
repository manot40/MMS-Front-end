<template>
  <div class="inline-flex w-full">
    <div
      class="top-0 w-screen md:w-80 lg:w-80 xl:w-96 2xl:w-96 h-full"
    >
      <div class="drawer-side">
        <label class="drawer-overlay"></label>
        <ul class="menu p-4 overflow-y-auto bg-base-200 text-base-content">
          <li>
            <a>Menu Item</a>
          </li>
          <li>
            <a>Menu Item</a>
          </li>
        </ul>
      </div>
    </div>
    <div
      class="navbar mb-2 max-h-4 w-full shadow-lg bg-neutral text-neutral-content"
    >
      <div class="flex-none">
        <button
          class="btn btn-square btn-ghost drawer-button"
          for="my-drawer-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="inline-block w-6 h-6 stroke-current"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>
      <div class="flex-1 px-2 mx-2">
        <span class="text-lg font-bold"> With two icons </span>
      </div>
      <div class="flex-none">
        <button class="btn btn-square btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="inline-block w-6 h-6 stroke-current"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>