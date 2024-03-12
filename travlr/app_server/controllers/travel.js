/* GET travel view */

const travel = (req, res) => {
    res.render('ravel', {title: 'Travlr Getaways'})
};

module.exports = {
    travel
};