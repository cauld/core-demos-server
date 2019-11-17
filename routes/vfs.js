/*
This is an example file provider proxy for AEP VFS
*/
const router = require('express').Router();
const jsonfile = require('jsonfile');

// ROUTES

// Route = /api/vfs/files
router.get('/files', (req, res) => {

  /*
  rootDirectoryPath=%2Fusers%2Ffry
  startRow=0
  endRow=100

  const file = '/tmp/data.json'
  jsonfile.readFile(file, function (err, obj) {
    if (err) console.error(err)
    console.dir(obj)
  })
  */

  //res.json(sampleVFSResponse);
  res.send('FOO');
});

module.exports = router;
