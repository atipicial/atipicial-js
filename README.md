<div align="center">

# ⚡ ATIPICIAL JS

### The complete JavaScript SDK for the Atipicial Chain

**Core primitives, RPC clients, smart-contract invocation, ledger support — all in TypeScript**

</div>

<p align="center">
  <img alt="Founder" src="https://img.shields.io/badge/%F0%9F%91%91_Founder-xmoohad-ff006e?style=for-the-badge">
  <img alt="Chain" src="https://img.shields.io/badge/Chain-Atipicial_L1-9d4edd?style=for-the-badge">
  <img alt="ATC" src="https://img.shields.io/badge/%F0%9F%AA%99_ATC-Atipicial_Coin-ffd60a?style=for-the-badge">
  <img alt="ATD" src="https://img.shields.io/badge/%F0%9F%92%B5_ATD-AtipicialDollar-06d6a0?style=for-the-badge">
  <img alt="License" src="https://img.shields.io/badge/License-MIT-3a86ff?style=for-the-badge">
</p>

---

## 📦 Packages

| Package | Purpose |
|---|---|
| **`@atipicial/atipicial-core`** | Transaction serialization, accounts, keys, wallet files (AEP-6) |
| **`@atipicial/atipicial-js`** | Everything bundled — the day-one dependency |
| **`@atipicial/atipicial-api`** | High-level network API: contracts, tokens,Explorer queries |
| **@atipicial/atipicial-dapi** | The dApp API — shared types for wallet ↔ dApp messaging |
| **`@atipicial/atipicial-ledger`** | Ledger hardware-wallet signing |
| **`@atipicial/atipicial-uri`** | `atipicial:` URI scheme parsing & building |
| **`@atipicial/atipicial-test`** | Test utilities & mocks |

## ✨ What It Does

- **Build & sign transactions** with full AEP-17/11 support
- **Invoke contracts** with typed parameters
- **Manage AEP-6 wallets** — encrypt, decrypt, migrate
- **Query the chain** — balances, blocks, transactions, token holdings
- **Sign with Ledger** hardware devices

## 🚀 Getting Started

```bash
npm install @atipicial/atipicial-js

import { Atipicial } from '@atipicial/atipicial-js'

const api = new Atipicial({ rpcAddress: 'https://seed1.atipicial.com:10332' })
const balance = await api.getBalance('AaZz…YourAtipicialAddress')
```
## ⛓️ Built for the Atipicial Chain

| | |
|---|---|
| **ATC** | Atipicial Coin — governance & staking · 1,000,000,000 total |
| **ATD** | AtipicialDollar — settlement & fees · 500,000,000 genesis |
| **Addresses** | Begin with capital **`A`** (version byte `0x09`) |
| **Standards** | AEP-17 (fungible) · AEP-11 (NFT) · AEP-6 (wallets) · AEP-2 (keys) |
| **Genesis** | 2026-07-20 00:00:00 UTC |
| **Mainnet RPC** | `https://seed1.atipicial.com:10332` |
| **Consensus** | dBFT 2.0 — single-block finality |

Legacy network packages (Neo Legacy, Neo X, Ethereum, Solana, Stellar, Bitcoin)
have been **removed** — this toolkit is pure Atipicial.

---

<div align="center">

## 👑 FOUNDER

### **xmoohad**

**Founder · Architect · Blockchain Scientist · Computer Programmer**

*Atipicial Chain is a sovereign Layer-1 blockchain for smart contracts,
digital assets, and decentralized applications.*

</div>

---

*© Atipicial Chain · Founded by xmoohad · MIT License*
