const { login } = require('../../services/auth.service');

async function loginController(req, res, next) {
  const { username, password } = req.body;

  try {
    const result = await login(username, password);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

module.exports = { loginController };
