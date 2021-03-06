var id3 = require('../lib/index'),
    fs = require('fs'),
    testy = require('testy')(),
    assert = testy.assert;
    
testy.expected = 42;
var sample = require('path').join(__dirname, 'samples/id3v2.3.mp3');
var parser = new id3(fs.createReadStream(sample));

parser.on('metadata', function(result) {
  assert.strictEqual(result.title, 'Home');
  assert.strictEqual(result.artist[0], 'Explosions In The Sky');
  assert.strictEqual(result.artist[1], 'Another');
  assert.strictEqual(result.artist[2], 'And Another');
  assert.strictEqual(result.albumartist[0], 'Soundtrack');
  assert.strictEqual(result.album, 'Friday Night Lights [Original Movie Soundtrack]');
  assert.strictEqual(result.year, '2004');
  assert.strictEqual(result.track.no, 5);
  assert.strictEqual(result.track.of, 0);
  assert.strictEqual(result.disk.no, 1);
  assert.strictEqual(result.disk.of, 1);
  assert.strictEqual(result.genre[0], 'Soundtrack');
  assert.strictEqual(result.picture[0].format, 'jpg');
  assert.strictEqual(result.picture[0].data.length, 80938);
});

//Aliased tests
parser.on('title', function(result) {
  assert.strictEqual(result, 'Home');
});

parser.on('artist', function(result) {
  assert.strictEqual(result[0], 'Explosions In The Sky');
  assert.strictEqual(result[1], 'Another');
  assert.strictEqual(result[2], 'And Another');
});

parser.on('albumartist', function(result) {
  assert.strictEqual(result[0], 'Soundtrack');
});

parser.on('album', function(result) {
  assert.strictEqual(result, 'Friday Night Lights [Original Movie Soundtrack]');
});

parser.on('year', function(result) {
  assert.strictEqual(result, '2004');
});

parser.on('track', function(result) {
  assert.strictEqual(result.no, 5);
  assert.strictEqual(result.of, 0);
});

parser.on('disk', function(result) {
  assert.strictEqual(result.no, 1);
  assert.strictEqual(result.of, 1);
});

parser.on('genre', function(result) {
  assert.strictEqual(result[0], 'Soundtrack');
});

parser.on('picture', function(result) {
  assert.strictEqual(result[0].format, 'jpg');
  assert.strictEqual(result[0].data.length, 80938);
});

//Raw tests
parser.on('TALB', function(result) {
  assert.strictEqual(result, 'Friday Night Lights [Original Movie Soundtrack]');
});

parser.on('TPE1', function(result) {
  assert.strictEqual(result, 'Explosions In The Sky/Another/And Another');
});

parser.on('TPE2', function(result) {
  assert.strictEqual(result, 'Soundtrack');
});

parser.on('TCOM', function(result) {
  assert.strictEqual(result, 'Explosions in the Sky');
});

parser.on('TPOS', function(result) {
  assert.strictEqual(result, '1/1');
});

parser.on('TCON', function(result) {
  assert.strictEqual(result, 'Soundtrack');
});

parser.on('TIT2', function(result) {
  assert.strictEqual(result, 'Home');
});

parser.on('TRCK', function(result) {
  assert.strictEqual(result, '5');
});

parser.on('TYER', function(result) {
  assert.strictEqual(result, '2004');
});

parser.on('APIC', function(result) {
  assert.strictEqual(result.format, 'image/jpg');
  assert.strictEqual(result.type, 'Cover (front)');
  assert.strictEqual(result.description, '');
  assert.strictEqual(result.data.length, 80938);
});

parser.on('done', function(err) {
  if (err) throw err;
  assert.ok(true);
});