import express from "express";
import user from "../controllers/user.js";

const router = express.Router();

router
  .get("/", user.onGetAllUsers)
  .get("/:id", user.onGetUserById)
  .post("/", user.onCreateUser)
  .delete("/:id", user.onDeleteUserById);

export default router;
