const mongoose = require('mongoose');

mongoose.connect(
  'mongodb+srv://stackly:romanos18@cluster0.4wjvq.mongodb.net/stackly-mp?retryWrites=true&w=majority',
  {useNewUrlParser: true, useUnifiedTopology: true},
);

const paymentSchema = new mongoose.Schema({
  id: String,
  itemId: String,
  paid: Boolean
});
const Payment = mongoose.model('Payment', paymentSchema);

module.exports = {
  Payment
};
