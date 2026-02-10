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
exports.deleteLocal = exports.updateLocal = exports.getLocalById = exports.getAllLocals = exports.createLocal = void 0;
const Local_1 = __importDefault(require("../models/Local"));
const WorkerProfile_1 = __importDefault(require("../models/WorkerProfile"));
const createLocal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { worker_id, title, description, base_price, capacity, location_lat, location_lng, address_text } = req.body;
        const worker = yield WorkerProfile_1.default.findByPk(worker_id);
        if (!worker) {
            return res.status(404).json({ error: 'WorkerProfile not found.' });
        }
        const local = yield Local_1.default.create({
            worker_id,
            title,
            description,
            base_price,
            capacity,
            location_lat,
            location_lng,
            address_text,
        });
        res.status(201).json(local);
    }
    catch (error) {
        console.error('Error creating local:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.createLocal = createLocal;
const getAllLocals = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const locals = yield Local_1.default.findAll();
        res.status(200).json(locals);
    }
    catch (error) {
        console.error('Error fetching locals:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.getAllLocals = getAllLocals;
const getLocalById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const local = yield Local_1.default.findByPk(id);
        if (!local) {
            return res.status(404).json({ error: 'Local not found' });
        }
        res.status(200).json(local);
    }
    catch (error) {
        console.error('Error fetching local by ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.getLocalById = getLocalById;
const updateLocal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { worker_id, title, description, base_price, capacity, location_lat, location_lng, address_text } = req.body;
        const local = yield Local_1.default.findByPk(id);
        if (!local) {
            return res.status(404).json({ error: 'Local not found' });
        }
        // Optional: Basic validation if worker_id exists and is being updated
        if (worker_id) {
            const worker = yield WorkerProfile_1.default.findByPk(worker_id);
            if (!worker) {
                return res.status(404).json({ error: 'WorkerProfile not found.' });
            }
        }
        yield local.update({
            worker_id,
            title,
            description,
            base_price,
            capacity,
            location_lat,
            location_lng,
            address_text,
        });
        res.status(200).json(local);
    }
    catch (error) {
        console.error('Error updating local:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.updateLocal = updateLocal;
const deleteLocal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const local = yield Local_1.default.findByPk(id);
        if (!local) {
            return res.status(404).json({ error: 'Local not found' });
        }
        yield local.destroy();
        res.status(204).send(); // No content
    }
    catch (error) {
        console.error('Error deleting local:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.deleteLocal = deleteLocal;
