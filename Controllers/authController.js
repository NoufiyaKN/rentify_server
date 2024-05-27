const sellerController = require('./sellerController');
const buyerController = require('./buyerController');

exports.login = async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);

    try {
        // First try seller login
        const sellerResponse = await sellerController.login(req, res, true);
        if (sellerResponse) {
            return res.status(200).json(sellerResponse);
        }

        // Then try buyer login if seller login fails
        const buyerResponse = await buyerController.login(req, res, true);
        if (buyerResponse) {
            return res.status(200).json(buyerResponse);
        }

        // If both logins fail, return an error
        res.status(404).json("Invalid email / password");
    } catch (err) {
        console.error(err);
        res.status(401).json(err);
    }
};
