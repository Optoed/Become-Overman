# Используем базовый образ Node.js версии 14
FROM node:14
# Определяем рабочий каталог внутри контейнера
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы приложения
COPY . .

# Определяем команду для запуска приложения
CMD ["npm", "start"]
