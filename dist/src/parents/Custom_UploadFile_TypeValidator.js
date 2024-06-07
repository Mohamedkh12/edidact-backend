"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomUploadFileTypeValidator = void 0;
const common_1 = require("@nestjs/common");
const fileType = require("file-type-mime");
class CustomUploadFileTypeValidator extends common_1.FileValidator {
    constructor(validationOptions) {
        super(validationOptions);
        this.validationOptions = validationOptions;
        this._allowedMimeTypes = this.validationOptions.fileType;
    }
    isValid(file) {
        const response = fileType.parse(file.buffer);
        return this._allowedMimeTypes.includes(response.mime);
    }
    buildErrorMessage() {
        return `Upload not allowed. Upload only files of type: ${this._allowedMimeTypes.join(', ')}`;
    }
}
exports.CustomUploadFileTypeValidator = CustomUploadFileTypeValidator;
//# sourceMappingURL=Custom_UploadFile_TypeValidator.js.map