FROM node:14-alpine

EXPOSE 3000

WORKDIR /App-front

ADD todo-app/front-end/node_modules.tar.gz .

COPY todo-app/front-end/package.json .

# RUN npm install

COPY todo-app/front-end .

ENV REACT_APP_API_HOST=${REACT_APP_API_HOST} 

ENV REACT_APP_API_PORT=${REACT_APP_API_PORT} 

ENTRYPOINT [ "npm" ]
CMD [ "start" ]

