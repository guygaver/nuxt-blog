<template>
    <div class="posts-page">
      <section class="post">
        <h1>{{post.title}}</h1>
        <div class="post-details">
          <div>Last updated on: {{ post.updatedDate }}</div>
          <div>Written by {{post.author}}</div>
        </div>
        <p>{{post.content}}</p>
      </section>
      <section class="post-feedback">
        <p>Let me know what you think about the post, send a mail to someawesome@example.com</p>
      </section>
    </div>
</template>

<script>
  import axios from 'axios'

  export default {
    asyncData(context) {
      return axios.get(`https://learning-nuxt-f474e.firebaseio.com/posts/${context.params.id}.json`)
        .then(res=> {
          return {
            post: res.data
          }
        })
        .catch(e => context.error(e))
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
