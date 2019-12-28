# Installation
Docker is needed to start the server.
1. clone the repository
2. ``` cd task2 ```
3. ``` docker-compose run node yarn install ```
4. ``` docker-compose up ```
5. when all services was started opening a new terminal tab ``` ./configure-cluster.sh ```
6. then ``` ./start-server.sh ```

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
