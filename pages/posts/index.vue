<template>
    <div class="posts-page">
      <PostList :posts="posts"/>
    </div>
</template>

<script>

  export default {
    middleware: 'log',
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
