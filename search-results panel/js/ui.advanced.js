(function () {
  'use strict';

  function init(onChange) {
    var advancedCheckbox = document.getElementById('advancedSearch');
    var advancedPanel = document.getElementById('advancedPanel');

    function syncAdvancedPanel() {
      var show = !!(advancedCheckbox && advancedCheckbox.checked);
      if (advancedPanel) {
        advancedPanel.classList.toggle('show', show);
        advancedPanel.setAttribute('aria-hidden', String(!show));
      }
    }

    if (advancedCheckbox) {
      advancedCheckbox.addEventListener('change', syncAdvancedPanel);
      window.addEventListener('DOMContentLoaded', syncAdvancedPanel);
    }

    // Field behaviors
    var fieldOperand = document.getElementById('fieldOperand');
    var operandSelect = document.getElementById('operandSelect');
    var fieldMetadata = document.getElementById('fieldMetadata');
    var metadataSelect = document.getElementById('metadataSelect');
    var fieldValue = document.getElementById('fieldValue');
    var valueInput = document.getElementById('valueInput');
    var valueClearButton = document.getElementById('valueClearButton');

    function bindSelectFieldBehavior(fieldEl, selectEl) {
      if (!fieldEl || !selectEl) return;
      function update() {
        var hasValue = selectEl.value !== '';
        fieldEl.classList.toggle('has-value', hasValue);
        fieldEl.classList.toggle('is-active', hasValue);
      }
      selectEl.addEventListener('change', function(){ update(); if (onChange) onChange(); });
      selectEl.addEventListener('focus', update);
      selectEl.addEventListener('blur', update);
      update();
    }
    function bindTextFieldBehavior(fieldEl, inputEl) {
      if (!fieldEl || !inputEl) return;
      function update() {
        var hasText = inputEl.value.trim() !== '';
        fieldEl.classList.toggle('has-value', hasText);
        fieldEl.classList.toggle('is-active', hasText);
        if (fieldEl.id === 'fieldValue' && valueClearButton) {
          valueClearButton.style.display = hasText ? 'flex' : 'none';
        }
      }
      inputEl.addEventListener('input', function(){ update(); if (onChange) onChange(); });
      inputEl.addEventListener('blur', update);
      inputEl.addEventListener('focus', update);
      update();
    }

    function syncValueFieldVisibility() {
      if (!fieldValue || !metadataSelect || !valueInput) return;
      var show = metadataSelect.value !== '';
      fieldValue.style.display = show ? 'block' : 'none';
      if (!show) {
        fieldValue.classList.remove('has-value','is-active');
        if (valueClearButton) valueClearButton.style.display = 'none';
      } else {
        var hasText = valueInput.value.trim() !== '';
        if (valueClearButton) valueClearButton.style.display = hasText ? 'flex' : 'none';
      }
    }

    bindSelectFieldBehavior(fieldOperand, operandSelect);
    bindSelectFieldBehavior(fieldMetadata, metadataSelect);
    bindTextFieldBehavior(fieldValue, valueInput);

    if (metadataSelect) {
      metadataSelect.addEventListener('change', syncValueFieldVisibility);
      window.addEventListener('DOMContentLoaded', syncValueFieldVisibility);
    }
    if (valueClearButton) {
      valueClearButton.addEventListener('click', function(e){
        e.preventDefault();
        valueInput.value = '';
        fieldValue.classList.remove('has-value','is-active');
        valueClearButton.style.display = 'none';
        valueInput.focus();
        if (onChange) onChange();
      });
    }

    var resetBtn = document.getElementById('resetFieldsBtn');
    if (resetBtn) {
      resetBtn.addEventListener('click', function () {
        if (operandSelect)  operandSelect.value = '';
        if (metadataSelect) metadataSelect.value = '';
        if (valueInput)     valueInput.value = '';

        if (fieldOperand)   fieldOperand.classList.remove('has-value','is-active');
        if (fieldMetadata)  fieldMetadata.classList.remove('has-value','is-active');
        if (fieldValue)     fieldValue.classList.remove('has-value','is-active');
        if (valueClearButton) valueClearButton.style.display = 'none';

        syncValueFieldVisibility();
        if (onChange) onChange();
        if (operandSelect) operandSelect.focus();
      });
    }
  }

  window.EDMS_UI_ADV = { init: init };
})();
