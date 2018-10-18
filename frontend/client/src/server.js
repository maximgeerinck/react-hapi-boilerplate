'use strict';

import path from 'path';
import { Server } from 'http';
import Express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
// import routes from './routes';
import NotFoundPage from './components/NotFoundPage';

// initialize the server and configure support for ejs templates
const app = new Express();
const server = new Server(app);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../build'));

// define the folder that will be used for static assets
app.use(Express.static(path.join(__dirname, '..', 'build')));
// app.use('/assets', publicPath);
// universal routing and rendering
app.get('*', (req, res) => {
  match(
    { location: req.url },
    (err, redirectLocation, renderProps) => {

      // in case of error display the error message
      if (err) return res.status(500).send(err.message);      

      // in case of redirect propagate the redirect to the browser
      if (redirectLocation) return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      

      // generate the React markup for the current route
      let markup;
      if (renderProps) {
        // if the current route matched we have renderProps
        markup = renderToString(<RouterContext {...renderProps}/>);
      } else {
        // otherwise we can render a 404 page
        markup = renderToString(<NotFoundPage/>);
        res.status(404);
      }

      // render the index template with the embedded React markup
      const indexPath = path.join(__dirname, '../build/index.html');
      return res.sendFile(indexPath)
    }
  );
});

// start the server
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'production';
server.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  console.info(`Server running on http://localhost:${port} [${env}]`);
});
// import path from 'path';
// import Express from 'express';
// import { Server } from 'http';

// const app = new Express();
// const server = new Server(app);

// const indexPath = path.join(__dirname, '../build/index.html');
// const publicPath = Express.static(path.join(__dirname, '../build'));

// app.use('/assets', publicPath);
// app.get('/', function (_, res) { res.sendFile(indexPath) });

// let port = 3000;
// let env = 'production';
// server.listen(port, err => {
//   if (err) {
//     return console.error(err);
//   }
//   console.info(`Server running on http://localhost:${port} [${env}]`);
// });