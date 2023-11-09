<template>
    <div class="flex flex-col items-center justify-between h-screen bg-main-bg pt-14 px-6 pb-2">
        <div class="">
            <div class="flex items-start justify-between w-full mb-6">
                <div class="text-4 font-medium">
                    <div class="rounded-lg text-center px-2 py-1 bg-white">
                        {{ player_count }}
                    </div>
                    Players
                </div>
                <p class="text-24 font-medium">Kode Games: {{ game_detail.session_code }}</p>
            </div>
            <div class="bg-secondary rounded-xl px-10 py-7 h-[600px] overflow-scroll">
                <p class="text-primary-blue text-32 text-center w-full mb-11">PILAH SAMPAH GAMES!</p>
                <div class="grid grid-cols-2 gap-10">
                    <div v-for="player in players" :key="player.id" class="flex items-center justify-start">
                        <img :src="player.photo_url" alt="" class="h-[40px] w-[40px] rounded-full border border-white mr-2">
                        {{ player.fullname }}
                    </div>
                </div>
            </div>
        </div>
        <button @click="startGame" v-if="this.is_admin"
            class="self-end text-24 text-white font-medium px-5 py-3 rounded-3xl bg-primary">Start Now</button>
    </div>
</template>

<script>
import Pusher from 'pusher-js';
export default {
    data() {
        return {
            game_session_id: this.$route.params.game_session_id,
            user_id: this.$route.params.user_id,
            game_detail: '',
            players: '',
            player_count: 0,
            is_admin: this.$store.getters.isAdmin,
        }
    },
    methods: {
        getGameSessionDetail() {
            this.axios.get(`game-sessions/${this.game_session_id}`).then(response => {
                this.game_detail = response.data.data
            }).catch(error => {
                console.log(error.response);
            })
        },
        getParticipants() {
            this.axios.get(`get-participants/${this.game_session_id}`).then(response => {
                this.players = response.data.data
                this.player_count = this.players.length
            }).catch(error => {
                console.log(error);
            })
        },
        startGame() {
            const data = {
                game_session_id: this.game_session_id,
            }
            this.axios.post('start-game', data).then(response => {
                console.log(response.data);
            }).catch(error => {
                console.log(error);
            })
        },

    },
    mounted() {
        const pusher = new Pusher('b3d4312adf3221170947', {
            cluster: 'ap1'
        });

        const channel = pusher.subscribe('my-channel');
        const self = this; // Store the current "this" context

        channel.bind('my-event', (data) => {
            function redirectToGameplay() {
                if (self.is_admin) {
                    self.$router.push({
                        name: 'gameplay-admin',
                        params: {
                            game_session_id: self.game_session_id
                        }
                    })
                } else {
                    self.$router.push({
                        name: 'gameplay', params: {
                            game_session_id: self.game_session_id,
                            // user_id: self.user_id,
                            // game_mode: self.game_detail.mode
                        }
                    })
                }
            }
            if (data.message == "game-session-started") {
                redirectToGameplay()
            }
        });

        this.getGameSessionDetail()
        this.getParticipants()

    }
}
</script>

<style></style>