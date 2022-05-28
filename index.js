//#2: Goal: To be able to understand this function:

// The .bind method from Prototype.js 
Function.prototype.bind = function(){ 
  var fn = this, args = Array.prototype.slice.call(arguments), object = args.shift(); 
  return function(){ 
    return fn.apply(object, args.concat(Array.prototype.slice.call(arguments))); 
  }; 
};




//Ways to define a function
function isNimble() {
  return true;   // can be accessed from anywhere
}

var canFly = function() {
  return true;    // should use after defining
};


window.isDeadly = function() {
  return true;     // should use after defining
};



var ninja = function myNinja(){
  assert( ninja == myNinja, "This function is named two things - at once!" );//true  // can use myNinja only inside of function
};
ninja();
assert( typeof myNinja == "undefined", "But myNinja isn't defined outside of the function." ); // false
log( ninja );




var ninja = {
  yell: function(n){
    return n > 0 ? ninja.yell(n-1) + "a" : "hiy";
  }
};
assert( ninja.yell(4) == "hiyaaaa", "A single object isn't too bad, either." );

var samurai = { yell: ninja.yell };
var ninja = null;

try {
  samurai.yell(4);  
} catch(e){
  assert( false, "Uh, this isn't good! Where'd ninja.yell go?" );
}
//function yell(n) is destroyed it is a annonymous function.




var ninja = { 
  yell: function yell(n){ 
    return n > 0 ? yell(n-1) + "a" : "hiy"; 
  } 
}; 
assert( ninja.yell(4) == "hiyaaaa", "Works as we would expect it to!" ); 
 
var samurai = { yell: ninja.yell }; 
var ninja = {}; 
assert( samurai.yell(4) == "hiyaaaa", "The method correctly calls itself." );


//function yell(n) isn't destroyed





var ninja = { 
  yell: function(n){ 
    return n > 0 ? arguments.callee(n-1) + "a" : "hiy"; 
  } 
}; 
assert( ninja.yell(4) == "hiyaaaa", "arguments.callee is the function itself." );
// instead of function name we can use arguments.callee inside function to call again



var obj = {}; 
var fn = function(){}; 
obj.prop = "some value"; 
fn.prop = "some value"; 
assert( obj.prop == fn.prop, "Both are objects, both have the property." );






function katana(){
  this.isSharp = true;
}
katana();
assert( isSharp === true, "A global object now exists with that name and value." );

var shuriken = {
  toss: function(){
    this.isSharp = true;
  }  // when we call global object will be created.
};
shuriken.toss();
assert( shuriken.isSharp === true, "When it's an object property, the value is set within the object." );



function add(a, b){ 
  return a + b; 
} 
assert( add.call(this, 1, 2) == 3, ".call() takes individual arguments" ); 
assert( add.apply(this, [1, 2]) == 3, ".apply() takes an array of arguments" );



#28: A possible solution for function looping:
function loop(array, fn){ 
  for ( var i = 0; i < array.length; i++ ) 
    fn.call( array, array[i], i ); 
} 
var num = 0; 
loop([0, 1, 2], function(value, i){ 
  assert(value == num++, "Make sure the contents are as we expect it."); 
  assert(this instanceof Array, "The context should be the full array."); 
});
  



unction User(first, last){
  if ( !(this instanceof arguments.callee) )
    return new User(first, last);
  
  this.name = first + " " + last;
}

var name = "Resig";
var user = User("John", name);

assert( user, "This was defined correctly, even if it was by mistake." );
assert( name == "Resig", "The right name was maintained." );





function smallest(array){ 
  return Math.min.apply( Math, array ); 
} 
function largest(array){ 
  return Math.max.apply( Math, array ); 
} 
assert(smallest([0, 1, 2, 3]) == 0, "Locate the smallest value."); 
assert(largest([0, 1, 2, 3]) == 3, "Locate the largest value.");

///////////////////




for ( var d = 0; d < 3; d++ ) (function(d){ 
 setTimeout(function(){ 
   log( "Value of d: ", d ); 
   assert( d == d, "Check the value of d." ); 
 }, d * 200); 
})(d);



LOG Value of d: 0
PASS Check the value of d.
LOG Value of d: 1
PASS Check the value of d.
LOG Value of d: 2
PASS Check the value of d.


//////////////////////////////////

function Ninja(){ 
  this.swung = true; 
} 
 
var ninjaA = new Ninja(); 
var ninjaB = new Ninja(); 
 
Ninja.prototype.swingSword = function(){ 
  return this.swung; 
}; 
 
assert( ninjaA.swingSword(), "Method exists, even out of order." ); 
assert( ninjaB.swingSword(), "and on all instantiated objects." );


//////////////////////////////

function Ninja(){} 
 
var ninja = new Ninja(); 
 
assert( typeof ninja == "object", "However the type of the instance is still an object." );   
assert( ninja instanceof Ninja, "The object was instantiated properly." ); 
assert( ninja.constructor == Ninja, "The ninja object was created by the Ninja function." );





////////////////////////////////////
76: The basics of how prototypal inheritance works.
function Person(){} 
Person.prototype.dance = function(){}; 
 
function Ninja(){} 
 
// Achieve similar, but non-inheritable, results 
Ninja.prototype = Person.prototype; 
Ninja.prototype = { dance: Person.prototype.dance }; 
 
assert( (new Ninja()) instanceof Person, "Will fail with bad prototype chain." ); 
 
// Only this maintains the prototype chain 
Ninja.prototype = new Person(); 
 
var ninja = new Ninja(); 
assert( ninja instanceof Ninja, "ninja receives functionality from the Ninja prototype" ); 
assert( ninja instanceof Person, "... and the Person prototype" ); 
assert( ninja instanceof Object, "... and the Object prototype" );



//////////////////////////////////////


function makeNinja(name){}
function makeSamurai(name, rank){}
assert( makeNinja.length == 1, "Only expecting a single argument" );
assert( makeSamurai.length == 2, "Multiple arguments expected" );