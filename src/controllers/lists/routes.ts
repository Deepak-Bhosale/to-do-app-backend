import { Router } from "express";
import listController from "./listController";
import listValidation from "./validation";
import validationHandler from "../../libs/validateHandler";
import authMiddleware from "../../libs/routes/authMiddleware";

const listRouter: Router = Router();

/**
 * @swagger
 * /api/lists:
 *  get:
 *    security:
 *      - APIKeyHeader: []
 *    tags:
 *      - LIST
 *    summary: Get all lists
 *    description: Fetch all lists for the current user
 *    responses:
 *      200:
 *        description: Lists fetched successfully
 */
listRouter.get("/", authMiddleware, validationHandler(listValidation.getLists), listController.getLists);

/**
 * @swagger
 * /api/lists:
 *  post:
 *    security:
 *      - APIKeyHeader: []
 *    tags:
 *      - LIST
 *    summary: Create new list
 *    description: Create a new list for the user
 *    parameters:
 *      - name: List
 *        in: body
 *        required: true
 *        schema:
 *          type: object
 *          required:
 *            - title
 *          properties:
 *            title:
 *              type: string
 *    responses:
 *      201:
 *        description: List created successfully
 */
listRouter.post("/", authMiddleware, validationHandler(listValidation.create), listController.addList);

/**
 * @swagger
 * /api/lists/{id}:
 *  put:
 *    security:
 *      - APIKeyHeader: []
 *    tags:
 *      - LIST
 *    summary: Update list
 *    description: Update the title of a specific list
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        type: string
 *      - name: List
 *        in: body
 *        required: true
 *        schema:
 *          type: object
 *          properties:
 *            title:
 *              type: string
 *    responses:
 *      200:
 *        description: List updated successfully
 */
listRouter.put("/:id", authMiddleware, validationHandler(listValidation.update), listController.updateList);

/**
 * @swagger
 * /api/lists/{id}:
 *  delete:
 *    security:
 *      - APIKeyHeader: []
 *    tags:
 *      - LIST
 *    summary: Delete list
 *    description: Delete a list by ID
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        type: string
 *    responses:
 *      200:
 *        description: List deleted successfully
 */
listRouter.delete("/:id", authMiddleware, validationHandler(listValidation.delete), listController.deleteList);

export default listRouter;
