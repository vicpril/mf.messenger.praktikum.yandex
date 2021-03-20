
function isEmpty(value) {
    // console.log(typeof value);
    
    if ( value == 0 ) {
        return true
    } // 0 ""

    if ( typeof value === 'number'  ) {
        return true
    }  // Number

    if ( value === null  ) {
        return true
    }  // null

    if ( typeof value === 'boolean'  ) {
        return true
    } // boolean

    if ( typeof value === 'undefined'  ) {
        return true
    } // undefined

    if ( Array.isArray(value) && value.length === 0  ) {
        return true
    } // []

    if ( value.size !== undefined && value.size > 0 ) {
        return false
    } // Set Map

    if ( Object.keys(value).length === 0 || value.size === 0 ) {
        return true
    } // {}

    if ( typeof value === 'string' ) {
        return false
    } // Number

    return false
        
}

isA

console.log((new Set([1,2,3])).keys());

check(null); // => true
check(true); // => true
check(false); // => true
check(undefined); // => true
check(1); // => true
check(3); // => true
check(15); // => true
check(123); // => true
check('123df'); // => false
check(''); // => true
check([1, 2, 3]); // => false
check([]); // => false
check({ 'a': 1 }); // => false
check({}); // => false
check(0); // => true
check(new Set())
check(new Set([1,2,3]))
check(new Map())
check(new Map().set(0, 'zero'))


console.groupEnd()

function check(value) {
    console.log(value, typeof value, isEmpty(value));
}