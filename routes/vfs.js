/*
This is an example file provider proxy for AEP VFS
*/
const router = require('express').Router();
const jsonfile = require('jsonfile');

// ROUTES

// Route = /api/vfs/files
router.get('/files', (req, res) => {
  const { rootDirectoryPath, startRow, endRow } = req.query;
  const groupKeys = req.query.groupKeys && Array.isArray(req.query.groupKeys) ? req.query.groupKeys : [];

  let file = rootDirectoryPath.split('/').join('_').slice(1);
  file += groupKeys.length > 0  ? `_${groupKeys.join('_')}` : '';
  file += `_${startRow}_${endRow}`;

  jsonfile.readFile(file, (err, obj) => {
    if (err) {
      res.status(500).send('Something broke!');
    }

    res.json({ obj });
  });
});

module.exports = router;
