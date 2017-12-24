const r = require('mersenne');

module.exports = function(num) {
    return "NUM:"+r.rand(num.substring(4))
}
