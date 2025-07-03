import { Router } from "express";
import user from "./userController";
import userValidation from "./validation";
import validationHandler from "../../libs/validateHandler";
import authMiddleware from "../../libs/routes/authMiddleware";

const userRouter: Router = Router();
  /**
   * @swagger
   * /api/user/me:
   *   get:
   *     security:
   *      - APIKeyHeader: []
   *     tags:
   *     - user
   *     summary: get user profile data
   *     description: Return user data
   *     responses:
   *       200:
   *         description: fetch user data
   */
userRouter
  .get('/profile', authMiddleware, user.profile)
  /**
   * @swagger
   * /api/user/login:
   *   post:
   *     tags:
   *     - Login
   *     description: Login
   *     summary: Login
   *     parameters:
   *       - name: login
   *         description: Login User.
   *         in : body
   *         required: true
   *         schema:
   *           type: object
   *           required:
   *           properties:
   *             email:
   *               type: string
   *             password:
   *               type: string
   *     responses:
   *       200:
   *         description: Login
   */
userRouter
  .post(
  "/login",
  validationHandler(userValidation.login),
  user.login
  )
  /**
   * @swagger
   * /api/user/allUsersData:
   *   get:
   *     security:
   *      - APIKeyHeader: []
   *     tags:
   *       - USER
   *     summary: get allUsersData
   *     description: allUsersData list
   *     parameters:
   *       - name: role
   *         description: User details.
   *         in: path
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: fetch all allUserData
   */
  .get(
    "/allUsersData",
    authMiddleware,
    validationHandler(userValidation.get),
    user.getAllUsersData
  )
  /**
   * @swagger
   * /api/user:
   *  post:
   *     security:
   *      - APIKeyHeader: []
   *     tags:
   *       - USER
   *     summary: Register New User
   *     description: Create user in database
   *     parameters:
   *       - name: User
   *         description: Register New User
   *         in : body
   *         required: true
   *         schema:
   *           type: object
   *           properties:
   *             firstName:
   *               type: string
   *             lastName:
   *               type: string
   *             email:
   *               type: string
   *             password:
   *               type: string
   *             role:
   *               type: string
   *     responses:
   *       200:
   *         description: Register User
   */
  .post(
    "/",
    validationHandler(userValidation.create),
    user.registerUser
  )
  /**
   * @swagger
   * /api/user/{originalId}:
   *   put:
   *     security:
   *      - APIKeyHeader: []
   *     tags:
   *       - USER
   *     summary: Update existing user
   *     description: User updated in database
   *     parameters:
   *       - name: originalId
   *         in : path
   *         description: User details.
   *         required: true
   *         type: string
   *       - in: body
   *         name: body
   *         requried: true
   *         schema:
   *           type: object
   *           properties:
   *             name:
   *               type: string
   *             email:
   *               type: string
   *             department:
   *               type: string
   *             location:
   *               type: string
   *             contactNo:
   *               type: string
   *             empId:
   *               type: string
   *     responses:
   *       200:
   *         description: Update
   */
  .put(
    "/:originalId",
    authMiddleware,
    validationHandler(userValidation.update),
    user.updateUser
  )
  /**
   * @swagger
   * /api/user/{originalId}:
   *   delete:
   *     security:
   *      - APIKeyHeader: []
   *     tags:
   *       - USER
   *     summary: delete existing user
   *     description: Delete user from database
   *     parameters:
   *       - name: originalId
   *         description: User details.
   *         in: path
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: delete user from database
   */
  .delete(
    "/:originalId",
    authMiddleware,
    validationHandler(userValidation.delete),
    user.deleteUser
  )

export default userRouter;

/**
 * @swagger
 * securityDefinitions:
 *  APIKeyHeader:
 *    type: apiKey
 *    in: header
 *    name: Authorization
 */

/**
 * @swagger
 * /health-check:
 *   get:
 *     tags:
 *     - General
 *     description: Health check
 *     summary: Health check
 *     responses:
 *       200:
 *         description: Health Check
 */
