const props = {
  // Scripthash for the contract
  scriptHash: '5b7074e873973a6ed3708862f219a6fbf4d1c411',
  // name of operation to perform.
  operation: 'balanceOf',
  // any optional arguments to pass in. If null, use empty array.
  args: [Atipicial.u.reverseHex('cef0c0fdcfe7838eff6ff104f9cdec2922297537')]
}

const script = Atipicial.sc.createScript(props);

// Get an instance of Atipicialscan so we can find a working node
const provider = new Atipicial.api.atipicialscan.instance("TestNet");

// Ensure atipicial-js only talks to RPC endpoint (Atipicial node) using HTTPS
Atipicial.settings.httpsOnly = true;

function InvokeOperation()
{
  clearHtml();

  // Get an RPC Endpoint (Atipicial Node)
  provider.getRPCEndpoint().then(nodeUrl => {
		invokeScipt(response => {
			outputHtml('Results: ');
			iterate(response, '');
		}, nodeUrl);
  });
}

// We're wrapping the atipicial-js call to make our code a little clearer.
function invokeScipt(callback, url) {
  Atipicial.rpc.Query.invokeScript(script)
    .execute(url)
    .then(res => {
      callback(res); // You should get a result with state: "HALT, BREAK"
    })
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
