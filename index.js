const axios = require('axios')
const {InfluxDB} = require('@influxdata/influxdb-client')
const {Point} = require('@influxdata/influxdb-client')

const token = process.env.INFLUX_DB_TOKEN
const interval = process.env.INTERVAL || 60000

if (!token) {
    console.error('[error]: The "INFLUX_DB_TOKEN" environment variable is required')
    process.exit(1)
}

const org = process.env.INFLUX_DB_ORG

if (!org) {
    console.error('[error]: The "INFLUX_DB_ORG" environment variable is required')
    process.exit(1)
}

const bucket = process.env.INFLUX_DB_BUCKET || 'hiveon-earning'

const client = new InfluxDB({url:  process.env.INFLUX_DB_URL || 'https://us-east-1-1.aws.cloud2.influxdata.com', token: token})

let wallet = process.env.ETH_WALLET || '0xe21816e07106c1e9ef4860ff157a10ca35af255b'

wallet = wallet.replace('0x', '');

console.log("Startign Hiveon Client....")

setInterval(function() {
    const writeApi = client.getWriteApi(org, bucket)
    writeApi.useDefaultTags({host: 'victorv-pc'})
    axios.get(`https://hiveon.net/api/v1/stats/miner/${wallet}/ETH/billing-acc`)
    .then(res => {
        const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
        console.log('Status Code:', res.status);
        console.log('Date in Response header:', headerDate);

        const earningStats = res.data.earningStats;

        for(earningStat of earningStats) {
        console.log(`Got earningStat with timestamp: ${earningStat.timestamp}, reward: ${earningStat.reward}`);
        const point = new Point('earning')
                            .floatField('reward', earningStat.reward)
                            .floatField('meanReward', earningStat.meanReward)
                            .timestamp(new Date(earningStat.timestamp))
        writeApi.writePoint(point)
        }

        const pointExpected = new Point('expected')
                            .floatField('reward24H', res.data.expectedReward24H)
                            .floatField('rewardWeek', res.data.expectedRewardWeek)
                            .timestamp(new Date())
        writeApi.writePoint(pointExpected)

        writeApi.close()
        .then(() => {
            console.log('FINISHED')
        })
        .catch(e => {
            console.error(e)
            console.log('Finished ERROR')
        })
    })
    .catch(err => {
        console.log('Error: ', err.message);
    });
}, interval);

console.log(`The process will run each ${interval/1000} seconds.`)
