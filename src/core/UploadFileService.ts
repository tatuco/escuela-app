require('dotenv').config();
const crypto = require('crypto');
const fs = require("fs")

export class UploadFileService {

    static decodeBase64Image = (file) => {
        let matches = file.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        let response: any = {};
        if (!matches || matches.length !== 3) {
            return new Error('Invalid input string');
        }
        response.type = matches[1];
        response.data = Buffer.from(matches[2], 'base64');
        return response;
    };

    static uploadFile = async (file, folder = '') => {
        let subDir = `public/storage/${folder !== '' ? folder + '/' : folder}`
        const userUploadedFeedMessagesLocation = require("path").join(__dirname, `${process.env.DIR_STORAGE}${subDir}`);
        try {
            if (!fs.existsSync(userUploadedFeedMessagesLocation)) {
                fs.mkdirSync(userUploadedFeedMessagesLocation);
            }
        } catch (e) {
            console.log(e)
            return {
                status: false,
                file: null,
                error: e,
                dir: userUploadedFeedMessagesLocation,
                subDir
            };
        }

        const fileTypeRegularExpression = /\/(.*?)$/;
        const uniqueSHA1String = crypto.createHash('sha1')
            .update(crypto.randomBytes(20))
            .digest('hex');

        try {
            const fileBuffer = UploadFileService.decodeBase64Image(file);
            const uniqueRandomImageName = 'file-' + uniqueSHA1String;
            const fileTypeDetected = fileBuffer
                .type
                .match(fileTypeRegularExpression);
            const userUploadedImagePath = `${userUploadedFeedMessagesLocation}${uniqueRandomImageName}.${fileTypeDetected[1]}`;
            fs.writeFileSync(userUploadedImagePath, fileBuffer.data);
            return {
                status: true,
                file: `${uniqueRandomImageName}.${fileTypeDetected[1]}`,
                dir: userUploadedFeedMessagesLocation,
                subDir
            }
        } catch (err) {
            console.log(err)
            return {
                status: false,
                file: null,
                error: err,
                dir: userUploadedFeedMessagesLocation,
                subDir
            };
        }
    }
}

