(function () {
  'use strict';

  var items = [
    { type: 'folder', title: 'Corporate Policies', folderPath: '', created: '09/12/2025 08:45 AM', modified: '09/30/2025 02:11 PM', size: '—' },
    { type: 'pdf', title: 'FY25 Budget Overview.pdf', folderPath: 'Corporate Policies', created: '08/01/2025 10:12 AM', modified: '09/05/2025 09:01 AM', size: '1.2 MB' },
    { type: 'doc', title: 'Approval Policy.docx', folderPath: 'Corporate Policies', created: '07/15/2025 01:34 PM', modified: '09/20/2025 04:25 PM', size: '88 KB' },
    { type: 'xls', title: 'Training Schedule.xlsx', folderPath: 'L&D', created: '06/11/2025 09:00 AM', modified: '08/02/2025 03:19 PM', size: '312 KB' },
    { type: 'ppt', title: 'Quarterly Review.pptx', folderPath: 'Executive Briefs', created: '05/28/2025 08:15 AM', modified: '06/01/2025 11:42 AM', size: '5.8 MB' },
    { type: 'txt', title: 'Readme.txt', folderPath: 'Corporate Policies', created: '04/03/2025 07:22 AM', modified: '04/03/2025 07:22 AM', size: '2 KB' },
    { type: 'png', title: 'System Diagram.png', folderPath: 'Architecture', created: '03/19/2025 03:50 PM', modified: '03/21/2025 08:10 AM', size: '640 KB' },
    { type: 'jpg', title: 'Network Topology.jpg', folderPath: 'Architecture', created: '03/18/2025 11:12 AM', modified: '03/18/2025 11:13 AM', size: '1.9 MB' },
    { type: 'pdf', title: 'Annex 3 RCCD.pdf', folderPath: 'Annex 3', created: '02/10/2025 10:00 AM', modified: '02/12/2025 09:30 AM', size: '2.4 MB' },
    { type: 'pdf', title: 'Annex 4 Change Request 521.pdf', folderPath: 'Annex 4', created: '01/21/2025 02:45 PM', modified: '01/22/2025 03:10 PM', size: '940 KB' },
    { type: 'pdf', title: 'Annex 4 Change Request 523.pdf', folderPath: 'Annex 4', created: '01/23/2025 09:05 AM', modified: '01/24/2025 01:41 PM', size: '1.1 MB' },
    { type: 'pdf', title: 'Annex 4 Change Request 525.pdf', folderPath: 'Annex 4', created: '01/24/2025 10:22 AM', modified: '01/26/2025 03:03 PM', size: '1.0 MB' },
    { type: 'pdf', title: 'Annex 4 Change Request 526.pdf', folderPath: 'Annex 4', created: '01/27/2025 08:37 AM', modified: '01/28/2025 12:14 PM', size: '1.1 MB' },
    { type: 'pdf', title: 'Annex 4 Change Request 527.pdf', folderPath: 'Annex 4', created: '01/30/2025 01:08 PM', modified: '02/02/2025 09:44 AM', size: '1.1 MB' },
    { type: 'folder', title: 'Project Alpha', folderPath: '', created: '05/05/2025 10:10 AM', modified: '10/01/2025 08:02 AM', size: '—' },
    { type: 'doc', title: 'Project Alpha — RCCD Draft.docx', folderPath: 'Project Alpha', created: '06/01/2025 09:11 AM', modified: '06/07/2025 10:32 AM', size: '156 KB' },
    { type: 'xls', title: 'CDRL Tracker.xlsx', folderPath: 'Project Alpha', created: '07/18/2025 02:14 PM', modified: '07/22/2025 04:32 PM', size: '420 KB' },
    { type: 'ppt', title: 'Stakeholder Brief.pptx', folderPath: 'Project Alpha', created: '08/08/2025 01:00 PM', modified: '08/09/2025 09:25 AM', size: '7.1 MB' },
    { type: 'txt', title: 'Notes.txt', folderPath: 'Project Alpha', created: '08/10/2025 08:01 AM', modified: '08/10/2025 08:07 AM', size: '3 KB' },
    { type: 'folder', title: 'Corporate DAL', folderPath: '', created: '04/12/2025 09:30 AM', modified: '10/04/2025 04:11 PM', size: '—' },
    { type: 'pdf', title: 'Corporate DAL — Index.pdf', folderPath: 'Corporate DAL', created: '04/12/2025 10:01 AM', modified: '09/01/2025 02:00 PM', size: '2.0 MB' },
    { type: 'png', title: 'Corporate Logo.png', folderPath: 'Branding', created: '05/03/2025 07:15 AM', modified: '05/03/2025 07:15 AM', size: '220 KB' },
    { type: 'jpg', title: 'Office Map.jpg', folderPath: 'Facilities', created: '06/20/2025 09:45 AM', modified: '06/21/2025 10:20 AM', size: '3.4 MB' },
    { type: 'doc', title: 'Approval Chain.docx', folderPath: 'Approvals', created: '07/07/2025 02:31 PM', modified: '07/09/2025 11:04 AM', size: '92 KB' },
    { type: 'xls', title: 'Version Matrix.xlsx', folderPath: 'Approvals', created: '07/10/2025 10:10 AM', modified: '07/11/2025 05:55 PM', size: '265 KB' }
  ];

  var modifiedByNames = ['Brian Grupe','Tim Laffoon','Alysa Washington','Chuck Walker','Scott Hickerson',
    'Brent Hall','Paul Martin','Jesus Hurtado','Scott Stone','Pat Duffy','Dirk Jordan','Mark Wierzbicki','Gerald Serrano'];

  items.forEach(function (it, idx) {
    var name = modifiedByNames[idx % modifiedByNames.length].split(' ');
    var first = name[0] || ''; var last = name.slice(1).join(' ');
    it.modifiedBy = (last + ', ' + first + ' [JT4 LLC]').trim();
    var c = new Date(it.created);
    var exp = new Date(c); exp.setDate(exp.getDate() + 365);
    it.expiration = exp;
  });

  window.EDMS_DATA = { items: items };
})();
