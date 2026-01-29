const User = require('./User');
const WorkerProfile = require('./WorkerProfile');
const Local = require('./Local');
const Service = require('./Service');
const TimeSlot = require('./TimeSlot');
const BookingLocal = require('./BookingLocal');
const BookingService = require('./BookingService');
const Review = require('./Review');
const Conversation = require('./Conversation');
const Message = require('./Message');

User.hasOne(WorkerProfile, { foreignKey: 'user_id', onDelete: 'CASCADE' });
WorkerProfile.belongsTo(User, { foreignKey: 'user_id' });

WorkerProfile.hasMany(Local, { foreignKey: 'worker_id', onDelete: 'CASCADE' });
Local.belongsTo(WorkerProfile, { foreignKey: 'worker_id' });

WorkerProfile.hasMany(Service, { foreignKey: 'worker_id', onDelete: 'CASCADE' });
Service.belongsTo(WorkerProfile, { foreignKey: 'worker_id' });

Local.hasMany(Service, { foreignKey: 'local_id', onDelete: 'CASCADE' });
Service.belongsTo(Local, { foreignKey: 'local_id' });

Local.hasMany(TimeSlot, {
  foreignKey: 'item_id',
  constraints: false, // Disable constraints for polymorphic, managed by app logic
  scope: {
    item_id_type: 'Local',
  },
});
Service.hasMany(TimeSlot, {
  foreignKey: 'item_id',
  constraints: false, // Disable constraints for polymorphic, managed by app logic
  scope: {
    item_id_type: 'Service',
  },
});
TimeSlot.belongsTo(Local, { foreignKey: 'item_id', constraints: false });
TimeSlot.belongsTo(Service, { foreignKey: 'item_id', constraints: false });

User.hasMany(BookingLocal, { foreignKey: 'client_id', onDelete: 'CASCADE' });
BookingLocal.belongsTo(User, { foreignKey: 'client_id' });

TimeSlot.hasOne(BookingLocal, { foreignKey: 'time_slot_id', onDelete: 'CASCADE' });
BookingLocal.belongsTo(TimeSlot, { foreignKey: 'time_slot_id' });

User.hasMany(BookingService, { foreignKey: 'client_id', onDelete: 'CASCADE' });
BookingService.belongsTo(User, { foreignKey: 'client_id' });

TimeSlot.hasOne(BookingService, { foreignKey: 'time_slot_id', onDelete: 'CASCADE' });
BookingService.belongsTo(TimeSlot, { foreignKey: 'time_slot_id' });

BookingLocal.hasMany(BookingService, { foreignKey: 'booking_local_id', as: 'associated_services', onDelete: 'SET NULL' });
BookingService.belongsTo(BookingLocal, { foreignKey: 'booking_local_id' });


User.hasMany(Review, { foreignKey: 'reviewer_id', onDelete: 'CASCADE', as: 'WrittenReviews' });
Review.belongsTo(User, { foreignKey: 'reviewer_id', as: 'Reviewer' });

User.hasMany(Review, { foreignKey: 'worker_id', onDelete: 'SET NULL', as: 'ReceivedReviews' });
Review.belongsTo(User, { foreignKey: 'worker_id', as: 'WorkerReviewed' });

BookingLocal.hasMany(Review, {
  foreignKey: 'booking_id',
  constraints: false, // Disable constraints for polymorhpoic, managed by app logic
  scope: {
    booking_type: 'BookingLocal',
  },
});
BookingService.hasMany(Review, {
  foreignKey: 'booking_id',
  constraints: false, // Disable constraints for polymorphic, managed by app logic
  scope: {
    booking_type: 'BookingService',
  },
});
Review.belongsTo(BookingLocal, { foreignKey: 'booking_id', constraints: false });
Review.belongsTo(BookingService, { foreignKey: 'booking_id', constraints: false });


User.belongsToMany(User, {
  through: Conversation,
  as: 'User1Conversations',
  foreignKey: 'user_1_id',
});
User.belongsToMany(User, {
  through: Conversation,
  as: 'User2Conversations',
  foreignKey: 'user_2_id',
});
Conversation.belongsTo(User, { foreignKey: 'user_1_id', as: 'User1' });
Conversation.belongsTo(User, { foreignKey: 'user_2_id', as: 'User2' });

Conversation.hasMany(Message, { foreignKey: 'conversation_id', onDelete: 'CASCADE' });
Message.belongsTo(Conversation, { foreignKey: 'conversation_id' });

User.hasMany(Message, { foreignKey: 'sender_id', onDelete: 'CASCADE' });
Message.belongsTo(User, { foreignKey: 'sender_id' });

