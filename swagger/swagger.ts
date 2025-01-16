import fs from 'fs';
import path from 'path';

// Paths
const swaggerFolderPath = path.join(__dirname, '');
const outputFilePath = path.join(__dirname, 'merged_swagger.json');

async function mergeSwaggerFiles() {
  try {
    // Read all files in the swagger folder
    const files = fs.readdirSync(swaggerFolderPath);

    // Filter files ending with .swagger.json
    const swaggerFiles = files.filter(file => file.endsWith('.swagger.json'));

    if (swaggerFiles.length === 0) {
      console.log('No .swagger.json files found in the directory.');
      return;
    }

    // Initialize an empty array to store all file data
    const mergedSwagger: any[] = [];

    for (const file of swaggerFiles) {
      // Read each JSON file
      const filePath = path.join(swaggerFolderPath, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const jsonContent = JSON.parse(fileContent);

      // Add content to the merged array
      mergedSwagger.push(jsonContent);
    }
    
    // Write the merged JSON object to the output file
    fs.writeFileSync(outputFilePath, JSON.stringify(mergedSwagger, null, 2));

    console.log(`Merged JSON written to ${outputFilePath}`);
  } catch (error) {
    console.error('Error while merging Swagger files:', error);
  }
}

mergeSwaggerFiles();