const mongoose = require('mongoose');

mongoose.connect(
  'mongodb+srv://stackly:romanos18@cluster0.4wjvq.mongodb.net/stackly-mp?retryWrites=true&w=majority',
  {useNewUrlParser: true, useUnifiedTopology: true},
);
