/*
This is an example file provider proxy for AEP VFS
*/
const router = require('express').Router();
const { sampleVFSResponse } = require('../file-explorer/vfsDataGenerator');

// ROUTES

// Route = /api/vfs/files
router.get('/files', (req, res) => {
  res.json(sampleVFSResponse);
});

module.exports = router;
