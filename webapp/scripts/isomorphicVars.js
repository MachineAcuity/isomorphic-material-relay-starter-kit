/* @flow weak */

export function isomorphicVars( )
{
  if( typeof( window ) == 'undefined' )
  {
    // Running on server.
    return {
      // Modify the code below to set the variables >>>
      version: process.env.npm_package_version,
      public_url: process.env.PUBLIC_URL,
      // <<< Modify the code above to set the variables
    }
  }
  else
    return window.isomorphicVars;
}
