import { Response, NextFunction } from "express";
import { errorMessages, status } from "../../libs/constant";
import { Types } from "mongoose";
import { cardRepository } from "../../repositories/card/CardRepository";

class CardController {
  async addCard(req: any, res: Response, next: NextFunction) {
    try {
      const { title, description, listId } = req.body;
      const userId = req.user.data.originalId;

      if (!title || !listId || !userId) {
        return next({
          error: errorMessages.BAD_REQUEST,
          message: "title, listId, and userId are required",
          status: status.BAD_REQUEST,
        });
      }

      const card = await cardRepository.createCard({
        title,
        description,
        listId,
        userId,
        originalId: new Types.ObjectId().toString(),
      });

      return res.status(201).send({
        message: "Card created successfully",
        data: card,
        status: status.SUCCESS,
      });
    } catch (error) {
      console.error("CardController addCard error:", error);
      return next({
        error: errorMessages.INTERNAL_SERVER_ERROR,
        message: "Error creating card",
        status: status.INTERNAL_SERVER_ERROR,
      });
    }
  }

  async updateCard(req: any, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { title, description, listId } = req.body;
      const userId = req.user.data.originalId;

      if (!id || !userId) {
        return next({
          error: errorMessages.BAD_REQUEST,
          message: "id and userId are required",
          status: status.BAD_REQUEST,
        });
      }

      const card = await cardRepository.findCardByIdAndUser(id, userId);
      if (!card) {
        return next({
          error: errorMessages.NOT_FOUND,
          message: "Card not found",
          status: status.NOT_FOUND,
        });
      }

      const updated = await cardRepository.updateCard(id, userId, { title, description, listId });

      return res.send({
        message: "Card updated successfully",
        data: updated,
        status: status.SUCCESS,
      });
    } catch (error) {
      console.error("CardController updateCard error:", error);
      return next({
        error: errorMessages.INTERNAL_SERVER_ERROR,
        message: "Error updating card",
        status: status.INTERNAL_SERVER_ERROR,
      });
    }
  }

  async deleteCard(req: any, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const userId = req.user.data.originalId;

      if (!id || !userId) {
        return next({
          error: errorMessages.BAD_REQUEST,
          message: "id and userId are required",
          status: status.BAD_REQUEST,
        });
      }

      const card = await cardRepository.findCardByIdAndUser(id, userId);
      if (!card) {
        return next({
          error: errorMessages.NOT_FOUND,
          message: "Card not found",
          status: status.NOT_FOUND,
        });
      }

      await cardRepository.deleteCard(id, userId);

      return res.send({
        message: "Card deleted successfully",
        data: { id },
        status: status.SUCCESS,
      });
    } catch (error) {
      console.error("CardController deleteCard error:", error);
      return next({
        error: errorMessages.INTERNAL_SERVER_ERROR,
        message: "Error deleting card",
        status: status.INTERNAL_SERVER_ERROR,
      });
    }
  }
}

export default new CardController();
