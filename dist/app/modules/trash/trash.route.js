"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrashRoute = void 0;
const express_1 = require("express");
const authGuard_1 = __importDefault(require("../../middlewares/authGuard"));
const user_constant_1 = require("../user/user.constant");
const trash_controller_1 = require("./trash.controller");
const router = (0, express_1.Router)();
/**
 * @api {get} / Get All Trash Items
 * @apiName GetAllTrashItems
 * @apiGroup Trash
 *
 * @apiSuccess {Object[]} data List of trash items.
 * @apiSuccess {String} data.model The model name of the deleted item.
 * @apiSuccess {Object} data.data The original data of the deleted item.
 * @apiSuccess {Date} data.deletedAt The date when the item was deleted.
 * @apiSuccess {Date} data.expireAt The expiration date for the item.
 *
 * @apiError {Object} error Error message.
 * @apiError {String} error.message Error message description (e.g., "Unable to retrieve trash items").
 *
 * @apiExample {curl} Example usage:
 *    curl -X GET "https://api.example.com/trash" -H "Authorization: Bearer {access_token}"
 */
router.get("/", (0, authGuard_1.default)(user_constant_1.USER_ROLE_ENUM.ADMIN), trash_controller_1.TrashController.getAllTrashItems);
/**
 * @api {get} /:trashId Get Trash Item by ID
 * @apiName GetTrashItemById
 * @apiGroup Trash
 *
 * @apiParam {String} id Trash item ID.
 *
 * @apiSuccess {Object} data The deleted item data.
 * @apiSuccess {String} data.model The model name of the deleted item.
 * @apiSuccess {Object} data.data The original data of the deleted item.
 * @apiSuccess {Date} data.deletedAt The date when the item was deleted.
 * @apiSuccess {Date} data.expireAt The expiration date for the item.
 *
 * @apiError {Object} error Error message.
 * @apiError {String} error.message Error message description (e.g., "Trash item not found").
 *
 * @apiExample {curl} Example usage:
 *    curl -X GET "https://api.example.com/trash/67d470d150ee2774a5c3daf6" -H "Authorization: Bearer {access_token}"
 */
router.get("/:trashId", (0, authGuard_1.default)(user_constant_1.USER_ROLE_ENUM.ADMIN), trash_controller_1.TrashController.getTrashItemById);
/**
 * @api {delete} /:id Delete Trash Item by ID
 * @apiName DeleteTrashItem
 * @apiGroup Trash
 *
 * @apiParam {String} id Trash item ID.
 *
 * @apiSuccess {String} message Confirmation message.
 *
 * @apiError {Object} error Error message.
 * @apiError {String} error.message Error message description (e.g., "Trash item not found").
 *
 * @apiExample {curl} Example usage:
 *    curl -X DELETE "https://api.example.com/trash/67d470d150ee2774a5c3daf6" -H "Authorization: Bearer {access_token}"
 */
router.delete("/:trashId", (0, authGuard_1.default)(user_constant_1.USER_ROLE_ENUM.ADMIN), trash_controller_1.TrashController.deleteTrashItem);
/**
 * @api {delete} / Delete All Trash Items
 * @apiName DeleteAllTrashItems
 * @apiGroup Trash
 *
 * @apiSuccess {String} message Confirmation message.
 *
 * @apiError {Object} error Error message.
 * @apiError {String} error.message Error message description (e.g., "Unable to delete trash items").
 *
 * @apiExample {curl} Example usage:
 *    curl -X DELETE "https://api.example.com/trash" -H "Authorization: Bearer {access_token}"
 */
router.delete("/", (0, authGuard_1.default)(user_constant_1.USER_ROLE_ENUM.ADMIN), trash_controller_1.TrashController.deleteAllTrashItems);
/**
 * @api {post} /restore/:trashId Restore Deleted Item from Trash
 * @apiName RestoreDeletedItem
 * @apiGroup Trash
 *
 * @apiParam {String} model The model name (e.g., 'Vehicle', 'Profile', 'Report').
 *
 * @apiSuccess {Object} data The restored item details.
 *
 * @apiError {Object} error Error message.
 * @apiError {String} error.message Error message description (e.g., "Item not found in trash").
 *
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 404 Not Found
 *   {
 *     "error": {
 *       "message": "Item not found in trash",
 *       "code": "404"
 *     }
 *   }
 *
 * @apiExample {curl} Example usage:
 *    curl -X POST "https://api.example.com/trash/restore/67d470d150ee2774a5c3daf6" -H "Authorization: Bearer {access_token}"
 */
router.post("/restore/:trashId", (0, authGuard_1.default)(user_constant_1.USER_ROLE_ENUM.ADMIN), trash_controller_1.TrashController.restoreItemFromTrash);
exports.TrashRoute = router;
