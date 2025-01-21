import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';
import fs from 'fs';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'This is the API documentation for the project.',
      contact: {
        name: 'Manav Jain',
        email: 'nit474011gwl@example.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:5000/api',
        description: 'Local server',
      },
    ],
  },
  // Match files with .ts extension in `app` directory and subdirectories
  apis: ['./app/**/*.ts'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Save the Swagger JSON to a file
fs.writeFileSync('./swagger-output.json', JSON.stringify(swaggerSpec, null, 2), 'utf-8');

export const setupSwagger = (app: Express): void => {
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log('Swagger docs available at http://localhost:5000/api/docs');
  console.log('Swagger JSON saved to swagger-output.json');
};