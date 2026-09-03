---
id: structure
title: Structure
---

The package `atipicial-js` is actually composed of several packages, each offering a
different functionality.

## Core

The core package is `atipicial-core`, comprised of the following folders:

- `rpc`
- `sc`
- `tx`
- `u`
- `wallet`

These are the minimum packages deemed necessary for basic functionality for
interaction with the blockchain. The sub module `CONST` rounds off the core module with some defaults.

For users who just require the bare functionality, you may just use the core
package:

```js
import { tx, wallet } from "@atipicial/atipicial-core";
const t = new tx.Transaction();
const acct = new wallet.Account();
```

## Other packages

### api
Provides high level functionality for crafting transactions.

### ledger

Provides an easy wrapper for communicating with the ATC  app on a Ledger.

### atipicial-js

Constructed package using:

- `atipicial-core`
- `atipicial-api`

In addition, this package exposes a high level semantic API binding for beginner usage. The semantic API can be found in the default export of the package.

```js
const Atipicial = require("@atipicial/atipicial-js");

console.log(Atipicial); // {wallet, tx, api, aep5, etc...}

const AtipicialJs = Atipicial.default;

console.log(AtipicialJs); // {create, get, sign, verify,...}
```

The semantic API follows a convention of Verb-Noun. Any extra words beyond the first 2 is collapsed into the Noun and camelcased.

```js
AtipicialJs.create.stringStream("1234");
AtipicialJs.encrypt.privateKey("key");
```

### uri

Provides the ability to parse a ATC URI schema string into a consumable intent object.
