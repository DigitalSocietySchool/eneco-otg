/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  'GET /api/v1/store': 'StoreController.index',
  'GET /api/v1/store/:id': 'StoreController.show',
  'POST /api/v1/store': 'StoreController.create',
  'PUT /api/v1/store/:id': 'StoreController.update',
  'DELETE /api/v1/store/:id': 'StoreController.destroy',

  'GET /api/v1/card': 'CardController.index',
  'GET /api/v1/card/:id': 'CardController.show',
  'POST /api/v1/card': 'CardController.create',
  'PUT /api/v1/card/:id': 'CardController.update',
  'DELETE /api/v1/card/:id': 'CardController.destroy',

  'GET /api/v1/client': 'ClientController.index',
  'GET /api/v1/client/:id': 'ClientController.show',
  'POST /api/v1/client': 'ClientController.create',
  'PUT /api/v1/client/:id': 'ClientController.update',
  'DELETE /api/v1/client/:id': 'ClientController.destroy',

  'GET /api/v1/loan': 'LoanController.index',
  'GET /api/v1/loan/:id': 'LoanController.show',
  'POST /api/v1/loan': 'LoanController.create',
  'PUT /api/v1/loan/:id': 'LoanController.update',
  'DELETE /api/v1/loan/:id': 'LoanController.destroy',
  'POST /api/v1/loan/:id/start': 'LoanController.start',
  'POST /api/v1/loan/:id/end': 'LoanController.end',

  'POST /api/v1/loan/:id/start': 'LoanController.start',
  'POST /api/v1/loan/:id/end': 'LoanController.end',

  'GET /api/v1/powerbank': 'PowerbankController.index',
  'GET /api/v1/powerbank/:id': 'PowerbankController.show',
  'POST /api/v1/powerbank': 'PowerbankController.create',
  'PUT /api/v1/powerbank/:id': 'PowerbankController.update',
  'DELETE /api/v1/powerbank/:id': 'PowerbankController.destroy',

  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

};
