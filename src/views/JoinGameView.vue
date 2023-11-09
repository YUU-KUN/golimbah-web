<template>
    <div class="flex flex-col items-center justify-between px-9 pt-20">
        <div class="flex flex-col items-center justfity-start w-full">
            <img src="../assets/img/waiting-list.png" class="self-start mb-8" alt="">
            <p class="text-primary-blue text-40 text-center w-full mb-4">PILAH SAMPAH GAMES!</p>
            <div v-if="state == 0" class="bg-secondary px-3 py-5 w-full mb-4">
                <input v-model="session_code" type="text" class="bg-white rounded py-4 text-center w-full mb-4"
                    placeholder="Kode Permainan">
                <ButtonPrimary @click="checkGameSession" text="Enter" />
            </div>
            <div v-if="state == 1" class="bg-secondary px-3 py-5 w-full mb-4">
                <input v-model="fullname" type="text" class="bg-white rounded py-4 text-center w-full mb-4"
                    placeholder="Siapa Nama Kamu?">
                <ButtonPrimary @click="joinGameSession" text="Ok, Go!!" />
            </div>
            <p :class="is_error ? 'text-primary-red' : 'text-primary-green'">{{ message }}</p>
        </div>
    </div>
</template>

<script>
import ButtonPrimary from '../components/buttons/ButtonPrimary.vue';

export default {
    components: { ButtonPrimary },
    data() {
        return {
            state: 0,
            fullname: '',
            session_code: '',
            game_session_id: '',
            message: '',
            is_error: false,
        }
    },
    methods: {
        checkGameSession() {
            const data = {
                session_code: this.session_code
            }
            this.axios.post('search-game', data).then(response => {
                this.is_error = false
                this.message = response.data.message
                this.game_session_id = response.data.data.id
                setTimeout(() => {
                    this.state = 1
                    this.message = ''
                }, 1500);
            }).catch(error => {
                this.is_error = true
                this.message = error.response.data.message
                console.log(error.response);
            })
        },
        joinGameSession() {
            const data = {
                session_code: this.session_code,
                fullname: this.fullname
            }
            this.axios.post('join-game', data).then(response => {
                console.log(response);
                const user_id = response.data.data.user_id
                this.$router.push({
                    name: 'waiting-list', params: {
                        game_session_id: this.game_session_id,
                        user_id
                    }
                })
            }).catch(error => {
                console.log(error);
            })
        }
    }
}
</script>

<style></style>