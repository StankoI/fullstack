'use strict';

// for (var i = 0; i < 10; i++) {
//     setTimeout(function (x) {
//         console.log(x);
//     }, i * 1000, i);
// }

const callbacks = [];
for (let i = 0; i < 3; i++) {
    callbacks[i] = () =>  {return i * 2 };
}

console.log(callbacks[2]());

