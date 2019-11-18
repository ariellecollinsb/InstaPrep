const axios = require("axios");
const cheerio = require("cheerio");
const db = require("./models");
// Routes

// A GET route for scraping the chosen website
app.get("/scrape", function (req, res) {
    // First, we grab the body of the html with axios
    axios.get("https://nutritionstripped.com/articles/").then(function (response) {
        // Then, we load that into cheerio and save it to $ for a shorthand selector
        var $ = cheerio.load(response.data);
console.log(response.data);
        // Now, we grab every h2 within an article tag, and do the following:
        $("figure card").each(function (i, element) {
            // Save an empty result object
            var result = {};

            // Add the text and href of every link, and save them as properties of the result object
            result.title = $(this)
                .children("h2 title")
                .text();
            result.image = $(this)
                .children("img")
                .attr("src");
            result.link = $(this)
                .children("a")
                .attr("href");

            // Create a new Blogpost using the `result` object built from scraping
            db.Blog.create(result)
                .then(function (dbBlog) {
                    // View the added result in the console
                    console.log(dbBlog);
                })
                .catch(function (err) {
                    // If an error occurred, log it
                    console.log(err);
                });
        });

        // Send a message to the client
        res.send("Scrape Complete");
    });
});

// Route for getting all Blogposts from the db
app.get("/blog", function (req, res) {
    db.Blog.find({})
        .then(function (blogs) {
            res.json(blogs);
        })
        .catch(function (err) {
            res.json(err);
        });

});