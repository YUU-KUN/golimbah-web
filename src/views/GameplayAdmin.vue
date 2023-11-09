<template>
    <div class="flex flex-col items-center justify-center h-screen">
        <img src="@/assets/img/stopwatch.png" alt="stopwatch" class="mb-7">
        <p class="font-extrabold text-32 mb-7">10 Minutes!</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            game_session_id: this.$route.params.game_session_id,
        }
    },
    mounted() {
        const self = this; // Store the current "this" context

        this.channel.bind('my-event', (data) => {
            function redirectToLeaderboard() {
                self.$router.push({
                    name: 'guest-leaderboard',
                    params: {
                        game_session_id: self.game_session_id
                    }
                })
            }
            if (data.message == "game-session-finished") {
                redirectToLeaderboard()
            }
        });
    },
}
</script>

<style></style>