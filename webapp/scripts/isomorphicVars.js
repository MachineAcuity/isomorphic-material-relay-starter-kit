/* @flow weak */

export default function( )
{
  if( typeof( window ) == 'undefined' )
  {
    // Running on server.
    return {
      // Modify the code below to set the variables >>>
      npm_package_version: process.env.npm_package_version,
      PUBLIC_URL: process.env.PUBLIC_URL,
      // <<< Modify the code above to set the variables
    }
  }
  else
    return window.isomorphicVars;
}
