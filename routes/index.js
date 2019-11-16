const router = require('express').Router();

// Mount our VFS test router onto the API router api/vfs/
router.use('/vfs', require('./vfs'));

// Mount other test routers as needed for other example datasources ...

module.exports = router;
