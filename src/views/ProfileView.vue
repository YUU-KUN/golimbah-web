<template>
  <div class="flex flex-col items-center justify-start w-screen py-6 px-5">
    <p class="text-16 font-semibold text-primary-blue mb-8">Profil Pengguna</p>

    <div class="flex items-center justify-between w-full">
      <div class="flex">
        <img src="@/assets/img/profile-circle.png" alt="profile-circle" class="mr-5">
        <div>
          <p class="text-16 font-semibold mb-1">{{ user.fullname }}</p>
          <p class="text-14 font-semibold text-gray-bg">{{ user.profession }}</p>
        </div>
      </div>
      <img src="@/assets/icons/edit.png" alt="edit-profile">
    </div>

    <hr class="border-gray-bg w-full my-5">

    <div class="flex items-center justify-start self-start">
      <img src="@/assets/icons/logout.png" alt="logout" class="mr-4">
      <p @click="logout" class="text-14 font-medium text-primary-red">Log Out</p>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      user: ''
    }
  },
  methods: {
    getProfile() {
      this.$store.dispatch('getProfile').then(response => {
        this.user = response.data.data
      }).catch(error => {
        console.log(error);
      })
    },
    logout() {
      this.$store.dispatch('logout').then(() => {
        this.$router.push({name: 'welcome'})
      }).catch((err) => {
        console.log(err);
      });
    }
  },
  mounted() {
    this.getProfile()
  }
}
</script>

<style></style>