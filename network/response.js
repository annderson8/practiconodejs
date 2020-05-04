exports.success = (req, res, messsage, status) => {
    let statusCode = status || 200;
    let statusMessage = messsage || '';
    res.status(statusCode).send({
        error: false,
        status: status,
        body: messsage
    });
}


exports.error = (req, res, messsage, status) => {
    let statusCode = status || 500;
    let statusMessage = messsage || 'Internal sever error';

    res.status(statusCode).send({
        error: true,
        status: status,
        body: messsage
    })
}