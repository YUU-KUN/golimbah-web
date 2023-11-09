<template>
    <div class="flex flex-col items-center justify-start pt-10 px-7 h-full">
        <p class="text-center text-primary-blue text-48 mb-7">SELECT GAME MODE</p>
        <img src="@/assets/img/select-game-mode.png" alt="select-game-mode" class="mb-7">
        <button @click="setGameMode('easy')"
            class="text-white text-36 font-medium bg-primary rounded-3xl py-2 w-[155px] mb-6">Easy</button>
        <button @click="setGameMode('hard')"
            class="text-white text-36 font-medium bg-primary rounded-3xl py-2 w-[155px] mb-6">Hard</button>
    </div>
    <div v-if="game_mode" class="flex items-center justify-center absolute h-screen w-screen z-10">
        <div class="absolute h-screen w-screen bg-[#5F5F5F] opacity-50 z-20"></div>
        <div class="flex flex-col items-center justify-between rounded-[50px] bg-white px-7 py-6 z-30 mx-12">
            <div class="flex items-center justify-between mb-6 w-full">
                <div class="text-transparent">X</div>
                <p class="capitalize font-bold text-18">{{ game_mode }} Mode!</p>
                <img @click="setGameMode('')" src="@/assets/icons/close.png" alt="close">
            </div>
            <div v-if="game_mode == 'easy'" class="text-center">
                <div class="flex items-center justify-center mb-4">
                    <img :src="easy_trash.image" v-for="easy_trash in easy_trashes" :key="easy_trash.name" class="mr-1">
                </div>
                <p class="font-bold text-14 mb-3">Organik, Residu/B3, Anorganik</p>
                <p class="font-medium text-14 mb-5">Pada mode game ini anda akan diberikan tantangan untuk pilah sampah dari
                    3 kategori sampah yaitu Organik, Non Organik, Residu/B3</p>
                <button @click="startGame()"
                    class="bg-secondary py-3 rounded-[50px] w-full text-white font-bold text-18">Start</button>
            </div>
            <div v-if="game_mode == 'hard'" class="text-center">
                <div class="flex items-center justify-center mb-4">
                    <img :src="hard_trash.image" v-for="hard_trash in hard_trashes" :key="hard_trash.name"
                        class="mr-1 h-[65px] w-[39px]">
                </div>
                <p class="font-bold text-14 mb-3">Organik, Plastik, Kertas, Kaca, Residu/B3</p>
                <p class="font-medium text-14 mb-5">Pada mode game ini anda akan diberikan tantangan untuk pilah sampah dari
                    5 kategori sampah yaitu Organik, Plastik, Kertas,
                    Kaca, Residu/B3</p>
                <button @click="startGame()"
                    class="bg-secondary py-3 rounded-[50px] w-full text-white font-bold text-18">Start</button>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            game_mode: '',
            user: this.$store.getters.userDetail,
            is_admin: this.$store.getters.isAdmin,
            easy_trashes: [
                {
                    name: 'organic',
                    image: '@/assets/img/trash_cans/organic.png',
                },
                {
                    name: 'residue',
                    image: '@/assets/img/trash_cans/residue.png',
                },
                {
                    name: 'anorganic',
                    image: '@/assets/img/trash_cans/anorganic.png',
                },
            ],
            hard_trashes: [
                {
                    name: 'organic',
                    image: '@/assets/img/trash_cans/organic.png',
                },
                {
                    name: 'plastic',
                    image: '@/assets/img/trash_cans/anorganic.png',
                },
                {
                    name: 'paper',
                    image: '@/assets/img/trash_cans/paper.png',
                },
                {
                    name: 'glass',
                    image: '@/assets/img/trash_cans/glass.png',
                },
                {
                    name: 'residue',
                    image: '@/assets/img/trash_cans/residue.png',
                },
            ],
        }
    },
    methods: {
        setGameMode(mode) {
            this.game_mode = mode
        },
        startGame() {
            const data = {
                mode: this.game_mode
            }
            this.axios.post('game-sessions', data).then(response => {
                const session_code = response.data.data.session_code
                const game_session_id = response.data.data.id
                // const user_id = response.data.data.creator_id
                // const game_mode = this.game_mode

                if (this.is_admin) {
                    this.$router.push({
                        name: 'generated-code',
                        params: {
                            game_session_id,
                            session_code
                        }
                    })
                } else { // if user
                    this.$router.push({
                        name: 'gameplay',
                        params: {
                            game_session_id,
                        }
                    })
                }
            }).catch(error => {
                console.log(error);
            })

        }
    },
}
</script>
  
<style></style>