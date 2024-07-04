const db = require('../model/helper');

async function userMustExist(req, res, next) {
  const { id } = req.params;
  try {
    const result = await db(`SELECT * FROM users WHERE UserID = ${id}`);
    if (result.data.length === 0) {
      res.status(404).send({ error: "User not found" });
    } else {
      res.locals.user = result.data[0];
      next();
    }
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
}

module.exports = userMustExist;