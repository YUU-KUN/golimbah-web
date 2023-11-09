<template>
    <div class="flex flex-col items-center justify-between px-7 pb-9 min-h-screen">
        <div class="flex flex-col items-center justify-stretch mb-4">
            <img src="../assets/img/sign-up.png" class="mb-7 w-full" alt="">
            <!-- <div class="bg-gray-bg h-[292px] w-full mb-7"></div> -->
            <p class="text-18 font-semibold mb-3">Sign Up</p>
            <div class="w-full mb-2">
                <label for="fullname" class="text-14">Nama Lengkap</label>
                <input type="text" id="fullname" v-model="fullname" class="rounded-md mt-2 p-4 w-full"
                    placeholder="Masukkan nama lengkap anda">
            </div>
            <div class="w-full mb-2">
                <label for="username" class="text-14">Username</label>
                <input type="text" id="username" v-model="username" class="rounded-md mt-2 p-4 w-full"
                    placeholder="Masukkan username anda">
            </div>
            <div class="w-full mb-2">
                <label for="profession" class="text-14">Role/Profesi</label>
                <select id="profession" v-model="profession" class="rounded-md mt-2 p-4 w-full bg-white`">
                    <option value="" selected>Belum memilih role/profesi</option>
                    <option value="student">Siswa</option>
                    <option value="college_student">Mahasiswa</option>
                    <option value="teacher">Guru</option>
                    <option value="college_teacher">Dosen</option>
                    <option value="employee">Pegawai</option>
                </select>
            </div>
            <div class="w-full mb-2">
                <label for="password" class="text-14">Password</label>
                <input type="password" id="password" v-model="password" class="rounded-md mt-2 p-4 w-full"
                    placeholder="Enter your password">
            </div>
            <div class="w-full">
                <label for="password_confirmation" class="text-14">Konfirmasi Password</label>
                <input type="password" id="password_confirmation" v-model="password_confirmation" class="rounded-md mt-2 p-4 w-full"
                    placeholder="Konfirmasi your password">
            </div>
        </div>
        <div class="w-full">
            <button @click="signUp" class="bg-primary rounded-lg py-4 text-center text-white text-14 w-full mb-3">Daftar</button>
            <p class="text-14 text-start">Anda sudah memiliki akun? <RouterLink :to="{name: 'sign-in'}" class="text-secondary font-semibold">Masuk</RouterLink></p>
        </div>
    </div>
</template>

<script>
import ButtonPrimary from '../components/buttons/ButtonPrimary.vue';

export default {
    components: { ButtonPrimary },
    data() {
        return {
            fullname: '',
            username: '',
            profession: '',
            password: '',
            password_confirmation: ''
        }
    },
    methods: {
        signUp() {
            const data = {
                fullname: this.fullname,
                username: this.username,
                profession: this.profession,
                password: this.password,
                password_confirmation: this.password_confirmation
            }
            this.axios.post('register', data).then(response => {
                console.log(response);
                this.$router.push({ name: 'welcome' })
            }).catch(error => {
                console.log(error.response);
            })
        }
    }
}
</script>

<style></style>