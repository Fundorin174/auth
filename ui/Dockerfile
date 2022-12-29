FROM node:alpine
WORKDIR /usr/app/ui
EXPOSE 3000
COPY ./ ./
RUN npm install
RUN npm run build
CMD ["npm", "start"]