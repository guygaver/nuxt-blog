<template>
  <div class="admin-post-page">
    <section class="new-post-form">
      <AdminPostForm @submit="onSubmitted" />
    </section>
  </div>
</template>

<script>
import AdminPostForm from "@/components/Admin/AdminPostForm";

export default {
  name: "index",

  middleware: ['check-auth', 'auth'],

  layout: "admin",

  components: {
    AdminPostForm
  },

  methods: {
    onSubmitted(data) {
      this.$store.dispatch('addPost', data)
        .then(res => {
          this.$router.push('/admin')
        })
    }
  }
};
</script>

<style scoped>
.new-post-form {
  width: 90%;
  margin: 20px auto;
}

@media (min-width: 768px) {
  .new-post-form {
    width: 500px;
  }
}
</style>
