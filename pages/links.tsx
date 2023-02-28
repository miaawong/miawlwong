import React from "react";
import Nav from "../components/Nav";
import Head from "next/head";
import client from "../client";
import groq from "groq";
import { Link as LinkType } from "../types";
import Image from "next/image";
import { urlFor } from "../utils";
import Link from "next/link";
import Footer from "../components/Footer";

const work = ({ links }: { links: LinkType[] }) => {
  return (
    <>
      <Head>
        <title>Mia Wong</title>
        <meta name="description" content="Adventures of a coder" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={"max-w-screen-xl m-auto px-6 pt-10 pb-20 "}>
        <Nav />
        <div className={"flex mt-20"}>
          {links.map((link) => {
            const { title, body, _id, mainImage, url } = link;
            return (
              <div key={_id} className="flex rounded-lg flex-col work p-6 ">
                <Link href={url} target="_blank" rel="noreferrer">
                  <div className="flex flex-row max-w-[500px] gap-5">
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
                      <a className="font-bold underline text-lg mt-4">
                        view site
                      </a>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
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
  const links = await client.fetch(groq`
    *[_type == 
      "link"]| order(_publishedAt desc)
  `);
  return {
    props: {
      links,
    },
  };
}
