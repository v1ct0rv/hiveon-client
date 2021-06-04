# HIVEON Pool Stats Collector in InfluxDB

## To run the application

You need to create an influx db cloud account (https://cloud2.influxdata.com/signup) and create a bucket named hiveon-earning  (can be changed with environment variable INFLUX_DB_BUCKET)

export ETH_WALLET="your wallet"
export INFLUX_DB_TOKEN="your influx db cloud token"
export INFLUX_DB_ORG="your influx db cloud org"
node index

Optional Environmen variables:

* INTERVAL (default 60000): Process interval in milliseconds.
* INFLUX_DB_BUCKET (default hiveon-earning): the bucket to store the data.
* INFLUX_DB_URL (default https://us-east-1-1.aws.cloud2.influxdata.com): The influx db url to send the data.

## Api Endpoints

The endpoints you're looking for are the following (replace walletAddress123 with your wallet address), When pasting your address, you need to exclude the first two letters, the address also has to be all lowercase:

https://hiveon.net/api/v1/stats/miner/walletAddress123/ETH/billing-acc for estimated earnings

https://hiveon.net/api/v1/stats/miner/walletAddress123/ETH for hashrate stats

https://hiveon.net/api/v1/stats/shares?minerAddress=walletAddress123&coin=ETH&window=10m&limit=144&offset=0&worker= for data of the share graph

https://hiveon.net/api/v1/stats/hashrates?minerAddress=walletAddress123&coin=ETH&window=10m&limit=144&offset=0&worker= for data of the hashrate graph
