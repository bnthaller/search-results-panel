(function () {
  'use strict';

  function init(onChange) {
    var field = document.getElementById('edmsSearchField');
    var input = document.getElementById('searchInput');
    var searchBtn = document.getElementById('searchButton');
    var clearBtn = document.getElementById('clearButton');

    function syncState() {
      var hasText = input.value.trim().length > 0;
      field.classList.toggle('has-value', hasText);
      field.classList.toggle('is-typing', hasText);
    }

    if (input) {
      input.addEventListener('input', function(){ syncState(); if (onChange) onChange(); });
      input.addEventListener('blur', syncState);
      window.addEventListener('DOMContentLoaded', syncState);
    }
    if (searchBtn) {
      searchBtn.addEventListener('click', function (e) { e.preventDefault(); if (!input.value) input.focus(); });
    }
    if (clearBtn) {
      clearBtn.addEventListener('click', function (e) {
        e.preventDefault();
        input.value = '';
        syncState();
        if (onChange) onChange();
        input.focus();
      });
    }
  }

  window.EDMS_UI_SEARCH = { init: init };
})();
