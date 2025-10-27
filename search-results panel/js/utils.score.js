(function () {
  'use strict';
  function esc(s){ return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
  function countOccurrences(haystack, needle) {
    if (!needle) return 0;
    var re = new RegExp(esc(needle), 'gi');
    var m = haystack.match(re); return m ? m.length : 0;
  }
  function wordBoundaryHit(haystack, needle) {
    if (!needle) return 0;
    var re = new RegExp('\\b' + esc(needle) + '\\b', 'gi');
    return re.test(haystack) ? 1 : 0;
  }
  function relevanceScore(item, rawTerm) {
    var term = (rawTerm || '').trim().toLowerCase();
    if (!term) return 0;
    var title = (item.title || '').toLowerCase();
    var folder = (item.folderPath || '').toLowerCase();
    var type  = (item.type || '').toLowerCase();
    var score = 0;
    score += countOccurrences(title, term) * 8;
    score += countOccurrences(folder, term) * 3;
    score += countOccurrences(type, term) * 2;
    if (title.indexOf(term) === 0) score += 12;
    if (title === term) score += 20;
    if (wordBoundaryHit(title, term))  score += 6;
    if (wordBoundaryHit(folder, term)) score += 2;
    var pos = title.indexOf(term);
    if (pos >= 0) score += Math.max(8 - Math.floor(pos / 5), 0);
    return score;
  }
  window.EDMS_SCORE = { relevanceScore: relevanceScore };
})();
