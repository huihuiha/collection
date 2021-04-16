

// A instanceof B
function myinstanceof(A, B) {
    A = A.__proto__
    B = B.prototype
    while (true) {
        if (A === null) {
            return false
        }
        if (A === B) {
            return true
        }

        A = A.__proto__
    }
}

function test() { }