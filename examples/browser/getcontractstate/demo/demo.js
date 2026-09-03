// Hash of the contract to get
const hash = "b3a14d99a3fb6646c78bf2f4e2f25a7964d2956a"

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
    client.getContractState(hash).then(response => {
    	outputHtml('Result: ');
      iterate(response, '');
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
