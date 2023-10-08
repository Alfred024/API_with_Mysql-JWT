exports.succes = function (req, res, message, status) {
    let statusCode = status || 200;
    let statusMessage = status || '';

    res.status(status).send({
        error: false,
        status: statusCode,
        body: message,
    });
}

exports.error = function (req, res, message, status) {
    let statusCode = status || 500;
    let statusMessage = status || 'Internal server error';

    res.status(statusCode).send({
        error: false,
        status: statusCode,
        statusMessage: statusMessage,
        body: message,
    });
}