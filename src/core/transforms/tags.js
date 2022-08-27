export function transformTags(tags, checkedItems = []) {
  return tags.map(tag => {
    return {
      title: tag,
      checked: !!checkedItems.find(item => item === tag)
    }
  })
}
