Installation
------------
Install via npm:

npm install musicmetadata


Supports
-----------------
mp3 (1.1, 2.2, 2.3, 2.4), m4a and ogg(vorbis)


API
-----------------
    var fs = require('fs'),
        musicmetadata = require('musicmetadata');
    
    //create a new parser from a node ReadStream
    var parser = new musicmetadata(fs.createReadStream('sample.mp3'));
    
    //listen for the metadata event
    parser.on('metadata', function(result) {
        console.log(result);
    });


This will output the standard music metadata:

    { artist: 'Spor',
      album: 'Nightlife, Vol 5.',
      albumartist: ['Andy C', 'Spor'],
      title: 'Stronger',
      year: 2010,
      track: [1, 44],
      disk: [1, 2] }
      
Values can be: string, int or array
      
If you just want the artist - listen for the artist event:

    parser.on('artist', function(result) {
        console.log(result);
    });