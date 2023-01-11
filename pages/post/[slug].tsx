import client from '../../client'

const Post = ({post}) => {
  console.log(post,'post')
  return (
    <article>
      <h1 className='text-3xl'>{post?.slug?.current}</h1>

      <p>{post?.body[0].children[0].text}</p>
    </article>
  )
}

//Next.js comes with a special function called getStaticProps 
//that is called and returns props to the react component before 
//rendering the templates in /pages. 
//This is a perfect place for fetching the data you want for a page. 
// You need to use this in tandem with another special function called 
//getStaticPaths in order to tell Next.js upfront which posts exist.
export async function getStaticPaths() {
  const paths = await client.fetch(
    `*[_type == "post" && defined(slug.current)][].slug.current`
  )

  return {
    paths: paths.map((slug) => ({params: {slug}})),
    fallback: true,
  }
}

export async function getStaticProps(context) {
  // It's important to default the slug so that it doesn't return "undefined"
  const { slug = "" } = context.params
  // * = select all docs 
  // filter by type = post and find post that have the same slug 
  // we have in the params
  const post = await client.fetch(`
    *[_type == "post" && slug.current == $slug][0]
  `, { slug })
  return {
    props: {
      post
    }
  }
}

export default Post