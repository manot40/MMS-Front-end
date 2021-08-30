<template>
  <div>
    <div>
      <MenuBar />
    </div>
  </div>
</template>

<script>
export default {
  middleware: ['auth'],
}
</script>
