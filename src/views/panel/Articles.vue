<template>
  <div class="articles-page">
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
import { articlesMockResponse } from '../../core/mock-data.js';
import { transformArticles } from '../../core/transforms/articles.js';

export default {
  name: 'Home',
  data() {
    return {
      columns: [
        'author',
        'tags',
        'excerpt',
        'created'
      ],
      articles: []
    }
  },
  mounted () {
    this.articles = transformArticles(articlesMockResponse.articles)
  }
};
</script>

<style lang="scss" scoped>
  .articles-page {

  }
</style>
