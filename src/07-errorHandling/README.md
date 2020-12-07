1. First ordered list item
2. Another item
??* Unordered sub-list.
1. Actual numbers don't matter, just that it's a number
??1. Ordered sub-list
4. And another item.

???You can have properly indented paragraphs within list items. Notice the blank line above, and the leading spaces (at least one, but we'll use three here to also align the raw Markdown).

???To have a line break without a paragraph, you will need to use two trailing spaces.??
???Note that this line is separate, but within the same paragraph.??
???(This is contrary to the typical GFM line break behaviour, where trailing spaces are not required.)

* Unordered list can use asterisks
- Or minuses
+ Or pluses

```javascript
let s = "JavaScript syntax highlighting";

```

### The Voyage


## Functor

An object or data structure you can map over.


functions: map

array, Container, Identity.
Map over a mappable (functor)

# Maybe

* Captures a null check
* The value inside may not be there
* Sometimes has 2 subclasses Just/Nothing (Haskell)
* Sometimes called Option with subclasses Some/None (Scala)

Similar to strategy design pattern, passing in a strategy as a function

gluing functions together that will be run later,
why you use compose & curry

# Either

* used for pure error handling
* Like Maybe but with an error msg embedded
* 2 subclasses:  Left / Right
* Mayps a function over a Right, ignores the Left

# IO

* Like a promise, but it is lazy loading promises
* A functor, with a function inside it
* Lazy a computation "builder"
* Typically used to contain side effects
* You must run IO to perform the operation
* Map appends the function to a list of things to run with the effectful value.
* To pass arguments to the IO, use fn(x){}.toIO() instead of IO(fn(){})
* Composing behaviors, null checks, IO, etc.

# Event Stream

* An infinite list of results
* Dual of array
* Its map is sometimes lazy
* Calls the mapped function each time
an event happens

# Future

* Has an eventual value
* Similar to a promise, but it's lazy
* You must fork it to kick it off
* It takes a function as it's value
* Calls the function with it's result once it's there

# Functor Laws

* Identity
  * map(id) == id

* Composition
  * compose(map(f),map(g)) == map(compose(f,g))
  * compose(map(reverse),toArray)('bingo') == compose(toArray,reverse)("bingo")

* Natural Transformations
  * nt::Fa->Ta
  * Takes one functor to another without knowing anything about the values.
  * maybeToArray(Maybe(2)) //=> 2
  * maybeToArray(Maybe(null)) //=> []
  * compose(map(add(1)),maybeToArray)(Maybe(5))
    => [6]
* Card Games
  * API call with an id and possibly retrieve a postj
    * Future(Maybe(Post))
  * Click nav link and insert html on page
    * EventStream(IO(Dom))
  * Submit signup form return errors or api call to return a user
    * EventStream(Either(Future(User)))


* of method
  * almost like a contructor, puts a value into the context.


* Pointed Functors
  * anything with a map method and an of method

## Monads

* Nest computations
* functions: mjoin, chain
* mjoin :: M M a -> M a  //container of container of a
  * mjoin(Container(Container(2))
   -> Container(2)
   //flattens them like a list
  * compose(mjoin, map(getTrackingId), findOrder) //takes 2 Maybes, getTrackingId & findOrder and joins to one Maybe
  * compose(mjoin, map(sendToServer), mjoin, map(readFile))  // joining futures or Maybes together

* chain :: (a -> M b) -> M a -> M b
  * var chain = function(f){
      return compose(mjoin, map(f));
    }
  //aka flatmap, bind
  * compose(chain(sendToServer), chain(readFile), askUser)
  // replaces mjoin, map

* compose(mjoin, fmap(g), mjoin, fmap(f))
 --> mcompose(g, f)  //composes two Monads

## Monad Laws

//Left identity
mcompose(M, f) == f

//right identity
mcompose(f, M) == f

//associativity
mcompose(mcompose(f,g),h) == mcompose(f, mcompose(g,h))



* Pointed Functor + mjoin|chain = Monad
* When you see mjoin, map(f), can replace with chain(xx)
aka: pure, return, unit, point

## JsBins

* http://jsbin.com/romun/3/edit?html,js,console,output
* http://jsbin.com/zegat/edit?html,js,output
* http://jsbin.com/zixema/edit?js,console,output
