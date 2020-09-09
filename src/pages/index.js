import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { Link } from "gatsby"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <ul>
      <li>
        <Link to="/category/cars">Cars</Link>
      </li>
      <li>
        <Link to="/category/trucks">Trucks</Link>
      </li>
    </ul>
  </Layout>
)

export default IndexPage
