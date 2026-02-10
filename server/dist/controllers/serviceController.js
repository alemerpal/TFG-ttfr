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
exports.deleteService = exports.updateService = exports.getServiceById = exports.getAllServices = exports.createService = void 0;
const Service_1 = __importDefault(require("../models/Service"));
const WorkerProfile_1 = __importDefault(require("../models/WorkerProfile"));
const Local_1 = __importDefault(require("../models/Local"));
const createService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { worker_id, local_id, title, description, base_price, capacity } = req.body;
        if (!worker_id && !local_id) {
            return res.status(400).json({ error: 'A service must be associated with either a worker or a local.' });
        }
        if (worker_id) {
            const worker = yield WorkerProfile_1.default.findByPk(worker_id);
            if (!worker) {
                return res.status(404).json({ error: 'WorkerProfile not found.' });
            }
        }
        if (local_id) {
            const local = yield Local_1.default.findByPk(local_id);
            if (!local) {
                return res.status(404).json({ error: 'Local not found.' });
            }
        }
        const service = yield Service_1.default.create({
            worker_id,
            local_id,
            title,
            description,
            base_price,
            capacity,
        });
        res.status(201).json(service);
    }
    catch (error) {
        console.error('Error creating service:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.createService = createService;
const getAllServices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const services = yield Service_1.default.findAll();
        res.status(200).json(services);
    }
    catch (error) {
        console.error('Error fetching services:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.getAllServices = getAllServices;
const getServiceById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const service = yield Service_1.default.findByPk(id);
        if (!service) {
            return res.status(404).json({ error: 'Service not found' });
        }
        res.status(200).json(service);
    }
    catch (error) {
        console.error('Error fetching service by ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.getServiceById = getServiceById;
const updateService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { worker_id, local_id, title, description, base_price, capacity } = req.body;
        const service = yield Service_1.default.findByPk(id);
        if (!service) {
            return res.status(404).json({ error: 'Service not found' });
        }
        // Cast service to 'any' to access properties that might not be directly on the Sequelize model instance
        if (!worker_id && !local_id && !service.worker_id && !service.local_id) {
            return res.status(400).json({ error: 'A service must be associated with either a worker or a local.' });
        }
        if (worker_id) {
            const worker = yield WorkerProfile_1.default.findByPk(worker_id);
            if (!worker) {
                return res.status(404).json({ error: 'WorkerProfile not found.' });
            }
        }
        if (local_id) {
            const local = yield Local_1.default.findByPk(local_id);
            if (!local) {
                return res.status(404).json({ error: 'Local not found.' });
            }
        }
        yield service.update({
            worker_id,
            local_id,
            title,
            description,
            base_price,
            capacity,
        });
        res.status(200).json(service);
    }
    catch (error) {
        console.error('Error updating service:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.updateService = updateService;
const deleteService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const service = yield Service_1.default.findByPk(id);
        if (!service) {
            return res.status(404).json({ error: 'Service not found' });
        }
        yield service.destroy();
        res.status(204).send();
    }
    catch (error) {
        console.error('Error deleting service:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.deleteService = deleteService;
