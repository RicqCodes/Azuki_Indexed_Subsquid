# AZUKI Event Logs and Transaction Indexing with Subsquid

This is a squid project that shows and interpretes the power of subsquid. It indexes EVM logs and transactions, with pagination and filtering the Azuki's ERC721 contract address.

## Usage

0. Install the [Squid CLI](https://docs.subsquid.io/squid-cli/):

```sh
npm i -g @subsquid/cli
```

1. Install the dependencies

```bash
npm i
```

2. Build and run the squid, make sure to have docker running.

```bash
sqd build
sqd up
sqd migration:generate
sqd process
```

The indexing will start. you could explore queries using `localhost:4350/graphql` or Postman, but you have to start the server in a separate window

```bash
#start server

sqd serve
```

## Example

### Explore

```gql
query Azuiki {
  azukiEventApprovals(where: { blockNumber_gt: 13992222 }) {
    blockNumber
    eventName
    id
    owner
  }
}
```

```gql
query Azuki {
  azukiEventTransfers(limit: 30, offset: 10) {
    id
    to
    from
    eventName
    blockTimestamp
  }
}
```
