import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { getPostItem, getPostSlugs } from '../../lib/data';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import he from 'he';

export const getStaticPaths = async () => {
  const slugsRes = await getPostSlugs();
  const slugs = slugsRes.posts;
  const paths = slugs.map((slug) => {
    return {
      params: {
        slug: slug.slug,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const postItem = await getPostItem(params.slug);
  return {
    props: {
      post: postItem.post,
      content: await serialize(he.decode(postItem.post.content)),
    },
  };
};

const BlogPage = ({ post, content }) => {
  return (
    <>
      <Head>
        <title>Awesome Portfolio</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>{post.title}</h1>
        <p>{new Date(post.date).toDateString()}</p>
        <p>{post.description}</p>
        <div>
          <p>{post.author.name}</p>
          <Image
            src={post.author.image.url}
            width={post.author.image.width}
            height={post.author.image.height}
            alt={post.title}
          />
        </div>
        <MDXRemote {...content} />
      </main>
    </>
  );
};

export default BlogPage;
