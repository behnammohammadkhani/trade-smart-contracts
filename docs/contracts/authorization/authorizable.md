# `Authorizable`

Contract module which provides an authorization mechanism.

This module is used through inheritance. It will make available the modifier

`onlyAuthorized`, which can be applied to your functions to restrict their use.

## Modifiers:

- `onlyAuthorized()`

## Functions:

- `_setAuthorization(address authorization_) (internal)`

## Events:

- `AuthorizationSetted(address newAuthorization)`

### Modifier `onlyAuthorized()`

Throws if called by any account which is not authorized to execute the transaction.

### Function `_setAuthorization(address authorization_) internal`

Sets authorization.

### Event `AuthorizationSetted(address newAuthorization)`

Emitted when `authorization` address is setted.
