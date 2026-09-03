---
id: installation
title: Installation
---

## Install

To install

```sh
npm install @atipicial/atipicial-js
```

or

```sh
npm install @atipicial/atipicial-core
```

This will give you the release that is compatible for the atipicial mainnet and testnet.

> **Note**
> For most use-cases, we recommend `atipicial-js`.
> Do not use `atipicial-js` and `atipicial-core`  in the same project.  The classes are not cross-package compatible. See https://github.com/Atipicial/atipicial-js/issues/850.

## Node

Support policy is to support the maintenance and LTS versions of Node. At the
time of writing, this is:

- Node 20
- Node 22

## Web

Both `atipicial-core` and `atipicial-js` are packaged for the web. Use script tags:

```html
<script src="https://unpkg.com/@atipicial/atipicial-js@next"></script>
```

The library will be loaded under the variable `Atipicial`.
