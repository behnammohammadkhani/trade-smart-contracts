# `EnumerableSet`

/**

Library for managing

https://en.wikipedia.org/wiki/Set_(abstract_data_type)[sets] of primitive

types.

Sets have the following properties:

- Elements are added, removed, and checked for existence in constant time

(O(1)).

- Elements are enumerated in O(n). No guarantees are made on the ordering.

As of v2.5.0, only `address` sets are supported.

Include with `using EnumerableSet for EnumerableSet.AddressSet;`.

_Available since v2.5.0._

## Functions:

- `add(struct EnumerableSet.AddressSet set, address value) (internal)`

- `remove(struct EnumerableSet.AddressSet set, address value) (internal)`

- `contains(struct EnumerableSet.AddressSet set, address value) (internal)`

- `enumerate(struct EnumerableSet.AddressSet set) (internal)`

- `length(struct EnumerableSet.AddressSet set) (internal)`

- `get(struct EnumerableSet.AddressSet set, uint256 index) (internal)`

### Function `add(struct EnumerableSet.AddressSet set, address value) → bool internal`

*

Add a value to a set. O(1).

Returns false if the value was already in the set.

/

### Function `remove(struct EnumerableSet.AddressSet set, address value) → bool internal`

*

Removes a value from a set. O(1).

Returns false if the value was not present in the set.

/

### Function `contains(struct EnumerableSet.AddressSet set, address value) → bool internal`

*

Returns true if the value is in the set. O(1).

/

### Function `enumerate(struct EnumerableSet.AddressSet set) → address[] internal`

*

Returns an array with all values in the set. O(N).

Note that there are no guarantees on the ordering of values inside the

array, and it may change when more values are added or removed.

WARNING: This function may run out of gas on large sets: use {length} and

{get} instead in these cases.

/

### Function `length(struct EnumerableSet.AddressSet set) → uint256 internal`

*

Returns the number of elements on the set. O(1).

/

### Function `get(struct EnumerableSet.AddressSet set, uint256 index) → address internal`

* @dev Returns the element stored at position `index` in the set. O(1).

Note that there are no guarantees on the ordering of values inside the

array, and it may change when more values are added or removed.

Requirements:

- `index` must be strictly less than {length}.

/
