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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = require("./config/database");
const localRoutes_1 = __importDefault(require("./routes/localRoutes"));
const serviceRoutes_1 = __importDefault(require("./routes/serviceRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const workerProfileRoutes_1 = __importDefault(require("./routes/workerProfileRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// All models will be imported in associations.ts to define relationships.
require("./models/associations");
function initializeDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, database_1.connectDB)();
        try {
            // await sequelize.sync({ force: true }); // Use { force: true } to drop and re-create tables (use with caution!)
            yield database_1.sequelize.sync({ alter: true });
            console.log('All models were synchronized successfully.');
        }
        catch (error) {
            console.error('Unable to synchronize models:', error);
            process.exit(1);
        }
    });
}
initializeDatabase();
app.use(express_1.default.json()); // For parsing application/json
app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello from the backend!' });
});
app.use('/api/locals', localRoutes_1.default);
app.use('/api/services', serviceRoutes_1.default);
app.use('/api/users', userRoutes_1.default);
app.use('/api/worker-profiles', workerProfileRoutes_1.default);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
});
// Export app for testing
exports.default = app;
