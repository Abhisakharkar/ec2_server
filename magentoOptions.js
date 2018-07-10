const Magento2 = require('node-magento2');

//instantiate the client object
const options = {
  authentication: {
    integration: { //from the integrations section in the magento2 backend
      consumer_key: '4qhgprr6g2facm4muduceap0nohogmxq',
      consumer_secret: '17lcp1290ip5qnqegnhairrbbkgj9aa6',       //ec2 server
      access_token: '72xikqhfnl7d22yy1udvbq2cqxufm67o',
      access_token_secret: 'im9t4ylso9ahel4p5k0o8omle2stm08g'
    }
  }
}
const mageClient = new Magento2('http://localhost/magento', options)
mageClient.init();
module.exports=mageClient;
