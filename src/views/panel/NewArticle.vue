<template>
  <h1>New Articles</h1>
  <div class="container-fluid">
    <div class="row">
      <div class="col-9">
        <form>
          <div class="form-group">
            <label for="InputTitle">Title</label>
            <input type="text" class="form-control" id="InputTitle" placeholder="Title">
          </div>
          <div class="form-group">
            <label for="InputDescription">Description</label>
            <input type="text" class="form-control" id="InputDescription" placeholder="Description">
          </div>
          <div class="form-group">
            <label for="InputBody">Body</label>
            <textarea type="text" class="form-control" id="InputBody" rows="8"></textarea>
          </div>
          <button type="submit" class="submit-button btn btn-primary">Submit</button>
        </form>
      </div>
      <div class="col-3">
        <RequestHandler
            v-if="!sortedTagsList || !sortedTagsList.length"
            size="small"
            containerHeight="50vh"
            @actionClick="fetchTags()"
            :isLoading="isLoading"
            :hasError="hasError || sortedTagsList === null"
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
import articlesServices from '../../core/services/articles-services.js';

export default {
  name: 'NewArticle',
  components: {RequestHandler},
  data() {
    return {
      newTagValue: '',
      tagsList: null,
      isLoading: false,
      hasError: false,
    }
  },
  mounted () {
    this.fetchTags();
  },
  computed: {
    sortedTagsList() {
      if (!this.tagsList) return null;
      return this.tagsList.sort((a, b) => {
        if (a.title < b.title) {return -1}
        if (a.title > b.title) {return 1}
        return 0;
      });
    }
  },
  methods: {
    fetchTags() {
      this.isLoading = true;
      this.hasError = false;
      articlesServices.getTags().then((response) => {
        this.tagsList = transformTags(response.data.tags)
        this.isLoading = false;
      }, () => {
        this.hasError = true;
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
    }
  }
};
</script>

<style lang="scss" scoped>

@import "./src/assets/styles/variables";
  .new-article-page {
  }
</style>
