"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateChild = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_child_1 = require("./create-child");
class UpdateChild extends (0, mapped_types_1.PartialType)(create_child_1.CreateChildDto) {
}
exports.UpdateChild = UpdateChild;
//# sourceMappingURL=update-child.js.map