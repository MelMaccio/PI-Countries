//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const apiInfo = require('./utils/apiCountries');
require('dotenv').config()

const port = process.env.PORT || 3001;
// Syncing all the models at once.
if (process.env.NODE_ENV === 'development') {
  conn.sync({ force: true }).then(() => {
    apiInfo().then(() => {
      server.listen(3001, () => {
        console.log('%s listening at 3001'); // eslint-disable-line no-console
      });
    })
  });
} else {
  server.listen(port, () => { console.log(`listening at ${port}`) })
}
