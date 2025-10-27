(function () {
  'use strict';

  function buildUrl(item) {
    var base = 'https://ewise.jt4llc.com/sites/corporate/EDMSSandbox/';
    if (item.type === 'folder') return base;
    return base + item.folderPath;
  }

  function createResultRow(item) {
    var tr = document.createElement('tr');
    var td = document.createElement('td');
    td.className = 'result-cell';

    var l1 = document.createElement('span');
    l1.className = 'result-line title';
    l1.appendChild(window.EDMS_ICONS.getIconForType(item.type));
    var titleText = document.createElement('span');
    titleText.textContent = item.title;
    l1.appendChild(titleText);

    var l2 = document.createElement('span');
    l2.className = 'result-line url';
    l2.textContent = buildUrl(item);

    var l3 = document.createElement('span');
    l3.className = 'result-line meta';
    l3.textContent = 'Created on ' + item.created;

    var l4 = document.createElement('span');
    l4.className = 'result-line meta';
    l4.textContent = 'Last Modified on ' + item.modified + ' by ' + item.modifiedBy;

    var l5 = document.createElement('span');
    l5.className = 'result-line meta';
    l5.textContent = item.size;

    td.appendChild(l1); td.appendChild(l2); td.appendChild(l3); td.appendChild(l4); td.appendChild(l5);
    tr.appendChild(td);
    return tr;
  }

  window.EDMS_ROWS = { createResultRow: createResultRow };
})();
