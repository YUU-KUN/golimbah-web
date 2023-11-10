import { createStore } from 'vuex'
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate';
import router from '../router'

// Create a new store instance.
const store = createStore({
    plugins: [createPersistedState()],
    state: {
        status: '',
        token: '',
        user: '',
        email: '',
        username: '',
        role: '',
        is_admin: false
    },
    getters: {
        getToken: state => state.token,
        isLoggedIn: state => !!state.token,
        authStatus: state => state.status,
        userDetail: state => state.user,
        isAdmin: state => state.is_admin
    },
    mutations: {
        auth_request(state) {
            state.status = 'loading'
        },
        auth_success(state, token) {
            state.status = 'success'
            state.token = token
        },
        userDetail(state, user) {
            state.user = user
            state.username = user.username
            state.email = user.email
            state.role = user.role
            state.is_admin = user.role == 'admin'
        },
        auth_error(state) {
            state.status = 'error'
        },
        set_token(state, token) {
            state.token = token
        },
        logout(state) {
            state.status = ''
            state.token = null
            state.user = {}
            state.role_id = ''
        },
    },
    actions: {
        register({ commit }, user) {
            return new Promise((resolve, reject) => {
                commit('auth_request')
                axios.post('register', user).then(response => {
                    const token = `Bearer ${response.data.data.token}`
                    commit('userDetail', response.data.data.user)
                    commit('set_token', token)
                    axios.defaults.headers.common['Authorization'] = token
                    commit('auth_success', token)

                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        login({ commit }, user) {
            return new Promise((resolve, reject) => {
                commit('auth_request')
                axios.post('login', user).then(response => {
                    if (response.data.success) {
                        const token = `Bearer ${response.data.data.token}`
                        commit('userDetail', response.data.data.user)
                        commit('set_token', token)
                        axios.defaults.headers.common['Authorization'] = token
                        commit('auth_success', token)
                        router.push({ name: 'home' })
                    }
                    resolve(response)
                }).catch(err => {
                    commit('auth_error')
                    reject(err)
                })
            })
        },

        getProfile({ commit }) {
            return new Promise((resolve, reject) => {
                axios.get('profile').then(response => {
                    if (response.data.success) {
                        const userData = response.data.data
                        commit('userDetail', userData)
                    }
                    resolve(response)
                }).catch(err => {
                    reject(err.response)
                })
            })
        },

        logout({ commit }) {
            return new Promise((resolve) => {
                commit('logout')
                delete axios.defaults.headers.common['Authorization']
                resolve()
            })
        },
    }
})

export default store
