/*
This is an example file provider proxy for AEP VFS
*/
const router = require('express').Router();
const jsonfile = require('jsonfile');
const fs = require('fs');
const path = require('path');

// ROUTES

// Route = /api/vfs/files
router.get('/files', (req, res) => {
  const { rootDirectoryPath, startRow, endRow } = req.query;
  const groupKeys = req.query.groupKeys ? req.query.groupKeys.split(',') : [];

  // Use the req params to locate the correct pre-saved VFS response
  let fileName = rootDirectoryPath.split('/').join('_').slice(1);
  fileName += groupKeys.length > 0  ? `_${groupKeys.join('_')}` : '';
  fileName += `_${startRow}_${endRow}.json`;
  const filePath = path.resolve(__dirname, '../file-explorer/data/vfs/', fileName);

  if (fs.existsSync(filePath)) {
    jsonfile.readFile(filePath, (err, obj) => {
      if (err) {
        res.status(500).send('Cannot locate data!');
      }
      res.json({ ...obj });
    });
  } else {
    res.status(500).send('Cannot locate data!');
  }
});

module.exports = router;
