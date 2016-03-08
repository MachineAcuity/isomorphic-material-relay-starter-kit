/* @flow weak */

import bcrypt from 'bcrypt';
import bodyParser from 'body-parser';
import express from 'express';
import jwt from 'jwt-simple';

import { DA_User_add, DA_User_getByUserName } from '../data/da/User';

// Read environment
require( 'dotenv' ).load( );


let auth = express( );
auth.use( bodyParser.json( ) );

auth.post('/login', (req, res, next) =>
{
  let username = req.body.username.toLowerCase( );
  let password = req.body.password;

  DA_User_getByUserName( username )
  .then( ( a_User ) =>
  {
    if( ! a_User )
      res.status( 401 ).json( { error: 'Incorrect user' } );
    else
    {
      bcrypt.compare( password, a_User.password, function( err, passwordIsCorrect )
      {
        if( passwordIsCorrect )
        {
          // User has authenticated correctly thus we create a JWT token
          var token = jwt.encode( { user_id: a_User.id }, process.env.JWT_SECRET );

          res.cookie( 'auth_token', token, { httpOnly: true } );
          res.json( { success : true } );
        }
        else
          res.status( 401 ).json( { error: 'Incorrect password' } );
      } );
    }
  } )
  .catch( ( reason ) =>
  {
    res.status( 401 ).json( { error: reason } );
  } )
  ;
} );

auth.post('/createuser', (req, res, next) =>
{
  let username = req.body.username.toLowerCase( );
  let password = req.body.password;

  DA_User_getByUserName( username )
  .then( ( a_User ) =>
  {
    if( a_User )
      return Promise.reject( "User account already exists" );
    else
      return new Promise( ( resolve ) => {
        bcrypt.hash( password, 8, ( err, hash ) => resolve( hash ) );
      } )
      .then( ( passwordHash ) => DA_User_add( {
        username: username,
        password: passwordHash,
        User_DisplayName: 'New User',
        User_ProfilePhoto: '',
        User_Email: '',
        User_Locale: '',
        User_AuthToken: Math.random( ).toString( 36 )
      } ) )
      ;
  } )
  .then( ( a_User ) =>
  {
    // User has been created thus we create a JWT token
    var token = jwt.encode( { user_id: a_User.id }, process.env.JWT_SECRET );

    res.cookie( 'auth_token', token, { httpOnly: true } );
    res.json( { success : true } );
  } )
  .catch( ( reason ) =>
  {
    res.status( 401 ).json( { error: "" + reason } );
  } )
  ;
} );


auth.post('/logout', (req, res, next) =>
{
  res.cookie( 'auth_token', '', { httpOnly: true, expires: new Date( 1 ) } );
  res.json( { success : true } );
} );


export default auth;
