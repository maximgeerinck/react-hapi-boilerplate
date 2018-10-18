// import test from 'ava';
// import request from 'supertest';

// // for server
// import * as Hapi from 'hapi';

// import { Mockgoose } from 'mockgoose';
// import mongoose from '../src/db';

// import { createServer } from '../src/server';
// import { sendMail } from '../src/utils/EmailHelper';

// // https://github.com/avajs/ava/blob/master/docs/recipes/endpoint-testing.md
// let server = null;
// let db = null;
// test.before(async t => {
//   // create server
//   let s = await createServer(8200, '0.0.0.0');
//   server = s.listener;

//   const URI = 'mongodb://mongo/wallstilldawn';
//   db = mongoose.connect(URI);
// });
// test.after.always('cleanup', t => {
//   db.disconnect();
// });

// const makeApp = () => {
//   return server;
// };

// // test('email should succeed', async t => {
// //   t.plan(1);
// //   const result = await sendMail(
// //     ['c4d3r@hotmail.com'],
// //     'Hello welcome!',
// //     '<b>Should be succesfull!</b>'
// //   );
// //   t.deepEqual(result.accepted, ['c4d3r@hotmail.com']);
// // });
