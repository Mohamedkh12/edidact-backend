"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateExercisesPlayedDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_exercises_played_dto_1 = require("./create-exercises-played.dto");
class UpdateExercisesPlayedDto extends (0, mapped_types_1.PartialType)(create_exercises_played_dto_1.CreateExercisesPlayedDto) {
}
exports.UpdateExercisesPlayedDto = UpdateExercisesPlayedDto;
//# sourceMappingURL=update-exercises-played.dto.js.map