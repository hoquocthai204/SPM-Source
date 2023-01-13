export interface BlogContent {
  content: string;
  idBlogContent: number;
  imageUrl: string;
  languageCode: string;
  masterName: string;
  publishTime: string;
  summary: string;
  title: string;
}

export interface BlogDetailContent {
  content: string;
  idBlogContent: number;
  imageUrl: string;
  languageCode: string;
  masterName: string;
  publishTime: string;
  summary: string;
  title: string;
  relatedBlogs: BlogContent[];
}