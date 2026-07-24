# --- 阶段一：编译阶段 ---
FROM node:22-alpine AS build-stage

# 设置工作目录
WORKDIR /app

# 复制 package.json 并安装依赖（利用 Docker 缓存机制）
COPY package*.json ./
RUN npm install

# 复制项目所有源代码并执行打包
COPY . .
RUN npm run build:h5

# --- 阶段二：生产运行阶段 ---
FROM nginx:stable-alpine AS production-stage

# 从编译阶段复制打包后的文件到 Nginx 目录
# Vite 默认打包目录是 dist
COPY --from=build-stage /app/dist/build/h5 /usr/share/nginx/html

# 复制自定义的 Nginx 配置覆盖默认配置
# COPY .docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY .docker/nginx.conf.template /etc/nginx/templates/default.conf.template

# 暴露 80 端口
EXPOSE 80

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]