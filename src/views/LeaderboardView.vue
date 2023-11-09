<template>
  <div class="flex flex-col items-center justify-between h-screen w-screen px-7 py-6"
    >
    <!-- :class="this.is_logged_in && !this.is_admin ? 'py-6' : 'pt-6'" -->
    <div class="text-center overflow-y-scroll">
      <p class="text-primary-blue text-40 text-center w-full">PILAH SAMPAH GAMES!</p>
      <p class="text-18 mb-11">Leaderboard</p>

      <div class="grid grid-cols-10 items-center justify-center w-full text-primary-blue mb-6">
        <!-- <div v-for="(top, index) in top_3" :key="top.id" class="flex flex-col items-center justify-center"> -->
        <div class="col-span-3 float-left">
          <div v-if="top_2" class="flex flex-col items-center justify-center">
            <div
              class="relative rounded-full flex flex-col items-center object-cover w-[80px] h-[80px] mb-3 border-4 border-secondary">
              <!-- <img :src="top_2.user.photo_url" alt="2nd"> -->
              <img src="@/assets/img/avatar.png" alt="2nd">
              <span class="bg-secondary rounded-full absolute -bottom-[12px] px-2 text-white">2</span>
            </div>
            <p class="text-16 font-medium text-center">{{ top_2.user.fullname }}</p>
            <p class="text-12 font-light">Score: {{ top_2.score }}</p>
          </div>
        </div>

        <div class="col-span-4 mx-6 self-center">
          <div v-if="top_1" class="flex flex-col items-center justify-center">
            <div
              class="relative rounded-full flex flex-col items-center object-cover w-[100px] h-[100px] mb-3 border-4 border-primary-yellow">
              <img src="@/assets/img/crown.png" alt="crown" class="absolute -top-9">
              <!-- <img :src="top_1.user.photo_url" alt="2nd"> -->
              <img src="@/assets/img/avatar.png" alt="2nd">
              <span class="bg-primary-yellow rounded-full absolute -bottom-[12px] px-2 text-white">1</span>
            </div>
            <p class="text-18 font-medium text-center">{{ top_1.user.fullname }}</p>
            <p class="text-12 font-light">Score: {{ top_1.score }}</p>
          </div>
        </div>

        <div class="col-span-3 float-right">
          <div v-if="top_3" class="flex flex-col items-center justify-center">
            <div
              class="relative rounded-full flex flex-col items-center object-cover w-[65px] h-[65px] mb-3 border-4 border-primary-blue">
              <!-- <img :src="top_3.user.photo_url" alt="2nd"> -->
              <img src="@/assets/img/avatar.png" alt="2nd">
              <span class="bg-primary-blue rounded-full absolute -bottom-[12px] px-2 text-white">3</span>
            </div>
            <p class="text-14 font-medium">{{ top_3.user.fullname }}</p>
            <p class="text-12 font-light">Score: {{ top_3.score }}</p>
          </div>
        </div>
      </div>

      <div v-for="(leaderboard, index) in leaderboards" :key="leaderboard.id"
        class="flex items-center justify-between rounded-full py-2 px-7 w-full mb-5"
        :class="getLeaderboardCardBackground(index)">
        <div class="flex items-center justify-start w-full">
          <p class="mr-3">{{ index + 1 }}</p>
          <div class="rounded-full border border-white p-[2px] mr-2">
            <!-- <img :src="leaderboard.user.photo_url" alt="" class="h-[48px] w-[48px] rounded-full"> -->
            <img src="@/assets/img/avatar.png" alt="" class="h-[48px] w-[48px] rounded-full">
          </div>
          <p>{{ leaderboard.user.fullname }}</p>
        </div>
        <p>{{ leaderboard.score }}</p>
      </div>
      <p v-if="leaderboards.length > limit" @click="getLeaderboards(null)">View All ></p>
    </div>

    <div class="flex flex-col items-stretch justify-center w-screen py-5 px-7">
      <button @click="redirect()" class="text-white bg-primary w-full text-16 font-semibold rounded-lg py-4">Kembali ke Home</button>
    </div>
  </div>
</template>

<script>
import ButtonPrimary from '../components/buttons/ButtonPrimary.vue'
import Footer from '@/components/layouts/Footer.vue'

export default {
  components: { ButtonPrimary, Footer },
  data() {
    return {
      leaderboards: [],
      top_1: '',
      top_2: '',
      top_3: '',
      game_session_id: this.$route.params.game_session_id || '',
      is_logged_in: this.$store.getters.isLoggedIn,
      is_admin: this.$store.getters.isAdmin,
      limit: 4,
      mode: 'easy' //or hard
    }
  },
  methods: {
    getLeaderboards(limit) {
      const url = this.is_logged_in && !this.is_admin ? `leaderboard?limit=${limit}&mode=${this.mode}` : `guest-leaderboard/${this.game_session_id}?limit=${this.limit}`
      this.axios.get(url).then(response => {
        this.leaderboards = response.data.data
        this.top_1 = this.leaderboards[0] || null
        this.top_2 = this.leaderboards[1] || null
        this.top_3 = this.leaderboards[2] || null
        console.log(this.leaderboards);
      }).catch(error => {
        console.log(error);
      })
    },
    getLeaderboardCardBackground(index) {
      switch (index) {
        case 0:
          return 'bg-primary-yellow text-white'
        case 1:
          return 'bg-secondary text-white'
        case 2:
          return 'bg-dark-blue text-white'
        default:
          return 'text-primary-blue'
      }
    },
    redirect() {
      if (!this.is_logged_in) {
        this.$router.push({ name: 'welcome' })
      } else {
        this.$router.push({ name: 'home' })
      }
    }
  },
  mounted() {
    this.getLeaderboards(4)
  }
}
</script>

<style></style>