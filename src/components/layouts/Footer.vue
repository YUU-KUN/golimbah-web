<template>
  <div class="flex items-center justify-evenly w-screen bg-white rounded-t-3xl py-4">
    <RouterLink :to="{ name: 'home' }"
      class="flex flex-col items-center justify-center hover:fill-primary hover:text-primary"
      active-class="fill-primary text-primary">
      <IconHome />
      <p class="text-14 font-semibold">Home</p>
    </RouterLink>

    <RouterLink :to="{ name: 'leaderboard' }"
      v-if="!is_admin"
      class="flex flex-col items-center justify-center hover:fill-primary hover:text-primary"
      active-class="fill-primary text-primary">
      <IconLeaderboard />
      <p class="text-14 font-semibold">Leaderboard</p>
    </RouterLink>

    <RouterLink :to="{ name: 'profile' }"
      class="flex flex-col items-center justify-center hover:fill-primary hover:text-primary"
      active-class="fill-primary text-primary">
      <IconProfile />
      <p class="text-14 font-semibold">Profile</p>
    </RouterLink>

  </div>
</template>

<script>
import IconHome from '../icons/IconHome.vue'
import IconProfile from '../icons/IconProfile.vue';
import IconLeaderboard from '../icons/IconLeaderboard.vue';
export default {
  components: { IconHome, IconProfile, IconLeaderboard},
  data() {
    return {
      is_admin: this.$store.getters.isAdmin
    }
  }
}
</script>

<style scoped></style>