const db = require('../model/helper');

async function checkPropertyDB (req, res, next) {
    const {FormattedAddress, Latitude, Longitude} = req.body
    try {
    const result = await db(`SELECT * FROM properties WHERE FormattedAddress = "${FormattedAddress}"`);
    if (result.data.length === 0) {
        console.log('Propery does not exist')
        next();
    } else {
    //   res.locals.property = result.data[0];
      console.log('Propery already in db')
    //   next();
    }
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
}

module.exports = checkPropertyDB;