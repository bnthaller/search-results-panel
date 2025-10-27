(function () {
  'use strict';
  function parseDate(s) { return s ? new Date(s) : new Date(0); }
  function endOfDay(d) { var x = new Date(d); x.setHours(23,59,59,999); return x; }
  window.EDMS_DATE = { parseDate: parseDate, endOfDay: endOfDay };
})();
