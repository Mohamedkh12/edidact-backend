"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const r_les_guard_1 = require("./roles/guards/r\u00F4les.guard");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalGuards(new r_les_guard_1.RolesGuard(new core_1.Reflector(), new r_les_guard_1.AccessContorlService()));
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map