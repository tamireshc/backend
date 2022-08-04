FROM mjgargani/puppeteer:trybe1.0

WORKDIR /App-tests

ADD todo-app/tests/node_modules.tar.gz .

COPY todo-app/tests/package.json .

# RUN npm install

COPY todo-app/tests .

ENV FRONT_HOST=todofrontend

ENV FRONT_PORT=3000

ENTRYPOINT [ "npm" ]

CMD [ "test" ]