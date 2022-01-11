import Link from 'next/link';
import { useState } from 'react';
import { request } from 'graphql-request';
import useSWR from 'swr';

const fetcher = (endpoint, query, variables) =>
  request(endpoint, query, variables);

export const getStaticProps = async () => {
  const data = await fetcher(
    process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT,
    `query getPosts() {
    postsConnection(orderBy:date_DESC,first:2, skip:0){
      edges{
        node{
          id
          title
          date
          slug
          description
          id
          author{
            name
          }
        }
      }
      pageInfo{
        hasNextPage
        hasPreviousPage
        pageSize
      }
    }
  }
  `
  );

  return {
    props: {
      posts: data,
    },
  };
};

const BlogPage = ({ posts }) => {
  const [searchValue, setSearchValue] = useState('');
  const [skip, setSkip] = useState(0);
  const url = `${process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT}`;
  const { data, error } = useSWR(
    [
      url,
      `query getPosts($searchValue: String $skip: Int) {
        postsConnection(orderBy:date_DESC, where:{title_contains:$searchValue},first:2, skip:$skip){
          edges{
            node{
              id
              title
              date
              slug
              description
              id
              author{
                name
              }
            }
          }
          pageInfo{
            hasNextPage
            hasPreviousPage
            pageSize
          }
        }
      }`,
      searchValue,
      skip,
    ],
    (endpoint, query) => fetcher(endpoint, query, { searchValue, skip }),
    { initialData: posts, revalidateOnFocus: false }
  );
  console.log(data?.postsConnection.pageInfo);
  return (
    <main className="min-h-screen container max-w-3xl mx-auto px-4 py-5 lg:py-10">
      <div className="form-control my-5">
        <input
          type="text"
          placeholder="Search blog posts"
          className="input input-bordered"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>

      {error && (
        <div>
          <h2>Failed to load</h2>
        </div>
      )}

      {data?.postsConnection?.edges?.length > 0 ? (
        data?.postsConnection?.edges?.map((post) => {
          return (
            <div
              className="grid grid-cols-1 md:grid-cols-4 py-6"
              key={post.node.slug}
            >
              <div className="mb-2 mb:mb-0 md:col-span-1">
                <p className=" text-sm">
                  {new Date(post.node.date).toDateString()}
                </p>
              </div>
              <div className="md:col-span-3">
                <Link href={`/blog/${post.node.slug}`}>
                  <a className="text-2xl font-semibold link-primary">
                    {post.node.title}
                  </a>
                </Link>
                <p className=" leading-relaxed">{post.node.description}</p>
                <p className="text-sm  font-semibold mt-1">
                  {post.node.author.name}
                </p>
              </div>
            </div>
          );
        })
      ) : (
        <div>
          <h2 className="">No Posts Found...</h2>
        </div>
      )}

      <div className="btn-group justify-center mt-5 lg:mt-10">
        <button
          className="btn btn-outline btn-wide"
          disabled={!data?.postsConnection.pageInfo.hasPreviousPage}
          onClick={() => setSkip(skip - 2)}
        >
          Previous Page
        </button>
        <button
          className="btn btn-outline btn-wide"
          disabled={!data?.postsConnection.pageInfo.hasNextPage}
          onClick={() => setSkip(skip + 2)}
        >
          Next Page
        </button>
      </div>
      <div className="mt-3 text-center">
        Total Pages: {data?.postsConnection.pageInfo.pageSize}
      </div>
    </main>
  );
};

export default BlogPage;
