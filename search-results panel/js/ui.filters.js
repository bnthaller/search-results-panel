(function () {
  'use strict';

  var resultsGrid = null;
  var filtersToggle = null;
  var filtersPanel = null;
  var filtersSideToggle = null;
  var clearFiltersBtn = null;

  function setGridSide(side) {
    if (!resultsGrid) return;
    resultsGrid.classList.remove('side-left','side-right');
    resultsGrid.classList.add(side === 'left' ? 'side-left' : 'side-right');
    if (filtersSideToggle) {
      filtersSideToggle.setAttribute('aria-label', side === 'left' ? 'Dock panel to right' : 'Dock panel to left');
    }
  }
  function setGridWithFilters(on) {
    if (!resultsGrid || !filtersPanel) return;
    filtersPanel.setAttribute('aria-hidden', String(!on));
    resultsGrid.classList.toggle('with-filters', !!on);
  }
  function currentSide() { return resultsGrid && resultsGrid.classList.contains('side-left') ? 'left' : 'right'; }

  function setupAccordions() {
    var toggles = document.querySelectorAll('.filter-group-toggle');
    toggles.forEach(function(btn){
      var body = document.getElementById(btn.getAttribute('aria-controls'));
      btn.addEventListener('click', function(){
        var expanded = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', String(!expanded));
        if (body) body.hidden = expanded;
      });
    });
  }

  function init(onChange) {
    resultsGrid = document.getElementById('resultsGrid');
    filtersToggle = document.getElementById('filtersToggle');
    filtersPanel = document.getElementById('filtersPanel');
    filtersSideToggle = document.getElementById('filtersSideToggle');
    clearFiltersBtn = document.getElementById('clearFiltersBtn');

    setupAccordions();

    function syncVisibility() {
      var show = !!(filtersToggle && filtersToggle.checked);
      setGridWithFilters(show);
      if (onChange) onChange(); // keep filters applied when hidden
    }
    if (filtersToggle) {
      filtersToggle.addEventListener('change', syncVisibility);
      window.addEventListener('DOMContentLoaded', syncVisibility);
    }

    if (filtersSideToggle) {
      filtersSideToggle.addEventListener('click', function(){
        setGridSide(currentSide() === 'right' ? 'left' : 'right');
      });
    }
    window.addEventListener('DOMContentLoaded', function(){ setGridSide('left'); });

    if (clearFiltersBtn) {
      clearFiltersBtn.addEventListener('click', function(){
        // Reset all panel filters (types, specific, dates)…
        window.EDMS_FILTERS.resetFilters();
        // …and metadata filters too.
        window.EDMS_METADATA.resetMetadata();
        // Re-render (which repopulates metadata values from defaults)
        if (onChange) onChange();
      });
    }
  }

  window.EDMS_UI_FILTERS = { init: init, setGridSide: setGridSide };
})();
