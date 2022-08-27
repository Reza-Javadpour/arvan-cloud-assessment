<!--TODO: This could be converted to smaller components-->
<template>
  <h1>{{ `${slug ? 'Edit' : 'New'} Articles` }}</h1>
  <div class="container-fluid new-article-page">
    <div class="row d-flex flex-sm-column-reverse flex-md-row">
      <div class="col-sm-12 col-md-7 col-lg-9">
        <RequestHandler
          v-if="slug && !article"
          size="small"
          spinner-size="30px"
          container-height="50vh"
          :is-loading="isLoading"
          :tags-has-error="hasError || article === null"
          @action-click="fetchArticle()"
        ></RequestHandler>
        <form v-else>
          <div class="form-group">
            <label for="InputTitle">Title</label>
            <input
              id="InputTitle"
              v-model="formTitle"
              type="text"
              class="form-control"
              placeholder="Title"
              required
            />
          </div>
          <div class="form-group">
            <label for="InputDescription">Description</label>
            <input
              id="InputDescription"
              v-model="formDescription"
              type="text"
              class="form-control"
              placeholder="Description"
              required
            />
          </div>
          <div class="form-group">
            <label for="InputBody">Body</label>
            <textarea
              id="InputBody"
              v-model="formBody"
              type="text"
              class="form-control"
              rows="8"
              required
            ></textarea>
          </div>
          <button
            class="submit-button btn btn-primary col-lg-2 col-md-4 col-sm-12"
            :disabled="isLoading"
            @click="submitArticle()"
          >
            <Spinner v-if="isLoading" color="white" size="20px" />
            <span v-else>{{ slug ? 'Update' : 'Submit' }}</span>
          </button>
        </form>
      </div>
      <div class="col-sm-12 col-md-5 col-lg-3 mb-3">
        <RequestHandler
          v-if="!sortedTagsList || !sortedTagsList.length"
          size="small"
          spinner-size="30px"
          container-height="50vh"
          :is-loading="tagsIsLoading"
          :tags-has-error="tagsHasError || sortedTagsList === null"
          @action-click="fetchTags()"
        ></RequestHandler>
        <div v-else>
          <div class="form-group">
            <label for="InputNewTag">Tag</label>
            <input
              id="InputNewTag"
              v-model="newTagValue"
              type="text"
              class="form-control"
              placeholder="New tag"
              @keyup.enter="addNewTag()"
            />
          </div>
          <div class="card">
            <div class="card-body">
              <div
                v-for="(tagItem, tagIndex) in sortedTagsList"
                :key="tagIndex"
                class="form-check mb-2"
              >
                <input
                  :id="`tag-item-${tagItem.title}`"
                  v-model="tagItem.checked"
                  class="form-check-input"
                  type="checkbox"
                  :value="tagItem.title"
                  :checked="tagItem.checked"
                />
                <label
                  class="form-check-label"
                  :for="`tag-item-${tagItem.title}`"
                >
                  {{ tagItem.title }}
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { transformTags } from '../../core/transforms/tags.js';
import RequestHandler from '../../components/RequestHandler.vue';
import articlesServices from '../../core/api/articles-services.js';
import Spinner from '../../components/Spinner.vue';

export default {
  name: 'ArticlePage',
  components: { RequestHandler, Spinner },
  data() {
    return {
      slug: null,
      article: null,
      formTitle: '',
      formDescription: '',
      formBody: '',
      newTagValue: '',
      tagsList: null,
      isLoading: false,
      hasError: false,
      tagsIsLoading: false,
      tagsHasError: false,
    };
  },
  computed: {
    sortedTagsList() {
      if (!this.tagsList) return null;
      return this.tagsList.sort((a, b) => {
        if (a.title < b.title) {
          return -1;
        }
        if (a.title > b.title) {
          return 1;
        }
        return 0;
      });
    },
  },
  watch: {
    $route(to, from) {
      if (from.name === 'EditArticle' && to.name === 'NewArticle') {
        this.resetData();
        this.fetchTags();
      }
    },
  },
  mounted() {
    if (this.$route['params']?.slug) {
      this.slug = this.$route['params'].slug;
      this.fetchArticle();
    } else {
      this.fetchTags();
    }
  },
  methods: {
    fetchArticle() {
      this.isLoading = true;
      this.tagsIsLoading = true;
      this.hasError = false;
      articlesServices.getArticleBySlug(this.slug).then(
        (response) => {
          this.article = response.data.article;
          this.formTitle = this.article.title;
          this.formDescription = this.article.description;
          this.formBody = this.article.body;
          this.isLoading = false;
          this.fetchTags(this.article.tagList);
        },
        () => {
          this.hasError = true;
          this.isLoading = false;
          this.tagsIsLoading = false;
        },
      );
    },
    fetchTags(checkedItems = []) {
      this.tagsIsLoading = true;
      this.tagsHasError = false;
      articlesServices.getTags().then(
        (response) => {
          this.tagsList = transformTags(response.data.tags, checkedItems);
          this.tagsIsLoading = false;
        },
        () => {
          this.tagsHasError = true;
          this.tagsIsLoading = false;
        },
      );
    },
    submitArticle() {
      if (
        !this.isLoading &&
        this.formTitle &&
        this.formDescription &&
        this.formBody
      ) {
        if (this.slug) {
          this.editArticle();
        } else {
          this.createArticle();
        }
      }
    },
    editArticle() {
      this.isLoading = true;
      const checkedTags = this.sortedTagsList
        .filter((item) => item.checked)
        .map((item) => item.title);
      articlesServices
        .editArticle(
          {
            title: this.formTitle,
            description: this.formDescription,
            body: this.formBody,
            tagList: [...checkedTags],
          },
          this.slug,
        )
        .then(
          () => {
            this.isLoading = false;
            // TODO: Add success toast here
          },
          () => {
            this.isLoading = false;
            // TODO: Add error toast here
          },
        );
    },
    createArticle() {
      this.isLoading = true;
      const checkedTags = this.sortedTagsList
        .filter((item) => item.checked)
        .map((item) => item.title);
      articlesServices
        .createArticle({
          title: this.formTitle,
          description: this.formDescription,
          body: this.formBody,
          tagList: [...checkedTags],
        })
        .then(
          () => {
            this.isLoading = false;
            this.$router.push('/articles');
            // TODO: Add success toast here
          },
          () => {
            this.isLoading = false;
            // TODO: Add error toast here
          },
        );
    },
    addNewTag() {
      if (
        this.newTagValue &&
        !this.tagsList.find((item) => item.title === this.newTagValue)
      ) {
        this.tagsList = [
          ...this.tagsList,
          {
            title: this.newTagValue,
            checked: true,
          },
        ];
        this.newTagValue = '';
      }
    },
    resetData() {
      this.slug = null;
      this.article = null;
      this.formTitle = '';
      this.formDescription = '';
      this.formBody = '';
      this.newTagValue = '';
      this.tagsList = null;
      this.hasError = false;
      this.tagsHasError = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import './src/assets/styles/variables';
.new-article-page {
  .submit-button {
    height: 40px;
    display: flex;
    margin-top: 28px;
    align-items: center;
    justify-content: center;
  }
}
</style>
