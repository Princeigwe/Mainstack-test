
FROM node:17-alpine As development

WORKDIR /usr/src/app

# copy package.json and package-lock.json to the image working directory
COPY package*.json ./

# install development dependencies
RUN npm install --only=development --force

# copy the application code to the working directory of image
COPY . .

#  build the application
RUN npm run build


# Docker image for mainstack API for production envoronment

FROM node:17-alpine As production

WORKDIR /usr/src/app

# copy package.json and package-lock.json to the image working directory
COPY package*.json ./

#  so that Typescript isn't installed in the production image
RUN npm install --only=production --force

COPY . .

#  copy the compiled javascript code to out production image
COPY --from=development /usr/src/app/dist ./dist

EXPOSE 3000

# run the application
CMD ["node", "dist/main"]