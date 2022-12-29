FROM node:alpine
WORKDIR /usr/app/srv
EXPOSE 5000
COPY ./ ./
RUN npm install
RUN npm run build
CMD ["npm", "start"]