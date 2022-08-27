<template>
  <RequestHandler
    v-if="!articles || !articles.length"
    container-height="90vh"
    :is-loading="isLoading"
    :has-error="hasError || articles === null"
    @action-click="fetchArticles()"
  ></RequestHandler>
  <div v-else>
    <h1>All Posts</h1>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th v-for="(col, colIndex) in columns" :key="colIndex" scope="col">
            {{ col }}
          </th>
          <th />
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in articles" :key="`table-${rowIndex}`">
          <td>{{ row.index }}</td>
          <td
            v-for="(col, colIndex) in columns"
            :key="`table-${rowIndex}-${colIndex}`"
          >
            {{ row[col] }}
          </td>
          <td>
            <div class="dropdown">
              <button
                id="dropdownMenuButton"
                class="btn btn-primary dropdown-toggle"
                type="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                ...
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <router-link
                  :to="`article/edit/${row.slug}`"
                  class="dropdown-item"
                  >Edit</router-link
                >
                <div
                  class="dropdown-item"
                  @click="handleRemoveArticle(row.slug)"
                >
                  Delete
                </div>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <!--TODO: Add pagination for articles-->
  </div>
</template>

<script>
import { transformArticles } from '../../core/transforms/articles.js';
import articlesServices from '../../core/api/articles-services.js';
import RequestHandler from '../../components/RequestHandler.vue';

export default {
  name: 'ArticlesPage',
  components: { RequestHandler },
  data() {
    return {
      columns: ['author', 'tags', 'excerpt', 'created'],
      articles: null,

      isLoading: false,
      hasError: false,
    };
  },
  mounted() {
    this.fetchArticles();
  },
  methods: {
    fetchArticles() {
      this.isLoading = true;
      this.hasError = false;
      articlesServices.getArticles().then(
        (response) => {
          this.articles = transformArticles(response.data.articles);
          this.isLoading = false;
        },
        () => {
          this.hasError = true;
          this.isLoading = false;
        },
      );
    },
    handleRemoveArticle(slug) {
      // TODO: Using confirm modal instead of deleting immediately
      articlesServices.removeArticle(slug).then(() => {
        this.articles = null;
        this.fetchArticles();
        // TODO: Add success toast here
      });
    },
  },
};
</script>
