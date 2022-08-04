FROM node:14-alpine

EXPOSE 3001

WORKDIR /App

ADD todo-app/back-end/node_modules.tar.gz .

COPY todo-app/back-end/package.json .

# RUN npm install 

COPY todo-app/back-end .

ENTRYPOINT [ "npm" ]
CMD [ "start" ]


# referencia https://stackoverflow.com/questions/27068596/how-to-include-files-outside-of-dockers-build-context