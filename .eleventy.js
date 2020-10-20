module.exports = function (eleventyConfig) {
  // A handy markdown shortcode for blocks of markdown
  // coming from our data sources
  const markdownIt = require("markdown-it")
  const md = new markdownIt({
    html: true,
  })
  eleventyConfig.addPairedShortcode("markdown", (content) => {
    return md.render(content)
  })

  // Simply inline minified CSS
  const CleanCSS = require("clean-css")
  eleventyConfig.addFilter("cssmin", function (code) {
    return new CleanCSS({}).minify(code).styles
  })

  eleventyConfig.addNunjucksFilter("toHumanUrl", (v) => v.replace(/\//g, ""))

  // Unsorted items (in whatever order they were added)
  eleventyConfig.addCollection("allMyContent", function (collectionApi) {
    const d = collectionApi.getAll()
    d.forEach((i) => {
      console.log(i)
    })
    return d
  })

  // Where are my things?
  return {
    dir: {
      input: "src",
      output: "dist",
    },
  }
}
