export default (await import('vue')).defineComponent({
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
            mode: 'easy'
        };
    },
    methods: {
        getLeaderboards(limit) {
            const limit = limit ? limit : this.limit;
            const url = this.is_logged_in && !this.is_admin ? `leaderboard?limit=${limit}&mode=${this.mode}` : `guest-leaderboard/${this.game_session_id}?limit=${this.limit}`;
            this.axios.get(url).then(response => {
                this.leaderboards = response.data.data;
                this.top_1 = this.leaderboards[0] || null;
                this.top_2 = this.leaderboards[1] || null;
                this.top_3 = this.leaderboards[2] || null;
                console.log(this.leaderboards);
            }).catch(error => {
                console.log(error);
            });
        },
        getLeaderboardCardBackground(index) {
            switch (index) {
                case 0:
                    return 'bg-primary-yellow text-white';
                case 1:
                    return 'bg-secondary text-white';
                case 2:
                    return 'bg-dark-blue text-white';
                default:
                    return 'text-primary-blue';
            }
        }
    },
    mounted() {
        this.getLeaderboards();
    }
});
