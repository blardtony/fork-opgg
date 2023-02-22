FROM node:18.12.1

RUN mkdir src
COPY . /src
WORKDIR /src

RUN npm install
RUN npm install -g @angular/cli

EXPOSE 4200
CMD ng serve --host 0.0.0.0 & npm run server