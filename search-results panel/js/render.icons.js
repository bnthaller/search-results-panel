(function () {
  'use strict';
  function getIconForType(type) {
    var span = document.createElement('span');
    span.className = 'result-icon';
    var map = {
      pdf: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" fill="#E53935"/><text x="6.5" y="16" font-size="9" fill="#fff" font-family="Arial">PDF</text></svg>',
      doc: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" fill="#1E88E5"/><text x="6" y="16" font-size="9" fill="#fff" font-family="Arial">DOC</text></svg>',
      xls: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" fill="#43A047"/><text x="6" y="16" font-size="9" fill="#fff" font-family="Arial">XLS</text></svg>',
      ppt: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" fill="#E64A19"/><text x="6" y="16" font-size="9" fill="#fff" font-family="Arial">PPT</text></svg>',
      txt: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" fill="#757575"/><text x="6" y="16" font-size="9" fill="#fff" font-family="Arial">TXT</text></svg>',
      png: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" fill="#00897B"/><text x="5.2" y="16" font-size="9" fill="#fff" font-family="Arial">PNG</text></svg>',
      jpg: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" fill="#6A1B9A"/><text x="5.2" y="16" font-size="9" fill="#fff" font-family="Arial">JPG</text></svg>',
      folder: '<svg viewBox="0 0 24 24"><path d="M3 6h6l2 2h10v10a2 2 0 0 1-2 2H3z" fill="#F9A825"/></svg>',
      other: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" fill="#90A4AE"/></svg>'
    };
    span.innerHTML = map[type] || map.other;
    return span;
  }
  window.EDMS_ICONS = { getIconForType: getIconForType };
})();
