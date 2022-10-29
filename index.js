const busboy = require('busboy');
module.exports = {
    parsFormData: (req, res, next) => {
        if (req.method !== 'POST' || req.headers['content-type'].indexOf('multipart/form-data') !== 0) return next();
        const bb = busboy({ headers: req.headers });
        const files = [];
        bb.on('file', (name, file, info) => {
            const { filename: fileName, encoding, mimeType } = info;
            let buf = ''
            file.setEncoding('base64');
            file.on('data', (data) => {
                buf += data;
            }).on('close', () => {
                const buffer = Buffer.from(buf, 'base64');
                const fileObj = {
                    fieldName: name,
                    fileName,
                    encoding,
                    mimeType,
                    buffer
                }
                files.push(fileObj)
            });
        });
        bb.on('field', (name, val, info) => {
            if (!req.body) req.body = {};
            req.body[name] = val
        });
        bb.on('close', () => {
            req.files = files;
            next();
        });
        req.pipe(bb);
    },
}