const _ = require("./node_modules/lodash/index");
// 在模块化出现之前，lodash为了避免污染全局变量，那个时候lodash都以下划线_来命名变量，在模块化出现之后，导入时可以随意命名了，这里遵循传统还是选择采用了以往的方式来对lodash进行命名。
const arr = _.compact([1, 2, "", 3, false, 4, 0]);
console.log(arr);
// loadash的compact方法可以将传入的数组中为false的项去除后返回剩下为true的项构成的数组。
