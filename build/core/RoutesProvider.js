"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const requireDirectory = require('require-directory');
const Utils_1 = require("./Utils");
/**
 * Formats every controller inside the directory 'controllers' into an object.
 * folder:
 *  - app
 *    - auth.controller
 *
 *  output:
 *  {
 *    App: {
 *      AuthController: (file exports)
 *    }
 *  }
 */
exports.controllers = requireDirectory(module, './', {
    rename: Utils_1.namespace
});
/**
 * Transform slash notation to the controller's method, appending/prepending any middleware required
 *
 * @export
 * @param {any} ctrllr
 * @returns
 */
function default_1(ctrllr) {
    const [controllerName, methodName] = ctrllr.split('@');
    const controller = Utils_1.slashNotation(controllerName, exports.controllers);
    const method = controller[methodName];
    const { middleware: ctrlrmiddleware = [] } = controller;
    const { middleware = [], posmiddleware = [] } = method;
    return [...ctrlrmiddleware, ...middleware, method, ...posmiddleware];
}
exports.default = default_1;
//# sourceMappingURL=RoutesProvider.js.map