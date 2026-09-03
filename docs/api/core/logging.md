---
id: logging
title: Logging
---

The logging module is exposed only as a named import :

```ts
import { logging } from "@atipicial/atipicial-js";
logging.logger.setDefaultLevel("info"); // sets logging level of atipicial-js to 'info'
const apiLogger = logging.logger.getLogger("api"); // gets the logger for the api package
apiLogger.setLevel("warn"); // sets logging level only on the logger for the api package
```

All logs are piped towards `stdout` and `stderr`. Each named package within
`atipicial-js` will have its own logger. The initial setting for all loggers is
'silent'.
