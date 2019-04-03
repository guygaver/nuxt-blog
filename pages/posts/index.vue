<template>
    <div class="posts-page">
      <post-list :posts="posts"/>
    </div>
</template>

<script>
  import PostList from '@/components/Posts/PostList'

  export default {
    components: {
      'post-list': PostList
    },

    computed: {
      posts() {
        return this.$store.getters.posts;
      }
    }
  }
</script>

<style scoped>
.posts-page {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
