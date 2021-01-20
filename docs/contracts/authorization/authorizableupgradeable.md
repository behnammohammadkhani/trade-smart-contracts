# `AuthorizableUpgradeable`

Contract module which provides an authorization mechanism.

This module is used through inheritance. It will make available the modifier

`onlyAuthorized`, which can be applied to your functions to restrict their use.

## Modifiers:

- `onlyAuthorized()`

### Modifier `onlyAuthorized()`

Throws if called by any account which is not authorized to execute the transaction.
