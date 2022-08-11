module.exports = (request, response, next) => {
  response.setHeader(
    "Access-Control-Allow-Origin",
    `${
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "https://mycontacts-reactjs.vercel.app"
    }`
  );
  response.setHeader("Access-Control-Allow-Methods", "*");
  response.setHeader("Access-Control-Allow-Headers", "*");
  response.setHeader("Access-Control-Max-Age", "10");
  next();
};
