sh.addShard("rs-shard-01/shard01-a:27017")
sh.addShard("rs-shard-01/shard01-b:27017")

sh.addShard("rs-shard-02/shard02-a:27017")
sh.addShard("rs-shard-02/shard02-b:27017")

sh.addShard("rs-shard-03/shard03-a:27017")
sh.addShard("rs-shard-03/shard03-b:27017")

sh.enableSharding("app")
use config
db.settings.save( { _id:"chunksize", value: 3 } )
use app
db.adminCommand( { shardCollection: "app.cryptoprices", key: { crypto: 1 } } )
