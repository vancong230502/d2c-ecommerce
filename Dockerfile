# Sử dụng image Node.js làm base
FROM node:20-alpine

# Đặt thư mục làm việc
WORKDIR /app

# Copy package.json và package-lock.json
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Copy toàn bộ mã nguồn
COPY . .

# Build Next.js
RUN npm run build

# Khai báo cổng
EXPOSE 3000

# Lệnh chạy ứng dụng
CMD ["npm", "start"]
