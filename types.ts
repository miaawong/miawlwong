export interface Post {
  _id: string;
  author: { _ref: string };
  body: { children: { text: string }[] }[];
  mainImage: { asset: { _ref: string } };
  categories: { _ref: string; key: string }[];
  slug: { current: string };
  title: string;
  name?: string;
  publishedAt: string;
  createdAt: string;
}
