export default (user, statusCode, res) => {
  const token = user.getJwtToken();

  //options for cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  return res.status(statusCode).cookie("token", token, options).json({
    token,
  });
};
