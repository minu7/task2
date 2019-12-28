#!/usr/bin/env bash

docker-compose exec configsvr01 sh -c "mongo < /scripts/init-configserver.js"

docker-compose exec shard01-a sh -c "mongo < /scripts/init-shard01.js"
docker-compose exec shard02-a sh -c "mongo < /scripts/init-shard02.js"
docker-compose exec shard03-a sh -c "mongo < /scripts/init-shard03.js"

# for waiting primary election (i know it's ugly this sleep)
sleep 30

docker-compose exec router01 sh -c "mongo < /scripts/init-router.js"
