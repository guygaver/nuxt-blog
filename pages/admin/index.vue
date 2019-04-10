<template>
<div class="admin-page">
  <section class="new-post">
    <AppButton @click="$router.push('/admin/new-post')">Create Post</AppButton>
    <AppButton @click="onLogout">Logout</AppButton>
  </section>
  <section class="existing-posts">
    <h1>Existing Posts</h1>
    <PostList :is-admin="true" :posts="posts"/>
  </section>
</div>
</template>

<script>
  import PostList from '@/components/Posts/PostList'
  import AppButton from '@/components/UI/AppButton'

  export default {
    name: 'index',
    middleware: ['check-auth', 'auth'],
    layout: 'admin',
    components: {
      AppButton,
      PostList
    },
    computed: {
      posts() {
        return this.$store.getters.posts;
      }
    },

    methods: {
      onLogout() {
        this.$store.dispatch('logout')
        this.$router.push('/admin/auth')
      }
    }
  }
</script>

<style scoped>
  .admin-page {
    padding: 20px;
  }

  .new-post {
    text-align: center;
    border-bottom: 2px solid #ccc;
    padding-bottom: 10px;
  }

  .existing-posts h1 {
    text-align: center;
  }
</style>
