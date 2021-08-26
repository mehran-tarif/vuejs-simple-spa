<template>
  <div class="Home">
    <h1 class="text-center mb-5">Home</h1>
    <article v-for="article in articles">
      <h3><router-link :to="`/article/${article.slug}`">{{article.title}}</router-link></h3>
      <div>{{article.description}} <router-link :to="`/article/${article.slug}`">+ more</router-link></div>
      <hr>
    </article>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {

    let articles = localStorage.getItem("articles")
    articles = JSON.parse(articles)

    return {
      articles: articles 
    }
  }
}
</script>
