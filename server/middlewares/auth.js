import jwt from "jsonwebtoken";

const auth = async (request, response, next) => {
  try {


    console.log("Authorization header:", request.headers.authorization);


    let token;

    if (request.cookies?.accessToken) {
      token = request.cookies.accessToken;
    }

    if (!token && request.headers.authorization) {
      token = request.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return response.status(401).json({
        message: "Provide token",
        error: true,
        success: false,
      });
    }

    const decode = jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);

    request.userId = decode.id;

    next();

  } catch (error) {
    console.log("Auth error:", error.message);

    return response.status(401).json({
      message: "You have not login",
      error: true,
      success: false,
    });
  }
};

export default auth;