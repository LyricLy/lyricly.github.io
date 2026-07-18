export default function(eleventyConfig) {
    eleventyConfig.setInputDirectory("src");
    eleventyConfig.setIncludesDirectory("../includes");
    eleventyConfig.addPassthroughCopy({"static": "/"})
    eleventyConfig.addGlobalData("layout", "default.njk");
}
