/* @flow weak */

import path from 'path';
import express from 'express';
import React from 'react';
import {renderToString} from 'react-dom/server';
import createLocation from 'history/lib/createLocation';
import Helmet from 'react-helmet';
import {RoutingContext, match} from 'react-router';

import renderOnServer from './renderOnServer'

let assetsPath;
if( process.env.NODE_ENV == 'production' )
  assetsPath = `/assets/${process.env.npm_package_version}`;
else
  assetsPath = `http://localhost:8080/${process.env.npm_package_version}`;

let app = express();

// Serve HTML
app.get( '/*', ( req, res, next ) => {
    renderOnServer( req, res, next, assetsPath );
} );

export default app;
