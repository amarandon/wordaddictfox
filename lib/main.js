var contextMenu = require("sdk/context-menu");
var tabs = require("sdk/tabs");


var menuItem = contextMenu.Item({
  label: "Add to WordAddict",
  context: contextMenu.SelectionContext(),
  contentScript: 'self.on("click", function () {' +
    '  var text = window.getSelection().toString();' +
    '  self.postMessage(text);' +
    '});',
  onMessage: function (selectionText) {
    tabs.open({
      url: "http://wordaddict.fr/alex/new-entry",
      onReady: function(tab) {
        fillInputField(tab, selectionText);
      }
    });
  }
});

function fillInputField(tab, selectionText) {
  tab.attach({
    contentScript: "document.getElementById('id_term').value = '" + selectionText + "';"
  });
}
