const webPush = require('web-push');

const publicVapidKey = "BBounodxuxkMFzyVB4ojd6kD3LZZ2lqoplyccUE-UOBkrkxGVVmGhJ93E3B2vqv7QMpnDXNsPjf7JszouYGi_Eo"; // REPLACE_WITH_YOUR_KEY
const privateVapidKey = "1rRZ0_fsNEq99wnPGp2ifCCTwLM3ZYKw8tbpWYF_2I8"; //REPLACE_WITH_YOUR_KEY



webPush.setVapidDetails(
    'mailto:phamhieuproaz@gmail.com',
    publicVapidKey,
    privateVapidKey
  );
  
module.exports = webPush;