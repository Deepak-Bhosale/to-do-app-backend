import { Router } from "express";
import cardController from "./cardController";
import cardValidation from "./validation";
import validationHandler from "../../libs/validateHandler";
import authMiddleware from "../../libs/routes/authMiddleware";

const cardRouter: Router = Router();

/**
 * @swagger
 * /api/cards:
 *  post:
 *    security:
 *      - APIKeyHeader: []
 *    tags:
 *      - CARD
 *    summary: Create new card
 *    description: Create a card in a list
 *    parameters:
 *      - name: Card
 *        in: body
 *        required: true
 *        schema:
 *          type: object
 *          required:
 *            - title
 *            - listId
 *          properties:
 *            title:
 *              type: string
 *            description:
 *              type: string
 *            listId:
 *              type: string
 *    responses:
 *      201:
 *        description: Card created successfully
 */
cardRouter.post("/", authMiddleware, validationHandler(cardValidation.create), cardController.addCard);

/**
 * @swagger
 * /api/cards/{id}:
 *  put:
 *    security:
 *      - APIKeyHeader: []
 *    tags:
 *      - CARD
 *    summary: Update card
 *    description: Update a card's title or description
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        type: string
 *      - name: Card
 *        in: body
 *        required: true
 *        schema:
 *          type: object
 *          properties:
 *            title:
 *              type: string
 *            description:
 *              type: string
 *    responses:
 *      200:
 *        description: Card updated successfully
 */
cardRouter.put("/:id", authMiddleware, validationHandler(cardValidation.update), cardController.updateCard);

/**
 * @swagger
 * /api/cards/{cardId}:
 *  delete:
 *    security:
 *      - APIKeyHeader: []
 *    tags:
 *      - CARD
 *    summary: Delete card
 *    description: Delete a card by ID
 *    parameters:
 *      - name: cardId
 *        in: path
 *        required: true
 *        type: string
 *    responses:
 *      200:
 *        description: Card deleted successfully
 */
cardRouter.delete("/:id", authMiddleware, validationHandler(cardValidation.delete), cardController.deleteCard);

export default cardRouter;
