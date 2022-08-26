export function transformTags(tags) {
  return tags.map(tag => {
    return {
      title: tag,
      checked: false
    }
  })
}
