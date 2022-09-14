
import { gql } from "@apollo/client";

const BLOG_QRY = gql`
query AllPostsQuery {
    categories(first: 99) {
        nodes {
          uri
          name
          slug
        }
    }
    posts {
        nodes {
        title
        content
        uri
        slug
        excerpt
        featuredImage {
            node {
            altText
            sourceUrl
            }
        }
    }
  }
  
}`;
export default BLOG_QRY;