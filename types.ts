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
  imageUrl: string;
}

export interface Project {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage: { asset: { _ref: string } };
  publishedAt: string;
  body: { children: { text: string }[] }[];
  github: string;
  demo: string;
  imageUrl: string;
}
