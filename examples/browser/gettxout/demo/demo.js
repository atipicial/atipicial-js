// Transaction id to get
const hash = "f4250dab094c38d8265acc15c366dc508d2e14bf5699e12d9df26577ed74d657";

// Index of the unspent transaction output to get for the given tx
const index = 0;

// Get an instance of Atipicialscan so we can find a working node
const provider = new Atipicial.api.atipicialscan.instance("TestNet");

// Ensure atipicial-js only talks to RPC endpoint (Atipicial node) using HTTPS
Atipicial.settings.httpsOnly = true;

function InvokeOperation()
{
  clearHtml();

  // Get an RPC Endpoint (Atipicial Node)
  provider.getRPCEndpoint().then(nodeUrl => {
    const client = Atipicial.default.create.rpcClient(nodeUrl);
    client.getTxOut(hash, index).then(response => {
    	outputHtml('Result: ' + response);
    });
  });
}

// Utility function to iterate over objects and display them to an output div
function iterate(obj, stack) {
  for (var property in obj) {
    if (obj.hasOwnProperty(property)) {
      if (typeof obj[property] == "object") {
        iterate(obj[property], stack + '.' + property);
      } else {
        console.log(property + "  " + obj[property]);
        outputHtml(stack + '.' + property + ': ' + obj[property]);
      }
    }
  }
}

// Utility function to print output to an HTML div tag
function outputHtml(s) {
  document.getElementById("result").innerHTML += s + "<br>";
}

function clearHtml() {
  document.getElementById("result").innerHTML = "";
}
