FROM node
WORKDIR /docker_rest
COPY package.json . 
RUN npm i
COPY . .
CMD ["npm","start"]
EXPOSE 9000