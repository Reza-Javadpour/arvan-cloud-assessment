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
</template>

<script>
import { tagsResponse } from '../../core/mock-data.js';
import { transformTags } from '../../core/transforms/tags.js';

export default {
  name: 'NewArticle',
  data() {
    return {
      tagsList: transformTags(tagsResponse),
      newTagValue: ''
    }
  },
  computed: {
    sortedTagsList() {
      return this.tagsList.sort()
    }
  },
  methods: {
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
