const options = {
  openapi: "OpenAPI 3",
  language: "en-US",
  disableLogs: false,
  autoHeaders: false,
  autoQuery: false,
  autoBody: false,
};
const generateSwagger = require("swagger-autogen")();

const swaggerDocument = {
  info: {
    version: "1.0.0",
    title: "Express Project",
    description: "Basic Structure For Express Project",
    contact: {
      name: "API Support",
      email: "nit474011gwl@gmail.com",
    },
  },
  host: "localhost:5000",
  basePath: "/api/",
  schemes: ["http"],
  consumes: ["application/json"],
  produces: ["application/json"],
  securityDefinitions: {},
};
const swaggerFile = "./docs/swagger.json";
const apiRouteFile = ["./app/routes.ts"];
generateSwagger(swaggerFile, apiRouteFile, swaggerDocument);
