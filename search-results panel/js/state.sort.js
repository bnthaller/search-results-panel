(function () {
  'use strict';
  var parseDate = window.EDMS_DATE.parseDate;
  var relevanceScore = window.EDMS_SCORE.relevanceScore;

  function sortItems(arr, sortMode, searchTerm) {
    var copy = arr.slice(0);
    var useRelevance = sortMode === 'relevance' && searchTerm && searchTerm.trim().length > 0;

    if (useRelevance) {
      copy.sort(function (a, b) {
        var sb = relevanceScore(b, searchTerm);
        var sa = relevanceScore(a, searchTerm);
        if (sb !== sa) return sb - sa;
        var mb = parseDate(b.modified) - parseDate(a.modified);
        if (mb !== 0) return mb;
        return a.title.localeCompare(b.title);
      });
      return copy;
    }

    switch (sortMode) {
      case 'modified_asc':
        copy.sort(function (a, b) { return parseDate(a.modified) - parseDate(b.modified); }); break;
      case 'title_asc':
        copy.sort(function (a, b) { return a.title.localeCompare(b.title); }); break;
      case 'title_desc':
        copy.sort(function (a, b) { return b.title.localeCompare(a.title); }); break;
      case 'modified_desc':
      default:
        copy.sort(function (a, b) { return parseDate(b.modified) - parseDate(a.modified); }); break;
    }
    return copy;
  }

  window.EDMS_SORT = { sortItems: sortItems };
})();
