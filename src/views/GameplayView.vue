<template>
  <iframe :src="iframeURL" frameborder="0"
    class="h-screen w-screen m-0"></iframe>
</template>

<script>
export default {
  data() {
    return {
      game_url: 'https://game-golimbah.intaniofficial.com',
      game_session_id: this.$route.params.game_session_id,
      user_id: this.$route.params.user_id,
      game_mode: this.$route.params.game_mode,
      channel: this.channel,
      is_admin: this.$store.getters.isAdmin,
      is_logged_in: this.$store.getters.isLoggedIn
    }
  },
  mounted() {
    const self = this; // Store the current "this" context

    this.channel.bind('my-event', (data) => {
      function redirectToLeaderboard() {
        if (self.is_logged_in && !self.is_admin) { //if user
          self.$router.push({
            name: 'leaderboard'
          })
        } else {
          self.$router.push({
            name: 'guest-leaderboard',
            params: {
              game_session_id: self.game_session_id
            }
          })
        }
      }
      if (data.message == "game-session-finished") {
        redirectToLeaderboard()
      }
    });
  },
  computed: {
    iframeURL() {
      return `${this.game_url}?game_session_id=${this.game_session_id}`;
    },
  },

}
</script>

<style></style>