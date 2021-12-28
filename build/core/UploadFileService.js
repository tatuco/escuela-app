"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const crypto = require('crypto');
const fs = require("fs");
class UploadFileService {
}
exports.UploadFileService = UploadFileService;
UploadFileService.decodeBase64Image = (file) => {
    let matches = file.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    let response = {};
    if (!matches || matches.length !== 3) {
        return new Error('Invalid input string');
    }
    response.type = matches[1];
    response.data = Buffer.from(matches[2], 'base64');
    return response;
};
UploadFileService.uploadFile = (file, folder = '') => __awaiter(void 0, void 0, void 0, function* () {
    let subDir = `storage/${folder !== '' ? folder + '/' : folder}`;
    const userUploadedFeedMessagesLocation = require("path").join(__dirname, `${process.env.DIR_STORAGE}${subDir}`);
    try {
        if (!fs.existsSync(userUploadedFeedMessagesLocation)) {
            fs.mkdirSync(userUploadedFeedMessagesLocation);
        }
    }
    catch (e) {
        console.log(e);
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
        };
    }
    catch (err) {
        console.log(err);
        return {
            status: false,
            file: null,
            error: err,
            dir: userUploadedFeedMessagesLocation,
            subDir
        };
    }
});
//# sourceMappingURL=UploadFileService.js.map