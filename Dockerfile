# ---------- Stage 1: Frontend builder ----------
FROM node:20-alpine AS frontend-builder
WORKDIR /app/aegonish-frontend

COPY aegonish-frontend/package*.json ./
RUN npm ci --silent
COPY aegonish-frontend/ ./
RUN npm run build


# ---------- Stage 2: Backend deps ----------
FROM node:20-alpine AS backend-deps
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm ci --production --silent


# ---------- Stage 3: Final runtime ----------
FROM node:20-alpine AS runtime
ENV NODE_ENV=production

WORKDIR /app/backend

# Create non-root user
RUN addgroup -S app && adduser -S -G app app
USER app

# Copy backend dependencies
COPY --chown=app:app --from=backend-deps /app/backend/node_modules ./node_modules

# Copy backend source
COPY --chown=app:app backend/ ./

# Copy built frontend
COPY --chown=app:app --from=frontend-builder /app/aegonish-frontend/dist ../aegonish-frontend/dist

# ⚠️ DO NOT copy .env inside container!
# .env should come from docker-compose via env_file

# Expose port
EXPOSE 4000

# Run the app
CMD ["node", "server.js"]
