import fs from "fs";
import path from "path";

const routes = () => {
  const allRoutes = [];
  const routesPath = path.join(__dirname);
  const folders = fs
    .readdirSync(routesPath)
    .filter((folder) => folder !== "index.ts");
  for (const folder of folders) {
    const routePath = path.join(routesPath, folder);
    const files = fs
      .readdirSync(routePath)
      .filter((file) => file.endsWith(".ts"));
    for (const file of files) {
      try {
        const route = require(path.join(routePath, file)).default;
        allRoutes.push(route);
      } catch (error) {
        console.log("-".repeat(50));
        console.error(`Error loading routes from ${routePath}/${file}`);
        console.error(error);
        console.log("-".repeat(50));
      }
    }
  }
  return allRoutes;
};

export default routes;
