/* @flow weak */

import bcrypt from 'bcrypt';
import bodyParser from 'body-parser';
import express from 'express';
import jwt from 'jwt-simple';

import delayPromise from '../scripts/delayPromise';
import ObjectManager from '../data/ObjectManager';

// Read environment
require( 'dotenv' ).load( );


let auth = express( );
auth.use( bodyParser.json( ) );

auth.post('/login', (req, res, next) =>
{
  const objectManager = new ObjectManager( );

  let User_AccountName = req.body.User_AccountName.toLowerCase( );
  let User_AccountPassword = req.body.User_AccountPassword;

  delayPromise( 1000 ) // Wait for a second to slow down a possible potential force attack
  .then( ( ) => objectManager.getListBy( 'User', 'User_AccountName', User_AccountName ) )
  .then( ( arr_Users ) =>
  {
    if( arr_Users.length == 0 )
      res.status( 401 ).json( { error: 'Incorrect user' } );
    else
    {
      const a_User = arr_Users[ 0 ];

      bcrypt.compare( User_AccountPassword, a_User.User_AccountPassword, function( err, User_AccountPasswordIsCorrect )
      {
        if( User_AccountPasswordIsCorrect )
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
  const objectManager = new ObjectManager( );

  let User_AccountName = req.body.User_AccountName.toLowerCase( );
  let User_AccountPassword = req.body.User_AccountPassword;

  objectManager.getListBy( 'User', 'User_AccountName', User_AccountName )
  .then( ( arr_Users ) =>
  {
    if( arr_Users.length > 0 )
      return Promise.reject( "User account already exists" );
    else
      return new Promise( ( resolve ) => {
        bcrypt.hash( User_AccountPassword, 8, ( err, User_AccountPassword ) => resolve( User_AccountPassword ) );
      } )
      .then( ( User_AccountPassword ) => objectManager.add( 'User', {
        User_AccountName: User_AccountName,
        User_AccountPassword: User_AccountPassword,
        User_DisplayName: 'New User',
        User_ProfilePhoto: '',
        User_Email: '',
        User_Locale: '',
        User_AuthToken: Math.random( ).toString( 36 )
      } ) )
      ;
  } )
  .then( ( user_id ) => objectManager.getOneById( 'User', user_id ) )
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
