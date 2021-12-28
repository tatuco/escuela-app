"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = require("aws-sdk");
// export AWS_ACCESS_KEY_ID=XXXXX
// export AWS_ACCESS_ACCESS_KEY=XXXX
// export AWS_S3_BUCKET=XXXXXXXX
// heroku config:add AWS_ACCESS_KEY_ID=XXXXX
// heroku config:add AWS_ACCESS_ACCESS_KEY=XXXX
// heroku config:add AWS_S3_BUCKET=XXXXXXXX
class S3Service {
    constructor() {
        console.log({ accessKeyId: process.env.AWS_ACCESS_KEY_ID, secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY });
        this.s3 = new aws_sdk_1.S3({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        });
    }
    upload(file, file_path) {
        // Setting up S3 upload parameters
        const params = {
            ACL: "public-read",
            Bucket: process.env.AWS_S3_BUCKET,
            Key: file_path,
            Body: file,
            ContentType: "image/png"
        };
        return new Promise((resolve, reject) => {
            this.s3.upload(params, function (err, data) {
                if (err) {
                    return reject(err);
                }
                return resolve(data);
            });
        });
    }
    ;
}
exports.S3Service = S3Service;
//# sourceMappingURL=S3Service.js.map