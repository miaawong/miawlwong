import React, { useState } from "react";
import Nav from "../components/Nav";
import Head from "next/head";
import client from "../client";
import groq from "groq";
import { Link as LinkType } from "../types";
import Image from "next/image";
import { urlFor } from "../utils";
import Link from "next/link";
import Footer from "../components/Footer";
import { url } from "inspector";

const work = ({ links }: { links: LinkType[] }) => {
  return (
    <>
      <Head>
        <title>desk setup</title>
        <meta name="description" content={"my desk setup"} />
        <meta property="og:title" content={"my desk setup"} />
        <meta property="og:description" content={"my desk setup"} />
      </Head>
      <main className={"max-w-screen-xl m-auto px-6 pt-10 pb-20 "}>
        <Nav />
        <div className="mt-20">
          <h1 className="text-3xl font-bold mb-4">my desk setup</h1>
          <div className={"flex flex-wrap gap-10 justify-center"}>
            {links.map((link) => {
              const { title, body, _id, mainImage, url } = link;

              return (
                <div key={_id} className="flex rounded-lg flex-col work">
                  {url && (
                    <Link
                      href={url ? url : "#"}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <div className="flex flex-row max-w-[500px] gap-5 py-4">
                        <div className="flex flex-1 w-[50%] h-[200px]">
                          <Image
                            src={urlFor(mainImage).url()}
                            alt={`${title}`}
                            width={300}
                            height={200}
                            style={{
                              objectFit: "contain",
                              overflow: "hidden",
                            }}
                            priority={true}
                          />
                        </div>
                        <div className="w-[50%] mb-4">
                          <h1 className="font-bold mt-4 mb-2">{title}</h1>
                          <p>{body[0].children[0].text}</p>

                          <a className="font-bold underline text-lg mt-4">
                            view site
                          </a>
                        </div>
                      </div>
                    </Link>
                  )}

                  {!url && (
                    <div className="flex flex-row max-w-[500px] gap-5 h-full">
                      <div className="flex flex-1 w-[50%] ">
                        <Image
                          src={urlFor(mainImage).url()}
                          alt={`${title}`}
                          width={300}
                          height={200}
                          style={{
                            objectFit: "cover",
                            overflow: "hidden",
                          }}
                          priority={true}
                        />
                      </div>
                      <div className="w-[50%] mb-4 mr-4">
                        <h1 className="font-bold my-4">{title}</h1>
                        {body.map((b, i) => {
                          return <p key={i}>{b.children[0].text}</p>;
                        })}
                      </div>
                    </div>
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
