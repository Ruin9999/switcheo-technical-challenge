//Iterative approach, O(n) time complexity
var sum_to_n_a = function(n) {
    let sum = 0;
    for(let i = 0; i <= n; i++) {
        sum += i
    }
    return sum;
};

//Recursive approach, O(n) time complexity
var sum_to_n_b = function(n) {
    if(n == 1) return 1;
    return n + sum_to_n_b(n - 1);
};

//Math formula, O(1) time complexity
var sum_to_n_c = function(n) {
    return n * (n + 1) / 2;
};

//console.log(sum_to_n_a(5))
//console.log(sum_to_n_b(5))
//console.log(sum_to_n_c(5))