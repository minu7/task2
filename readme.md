# Installation
Docker is needed to start the server.
1. clone the repository
2. ``` docker-compose run node yarn install ```
3. ``` docker-compose up ```
4. when all services was started ``` ./configure-cluster.sh ```
5. then ``` start-server.sh ```

# Verify cluster and sharding
The cluster start the sharding when the storage size reach 3 MB
- Open mongo shell:
  ```docker-compose exec router01 mongo --port 27017```
- select db:
  ``` use app ```
- check the db size:
  ``` db.stats() ```
- check sharding (after 3MB):
  ``` sh.status() ```

# Admin account
The server at startup ensure an admin account in the user collection:
email: admin@admin.com
password: admin
