/* GET Homepage */

const index = (req, res) => {
    req.render('index', {title: "travlr Getaways"});
};

module.exports = {
    index
}
