import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import PostCard from "../components/post-card";
import Header from "../components/header";
import Pagination from "../components/pagination";
import { MetaData } from "../components/meta";

const IndexTemplate = ({ data, pageContext, location }) => {
  return (
    <Layout>
      <MetaData data={data} location={location} type="article" />
      <Header />
      {data.allGhostPost.edges.map(({ node }, i) => {
        return <PostCard key={i} post={node} />;
      })}
      <div>
        <Pagination pageContext={pageContext} />
      </div>
    </Layout>
  );
};

export default IndexTemplate;

export const pageQuery = graphql`
  query($limit: Int!, $skip: Int!) {
    allGhostPost(
      sort: { order: DESC, fields: [published_at] }
      filter: { slug: { ne: "data-schema" } }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          uuid
          title
          url
          updated_at(formatString: "MMMM DD YYYY")
          published_at(formatString: "MMMM DD YYYY")
          authors {
            name
            slug
          }
          tags {
            name
            slug
          }
          excerpt
          slug
          readingTime
          featured
        }
      }
    }
  }
`;
