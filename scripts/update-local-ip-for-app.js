const os = require('os');
const fs = require('fs');

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
  updateIPInFile(
    './app/ios/CodeFoundriesApp/AppDelegate.m',
    'jsCodeLocation = [NSURL URLWithString:@"http:',
    '  jsCodeLocation = [NSURL URLWithString:@"http://' +  addresses[ 0 ] + ':8081/index.ios.bundle?platform=ios&dev=true"];'
  );
  updateIPInFile(
    './app/app.js',
    'let graphQLServerURL = "http://',
    'let graphQLServerURL = "http://' +  addresses[ 0 ] + ':4444/graphql";'
  );
  updateIPInFile(
    './.env',
    'HOST=',
    'HOST=' +  addresses[ 0 ]
  );
}

function updateIPInFile( fileName, searchString, newContentOfLine )
{
  let fileLines = fs.readFileSync( fileName, 'utf8' ).split( '\n' );
  let index = 0;

  while( index < fileLines.length )
  {
    if( fileLines[ index ].indexOf( searchString ) > -1 )
    {
      if( fileLines[ index ] == newContentOfLine )
        console.log( '[' + fileName + '] is already up to date' );
      else
      {
        fileLines[ index ] = newContentOfLine;
        fs.writeFileSync( fileName, fileLines.join( '\n' ) );

        console.log( '[' + fileName + '] has been updated with local IP ' + addresses[ 0 ] );
      }
      break;
    }
    else
      index++;
  }

}
