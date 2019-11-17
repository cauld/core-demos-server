/*
This is an example file provider proxy for AEP VFS
*/
const router = require('express').Router();
const jsonfile = require('jsonfile');
const path = require('path');

// ROUTES

// Route = /api/vfs/files
router.get('/files', (req, res) => {
  const { rootDirectoryPath, startRow, endRow } = req.query;
  const groupKeys = req.query.groupKeys && Array.isArray(req.query.groupKeys) ? req.query.groupKeys : [];

  // Use the req params to locate the correct pre-saved VFS response
  let fileName = rootDirectoryPath.split('/').join('_').slice(1);
  fileName += groupKeys.length > 0  ? `_${groupKeys.join('_')}` : '';
  fileName += `_${startRow}_${endRow}.json`;
  const filePath = path.resolve(__dirname, '../file-explorer/data/vfs/', fileName);

  jsonfile.readFile(filePath, (err, obj) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ ...obj });
  });
});

module.exports = router;
