[![Codeship Status for Altoros/swarm-markets-smart-contracts](https://app.codeship.com/projects/b7f76525-0e01-478a-8678-1347a2910490/status?branch=main)](https://app.codeship.com/projects/423696)

---

# Swarm Markets Smart Contracts

## Documentation

![](docs/uml/swarm-markets.png?raw=true)

- [Smart contracts API documentation](SUMMARY.md)

## Development

- Create an `.env` file in the root of this project using [.env.example](.env.example) content as example.
- Install dependencies with:
```bash
$ yarn
```

### Test
```bash
$ yarn test
```

### Update API docs and UML diagram
```bash
$ yarn docify
$ yarn doc:uml
```

### Deploy
```bash
$ yarn deploy:network
```

Supported networks: `rinkeby`, `kovan`

### Very contract on Etherscan
```bash
$ yarn verify:network
```

Supported networks: `rinkeby`, `kovan`
