# backend/Dockerfile
# Multi-stage production image for backend (Node 20)
# Stage: install deps
FROM node:20-alpine AS deps
WORKDIR /app

# Install only what we need to fetch and install native deps if required.
# Node 20 usually has prebuilt binaries for many native modules.
COPY package*.json ./
# Install production deps only
RUN npm ci --omit=dev --silent

# Stage: final runtime
FROM node:20-alpine AS runner
ENV NODE_ENV=production
WORKDIR /app

# create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules

# copy app source
COPY . ./

# ensure uploads dir exists and owned by appuser (multer, etc)
RUN mkdir -p /app/uploads && chown -R appuser:appgroup /app/uploads /app

USER appuser

EXPOSE 4000

HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://127.0.0.1:4000/ || exit 1

# Use start.js when present because it preloads dotenv (your project had start.js in recap).
# If your app uses server.js directly, replace with ["node", "server.js"]
CMD ["node", "server.js"]
