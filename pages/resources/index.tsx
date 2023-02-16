import Head from "next/head";
import React from "react";
import Nav from "../../components/Nav";

const index = () => {
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
        <div className="mt-10 flex justify-center">
          <h2 className="text-xl font-bold">coming soon!</h2>
        </div>
      </main>
    </>
  );
};

export default index;
