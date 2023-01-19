import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import client from "../client";
import groq from "groq";
import {
  Key,
  ReactElement,
  JSXElementConstructor,
  ReactFragment,
  ReactPortal,
} from "react";

import imageUrlBuilder from "@sanity/image-url";

function urlFor(source) {
  return imageUrlBuilder(client).image(source);
}

const inter = Inter({ subsets: ["latin"] });

const Home = ({ posts }) => {
  return (
    <>
      <Head>
        <title>Adventures & Code</title>
        <meta name="description" content="Adventures of a coder" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <h1 className="text-3xl font-normal">Adventures & Code </h1>
          <div className="flex gap-8">
            <a href="/" target="_blank" rel="noopener noreferrer">
              home
            </a>
            {/* <a href="/posts" target="_blank" rel="noopener noreferrer">
              posts
            </a> */}
            <a href="/about" target="_blank" rel="noopener noreferrer">
              about
            </a>
          </div>
        </div>

        <div className="flex justify-between my-10 relative h-[800px]">
          <div className="w-3/6 h-full relative">
            <Image
              src={"/mia.jpeg"}
              alt="Picture of Mia hiking in Arizona"
              fill
              sizes={"100vh"}
              style={{ objectFit: "contain" }}
            />
          </div>
          <div className="w-3/6 ml-5 my-6 flex flex-col items-end justify-center text-end">
            <p className="text-3xl font-bold">Hi! My name is Mia.</p>
            <p className="text-3xl mt-2">Software Engineer, Adventure Seeker</p>
            <p className=" mt-2">
              I'm a self-taught Software Engineer with more than 3 years of
              experience in design and frontend development.{" "}
            </p>
            <p className="mt-2">
              I'm passionate building tools on the web and sharing my learning
              journey.
            </p>
            <p className="mt-2">
              When I'm not building new features or fixing bugs, you'll likely
              find me outside skiing, hiking, or traveling.{" "}
            </p>
          </div>
        </div>

        <h1 className="text-3xl font-bold">recent posts</h1>
        <div className="flex justify-between mt-4">
          {posts.map(
            (post: {
              _id: Key | null | undefined;
              title:
                | string
                | number
                | boolean
                | ReactElement<any, string | JSXElementConstructor<any>>
                | ReactFragment
                | ReactPortal
                | null
                | undefined;
              body: {
                children: {
                  text:
                    | string
                    | number
                    | boolean
                    | ReactElement<any, string | JSXElementConstructor<any>>
                    | ReactFragment
                    | ReactPortal
                    | null
                    | undefined;
                }[];
              };
              mainImage: {
                asset: {
                  _ref: string;
                };
              }[];
            }) => {
              const { title, body, mainImage } = post;

              return (
                <div className={""} key={post._id}>
                  {body && (
                    <>
                      <img
                        src={urlFor(mainImage).width(400).height(300).url()}
                        style={{ objectFit: "contain", borderRadius: "4px" }}
                      />

                      <h3 className="text-xl font-bold mt-2">{title}</h3>
                      <p>{body[0].children[0].text}</p>
                    </>
                  )}
                </div>
              );
            },
          )}
        </div>
      </main>
      <footer className="h-36 bg-[#fafafa]">
        <div className="max-w-[1200px] m-auto p-7">
          <p className="text-xl">let's stay connected!</p>
        </div>
      </footer>
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
