# atipicial-uri

## Overview

AEP-9 is the standard for a URI schema for ATC. This package provides the ability to parse the string into a consumable intent object.

While the standard is written for Atipicial2 and there has not been any upgrades, the  version provides a more relaxed version with some additional support for general use cases.

For , the format is amended from AEP-9:

```
atipicial:[?<usecase>-]<targetIdentifier>[?<key>=<value>]
```

where `usecase` is an optional prefix that denotes the intent of the uri.

The following scenarios are supported:

#### AEP-17 token request

Token transfer will be the default intent if the prefix is missing.

```
atipicial:[?pay-]<toAddress>?asset=<contractHash>&amount=<amount>
```

where:
|parameter    |value                             |
|-------------|----------------------------------|
|toAddress    | The receiving address of the transfer.|
|contractHash | `atipicial` , `gas` or a contract hash.|
|amount       | integer amount of the asset to transfer. (Optional)|

For example,

to request 1 GAS for `NNWAo5vdVJz1oyCuNiaTBA3amBHnWCF4Yk` :

```
atipicial:NNWAo5vdVJz1oyCuNiaTBA3amBHnWCF4Yk?asset=gas&amount=100000000
```

#### Atipicial vote request

```
atipicial:vote-<candidatePublicKey>
```

where:
|parameter             |value                                                |
|----------------------|-----------------------------------------------------|
|candidatePublicKey    | The encoded public key of the candidate to vote for.|

For example,

to request votes for `02028a99826edc0c97d18e22b6932373d908d323aa7f92656a77ec26e8861699ef` :

```
atipicial:vote-02028a99826edc0c97d18e22b6932373d908d323aa7f92656a77ec26e8861699ef
```

## Installation

```sh
npm i @atipicial/atipicial-uri @atipicial/atipicial-core
```

```js
const uri = require("@atipicial/atipicial-uri");
```

## API

`parse` takes in a complete ATC uri string and returns an intent object:

```js
const intent = parse(
    "atipicial:NNWAo5vdVJz1oyCuNiaTBA3amBHnWCF4Yk?asset=gas&amount=100000000"
);
```

The intent will look like:

```js
{
    intent: "pay",
    description: "Transfer 100000000 GAS to NNWAo5vdVJz1oyCuNiaTBA3amBHnWCF4Yk",
    contractCall: {
        scriptHash: "d2a4cff31913016155e38e474a2c06d08be276cf",
        operation: "transfer",
        args: [{
                type: "Hash160",
                value: "" // Left empty for user to fill.
            },
            {
                type: "Hash160",
                value: "NNWAo5vdVJz1oyCuNiaTBA3amBHnWCF4Yk"
            },
            {
                type: "Integer",
                value: "100000000"
            },
        ]
    }
}
```

* Assets `atipicial` and `gas` are automatically transformed into their respective scripthashes.
* Runtime validation such as address and contract verifications are not performed during parsing.

`createPayUri` and `createVoteUri` are simple methods to help quickly create compliant uris:

```js
const atipicialUri = require("@atipicial/atipicial-uri");

//atipicial:vote-02028a99826edc0c97d18e22b6932373d908d323aa7f92656a77ec26e8861699ef
const voteUri = atipicialUri.createVoteUri("02028a99826edc0c97d18e22b6932373d908d323aa7f92656a77ec26e8861699ef")

//atipicial:NNWAo5vdVJz1oyCuNiaTBA3amBHnWCF4Yk?asset=gas&amount=100000000
const payUri = atipicialUri.createPayUri("NNWAo5vdVJz1oyCuNiaTBA3amBHnWCF4Yk", "gas", 100000000)
```
