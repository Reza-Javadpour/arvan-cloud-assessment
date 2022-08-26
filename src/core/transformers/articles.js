import moment from 'moment';

export function transformArticles(items) {
  return items.map((item, index) => {
    return {
      index: index + 1,
      author: item.author.username,
      tags: item.tagList.join(', '),
      excerpt: item.body.length > 20 ? (item.body.split(' ').slice(0, 19).join(' ') + '...') : item.body,
      created: moment(item.createdAt).format('MMMM DD ,YYYY')
    }
  });
}
