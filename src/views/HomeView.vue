<template>
  <!-- <div class="bg-main-bg min-h-screen w-screen"> -->
    <div class="flex flex-col items-center justify-start pt-4 px-7 h-full">
      <div class="flex items-center justify-between w-full mb-4">
        <div>
          <p class="font-light text-gray-bg text-18 mb-1">{{ greeting }}</p>
          <p class="text-18 font-medium">{{ user.fullname }}</p>
        </div>
        <div>
          <img src="../assets/icons/gear.png" alt="" class="hover:cursor-pointer">
        </div>
      </div>
      <img src="../assets/img/dashboard.png" alt="" class="mb-4">
      <p class="text-18 font-medium italic mb-2">Games Time!!</p>
      <div class="grid grid-cols-2 gap-3">
        <RouterLink :to="{name: 'select-game-mode'}" class="rounded-lg border border-primary-blue p-3">
          <img src="../assets/img/fun-game.png" alt="" class="mx-auto mb-3">
          <div class="text-left w-full">
            <p class="text-18 font-medium text-primary-blue mb-2">Fun Games</p>
            <p class="text-14 font-light">Yuk coba Games dan Tantang dirimu!!</p>
          </div>
        </RouterLink>
        <div class="rounded-lg border border-primary-blue p-3">
          <img src="../assets/img/education-fun.png" alt="" class="mx-auto mb-3">
          <div class="text-left w-full">
            <p class="text-18 font-medium text-primary-blue mb-2">Education Fun</p>
            <p class="text-14 font-light">Menjelajari pengetahuan recycle sampah</p>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      greeting: '',
      user: this.$store.getters.userDetail
    }
  },
  methods: {
    getGreeting() {
      const date = new Date()
      const hour = date.getHours()
      if (hour >= 0 && hour < 12) {
        this.greeting = 'Selamat Pagi'
      } else if (hour >= 12 && hour < 15) {
        this.greeting = 'Selamat Siang'
      } else if (hour >= 15 && hour < 18) {
        this.greeting = 'Selamat Sore'
      } else {
        this.greeting = 'Selamat Malam'
      }
    }
  },
  mounted() {
    this.getGreeting()
  }
}
</script>

<style>

</style>