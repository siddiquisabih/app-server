
function ErrMiddleware(err, req, res, next) {
    res.send({ Error: err.message });
}

module.exports = ErrMiddleware
