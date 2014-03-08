var contextMenu = require("sdk/context-menu");
var tabs = require("sdk/tabs");
var querystring = require("sdk/querystring");

var menuItem = contextMenu.Item({
  label: "Add to WordAddict",
  context: contextMenu.SelectionContext(),
  contentScript: 'self.on("click", function () {' +
    '  var message = {term: window.getSelection().toString(), language: document.documentElement.lang};' +
    '  self.postMessage(message);' +
    '});',
  onMessage: function (params) {
    var url = "http://wordaddict.fr/alex/new-entry?" + querystring.stringify(params);
    tabs.open({url: url});
  }
});

function fillInputField(tab, selectionText) {
  tab.attach({
    contentScript: "document.getElementById('id_term').value = '" + selectionText + "';"
  });
}
