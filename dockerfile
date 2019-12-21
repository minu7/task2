FROM node:8
ADD . /home/task2
WORKDIR /home/task2

RUN yarn install

EXPOSE 80
