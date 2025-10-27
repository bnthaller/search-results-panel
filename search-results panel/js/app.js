(function () {
  'use strict';

  var items = window.EDMS_DATA.items;

  var resultsBody    = null;
  var resultsCountEl = null;
  var resultsLiveEl  = null;
  var sortSelect     = null;
  var searchInput    = null;

  function renderResults() {
    if (!resultsBody) return;
    resultsBody.innerHTML = '';

    // Pre-filter for metadata value population
    var pre = window.EDMS_FILTERS.preFilter(items);
    window.EDMS_METADATA.populateValues(pre, true);

    // Apply metadata value filter (if any)
    var filtered = window.EDMS_METADATA.applyValueFilter(pre);

    var term = (searchInput && searchInput.value.trim().toLowerCase()) || '';
    var sortMode = (sortSelect && sortSelect.value) || 'modified_desc';
    filtered = window.EDMS_SORT.sortItems(filtered, sortMode, term);

    // Render
    for (var i=0;i<filtered.length;i++) {
      resultsBody.appendChild(window.EDMS_ROWS.createResultRow(filtered[i]));
    }

    // Counters / ARIA live
    var totalY = items.length;
    var countX = filtered.length;
    if (resultsCountEl) resultsCountEl.textContent = 'Showing ' + countX + ' of ' + totalY + ' results';
    if (resultsLiveEl)  resultsLiveEl.textContent  = 'Updated results. Showing ' + countX + ' of ' + totalY + '.';
  }

  function wireChangeHandlers() {
    var ids = ['filterExtType','filterExtSpecific','filterDateColumn','filterStart','filterEnd','filterMetaValue','filesOnly'];
    ids.forEach(function(id){
      var el = document.getElementById(id);
      if (el) el.addEventListener('change', renderResults);
    });
    if (sortSelect) sortSelect.addEventListener('change', renderResults);

    var filterMetaField = document.getElementById('filterMetaField');
    if (filterMetaField) {
      filterMetaField.addEventListener('change', function(){
        var pre = window.EDMS_FILTERS.preFilter(items);
        window.EDMS_METADATA.populateValues(pre, false);
        renderResults();
      });
    }
  }

  function init() {
    resultsBody    = document.getElementById('resultsBody');
    resultsCountEl = document.getElementById('resultsCount');
    resultsLiveEl  = document.getElementById('resultsLive');
    sortSelect     = document.getElementById('sortSelect');
    searchInput    = document.getElementById('searchInput');

    window.EDMS_FILTERS.init();
    window.EDMS_METADATA.init();
    window.EDMS_UI_SEARCH.init(renderResults);
    window.EDMS_UI_ADV.init(renderResults);
    window.EDMS_UI_FILTERS.init(renderResults);

    wireChangeHandlers();
    renderResults();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
