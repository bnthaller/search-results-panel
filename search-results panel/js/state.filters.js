(function () {
  'use strict';

  var parseDate = window.EDMS_DATE.parseDate;
  var endOfDay  = window.EDMS_DATE.endOfDay;

  var filterExtType     = null;
  var filterExtSpecific = null;
  var filterDateColumn  = null;
  var filterStart       = null;
  var filterEnd         = null;

  var filesOnlyCheckbox = null;
  var searchInput       = null;

  var typeGroups = {
    office: new Set(['doc','xls','ppt']),
    pdf:    new Set(['pdf']),
    images: new Set(['png','jpg']),
    text:   new Set(['txt']),
    other:  new Set(['folder','other'])
  };

  function init() {
    filterExtType     = document.getElementById('filterExtType');
    filterExtSpecific = document.getElementById('filterExtSpecific');
    filterDateColumn  = document.getElementById('filterDateColumn');
    filterStart       = document.getElementById('filterStart');
    filterEnd         = document.getElementById('filterEnd');
    filesOnlyCheckbox = document.getElementById('filesOnly');
    searchInput       = document.getElementById('searchInput');

    if (filterStart && !filterStart.value) filterStart.valueAsDate = new Date('2018-07-16');
    if (filterEnd && !filterEnd.value)     filterEnd.valueAsDate   = new Date();
  }

  function matchExtensionFilters(item) {
    if (!filterExtType || !filterExtSpecific) return true;
    var specific = (filterExtSpecific.value || 'all');
    if (specific !== 'all') { return item.type === specific; }
    var grp = (filterExtType.value || 'all');
    if (grp === 'all') return true;
    var set = typeGroups[grp];
    if (!set) return true;
    return set.has(item.type);
  }

  function inDateRange(item) {
    if (!filterDateColumn || !filterStart || !filterEnd) return true;
    var col = (filterDateColumn.value || 'modified').toLowerCase();
    var start = filterStart.valueAsDate;
    var end   = filterEnd.valueAsDate;

    var d = null;
    if (col === 'modified') d = parseDate(item.modified);
    else if (col === 'created') d = parseDate(item.created);
    else if (col === 'expiration') d = (item.expiration instanceof Date) ? item.expiration : null;

    if (!(d instanceof Date) || isNaN(d)) return false;
    var eod = endOfDay(end);
    return (!start || d >= start) && (!end || d <= eod);
  }

  function preFilter(items) {
    var filesOnly = !!(filesOnlyCheckbox && filesOnlyCheckbox.checked);
    var term = (searchInput && searchInput.value.trim().toLowerCase()) || '';

    return items.filter(function (item) {
      if (filesOnly && item.type === 'folder') return false;
      if (term) {
        var hay = (item.title + ' ' + item.folderPath + ' ' + item.type).toLowerCase();
        if (hay.indexOf(term) === -1) return false;
      }
      if (!matchExtensionFilters(item)) return false;
      if (!inDateRange(item)) return false;
      return true;
    });
  }

  function resetFilters() {
    if (filterExtType)     filterExtType.value = 'all';
    if (filterExtSpecific) filterExtSpecific.value = 'all';
    if (filterDateColumn)  filterDateColumn.value = 'modified';
    if (filterStart)       filterStart.valueAsDate = new Date('2018-07-16');
    if (filterEnd)         filterEnd.valueAsDate   = new Date();
  }

  window.EDMS_FILTERS = {
    init: init,
    preFilter: preFilter,
    resetFilters: resetFilters
  };
})();
