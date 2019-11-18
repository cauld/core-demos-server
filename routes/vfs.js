/*
This is an example file provider proxy for AEP VFS
*/
const router = require('express').Router();
const jsonfile = require('jsonfile');
const fs = require('fs');
const path = require('path');

function groupKeysToFilePathValue(groupKeys) {
  const groupKeyParts = groupKeys && groupKeys !== '' ? groupKeys.split(',') : [''];
  let directoryToQuery;
  if (groupKeys.length === 1) {
    // Files in a single group are just the root path plus the group
    directoryToQuery = groupKeyParts[0];
  } else {
    // In nested folders, 2 levels or more deep, the last item contains
    // the full sub path to the file under its immediate parent. So ignore
    // the groups leading up to the last entry.
    directoryToQuery = (groupKeyParts[groupKeyParts.length - 1]).replace('/', '_');
  }

  return directoryToQuery;
}

// ROUTES

// Route = /api/vfs/files
router.get('/files', (req, res) => {
  const { rootDirectoryPath, startRow, endRow } = req.query;
  const groupKey = groupKeysToFilePathValue(req.query.groupKeys);

  // Use the req params to locate the correct pre-saved VFS response
  let fileName = rootDirectoryPath.split('/').join('_').slice(1);
  fileName += groupKey === '' ? '' : `_${groupKey}`;
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
