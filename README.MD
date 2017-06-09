# next-url-store
> localStorage/sessionStroage for current url based on next.

## usage:
```js
  var NxUrlStore = require('next-url-store');
  var uStore = new NxUrlStore('__A_UNIQUE_KEY__');

  //Set some data to sessionStorage:
  uStore.session = {name:123};
  uStore.session = {
    age:1234,
    items:[1,2,3,4]
  };


  //Set some data to localStorage:
  uStore.local = {local_name:123};
  uStore.local = {
    local_age:1234,
    local_items:[1,2,3,4]
  };

  //Get data from localStorage:
  console.log(uStore.session);
  console.log(uStore.local);
```

## resources:

## todos:
- [ ] todo list..
