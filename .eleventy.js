const pluginBetterSlug = require("@borisschapira/eleventy-plugin-better-slug")

module.exports = function (eleventyConfig) {
  // plugins
  eleventyConfig.addPlugin(pluginBetterSlug)

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

  // Where are my things?
  return {
    dir: {
      input: "src",
      output: "dist",
    },
  }
}
