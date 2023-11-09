<template>
    <div class="flex flex-col items-center justify-between px-7 pt-12 pb-9 h-full">
        <div class="flex flex-col items-center justify-stretch">
            <img src="../assets/img/sign-in.png" class="mb-7 w-full" alt="">
            <p class="text-left text-18 font-semibold mb-2 w-full">Sign In</p>
            <p class="mb-4">Enter personal data that matches your data enter during registration</p>
            <div class="w-full mb-2">
                <label for="username" class="text-14">Username</label>
                <input type="text" id="username" v-model="username" class="rounded-md mt-2 p-4 w-full"
                    placeholder="Enter your username">
            </div>
            <div class="w-full mb-4">
                <label for="password" class="text-14">Password</label>
                <input type="password" id="password" v-model="password" class="rounded-md mt-2 p-4 w-full"
                    placeholder="Enter your password">
            </div>
            <p class="text-primary-red text-14 mb-4">{{ message }}</p>
        </div>
        <div class="w-full">
            <button @click="signIn" class="bg-primary rounded-lg py-4 text-center text-white text-14 w-full mb-3">
                <span v-if="is_loading">
                    Loading...
                </span>
                <span v-else>
                    Masuk
                </span>
            </button>
            <p class="text-14 text-start">Anda sudah memiliki akun? <RouterLink :to="{ name: 'sign-up' }"
                    class="text-secondary font-semibold">Daftar</RouterLink>
            </p>
        </div>
    </div>
</template>

<script>
import ButtonPrimary from '../components/buttons/ButtonPrimary.vue';

export default {
    components: { ButtonPrimary },
    data() {
        return {
            username: '',
            password: '',
            message: '',
            is_loading: false
        }
    },
    methods: {
        signIn() {
            this.is_loading = true
            const data = {
                username: this.username,
                password: this.password
            }
            if (this.username == '' || this.password == '') {
                this.message = 'Username dan password tidak boleh kosong'
                return
            }
            this.$store.dispatch('login', data).then(response => {
                this.is_loading = false
            }).catch(error => {
                this.is_loading = false
                this.message = error.response.data.message
            })
        }
    }
}
</script>

<style></style>