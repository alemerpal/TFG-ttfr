"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUserById = exports.getAllUsers = exports.createUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// Create a new User
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, name, avatar_url } = req.body;
        const password_hash = yield bcryptjs_1.default.hash(password, 10);
        const user = yield User_1.default.create({
            email,
            password_hash,
            role: "CLIENT",
            name,
            avatar_url,
        });
        const userResponse = user.toJSON();
        delete userResponse.password_hash; //Don't send passwords
        res.status(201).json(userResponse);
    }
    catch (error) {
        console.error('Error creating user:', error);
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ error: 'Email already exists.' });
        }
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.createUser = createUser;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.default.findAll({
            attributes: { exclude: ['password_hash'] } // Don't send passwords
        });
        res.status(200).json(users);
    }
    catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.getAllUsers = getAllUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield User_1.default.findByPk(id, {
            attributes: { exclude: ['password_hash'] } // Yet again, don't send passwords
        });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    }
    catch (error) {
        console.error('Error fetching user by ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.getUserById = getUserById;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { email, password, role, name, avatar_url } = req.body;
        const user = yield User_1.default.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        let password_hash = user.password_hash;
        if (password) {
            password_hash = yield bcryptjs_1.default.hash(password, 10);
        }
        yield user.update({
            email,
            password_hash,
            role,
            name,
            avatar_url,
        });
        const userResponse = user.toJSON();
        delete userResponse.password_hash;
        res.status(200).json(userResponse);
    }
    catch (error) {
        console.error('Error updating user:', error);
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ error: 'Email already exists.' });
        }
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield User_1.default.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        yield user.destroy();
        res.status(204).send();
    }
    catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.deleteUser = deleteUser;
