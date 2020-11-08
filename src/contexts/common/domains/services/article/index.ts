import { Article, ArticleResponse } from '../../valueObjects/article';

export function convertToArticle({ createdAt, updatedAt, ...rest }: ArticleResponse): Article {
  return { ...rest, createdAt: new Date(createdAt), updatedAt: new Date(updatedAt) };
}
