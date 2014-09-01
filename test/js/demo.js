QUnit.test( "hello test", function( assert ) {
  assert.ok( 1 == "1", "Passed!" );
});

QUnit.test( "a basic test example", function( assert ) {
  var value = "helloA";
  assert.equal( value, "hello", "We expect value to be hello" );
});

QUnit.test( "ok test", function( assert ) {
  assert.ok( true, "true succeeds" );
  assert.ok( "non-empty", "non-empty string succeeds" );
 
  assert.ok( false, "false fails" );
  assert.ok( 0, "0 fails" );
  assert.ok( NaN, "NaN fails" );
  assert.ok( "", "empty string fails" );
  assert.ok( null, "null fails" );
  assert.ok( undefined, "undefined fails" );
});

QUnit.test( "equal test", function( assert ) {
  assert.equal( 0, 0, "Zero, Zero; equal succeeds" );
  assert.equal( "", 0, "Empty, Zero; equal succeeds" );
  assert.equal( "", "", "Empty, Empty; equal succeeds" );
  assert.equal( 0, false, "Zero, false; equal succeeds" );
 
  assert.equal( "three", 3, "Three, 3; equal fails" );
  assert.equal( null, false, "null, false; equal fails" );
});

QUnit.test( "deepEqual test", function( assert ) {
  var obj = { foo: "bar" };
 
  assert.deepEqual( obj, { foo: "bar" }, "Two objects can be the same in value" );
});

QUnit.test( "a test", function( assert ) {
  expect( 2 );
 
  function calc( x, operation ) {
    return operation( x );
  }
 
  var result = calc( 2, function( x ) {
    assert.ok( true, "calc() calls operation function" );
    return x * x;
  });
 
  assert.equal( result, 4, "2 square equals 4" );
});

QUnit.test( "a test", function( assert ) {
  expect( 1 );
 
  var $body = $( "body" );
 
  $body.on( "click", function() {
    assert.ok( true, "body was clicked!" );
  });
 
  $body.trigger( "click" );
});

QUnit.asyncTest( "asynchronous test: one second later!", function( assert ) {
  expect( 1 );
 
  setTimeout(function() {
    assert.ok( true, "Passed and ready to resume!" );
    QUnit.start();
  }, 1000);
});

QUnit.asyncTest( "asynchronous test: video ready to play", function( assert ) {
  expect( 1 );
 
  var $video = $( "video" );
 
  $video.on( "canplaythrough", function() {
    assert.ok( true, "video has loaded and is ready to play" );
    QUnit.start();
  });
});