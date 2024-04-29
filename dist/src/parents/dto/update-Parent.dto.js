"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateParentDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_Parent_dto_1 = require("./create-Parent.dto");
class UpdateParentDto extends (0, mapped_types_1.PartialType)(create_Parent_dto_1.CreatePrentDto) {
}
exports.UpdateParentDto = UpdateParentDto;
//# sourceMappingURL=update-Parent.dto.js.map