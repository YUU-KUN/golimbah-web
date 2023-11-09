<template>
  <div class="flex flex-col items-center justify-between bg-main-bg min-h-screen w-screen">
    <RouterView />
    <RouterView v-if="is_logged_in" name="Footer"/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      is_logged_in: this.$store.getters.isLoggedIn
    }
  }
}
</script>
<style>
a.active {
  color: #02B6C5;
}
</style>
