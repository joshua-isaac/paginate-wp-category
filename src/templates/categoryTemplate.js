import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { Link, graphql } from "gatsby"
import Pager from "../components/pager.js"

export const query = graphql`
  query($slug: String!, $skip: Int!, $limit: Int!) {
    allWpPost(
      skip: $skip
      limit: $limit
      filter: { categories: { nodes: { elemMatch: { slug: { eq: $slug } } } } }
      sort: { fields: date, order: DESC }
    ) {
      edges {
        node {
          title
          slug
          date(formatString: "MM . DD . YYYY")
          content
        }
      }
    }
  }
`

const CategoryTemplate = ({ data, pageContext }) => {
  console.log(data)
  console.log(pageContext)
  return (
    <Layout>
      <SEO title="Category" />
      <h1>Category</h1>
      <ul>
        <li>
          <Link to="/category/cars">Cars</Link>
        </li>
        <li>
          <Link to="/category/trucks">Trucks</Link>
        </li>
      </ul>
      <div className="category__posts">
        {data.allWpPost.edges.map((post, i) => (
          <article key={i}>
            <h3>{post.node.title}</h3>
            <span>{post.node.date}</span>
            <div dangerouslySetInnerHTML={{ __html: post.node.content }} />
          </article>
        ))}
      </div>
      <Pager pageContext={pageContext} />
    </Layout>
  )
}

export default CategoryTemplate
