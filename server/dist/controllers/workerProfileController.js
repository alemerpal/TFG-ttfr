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
exports.deleteWorkerProfile = exports.updateWorkerProfile = exports.getWorkerProfileById = exports.getAllWorkerProfiles = exports.createWorkerProfile = void 0;
const User_1 = __importDefault(require("../models/User"));
const WorkerProfile_1 = __importDefault(require("../models/WorkerProfile"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const createWorkerProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, name, avatar_url, display_name, description, phone } = req.body;
        const password_hash = yield bcryptjs_1.default.hash(password, 10);
        const user = yield User_1.default.create({
            email,
            password_hash,
            role: 'WORKER',
            name,
            avatar_url,
        });
        const workerProfile = yield WorkerProfile_1.default.create({
            user_id: user.id,
            display_name,
            description,
            phone,
        });
        const userResponse = user.toJSON(); // Cast to any for delete
        delete userResponse.password_hash;
        res.status(201).json({ user: userResponse, workerProfile });
    }
    catch (error) {
        console.error('Error creating worker profile:', error);
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ error: 'Email already exists.' });
        }
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.createWorkerProfile = createWorkerProfile;
const getAllWorkerProfiles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const workerProfiles = yield WorkerProfile_1.default.findAll({
            include: [{
                    model: User_1.default,
                    attributes: { exclude: ['password_hash'] }
                }]
        });
        res.status(200).json(workerProfiles);
    }
    catch (error) {
        console.error('Error fetching worker profiles:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.getAllWorkerProfiles = getAllWorkerProfiles;
const getWorkerProfileById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const workerProfile = yield WorkerProfile_1.default.findByPk(id, {
            include: [{
                    model: User_1.default,
                    attributes: { exclude: ['password_hash'] }
                }]
        });
        if (!workerProfile) {
            return res.status(404).json({ error: 'WorkerProfile not found' });
        }
        res.status(200).json(workerProfile);
    }
    catch (error) {
        console.error('Error fetching worker profile by ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.getWorkerProfileById = getWorkerProfileById;
const updateWorkerProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { email, password, name, avatar_url, display_name, description, phone } = req.body;
        const workerProfile = yield WorkerProfile_1.default.findByPk(id, {
            include: [User_1.default]
        }); // Cast for type safety
        if (!workerProfile) {
            return res.status(404).json({ error: 'WorkerProfile not found' });
        }
        const user = workerProfile.User;
        if (user) {
            let password_hash = user.password_hash;
            if (password) {
                password_hash = yield bcryptjs_1.default.hash(password, 10);
            }
            yield user.update({
                email,
                password_hash,
                name,
                avatar_url,
            });
        }
        yield workerProfile.update({
            display_name,
            description,
            phone,
        });
        const updatedWorkerProfile = yield WorkerProfile_1.default.findByPk(id, {
            include: [{
                    model: User_1.default,
                    attributes: { exclude: ['password_hash'] }
                }]
        });
        res.status(200).json(updatedWorkerProfile);
    }
    catch (error) {
        console.error('Error updating worker profile:', error);
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ error: 'Email already exists.' });
        }
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.updateWorkerProfile = updateWorkerProfile;
const deleteWorkerProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const workerProfile = yield WorkerProfile_1.default.findByPk(id);
        if (!workerProfile) {
            return res.status(404).json({ error: 'WorkerProfile not found' });
        }
        const user = yield User_1.default.findByPk(workerProfile.user_id);
        if (user) {
            yield user.destroy(); //Cascades
        }
        else {
            yield workerProfile.destroy();
        }
        res.status(204).send();
    }
    catch (error) {
        console.error('Error deleting worker profile:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.deleteWorkerProfile = deleteWorkerProfile;
