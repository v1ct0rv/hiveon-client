# Running into docker

## Start container

`docker-compose up -d`

## Set up InfluxDB through the influx CLI

``` bash
export DOCKER_INFLUXDB_INIT_USERNAME=victorv
export DOCKER_INFLUXDB_INIT_PASSWORD=3tYHB#SV7aX@7KB
export DOCKER_INFLUXDB_INIT_ORG=vvs
export DOCKER_INFLUXDB_INIT_BUCKET=hiveon
influx setup --username $DOCKER_INFLUXDB_INIT_USERNAME --password $DOCKER_INFLUXDB_INIT_PASSWORD --org $DOCKER_INFLUXDB_INIT_ORG --bucket $DOCKER_INFLUXDB_INIT_BUCKET --retention 0 --force
```

## To backup

``` bash
export INFLUX_HOST=https://us-east-1-1.aws.cloud2.influxdata.com
export INFLUX_TOKEN="Kd5oaZajTfhdMq9MtIzICzJec-CIH2nH6G1U26-5HIXeTRr9_RFvzSXgBumPTmmly6Smc_EDfKxmfoPbg1uXlA=="
export INFLUX_ORG="velasquez.victor@gmail.com"

influx backup backup/ -t $INFLUX_TOKEN
influx bucket list
```
