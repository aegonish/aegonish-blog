# aegonish-frontend/Dockerfile
# Build stage
FROM node:20-alpine AS build
WORKDIR /app
COPY aegonish-frontend/package*.json ./
RUN npm ci --silent
COPY aegonish-frontend/ ./
# If you use tsc build step as in your package.json build script, keep it
RUN npm run build

# Production nginx stage
FROM nginx:stable-alpine AS runner
# remove default html
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist /usr/share/nginx/html

# copy nginx config
COPY aegonish-frontend/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://127.0.0.1/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
