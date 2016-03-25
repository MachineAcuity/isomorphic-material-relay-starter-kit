const os = require('os');
const fs = require('fs');

const appDelegateFileName = './app/ios/CodeFoundriesApp/AppDelegate.m';

// Find out IP address
var interfaces = os.networkInterfaces();
var addresses = [];
for (var k in interfaces)
    for (var k2 in interfaces[k])
    {
        var address = interfaces[ k ][ k2 ];
        if ( address.family === 'IPv4' && !address.internal )
            addresses.push(address.address);
    }

if( addresses.length >= 0 )
{
  // Update App Delegate

  let fileLines = fs.readFileSync( appDelegateFileName, 'utf8' ).split( '\n' );
  let index = 0;

  while( index < fileLines.length )
  {
    if( fileLines[ index ].indexOf( 'jsCodeLocation = [NSURL URLWithString:@"http:' ) > -1 )
    {
      const newContentOfLine = '  jsCodeLocation = [NSURL URLWithString:@"http://' +  addresses[ 0 ] + ':8081/index.ios.bundle?platform=ios&dev=true"];';
      if( fileLines[ index ] == newContentOfLine )
        console.log( 'AppDelegate.m is already up to date' );
      else
      {
        fileLines[ index ] = newContentOfLine;
        fs.writeFileSync( appDelegateFileName, fileLines.join( '\n' ) );

        console.log( 'AppDelegate.m has been updated with local IP ' + addresses[ 0 ] );
      }
      break;
    }
    else
      index++;
  }
}
