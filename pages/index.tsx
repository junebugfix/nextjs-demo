import config from "../config";
const CosmosClient = require('@azure/cosmos').CosmosClient;

interface Props {
    name: string;
}
const Home = (props: Props) => <h1>Hello {props.name}! </h1>;

Home.getInitialProps = async function() {
    const {endpoint, key, database, container } = config;

    if(endpoint) {
        const client = new CosmosClient({ endpoint, key });
        console.log(`Querying container:\n${container}`)
        const querySpec = {
            query: 'SELECT VALUE r.name FROM root r WHERE r.name = "foobar"'
        }

        const { resources: results } = await client
            .database(database)
            .container(container)
            .items.query(querySpec)
            .fetchAll()
        for (var queryResult of results) {
            let resultString = JSON.stringify(queryResult)
            console.log(`\tQuery returned ${resultString}\n`);
            return {name: queryResult.name};
        }
    }
    console.log("endpoint is not configured returning Unknown");
    return { name: 'Unknown'};
}

export default Home;