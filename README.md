[![Codeship Status for Altoros/swarm-markets-smart-contracts](https://app.codeship.com/projects/b7f76525-0e01-478a-8678-1347a2910490/status?branch=main)](https://app.codeship.com/projects/423696)

---

# Swarm Markets Smart Contracts

## Documentation

![](docs/uml/swarm-markets.png?raw=true)

- [Smart contracts API documentation](SUMMARY.md)

## Deploy process

In order to make the deploy process smoother, whenever deploying a set of smart contracts, we'll have to provide:

### to the backend team
- [ ] Address of the PermissionManagerProxy: 
- [ ] Address of the deployer: 
- [ ] potentially, the privatekey of the deployer address, (but that should be sent directly to them)

### to the subgraph team
- [ ] BFactory address
- [ ] the block at which the current ecosystem was deployed, in practice it's the deploy block from any of the contracts deployed in `scripts/deploy.ts`
- [ ] XTokenWrapper address
- [ ] BPoolProxy address

### Also, you should commit
- [ ] `.openzeppelin/<network>.json` (where implementation and proxy addresses for upgradeable contracts are found)
- [ ] `deployments/<network>.json` (where protocol contract addresses are saved)
- [ ] `deployments/<network>-testnet-data.json` (where tokens, xtokens and pool addresses are saved)

and make a PR on the repo with these changes

## Addresses

### Mainnet

#### to the backend team
- [ ] Address of the PermissionManagerProxy: `0xE214d97ba7fF83144699737f73D271C006013d91`
- [ ] Address of the deployer: `0xbeAeE712741c7f99B64B798Ca127FE776d491FB4`
- [ ] potentially, the privatekey of the deployer address, (but that should be sent directly to them)

#### to the subgraph team
- [ ] BFactory address: `0x9186503AF1D7D3317b4C2c44A815BE984838C296`
- [ ] the block at which the current ecosystem was deployed: 12434307
- [ ] XTokenWrapper address: `0x2b9dc65253c035Eb21778cB3898eab5A0AdA0cCe`
- [ ] BPoolProxy address: `0x5321647F3c3769bc7bb9e10aB10d7F5C2E402c56`

- **.openzeppelin**: see [the relevant file](./.openzeppelin/mainnet.json)
- **protocol contracts**: see [the relevant file](./deployments/mainnet.json)
- **tokens, pools and wrapped contracts**: see [the relevant file](./deployments/mainnet-testnet-data.json)

### Kovan

#### to the backend team
- [ ] Address of the PermissionManagerProxy: `0x78Ca5137cF9F92dAA667E7858242a050798f7639`
- [ ] Address of the deployer: `0xa16A6DcE3718846d6A02c8E8135b9aaE178eD17b`
- [ ] potentially, the privatekey of the deployer address, (but that should be sent directly to them)

#### to the subgraph team
- [ ] BFactory address: `0xb87F39A3277017a2Db70CF523Ca411A28b8f57d4`
- [ ] the block at which the current ecosystem was deployed: 23965680
- [ ] XTokenWrapper address: `0x0C378f7C0982c3A0B0875b858D2008F438325C8d`
- [ ] BPoolProxy address: `0x91095B93bd75538258C41a374FBBb1b4136546C1`

- **.openzeppelin**: see [the relevant file](./.openzeppelin/kovan.json)
- **protocol contracts**: see [the relevant file](./deployments/kovan.json)
- **tokens, pools and wrapped contracts**: see [the relevant file](./deployments/kovan-testnet-data.json)

### Rinkeby

#### to the backend team
- [ ] Address of the PermissionManagerProxy: `0x1717BD94b0498048cdB7E3a9Cc535Eb9e63e574d`
- [ ] Address of the deployer: `0x4736725fdd5f58c4aca74426042442e71cb97ef1`
- [ ] potentially, the privatekey of the deployer address, (but that should be sent directly to them)

#### to the subgraph team
- [ ] BFactory address: `0xc7D87c0B11288de9fD627e9383f63C953e2FdD72`
- [ ] the block at which the current ecosystem was deployed: 8659064
- [ ] XTokenWrapper address: `0xa3F80483e696b0dec27796e0EF31d9Bf26FB6253`
- [ ] BPoolProxy address: `0x0c659296E34497486DD1B747B84295Df66296083`

- **.openzeppelin**: see [the relevant file](./.openzeppelin/rinkeby.json)
- **protocol contracts**: see [the relevant file](./deployments/rinkeby.json)
- **tokens, pools and wrapped contracts**: see [the relevant file](./deployments/rinkeby-testnet-data.json)

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

### Verify contract on Etherscan
```bash
$ yarn verify:network
```

Supported networks: `rinkeby`, `kovan`
