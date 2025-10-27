(function () {
  'use strict';

  var filterMetaField = null;
  var filterMetaValue = null;

  var metadataExtractors = {
    'Title':             function (it) { return it.title; },
    'Document Type':     function (it) { return it.type; },
    'Document Category': function (it) { return it.folderPath || '(root)'; },
    'Size':              function (it) { return it.size; },
    'Last Modified By':  function (it) { return it.modifiedBy; }
  };

  function init() {
    filterMetaField = document.getElementById('filterMetaField');
    filterMetaValue = document.getElementById('filterMetaValue');
  }

  function populateValues(candidates, keepSelection) {
    if (!filterMetaValue) return;
    if (keepSelection === undefined) keepSelection = true;

    var previous = filterMetaValue.value;
    var field = (filterMetaField && filterMetaField.value) || 'any';
    var extractor = metadataExtractors[field];

    if (!extractor) {
      filterMetaValue.innerHTML = '<option value="any" selected>No values available</option>';
      filterMetaValue.disabled = true;
      return;
    }

    var set = {};
    candidates.forEach(function (x) {
      var v = extractor(x);
      if (v != null && String(v).trim() !== '') set[String(v)] = true;
    });
    var values = Object.keys(set).sort(function(a,b){ return String(a).localeCompare(String(b)); });

    filterMetaValue.innerHTML = '';
    var anyOpt = document.createElement('option');
    anyOpt.value = 'any'; anyOpt.textContent = 'Any';
    filterMetaValue.appendChild(anyOpt);

    values.forEach(function (v) {
      var opt = document.createElement('option');
      opt.value = String(v); opt.textContent = String(v);
      filterMetaValue.appendChild(opt);
    });
    filterMetaValue.disabled = false;

    if (keepSelection && previous && previous !== 'any' && values.indexOf(previous) >= 0) {
      filterMetaValue.value = previous;
    } else {
      filterMetaValue.value = 'any';
    }
  }

  function applyValueFilter(arr) {
    var field = (filterMetaField && filterMetaField.value) || 'any';
    var value = (filterMetaValue && filterMetaValue.value) || 'any';
    var extractor = metadataExtractors[field];
    if (field === 'any' || !extractor || value === 'any') return arr;
    return arr.filter(function (item) { return String(extractor(item)) === String(value); });
  }

  function resetMetadataFilters() {
    if (filterMetaField) filterMetaField.value = 'any';
    if (filterMetaValue) { filterMetaValue.innerHTML = '<option value="any" selected>Any</option>'; filterMetaValue.disabled = false; }
  }

  window.EDMS_METADATA = {
    init: init,
    populateValues: populateValues,
    applyValueFilter: applyValueFilter,
    resetMetadata: resetMetadataFilters
  };
})();
