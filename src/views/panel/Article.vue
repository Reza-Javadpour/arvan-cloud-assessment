<template>
  <h1>{{ `${slug ? 'Edit' : 'New'} Articles` }}</h1>
  <div class="container-fluid new-article-page">
    <div class="row">
      <div class="col-9">
        <RequestHandler
            v-if="slug && (!article)"
            size="small"
            spinnerSize="30px"
            containerHeight="50vh"
            @actionClick="fetchArticle()"
            :isLoading="isLoading"
            :tagsHasError="hasError || article === null"
        ></RequestHandler>
        <form v-else>
          <div class="form-group">
            <label for="InputTitle">Title</label>
            <input type="text" class="form-control" id="InputTitle" placeholder="Title" v-model="formTitle" required>
          </div>
          <div class="form-group">
            <label for="InputDescription">Description</label>
            <input type="text" class="form-control" id="InputDescription" placeholder="Description" v-model="formDescription" required>
          </div>
          <div class="form-group">
            <label for="InputBody">Body</label>
            <textarea type="text" class="form-control" id="InputBody" rows="8" v-model="formBody" required></textarea>
          </div>
          <button
            class="submit-button btn btn-primary"
            @click="submitArticle()"
            :disabled="isLoading"
          >
            <Spinner v-if="isLoading" color="white" size="20px"/>
            <span v-else>Submit</span>
          </button>
        </form>
      </div>
      <div class="col-3">
        <RequestHandler
            v-if="!sortedTagsList || !sortedTagsList.length"
            size="small"
            spinnerSize="30px"
            containerHeight="50vh"
            @actionClick="fetchTags()"
            :isLoading="tagsIsLoading"
            :tagsHasError="tagsHasError || sortedTagsList === null"
        ></RequestHandler>
        <div v-else>
          <div class="form-group">
            <label for="InputNewTag">Tag</label>
            <input
                type="text"
                class="form-control"
                id="InputNewTag"
                placeholder="New tag"
                v-model="newTagValue"
                @keyup.enter="addNewTag()"
            >
          </div>
          <div class="card">
            <div class="card-body">
              <div v-for="(tagItem, tagIndex) in sortedTagsList" :key="tagIndex" class="form-check mb-2">
                <input
                    class="form-check-input"
                    type="checkbox"
                    :value="tagItem.title"
                    :checked="tagItem.checked"
                    v-model="tagItem.checked"
                    :id="`tag-item-${tagItem.title}`"
                >
                <label class="form-check-label" :for="`tag-item-${tagItem.title}`">
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
  name: 'NewArticle',
  components: {RequestHandler, Spinner},
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
    }
  },
  mounted () {
    if (this.$route.params?.slug) {
      this.slug = this.$route.params.slug;
      this.fetchArticle();
    } else {
      this.fetchTags();
    }
  },
  computed: {
    sortedTagsList() {
      if (!this.tagsList) return null;
      return this.tagsList.sort((a, b) => {
        if (a.title < b.title) {return -1};
        if (a.title > b.title) {return 1};
        return 0;
      });
    }
  },
  watch: {
    $route ( to, from ) {
      if (from.name === 'EditArticle' && to.name === 'NewArticle') {
        this.resetData();
        this.fetchTags();
      }
    }
  },
  methods: {
    fetchArticle() {
      this.isLoading = true;
      this.tagsIsLoading = true;
      this.hasError = false;
      articlesServices.getArticleBySlug(this.slug).then((response) => {
        this.article = response.data.article;
        this.formTitle = this.article.title;
        this.formDescription = this.article.description;
        this.formBody = this.article.body;
        this.isLoading = false;
        this.fetchTags(this.article.tagList);
      }, () => {
        this.hasError = true;
        this.isLoading = false;
        this.tagsIsLoading = false;
      })
    },
    fetchTags(checkedItems = []) {
      this.tagsIsLoading = true;
      this.tagsHasError = false;
      articlesServices.getTags().then((response) => {
        this.tagsList = transformTags(response.data.tags, checkedItems)
        this.tagsIsLoading = false;
      }, () => {
        this.tagsHasError = true;
        this.tagsIsLoading = false;
      })
    },
    submitArticle() {
      if (
          !this.isLoading &&
          this.formTitle && this.formDescription && this.formBody
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
      const checkedTags = this.sortedTagsList.filter(item => item.checked).map(item => item.title);
      articlesServices.editArticle({
        title: this.formTitle,
        description: this.formDescription,
        body: this.formBody,
        tagList: [...checkedTags]
      }, this.slug).then(() => {
        this.isLoading = false;
      }, () => {
        this.isLoading = false;
      })
    },
    createArticle() {
      this.isLoading = true;
      const checkedTags = this.sortedTagsList.filter(item => item.checked).map(item => item.title);
      articlesServices.createArticle({
        title: this.formTitle,
        description: this.formDescription,
        body: this.formBody,
        tagList: [...checkedTags]
      }).then(() => {
        this.isLoading = false;
        this.$router.push('/articles');
      }, () => {
        this.isLoading = false;
      })
    },
    addNewTag() {
      if (this.newTagValue && !this.tagsList.find(item => item.title === this.newTagValue)) {
        this.tagsList = [
          ...this.tagsList,
          {
            title: this.newTagValue,
            checked: true
          }
        ];
        this.newTagValue = '';
      }
    },
    resetData() {
      this.slug =null;
      this.article =null;
      this.formTitle ='';
      this.formDescription ='';
      this.formBody ='';
      this.newTagValue ='';
      this.tagsList =null;
      this.hasError =false;
      this.tagsHasError =false;
    },
  }
};
</script>

<style lang="scss" scoped>

@import "./src/assets/styles/variables";
  .new-article-page {
    .submit-button {
      width: 99px;
      height: 40px;
      display: flex;
      margin-top: 28px;
      align-items: center;
      justify-content: center;
    }
  }
</style>
