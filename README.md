[![Codeship Status for Altoros/swarm-markets-smart-contracts](https://app.codeship.com/projects/b7f76525-0e01-478a-8678-1347a2910490/status?branch=main)](https://app.codeship.com/projects/423696)

---

# Swarm Markets Smart Contracts

## Documentation

![](docs/uml/swarm-markets.png?raw=true)

- [Smart contracts API documentation](SUMMARY.md)

## Addresses

### Mainnet
- **Deployer**: `0xbeAeE712741c7f99B64B798Ca127FE776d491FB4`

- **Authorization**: `0xeFbcbD94d9C411E3f0FFa559CE627498122aCA82`
- **OperationsRegistry**: `0xd641ae2aD8a0e72AD92dDEda7CEF67eE3f2A49b9`

- **PermissionItems**: `0xB441417E6ff3ACf60B9F0216D8c3179913080dAa`
- **PermissionManager**: `0xE214d97ba7fF83144699737f73D271C006013d91`

- **XTokenWrapper**: `0x2b9dc65253c035Eb21778cB3898eab5A0AdA0cCe`
- **XTokenFactory**: `0xE1532De8fa6EAd8aF4e461a9c3C9544c938F33B5`

- **BPoolProxy**: `0x5321647F3c3769bc7bb9e10aB10d7F5C2E402c56`
- **BRegistry**: `0x8133EEB249F0636bba0B8230Ba1089a219263c04`
- **ProtocolFee**: `20000000000000000`
- **MinProtocolFee**: `20000000000000000`
- **MinProtocolFee**: `5000000000000000`
- **FeeReceiver**: `0xCf6a97d02f9Cc47C94dE5a4874C32a0182638fb4`
- **BFactrory**: `0x9186503AF1D7D3317b4C2c44A815BE984838C296`
- **BPool Implementation**: `0xF5FaDa32917350b91fbD9BbdE62e69bF483A960A`

- **xDAI**: `0x6ceb875d9E8D75e0E68040D9BB63b21DE134E843`
- **xWBTC**: `0xFc6274505D08210117C56b541794a72338eD3Fb6`
- **xWBTC/xDAI pool**: `0x8c4167154aCcD56797d122d8BCAaD3a9432ED4aF`
- **xWBTC/xDAI wrapped pool**: `0x71B3C05aFC180e528529e0c026501e606118894C`

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

### Rinkeby
- **Deployer**: `0x4736725fdd5f58c4aca74426042442e71cb97ef1`
- **ProxyAdmin for AuthorizationProxy and PermissionManagerProxy**: `idk`

- **Authorization Implementation**: `0x3Ca486C5c928AFaC7c4d707e726aa32f73E50114`
- **Authorization Proxy**: `0x3Ca486C5c928AFaC7c4d707e726aa32f73E50114`
- **EurUsdPriceFeed**: `0x78F9e60608bF48a1155b4B2A5e31F32318a1d85F`
- **EthUsdPriceFeed**: `0x8A753747A1Fa494EC906cE90E9f37563A8AF630e`
- **OperationsRegistry**: `0x2Ee4828788444cDf377CBDE27a35fD510d0A8232`

- **PermissionItems**: `0x565c1bd72b12C25632d87D2d84c31d4a5A97B7e8`
- **PermissionManager Implementation**: `0x0a171cFe2f4B210a122CF3545585d08c05f67993`
- **PermissionManager Proxy**: `0x0a171cFe2f4B210a122CF3545585d08c05f67993`

(sorry I don't know if it's a proxy or what)

- **XTokenWrapper**: `0xFd08B2b730BBb445abBc44AB02284341329A8E6D`
- **XTokenFactory**: `0x6B8F8550d638CB73BC0fcdA02EFB3d29F481FDD5`

- **BPoolProxy**: `0xD5794bBAabF256aE2905dBE507fC7CD88d012358`
- **BRegistry**: `0x6673323B884B61af6b18BD67b81330D238074e3C`
- **ProtocolFee**: `0x4736725fdd5f58c4aca74426042442e71cb97ef1`
- **BFactrory**: `0x7FDb688AA7C2CBfd86E1cBeDCF2D4c5fC5Eb254a`
- **BPool Implementation**: `0x2DcA825d3D937Dd6994B1213Ca512E66CA556dd0`



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
