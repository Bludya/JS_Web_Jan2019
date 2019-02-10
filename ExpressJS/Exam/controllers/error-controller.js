const errorCodes = {
  'not-found': '404',
  'server-error': '500',
  'uanthorized': '401',
}


module.exports = {
  error: (req, res, errorType) => {
    res.status(errorCodes[errorType]);
    res.render(`errors/${errorType}`);
  }
}
