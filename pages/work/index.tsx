import React from "react";
import Nav from "../../components/Nav";
import Head from "next/head";
import client from "../../client";
import groq from "groq";
import { Project } from "../../types";
import Image from "next/image";
import { urlFor } from "../../utils";
import Link from "next/link";
import Footer from "../../components/Footer";

const work = ({ projects }: { projects: Project[] }) => {
  return (
    <>
      <Head>
        <title>projects</title>
        <meta name="description" content={"my projects"} />
        <meta property="og:title" content={"my projects"} />
        <meta property="og:description" content={"my projects"} />
      </Head>
      <main className={"max-w-screen-xl m-auto px-6 pt-10 pb-20"}>
        <Nav />
        <div className="mt-10">
          <h1 className="text-2xl font-bold mb-4">projects</h1>

          <div className="flex">
            {projects.map((project) => {
              const { title, body, _id, mainImage, slug } = project;
              return (
                <div
                  key={_id}
                  className="flex rounded-lg flex-col max-w-[500px] p-6"
                >
                  <Link href={`/work/${slug.current}`}>
                    <Image
                      src={urlFor(mainImage).url()}
                      alt={`${title}`}
                      width={500}
                      height={500}
                      style={{ objectFit: "cover", overflow: "hidden" }}
                      className="rounded"
                      priority={true}
                    />
                    <div>
                      <h1 className="font-bold my-4 text-2xl underline">
                        {title}
                      </h1>
                      <p>{body[0].children[0].text}</p>
                    </div>
                  </Link>
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

export default work;

export async function getStaticProps() {
  // It's important to default the slug so that it doesn't return "undefined"

  // * = select all docs
  // filter by type = post and find post that have the same slug
  // we have in the params
  const projects = await client.fetch(groq`
    *[_type == 
      "project"]| order(_publishedAt desc)
  `);
  return {
    props: {
      projects,
    },
  };
}
