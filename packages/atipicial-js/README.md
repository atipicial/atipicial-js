# atipicial-js

Constructed package using:

- `atipicial-core`
- `atipicial-api`

In addition, this package exposes a high level semantic API binding for beginner usage. The semantic API can be found in the default export of the package.

```js
const Atipicial = require("atipicial/atipicial-js");

console.log(Atipicial); // {wallet, tx, api, aep5, etc...}

const AtipicialJs = atipicial.default;

console.log(AtipicialJs); // {create, get, sign, verify,...}
```

The semantic API follows a convention of Verb-Noun. Any extra words beyond the first 2 is collapsed into the Noun and camelcased.

```js
AtipicialJs.create.stringStream("1234");
AtipicialJs.encrypt.privateKey("key");
```