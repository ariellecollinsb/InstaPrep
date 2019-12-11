const axios = require("axios");
const cheerio = require("cheerio");
module.exports = {
    getBlogPosts: function (req, res) {
        scrape_nutritionStripped(res);
    }
}

function scrape_nutritionStripped(res) {
    // First, we grab the body of the html with axios
    axios.get("https://nutritionstripped.com/articles/").then(function (response) {
        // Then, we load that into cheerio and save it to $ for a shorthand selector
        var $ = cheerio.load(response.data);
        // Now, we grab every h2 within an article tag, and do the following:
        results = [];
        $("figure.card").each(function (i, element) {
            // Save an empty result object
            var result = {};

            // Add the text and href of every link, and save them as properties of the result object
            result.title = $(this)
                .find("h2.title")
                .text();
            result.image = $(this)
                .find("img")
                .attr("src");
            result.link = $(this)
                .children("a")
                .attr("href");
            if (result.title !== "" && result.link !== "") {
                results.push(result);
            }
        });

        res.json(results);
    });
};
