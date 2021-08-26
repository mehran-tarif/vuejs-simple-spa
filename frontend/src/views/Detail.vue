<template>
  <div class="Detail">
    <h1 class="text-center mb-5">Home</h1>
    <article>
      <h3>{{article.title}}</h3>
      <div>{{article.content}}</div>
    </article>
    <div v-if="$store.state.isAuthenticated">
      <hr class="my-4">

      <button class="btn btn-warning mr-1" @click="edit=!edit">Edit</button>
      <button class="btn btn-danger" @click="doRemove">Remove</button>

      <form @submit.prevent="doEdit" class="pb-5" v-if="edit">
        <hr class="my-4">
        <div class="form-group">
          <label for="TitleInput">Title</label>
          <input type="text" class="form-control" id="TitleInput" v-model="title">
        </div>
        <div class="form-group">
          <label for="DescriptionInput">Description</label>
          <textarea class="form-control" id="DescriptionInput" rows="3" v-model="description"></textarea>
        </div>
        <div class="form-group">
          <label for="ContentInput">Content</label>
          <textarea class="form-control" id="ContentInput" rows="9" v-model="content"></textarea>
        </div>
        <button class="btn btn-warning">Edit</button>
      </form>

    </div>
  </div>
</template>

<script>
export default {
  name: 'Detail',
  data() {

    let articles = localStorage.getItem("articles")
    articles = JSON.parse(articles)
    let article = articles.find(
      article => article.slug == this.$route.params.slug
    )

    return {
      articles: articles,
      article: article,
      title: article.title,
      description: article.description,
      content: article.content,
      edit: false
    }
  },
  methods: {
    doEdit() {
      let index = this.articles.findIndex(
        article => article.slug == this.$route.params.slug
      )
      this.articles[index] = {
        title: this.title,
        slug: this.title.replaceAll(" ", "-").toLowerCase(),
        description: this.description,
        content: this.content,
      }
      let database = JSON.stringify(this.articles)
      localStorage.setItem('articles', database)
      this.article = this.articles[index]
      this.edit = false
      this.$router.push(`/article/${this.articles[index].slug}`)
    },
    doRemove() {
      let index = this.articles.findIndex(
        article => article.slug == this.$route.params.slug
      )
      this.articles.splice(index, 1)
      let database = JSON.stringify(this.articles)
      localStorage.setItem('articles', database)
      this.$router.push("/")
    }
  }
}
</script>
