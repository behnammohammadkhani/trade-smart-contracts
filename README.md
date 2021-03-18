[![Codeship Status for Altoros/swarm-markets-smart-contracts](https://app.codeship.com/projects/b7f76525-0e01-478a-8678-1347a2910490/status?branch=main)](https://app.codeship.com/projects/423696)

---

# Swarm Markets Smart Contracts

## Documentation

![](docs/uml/swarm-markets.png?raw=true)

- [Smart contracts API documentation](SUMMARY.md)

## Addresses

### Kovan
- **Deployer**: `0xa16A6DcE3718846d6A02c8E8135b9aaE178eD17b`
- **ProxyAdmin for AuthorizationProxy and PermissionManagerProxy**: `0x1aA868366D380683a42A5Bb559b6323697F25fF0`

- **Authorization Implementation**: `0xF59373b5177Bc8aA1d7e94fbe9B207438eA7F0A5`
- **Authorization Proxy**: `0xEdd8F839D06dAE222AF21b3dbD5AD5160E059284`
- **EurPriceFeed**: `0xd6f4FaE37DcD593a6E710cdDDfC6D42b9EC3F0BC`
- **OperationsRegistry**: `0xa3033B2662E1d2f6Dd51Cf63148eE11a6e6d4B6f`

- **PermissionItems**: `0x570C6E19ed7a5f6e844DB25bA91492688639515b`
- **PermissionManager Implementation**: `0x4B0A60F302F590d30fFAC5456872A8F874A82446`
- **PermissionManager Proxy**: `0x78Ca5137cF9F92dAA667E7858242a050798f7639`

- **XTokenWrapper**: `0x0C378f7C0982c3A0B0875b858D2008F438325C8d`
- **XTokenFactory**: `0xa576879c7C389E4419E99602F370578706a04C45`

- **BPoolProxy**: `0x91095B93bd75538258C41a374FBBb1b4136546C1`
- **BRegistry**: `0xd7a75312085f58DdC5023665be95c05A70a055d6`
- **ProtocolFee**: `0xB28bcA7d56D6F0913AaDf4Bee156795a4e5701c9`
- **BFactrory**: `0xb87F39A3277017a2Db70CF523Ca411A28b8f57d4`
- **BPool Implementation**: `0x34a2EA6eb6d5dABb256C34908a2c5879eE70224B`



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
