"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("./User"));
const WorkerProfile_1 = __importDefault(require("./WorkerProfile"));
const Local_1 = __importDefault(require("./Local"));
const Service_1 = __importDefault(require("./Service"));
const TimeSlot_1 = __importDefault(require("./TimeSlot"));
const BookingLocal_1 = __importDefault(require("./BookingLocal"));
const BookingService_1 = __importDefault(require("./BookingService"));
const Review_1 = __importDefault(require("./Review"));
const Conversation_1 = __importDefault(require("./Conversation"));
const Message_1 = __importDefault(require("./Message"));
User_1.default.hasOne(WorkerProfile_1.default, { foreignKey: 'user_id', onDelete: 'CASCADE' });
WorkerProfile_1.default.belongsTo(User_1.default, { foreignKey: 'user_id' });
WorkerProfile_1.default.hasMany(Local_1.default, { foreignKey: 'worker_id', onDelete: 'CASCADE' });
Local_1.default.belongsTo(WorkerProfile_1.default, { foreignKey: 'worker_id' });
WorkerProfile_1.default.hasMany(Service_1.default, { foreignKey: 'worker_id', onDelete: 'CASCADE' });
Service_1.default.belongsTo(WorkerProfile_1.default, { foreignKey: 'worker_id' });
Local_1.default.hasMany(Service_1.default, { foreignKey: 'local_id', onDelete: 'CASCADE' });
Service_1.default.belongsTo(Local_1.default, { foreignKey: 'local_id' });
Local_1.default.hasMany(TimeSlot_1.default, {
    foreignKey: 'item_id',
    constraints: false, // Disable constraints for polymorphic, managed by app logic
    scope: {
        item_id_type: 'Local',
    },
});
Service_1.default.hasMany(TimeSlot_1.default, {
    foreignKey: 'item_id',
    constraints: false, // Disable constraints for polymorphic, managed by app logic
    scope: {
        item_id_type: 'Service',
    },
});
TimeSlot_1.default.belongsTo(Local_1.default, { foreignKey: 'item_id', constraints: false });
TimeSlot_1.default.belongsTo(Service_1.default, { foreignKey: 'item_id', constraints: false });
User_1.default.hasMany(BookingLocal_1.default, { foreignKey: 'client_id', onDelete: 'CASCADE' });
BookingLocal_1.default.belongsTo(User_1.default, { foreignKey: 'client_id' });
TimeSlot_1.default.hasOne(BookingLocal_1.default, { foreignKey: 'time_slot_id', onDelete: 'CASCADE' });
BookingLocal_1.default.belongsTo(TimeSlot_1.default, { foreignKey: 'time_slot_id' });
User_1.default.hasMany(BookingService_1.default, { foreignKey: 'client_id', onDelete: 'CASCADE' });
BookingService_1.default.belongsTo(User_1.default, { foreignKey: 'client_id' });
TimeSlot_1.default.hasOne(BookingService_1.default, { foreignKey: 'time_slot_id', onDelete: 'CASCADE' });
BookingService_1.default.belongsTo(TimeSlot_1.default, { foreignKey: 'time_slot_id' });
BookingLocal_1.default.hasMany(BookingService_1.default, { foreignKey: 'booking_local_id', as: 'associated_services', onDelete: 'SET NULL' });
BookingService_1.default.belongsTo(BookingLocal_1.default, { foreignKey: 'booking_local_id' });
User_1.default.hasMany(Review_1.default, { foreignKey: 'reviewer_id', onDelete: 'CASCADE', as: 'WrittenReviews' });
Review_1.default.belongsTo(User_1.default, { foreignKey: 'reviewer_id', as: 'Reviewer' });
User_1.default.hasMany(Review_1.default, { foreignKey: 'worker_id', onDelete: 'SET NULL', as: 'ReceivedReviews' });
Review_1.default.belongsTo(User_1.default, { foreignKey: 'worker_id', as: 'WorkerReviewed' });
BookingLocal_1.default.hasMany(Review_1.default, {
    foreignKey: 'booking_id',
    constraints: false, // Disable constraints for polymorhpoic, managed by app logic
    scope: {
        booking_type: 'BookingLocal',
    },
});
BookingService_1.default.hasMany(Review_1.default, {
    foreignKey: 'booking_id',
    constraints: false, // Disable constraints for polymorphic, managed by app logic
    scope: {
        booking_type: 'BookingService',
    },
});
Review_1.default.belongsTo(BookingLocal_1.default, { foreignKey: 'booking_id', constraints: false });
Review_1.default.belongsTo(BookingService_1.default, { foreignKey: 'booking_id', constraints: false });
User_1.default.belongsToMany(User_1.default, {
    through: Conversation_1.default,
    as: 'User1Conversations',
    foreignKey: 'user_1_id',
});
User_1.default.belongsToMany(User_1.default, {
    through: Conversation_1.default,
    as: 'User2Conversations',
    foreignKey: 'user_2_id',
});
Conversation_1.default.belongsTo(User_1.default, { foreignKey: 'user_1_id', as: 'User1' });
Conversation_1.default.belongsTo(User_1.default, { foreignKey: 'user_2_id', as: 'User2' });
Conversation_1.default.hasMany(Message_1.default, { foreignKey: 'conversation_id', onDelete: 'CASCADE' });
Message_1.default.belongsTo(Conversation_1.default, { foreignKey: 'conversation_id' });
User_1.default.hasMany(Message_1.default, { foreignKey: 'sender_id', onDelete: 'CASCADE' });
Message_1.default.belongsTo(User_1.default, { foreignKey: 'sender_id' });
