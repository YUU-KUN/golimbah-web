<template>
    <div class="flex flex-col items-center justify-center h-screen">
        <img src="@/assets/img/waiting-list-session-code.png" alt="waiting-list-session-code" class="mb-7">
        <p class="font-medium text-24 mb-2">Kode Sessions Kamu!!</p>
        <p class="font-extrabold text-32 mb-7">{{ session_code }}</p>
        <ButtonPrimary text="Start Games" @click="startGame()"></ButtonPrimary>
    </div>
</template>

<script>
import ButtonPrimary from '@/components/buttons/ButtonPrimary.vue'
export default {
    components: {
        ButtonPrimary
    },
    data() {
        return {
            session_code: this.$route.params.session_code || '',
            game_session_id: this.$route.params.game_session_id || '',
        }
    },
    methods: {
        startGame() {
            this.$router.push({
                name: 'waiting-list', params: {
                    game_session_id: this.game_session_id,
                    user_id: 'admin'
                }
            })
        }
    }
}
</script>

<style></style>