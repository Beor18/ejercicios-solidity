const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const ethers = require("ethers");
const PaymentProcessor = require("../frontend/src/contracts/PaymentProcessor.json");

const app = express();
const item = require("./routes/item/item");


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", item);

app.listen(4000, () => {
  console.log("Server running on port 4000");
});

const listenToEvents = () => {
  try {
    const provider = new ethers.providers.JsonRpcProvider(
      "http://localhost:7545"
    );
    const networkId = "5777";
    //when connecting to mainnet or public testnets, use this instead
    //const provider = ethers.providers.getDefaultProvider('mainnet | kovan | etc..');
    //const networkId = '1'; //mainnet
    //const networkId = '42'; //kovan

    const paymentProcessor = new ethers.Contract(
      PaymentProcessor.networks[networkId].address,
      PaymentProcessor.abi,
      provider
    );
    paymentProcessor.on(
      "PaymentDone",
      async (payer, amount, paymentId, date) => {
        console.log(`New payment received: 
      from ${payer} 
      amount ${amount.toString()} 
      paymentId ${paymentId} 
      date ${new Date(date.toNumber() * 1000).toLocaleString()}
    `);
        const payment = await Payment.findOne({ id: paymentId.toString() });
        if (payment) {
          payment.paid = true;
          await payment.save();
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};

listenToEvents();
