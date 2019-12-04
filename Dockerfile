FROM node:12.13.0-alpine as build

WORKDIR /app

COPY . /app

RUN yarn install --silent
RUN yarn add react-scripts -g --silent
RUN yarn build

FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80
CMD ["nginx","-g","daemon off;"]