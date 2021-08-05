import React, { useState, useEffect } from 'react';
import getBlockchain from './ethereum.js';

import Store from './components/store/Store';
import Message from './components/message/Message';

function App() {
  const [paymentProcessor, setPaymentProcessor] = useState(undefined); 
  const [dai, setDai] = useState(undefined); 

  useEffect(() => {
    const init = async () => {
      const { paymentProcessor, dai } = await getBlockchain();
      setPaymentProcessor(paymentProcessor);
      setDai(dai);
    }
    init();
  }, []);

  if(typeof window.ethereum === 'undefined') {
    return (
      <Message />
    );
  }

  return (
    <div className='container'>
      <div className='col-sm-12'>
        <h1>Stackly  Commerce con Ethereum</h1>
        <Store paymentProcessor={paymentProcessor} dai={dai} />
      </div>
    </div>
  );
}

export default App;
