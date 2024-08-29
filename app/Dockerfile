FROM 22.7.0-alpine3.19

WORKDIR /app

COPY capacitor.config.ts ./
COPY components.json ./
COPY index.html ./
COPY package.json ./
COPY package-lock.json ./
COPY tailwind.config.js ./
COPY tsconfig.app.json ./
COPY tsconfig.json ./
COPY tsconfig.node.json ./
COPY vite.config.ts ./
COPY public ./public
COPY src ./src

RUN npm install
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]