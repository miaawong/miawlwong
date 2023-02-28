import client from "../../client";
import { Post } from "../../types";
import Nav from "../../components/Nav";
import { urlFor } from "../../utils";
import Image from "next/image";
import Footer from "../../components/Footer";
import Head from "next/head";

const Post = ({ post }: { post: Post }) => {
  if (!post) return <div>Loading...</div>;
  const { title, body, imageUrl, name, createdAt } = post;
  const date = new Date(createdAt);
  const year = date.getFullYear();
  const month = date.toLocaleString("default", { month: "long" });
  const day = date.getDate();

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content={
            (post &&
              post.body?.length > 0 &&
              body[0]?.children[0].text.substring(0, 100)) ||
            title
          }
        />
        <meta property="og:title" content={title} />
        <meta
          property="og:description"
          content={
            (post &&
              post.body?.length > 0 &&
              body[0]?.children[0].text.substring(0, 100)) ||
            title
          }
        />
        <meta property="og:image" content={imageUrl} />
      </Head>
      <main className={"max-w-screen-xl m-auto p-6 min-h-[88vh]"}>
        <Nav />
        <article className={"mt-10 mb-20"}>
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">{title}</h1>
            <p>
              Published on {month} {day}, {year} by {name}
            </p>
          </div>
          <div className="flex flex-col m-auto mb-10">
            <Image
              src={imageUrl}
              alt={`${title}`}
              width={500}
              height={300}
              className="m-auto rounded w-[100%] lg:w-[80%] max-h-[700px] object-cover"
              quality="100"
              priority={true}
            />
          </div>
          <div className="max-w-[800px] m-auto">
            {body &&
              body.length > 0 &&
              body.map((block, i) => (
                <p key={i} className="mb-2">
                  {block.children[0].text}
                </p>
              ))}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
};

//Next.js comes with a special function called getStaticProps
//that is called and returns props to the react component before
//rendering the templates in /pages.
//This is a perfect place for fetching the data you want for a page.
// You need to use this in tandem with another special function called
//getStaticPaths in order to tell Next.js upfront which posts exist.
export async function getStaticPaths() {
  const paths = await client.fetch(
    `*[_type == "post" && defined(slug.current)][].slug.current`,
  );

  return {
    paths: paths.map((slug: { current: string }) => ({ params: { slug } })),
    fallback: true,
  };
}

export async function getStaticProps(context: {
  params: { slug?: "" | undefined };
}) {
  // It's important to default the slug so that it doesn't return "undefined"
  const { slug = "" } = context.params;
  // * = select all docs
  // filter by type = post and find post that have the same slug
  // we have in the params
  const post = await client.fetch(
    `
    *[_type == "post" && slug.current == $slug][0]
     { 
      mainImage,
      imageUrl,
      title, 
      "name": author->name,
      "categories": categories[]->title,
      body,
     slug,
     'createdAt': _createdAt
    }
  `,
    { slug },
  );
  return {
    props: {
      post,
    },
  };
}

export default Post;
