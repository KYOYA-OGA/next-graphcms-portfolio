import { gql, GraphQLClient } from 'graphql-request';

export const getPostsAndPortfolios = async () => {
  const endpoint = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

  const graphQLClient = new GraphQLClient(endpoint);

  const query = gql`
    {
      portfolios {
        title
        tags
        slug
        description
        date
        coverImage {
          url
          width
          height
        }
      }
      posts {
        title
        slug
        description
        date
        tags
        author {
          name
          image {
            url
            width
            height
          }
        }
      }
    }
  `;

  return await graphQLClient.request(query);
};

export const getPortfolioItem = async (slug) => {
  const endpoint = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

  const graphQLClient = new GraphQLClient(endpoint);

  const query = gql`
    query getPortfolio($slug: String!) {
      portfolio(where: { slug: $slug }) {
        title
        tags
        slug
        description
        date
        content
        coverImage {
          url
          width
          height
        }
      }
    }
  `;

  const variables = {
    slug,
  };

  return await graphQLClient.request(query, variables);
};

export const getPortfolioSlugs = async () => {
  const endpoint = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

  const graphQLClient = new GraphQLClient(endpoint);

  const query = gql`
    {
      portfolios {
        slug
      }
    }
  `;

  return await graphQLClient.request(query);
};

export const getPostSlugs = async () => {
  const endpoint = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

  const graphQLClient = new GraphQLClient(endpoint);

  const query = gql`
    {
      posts {
        slug
      }
    }
  `;

  return await graphQLClient.request(query);
};

export const getPostItem = async (slug) => {
  const endpoint = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

  const graphQLClient = new GraphQLClient(endpoint);

  const query = gql`
    query getPost($slug: String!) {
      post(where: { slug: $slug }) {
        title
        slug
        description
        date
        tags
        content
        author {
          name
          image {
            url
            width
            height
          }
        }
      }
    }
  `;

  const variables = {
    slug,
  };

  return await graphQLClient.request(query, variables);
};
