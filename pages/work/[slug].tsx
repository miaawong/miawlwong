import client from "../../client";
import { Project } from "../../types";
import Nav from "../../components/Nav";
import { urlFor } from "../../utils";
import Image from "next/image";
import Footer from "../../components/Footer";
import Head from "next/head";
import Link from "next/link";
import { AiOutlineGithub } from "react-icons/ai";

const Project = ({ project }: { project: Project }) => {
  if (!project) return <div>Loading...</div>;
  const { title, body, github } = project;
  const mainImage = project?.mainImage || "";

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content={
            (project &&
              project.body?.length > 0 &&
              body[0]?.children[0].text.substring(0, 100)) ||
            title
          }
        />
        <meta property="og:title" content={title} />
        <meta
          property="og:description"
          content={
            (project &&
              project.body?.length > 0 &&
              body[0]?.children[0].text.substring(0, 100)) ||
            title
          }
        />
        <meta property="og:image" content={urlFor(mainImage).url()} />
      </Head>
      <main className={"max-w-screen-xl m-auto p-6 min-h-[88vh]"}>
        <Nav />
        <article className={"mt-10 mb-20"}>
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">{title}</h1>
          </div>
          <div className="flex flex-col m-auto mb-10">
            <Image
              src={urlFor(mainImage).url()}
              alt={`${title}`}
              width={500}
              height={300}
              className="m-auto rounded w-[100%] lg:w-[80%] max-h-[700px] object-cover"
              quality="100"
              priority={true}
            />
          </div>
          {body &&
            body.length > 0 &&
            body.map((block, i) => (
              <p key={i} className="mb-2">
                {block.children[0].text}
              </p>
            ))}
          <Link href={github} target="_blank">
            <div className="mt-5 font-bold text-lg flex gap-2">
              <p>Code</p>
              <AiOutlineGithub size={30} color="gray" />
            </div>
          </Link>
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
  const project = await client.fetch(
    `
    *[_type == "project" && slug.current == $slug][0]
     { 
      imageUrl,
      mainImage,
      title, 
      body,
     slug,
     github
    
    }
  `,
    { slug },
  );
  return {
    props: {
      project,
    },
  };
}

export default Project;
