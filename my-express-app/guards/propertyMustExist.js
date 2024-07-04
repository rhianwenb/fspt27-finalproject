const db = require('../model/helper');

async function propertyMustExist(req, res, next) {
  const { id } = req.params;
  try {
    const result = await db(`SELECT * FROM properties WHERE PropertyID = ${id}`);
    if (result.data.length === 0) {
      res.status(404).send({ error: "Property not found" });
    } else {
      res.locals.property = result.data[0];
      next();
    }
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
}

module.exports = propertyMustExist;