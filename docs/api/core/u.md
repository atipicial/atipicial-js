---
id: u
title: Utility
---

The `u` module is exposed as:

```js
import Atipicial, { u } from "@atipicial/atipicial-js";
Atipicial.u.reverseHex(hexstring);

```

The utility module contains:

- Format manipulation methods
- Hashing methods
- Utility classes

---

## Classes

### StringStream

StringStream is a simple stream object that allows us to read a hexstring byte
by byte. It is not an actual stream but fakes the stream interface for better
manipulation. It stores the whole string and a pointer to keep track of the
current position on the string.

It is used in serializing and deserializing a transaction object. The
ScriptBuilder class for smart contracts inherits from StringStream.

```js
const ss = new Atipicial.u.StringStream("abcdefgh");
ss.read(1); // 'ab'
ss.read(2); // 'cdef'
ss.isEmpty(); // false
ss.read(1); // 'gh'
ss.isEmpty(); // true
ss.str; // 'abcdefgh'
```

## Methods

### Format

While most of the methods in Atipicial takes in strings and outputs strings, the
underlying logic requires a lot of format conversions.

```js
Atipicial.u.reverseHex(hexstring);
Atipicial.u.ab2str(arrayBuffer);

// Conversions to hex
Atipicial.u.str2hexstring("normalString"); // 6e6f726d616c537472696e67
Atipicial.u.int2hex(234); // EA
Atipicial.u.ab2hexstring(arrayBuffer);

// Conversion from hex
Atipicial.u.hexstring2str("6e6f726d616c537472696e67"); // normalString
Atipicial.u.hex2int("EA"); // 234
Atipicial.u.hexstring2ab(hexString);
```

The most common format is hex string. This is a string where every 2 characters
represents a byte in an bytearray. `atipicial-js` intentionally works with hex
strings because strings are easy to print and manipulate.

### Hashing

These methods are convenient wrappers around the CryptoJS functions. They take
in strings and return strings.

```js
import Atipicial from "@atipicial/atipicial-js";
// Performs a single SHA
Atipicial.u.sha256(item);
// Performs a SHA followed by a SHA
Atipicial.u.hash256(item);
// Performs a SHA followed by a RIPEMD160
Atipicial.u.hash160(item);
```
