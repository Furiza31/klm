import fs from "fs";
import path from "path";

const middlewares = () => {
  const allMiddlewares = [];
  const middlewaresPath = path.join(__dirname);
  const files = fs
    .readdirSync(middlewaresPath)
    .filter((file) => file.endsWith(".ts"))
    .filter((file) => file !== "index.ts");
  for (const file of files) {
    try {
      const middleware = require(path.join(middlewaresPath, file)).default;
      allMiddlewares.push(middleware);
    } catch (error) {
      console.error(`Error loading middleware from ${middlewaresPath}/${file}`);
    }
  }
  return allMiddlewares;
};

export default middlewares;
