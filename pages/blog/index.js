import Link from 'next/link';
import { getPosts } from '../../lib/data';

export const getStaticProps = async () => {
  const data = await getPosts();
  return {
    props: {
      posts: data.posts,
    },
  };
};

const BlogPage = ({ posts }) => {
  return (
    <main className="container max-w-3xl mx-auto px-4 py-5 lg:py-10">
      {posts.map((post) => {
        return (
          <div className="grid grid-cols-1 md:grid-cols-4 py-6" key={post.slug}>
            <div className="mb-2 mb:mb-0 md:col-span-1">
              <p className=" text-sm">{new Date(post.date).toDateString()}</p>
            </div>
            <div className="md:col-span-3">
              <Link href={`/blog/${post.slug}`}>
                <a className="text-2xl font-semibold link-primary">
                  {post.title}
                </a>
              </Link>
              <p className=" leading-relaxed">{post.description}</p>
              <p className="text-sm  font-semibold mt-1">{post.author.name}</p>
            </div>
          </div>
        );
      })}
    </main>
  );
};

export default BlogPage;
