"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const authMiddlware_1 = require("../middleware/authMiddlware");
const router = (0, express_1.Router)();
router.route("/").post(userController_1.registerUser).get(authMiddlware_1.protect, authMiddlware_1.admin, userController_1.getUsers);
router.post("/login", userController_1.loginUser);
router.post("/logout", userController_1.logoutUser);
router
    .route("/profile")
    .get(authMiddlware_1.protect, userController_1.getUserProfile)
    .put(authMiddlware_1.protect, userController_1.updateUserProfile);
router
    .route("/:id")
    .get(authMiddlware_1.protect, authMiddlware_1.admin, userController_1.getUserById)
    .delete(authMiddlware_1.protect, authMiddlware_1.admin, userController_1.deleteUser)
    .put(authMiddlware_1.protect, authMiddlware_1.admin, userController_1.updateUserById);
exports.default = router;
