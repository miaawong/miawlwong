import Head from "next/head";
import Image from "next/image";
import client from "../client";
import groq from "groq";
import { Post } from "../types";
import Nav from "../components/Nav";
import Link from "next/link";
import Footer from "../components/Footer";
import { urlFor } from "../utils";
import {
  AiFillGithub,
  AiOutlineInstagram,
  AiOutlineLinkedin,
  AiOutlineYoutube,
  AiOutlineMail,
} from "react-icons/ai";
import { FaTiktok } from "react-icons/fa";
import mia from "../public/mia.jpeg";

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

        <div className="flex flex-col lg:flex-row justify-center lg:justify-between mt-8 relative h-[700px] lg:h-[700px] ">
          <Image
            src={mia}
            alt="Picture of Mia in Bryce Canyon"
            height="250"
            width="250"
            priority={true}
            className="h-[200] w-[200] lg:min-h-[400px] lg:max-h-[600px] lg:w-auto rounded mx-auto mt-4 lg:m-0"
          />

          <div className="w-full lg:w-3/6 md:px-6 my-10 lg:ml-5 lg:my-6 flex flex-col lg:items-end justify-center lg:text-end">
            <p className="text-3xl font-bold">Hi! My name is Mia.</p>
            <p className="text-3xl mt-2">Software Engineer, Adventure Seeker</p>
            <p className="mt-2">
              I&apos;m a self-taught Software Engineer with more than 3 years of
              experience in design and frontend development.{" "}
            </p>
            <p className="mt-2">
              I&apos;m passionate building tools on the web and sharing my
              learning journey.
            </p>
            <p className="mt-2">
              When I&apos;m not building new features or fixing bugs,
              you&apos;ll likely find me outside skiing, hiking, or traveling.{" "}
            </p>
            <div className="mt-10 flex justify-between gap-2">
              <a
                href="https://tiktok.com/@miawlwong"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTiktok size={26} color={"grey"} />
              </a>
              <a
                href="https://instagram.com/miawlwong"
                target="_blank"
                rel="noopener noreferrer"
              >
                <AiOutlineInstagram size={30} color={"grey"} />
              </a>
              <a
                href="https://youtube.com/@miawlwong"
                target="_blank"
                rel="noopener noreferrer"
              >
                <AiOutlineYoutube size={30} color={"grey"} />
              </a>
              <a
                href="https://github.com/miaawong"
                target="_blank"
                rel="noopener noreferrer"
              >
                <AiFillGithub size={30} color={"grey"} />
              </a>
              <a
                href="https://linkedin.com/in/miawailamwong"
                target="_blank"
                rel="noopener noreferrer"
              >
                <AiOutlineLinkedin size={30} color={"grey"} />
              </a>
              <a
                href="mailto:miawlwong@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <AiOutlineMail size={30} color={"grey"} />
              </a>
            </div>
          </div>
        </div>

        <div className="flex gap-16 flex-col lg:flex-row mt-4">
          <div className="mb-4">
            <h1 className="text-3xl font-bold mb-4">my desk setup</h1>
            <Link href={`/links`}>
              <div className="relative flex-1 h-[200px]  lg:min-w-[300px]">
                <Image
                  src={"/desk.jpeg"}
                  alt="Mia's desk setup"
                  fill
                  style={{ objectFit: "cover", overflow: "hidden" }}
                  className="rounded"
                  priority={true}
                />
              </div>
            </Link>
          </div>

          <div>
            <h1 className="text-3xl font-bold">recent posts</h1>
            <div className="flex mt-4 lg:flex-row flex-col gap-16 mb-10">
              {posts.map((post: Post) => {
                const { title, body, slug, imageUrl } = post;
                return (
                  <div key={post._id} className="lg:max-w-[300px]">
                    {body && (
                      <Link href={`/post/${slug.current}`}>
                        <div className="relative flex-1 h-[200px] lg:min-w-[300px] ">
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
                        <p>{body[0].children[0].text}</p>
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
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
