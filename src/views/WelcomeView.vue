<template>
    <div class="flex flex-col items-center justify-between h-screen pt-6">
        <div class="flex flex-col items-center">
            <p class="text-primary-blue text-40 text-center w-full">PILAH SAMPAH GAMES!</p>
            <img src="../assets/img/welcome.png" alt="" class="mb-8">
            <!-- <div class="bg-gray-bg h-[214px] w-[200px] mb-8"></div> -->
            <button @click="toJoinGame()"
                class="bg-primary py-3 text-center text-white text-24 font-semibold rounded-3xl w-[262px] mb-6">
                Play as Guest
            </button>
            <button @click="toSignIn()"
                class="bg-primary py-3 text-center text-white text-24 font-semibold rounded-3xl w-[262px] mb-6">
                Sign In
            </button>
        </div>
        <!-- <div class="relative flex items-center justify-center text-white text-center bottom-0 w-full bg-[#02B6C5] h-[282px] px-20"> -->
        <div class="relative flex items-center justify-center text-white text-center bottom-0 w-screen h-[282px] px-20">
            <p class="text-white font-extrabold text-20 z-20">Selamat Datang di Pilah Sampah Games</p>
            <img class="absolute w-screen z-10 bottom-0" src="../assets/img/wave-1.png" alt="">
            <img class="absolute w-screen z-10 bottom-0" src="../assets/img/wave-2.png" alt="">
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        toJoinGame() {
            this.$router.push({ name: 'join-game' })
        },
        toSignIn() {
            this.$router.push({ name: 'sign-in' })
        }
    }
}
</script>

<style></style>