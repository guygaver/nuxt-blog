<template>
    <div class="admin-post-page">
      <section class="update-form">
        <AdminPostForm :post="post" @submit="onSubmitted"/>
      </section>
    </div>
</template>

<script>
  import axios from 'axios'
  import AdminPostForm from
      '@/components/Admin/AdminPostForm'
  export default {
    name: 'index',

    layout: 'admin',

    asyncData(context) {
      return axios.get(`https://learning-nuxt-f474e.firebaseio.com/posts/${context.params.postId}.json`)
        .then(res => {
          return {
            post: {...res.data, id: context.params.postId}
          }
        })
        .catch(e => context.error(e))
    },

    components: {
      AdminPostForm
    },

    methods: {
      onSubmitted(post) {
        this.$store.dispatch('editPost', post)
          .then(res => {
            this.$router.push('/admin')
          })
      }
    }
  }
</script>

<style scoped>
  .update-form {
    width: 90%;
    margin: 20px auto;
  }
  @media (min-width: 768px) {
    .update-form {
      width: 500px;
    }
  }
</style>
