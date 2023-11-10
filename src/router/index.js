import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'
// layout
import Footer from '@/components/layouts/Footer.vue'

import HomeView from '../views/HomeView.vue'
import WelcomeView from '../views/WelcomeView.vue'
import JoinGameView from '../views/JoinGameView.vue'
import SignInView from '../views/SignInView.vue'
import SignUpView from '../views/SignUpView.vue'
import WaitingListView from '../views/WaitingListView.vue'
import LeaderboardView from '../views/LeaderboardView.vue'
import ProfileView from '../views/ProfileView.vue'
import SelectGameModeView from '../views/SelectGameModeView.vue'
import GameplayView from '../views/GameplayView.vue'
import GeneratedSessionCode from '../views/GeneratedSessionCode.vue'
import GameplayAdmin from '../views/GameplayAdmin.vue'

const routes = [
  {
    path: '/gameplay-admin/:game_session_id',
    name: 'gameplay-admin',
    components: { default: GameplayAdmin },
  },
  {
    path: '/gameplay/:game_session_id',
    name: 'gameplay',
    components: { default: GameplayView },
  },
  {
    path: '/generated-code/:game_session_id/:session_code',
    name: 'generated-code',
    components: { default: GeneratedSessionCode },
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/select-game-mode',
    name: 'select-game-mode',
    components: { default: SelectGameModeView, Footer },
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/profile',
    name: 'profile',
    components: { default: ProfileView, Footer },
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/guest-leaderboard/:game_session_id',
    name: 'guest-leaderboard',
    components: { default: LeaderboardView },
  },
  {
    path: '/leaderboard/',
    name: 'leaderboard',
    components: { default: LeaderboardView, Footer },
  },
  {
    path: '/join-game',
    name: 'join-game',
    component: JoinGameView
  },
  {
    path: '/sign-up',
    name: 'sign-up',
    component: SignUpView
  },
  {
    path: '/sign-in',
    name: 'sign-in',
    component: SignInView
  },
  {
    path: '/',
    name: 'home',
    components: { default: HomeView, Footer },
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/welcome',
    name: 'welcome',
    component: WelcomeView,
  },
  {
    path: '/waiting-list/:game_session_id/:user_id',
    name: 'waiting-list',
    component: WaitingListView
  },
]

const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0 }
  },
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.isLoggedIn) {
      next({
        name: 'welcome',
      })
    } else {
      next()
    }
  } else {
    // if ((to.name === 'sign-in' || to.name === 'sign-up' || to.name === 'welcome') && is_logged_in) {
    //   next({
    //     name: 'home',
    //   })
    // } else {
    //   next()
    // }
    next()
  }
})


export default router