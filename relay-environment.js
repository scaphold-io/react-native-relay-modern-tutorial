const {
  Environment,
  Network,
  RecordSource,
  Store,
} = require('relay-runtime');

const source = new RecordSource();
const store = new Store(source);

// Define a function that fetches the results of an operation (query/mutation/etc)
// and returns its results as a Promise:
function fetchQuery(
  operation,
  variables,
  cacheConfig,
  uploadables,
) {
  return fetch('https://us-west-2.api.scaphold.io/graphql/narrow-pigs', {
    method: 'POST',
    headers: {}, // Add authentication and other headers here
    body: JSON.stringify({
      query: operation.text, // GraphQL text from input
      variables,
    }),
  }).then(response => {
    return response.json();
  });
}

// Create a network layer from the fetch function
const network = Network.create(fetchQuery);

const environment = new Environment({
  network,
  store,
});

export default environment
