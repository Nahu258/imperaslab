# =============================================================================
#  Impera's Lab — Multi-stage Dockerfile (Astro Build + Nginx Alpine)
# =============================================================================

# Etapa 1: Build de la landing page Astro
FROM node:22-alpine AS builder

WORKDIR /app

# Instalar dependencias
COPY package*.json ./
RUN npm ci

# Copiar el código fuente y compilar el sitio estático
COPY . .
RUN npm run build

# Etapa 2: Servidor Nginx Alpine para producción
FROM nginx:alpine

# Copiar configuración de Nginx optimizada para Docker y Traefik
COPY deploy/nginx-docker.conf /etc/nginx/conf.d/default.conf

# Copiar los archivos estáticos generados por Astro
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
