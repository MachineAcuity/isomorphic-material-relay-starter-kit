/* @flow weak */

export function postXHR( url : string, jsondata : any, onSuccess , onFailure )
{
  console.log('postXHR: posting to ' + url + ', ' + JSON.stringify( jsondata ) );

  var xhr = new XMLHttpRequest( );
  xhr.open( 'POST', url );
  xhr.setRequestHeader( 'Content-Type', 'application/json' );

  xhr.onreadystatechange = function( )
  {
    if( xhr.readyState == 4 )
    {
      if( xhr.status == 200 )
      {
        console.log( 'postXHR: success from ' + url + ', ' + xhr.responseText );
        onSuccess( xhr.responseText );
      }
      else
      {
        console.log( 'postXHR: fail from ' + url + ', ' + xhr.responseText );
        onFailure( xhr.responseText );
      }
    }
  }

  xhr.send( JSON.stringify( jsondata ) );
}
