# aegonish-frontend/Dockerfile

# ---------- Stage 1: Build ----------
FROM node:20-alpine AS build
WORKDIR /app

# copy package files
COPY package*.json ./
RUN npm ci --silent

# copy source and build
COPY . ./
RUN npm run build

# ---------- Stage 2: NGINX ----------
FROM nginx:stable-alpine AS runner

# remove default nginx page
RUN rm -rf /usr/share/nginx/html/*

# copy build output from vite
COPY --from=build /app/dist /usr/share/nginx/html

# copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://127.0.0.1/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
