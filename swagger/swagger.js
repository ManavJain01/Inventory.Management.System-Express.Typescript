const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "My API",
    description: "API documentation for my application",
  },
  host: "localhost:5000",
  schemes: ["http"],
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["../app/routes.ts"];

swaggerAutogen(outputFile, endpointsFiles).then(() => {
  console.log("Swagger documentation generated!");
});

// import fs from 'fs';
// import path from 'path';

// const swaggerDirectory = path.join(__dirname, 'swagger'); // Adjust the path to your directory

// const loadSwaggerFiles = () => {
//   const swaggerFiles: any[] = [];

//   // Read all files in the swagger directory
//   const files = fs.readdirSync(swaggerDirectory);

//   // Filter files with the .swagger.json postfix
//   const swaggerJsonFiles = files.filter(file => file.endsWith('.swagger.json'));

//   // Load each .swagger.json file
//   swaggerJsonFiles.forEach(file => {
//     const filePath = path.join(swaggerDirectory, file);
//     const fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
//     swaggerFiles.push(fileContent);
//   });

//   return swaggerFiles;
// };

// // Example usage
// const allSwaggerDocs = loadSwaggerFiles();
// console.log(allSwaggerDocs);
