const { paginate } = require("gatsby-awesome-pagination")

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(`
    query {
      allWpPost {
        group(field: categories___nodes___name) {
          fieldValue
          edges {
            node {
              title
              date(formatString: "MMMM DD, YYYY")
              content
            }
          }
        }
      }
    }
  `)

  const categoryTemplate = require.resolve(
    `./src/templates/categoryTemplate.js`
  )

  result.data.allWpPost.group.forEach(category => {
    const str = category.fieldValue

    const slug = str.replace(/\s+/g, "-").toLowerCase()

    paginate({
      createPage,
      items: category.edges,
      itemsPerPage: 1,
      pathPrefix: `category/${slug}`,
      component: categoryTemplate,
      context: { slug: slug, category: category.fieldValue },
    })
  })
}
