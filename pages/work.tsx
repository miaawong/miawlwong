import React from "react";
import Nav from "../components/Nav";
import Head from "next/head";
import client from "../client";
import groq from "groq";
import { Project } from "../types";
import Image from "next/image";
import { urlFor } from "../utils";
import Link from "next/link";

const work = ({ projects }: { projects: Project[] }) => {
  console.log(projects);
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
        <div className={"mt-10 flex justify-center"}>
          {projects.map((project) => {
            const { title, body, _id, mainImage, slug } = project;
            return (
              <div
                key={_id}
                className="flex rounded-lg flex-col max-w-[500px] work p-6"
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
                    <h1 className="font-bold my-4 text-2xl">{title}</h1>
                    <p>{body[0].children[0].text}</p>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </main>
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
