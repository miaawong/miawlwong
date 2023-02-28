import Head from "next/head";
import Image from "next/image";
import { urlFor } from "../../utils";
import client from "../../client";
import groq from "groq";
import { Post } from "../../types";
import Nav from "../../components/Nav";
import Link from "next/link";
import Footer from "../../components/Footer";

const Home = ({ posts }: { posts: Post[] }) => {
  return (
    <>
      <Head>
        <title>Mia Wong</title>
        <meta name="description" content="Adventures of a coder" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={"max-w-screen-xl m-auto px-6 pt-10 pb-20"}>
        <Nav />
        <div className="mt-20">
          <h1 className="text-3xl font-bold mb-4">posts</h1>
          <div className="flex mt-4 lg:flex-row flex-col gap-16">
            {posts.map((post: Post) => {
              const { title, body, slug, imageUrl } = post;
              return (
                <div key={post._id} className="lg:max-w-[300px]">
                  {body && (
                    <Link href={`/post/${slug.current}`}>
                      <div className="relative flex-1 h-[200px] max-h-[400px] min-w-[350px]">
                        <Image
                          src={imageUrl || urlFor(post.mainImage).url()}
                          alt={`${title}`}
                          fill
                          style={{ objectFit: "cover", overflow: "hidden" }}
                          className="rounded"
                          priority={true}
                        />
                      </div>

                      <h3 className="text-xl font-bold my-4 underline">
                        {title}
                      </h3>
                      <p>{body[0].children[0].text.substring(0, 150)}...</p>
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export async function getStaticProps() {
  // It's important to default the slug so that it doesn't return "undefined"

  // * = select all docs
  // filter by type = post and find post that have the same slug
  // we have in the params
  const posts = await client.fetch(groq`
    *[_type == 
      "post"]| order(_publishedAt desc)
  `);
  return {
    props: {
      posts,
    },
  };
}

export default Home;
