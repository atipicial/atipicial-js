---
id: overview
title: Overview
slug: /
---

`atipicial-js` is a Javascript library to interface with ATC blockchain, providing
quick and easy methods to send RPC calls, create transactions and simple
contract invocations.

## Features

- Built-in RPC queries
- Transaction creation, serialization and deserialization
- Wallet key manipulation
- Smart Contract script builder
- 3rd party API support

## Usage

Atipicial can be used in 2 ways:

### Semantic

The default import for Atipicial is a Javascript object where functions are arranged
in a semantic manner following the convention of Verb-Noun. If a method goes
beyond 2 levels, the rest of the name is camelCased at the noun level.

```js
import Atipicial from "@atipicial/atipicial-js";
Atipicial.create.privateKey();
Atipicial.deserialize.tx(serializedTransaction);
Atipicial.verify.message(message, signature, publicKey)
```

This style is recommended for beginners or anyone who just wishes to use Atipicial
without hassle.

### Named

Named imports are the conventional JS imports. The modules in Atipicial are:

- `api`
- `CONST`
- `rpc`
- `sc`
- `tx`
- `u`
- `wallet`

```js
import { api } from "@atipicial/atipicial-js";
```

This style offers more control and flexibility. Do refer to the source code for
each module's exports.
