const NOT_FOUND = -1;

var checkWritePerms = function (req, res, next) {
  if (req.perms.indexOf('write') > NOT_FOUND) {
    next();
  } else {
    res.status(401).json({msg: 'You do not have write permissions.'});
  }
};

var checkDeletePerms = function (req, res, next) {
  if (req.perms.indexOf('delete') > NOT_FOUND) {
    next();
  } else {
    res.status(401).json({msg: 'You do not have delete permissions.'});
  }
};

module.exports = {
  checkDel: checkDeletePerms,
  checkWrite: checkWritePerms
};
