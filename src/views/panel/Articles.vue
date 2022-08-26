<template>
  <RequestHandler
    v-if="!articles || !articles.length"
    containerHeight="90vh"
    @actionClick="fetchArticles()"
    :isLoading="isLoading"
    :hasError="hasError || articles === null"
  ></RequestHandler>
  <div v-else class="articles-page">
    <h1>All Posts</h1>
    <table class="table">
      <thead>
      <tr>
        <th scope="col">#</th>
        <th v-for="col in columns" scope="col">{{ col }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(row, rowIndex) in articles" :key="`table-${rowIndex}`">
        <td scope="row">{{rowIndex}}</td>
        <td v-for="(col, colIndex) in columns" :key="`table-${rowIndex}-${colIndex}`">
            {{ row[ col ] }}
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { transformArticles } from '../../core/transforms/articles.js';
import articlesServices from '../../core/services/articles-services.js';
import RequestHandler from '../../components/RequestHandler.vue';

export default {
  name: 'Home',
  components: {RequestHandler},
  data() {
    return {
      columns: [
        'author',
        'tags',
        'excerpt',
        'created'
      ],
      articles: null,
      isLoading: false,
      hasError: false,
    }
  },
  mounted () {
    this.fetchArticles();
  },
  methods: {
    fetchArticles() {
      this.isLoading = true;
      this.hasError = false;
      articlesServices.getArticles().then((response) => {
        this.articles = transformArticles(response.data.articles)
        this.isLoading = false;
      }, () => {
        this.hasError = true;
        this.isLoading = false;
      })
    }
  }
};
</script>

<style lang="scss" scoped>
  .articles-page {

  }
</style>
