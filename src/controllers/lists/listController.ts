import { Response, NextFunction } from "express";
import { errorMessages, status } from "../../libs/constant";
import { Types } from "mongoose";
import { listRepository } from "../../repositories/list/ListRepository";

class ListController {
  async getLists(req: any, res: Response, next: NextFunction) {
    try {
      const userId = req.user.data.originalId;

      if (!userId) {
        return next({
          error: errorMessages.BAD_REQUEST,
          message: "userId is required",
          status: status.BAD_REQUEST,
        });
      }

      const lists = await listRepository.getListsWithCardsByUserId(new Types.ObjectId(userId));

      return res.send({
        message: "Fetched lists with cards successfully",
        data: lists,
        status: status.SUCCESS,
      });
    } catch (error) {
      console.error("ListController getLists error:", error);
      return next({
        error: errorMessages.INTERNAL_SERVER_ERROR,
        message: "Error fetching lists",
        status: status.INTERNAL_SERVER_ERROR,
      });
    }
  }

  async addList(req: any, res: Response, next: NextFunction) {
    try {
      const { title } = req.body;
      const userId = req.user.data.originalId;

      if (!title || !userId) {
        return next({
          error: errorMessages.BAD_REQUEST,
          message: "Title and userId are required",
          status: status.BAD_REQUEST,
        });
      }

      const newList = await listRepository.createList({
        title,
        userId,
        originalId: new Types.ObjectId().toString(),
      });

      return res.status(201).send({
        message: "List created successfully",
        data: newList,
        status: status.SUCCESS,
      });
    } catch (error) {
      console.error("ListController addList error:", error);
      return next({
        error: errorMessages.INTERNAL_SERVER_ERROR,
        message: "Error creating list",
        status: status.INTERNAL_SERVER_ERROR,
      });
    }
  }

  async updateList(req: any, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { title } = req.body;
      const userId = req.user.data.originalId;

      if (!id || !userId) {
        return next({
          error: errorMessages.BAD_REQUEST,
          message: "List ID and userId are required",
          status: status.BAD_REQUEST,
        });
      }

      const list = await listRepository.findListByIdAndUser(id, userId);
      if (!list) {
        return next({
          error: errorMessages.NOT_FOUND,
          message: "List not found",
          status: status.NOT_FOUND,
        });
      }

      const updated = await listRepository.updateList(id, userId, { title });

      return res.send({
        message: "List updated successfully",
        data: updated,
        status: status.SUCCESS,
      });
    } catch (error) {
      console.error("ListController updateList error:", error);
      return next({
        error: errorMessages.INTERNAL_SERVER_ERROR,
        message: "Error updating list",
        status: status.INTERNAL_SERVER_ERROR,
      });
    }
  }

  async deleteList(req: any, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const userId = req.user.data.originalId;

      if (!id || !userId) {
        return next({
          error: errorMessages.BAD_REQUEST,
          message: "List ID and userId are required",
          status: status.BAD_REQUEST,
        });
      }

      const list = await listRepository.findListByIdAndUser(id, userId);
      if (!list) {
        return next({
          error: errorMessages.NOT_FOUND,
          message: "List not found",
          status: status.NOT_FOUND,
        });
      }

      await listRepository.deleteList(id, userId);

      return res.send({
        message: "List deleted successfully",
        data: { id },
        status: status.SUCCESS,
      });
    } catch (error) {
      console.error("ListController deleteList error:", error);
      return next({
        error: errorMessages.INTERNAL_SERVER_ERROR,
        message: "Error deleting list",
        status: status.INTERNAL_SERVER_ERROR,
      });
    }
  }
}

export default new ListController();
