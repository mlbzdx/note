# Promise规范

## 了解异步

异步（`async`hronous）是一个计算机科学和编程领域的概念，指的是在程序执行过程中不需要等待某个操作完成就能继续执行下一步的操作。异步操作允许程序在执行某个长时间运行的任务（如文件读取、网络请求、数据库查询等）的同时，继续执行其他任务，而不会被阻塞。

异步编程的重要性在于它可以提高程序的性能和响应性。当程序需要执行耗时操作时，如果采用同步方式，整个程序可能会被阻塞，用户界面无响应，其他任务无法进行。通过异步编程，程序可以在等待某个任务完成时执行其他任务，从而提高了程序的效率。

在JavaScript中，异步操作非常常见，例如：

1. **网络请求**：通过 `XMLHttpRequest` 或 Fetch API 发送HTTP请求并在响应返回后执行回调函数。

2. **定时器**：使用 `setTimeout` 或 `setInterval` 在一定时间后执行函数。

3. **文件操作**：读取或写入文件通常是异步的操作。

4. **事件处理**：监听用户交互事件（如点击、键盘输入）以及自定义事件，以异步方式处理事件触发。

5. **Promise 和异步函数**：Promise 是一种用于管理异步操作的方式，异步函数（``async`/await`）是基于 Promise 的语法糖，使异步代码更容易理解和维护。

异步编程通常使用回调函数、Promise、``async`/await`等方式来处理异步操作的结果和控制流。这些机制使开发人员能够更好地管理和协调异步任务，以确保程序的正确性和性能。

## Promise基础概念

Promise是一套专门处理异步场景的规范，它能有效的避免回调地狱的产生，使异步代码更加清晰、简洁、统一

这套规范最早诞生于前端社区，规范名称为[Promise A+](https://promisesaplus.com/)

该规范出现后，立即得到了很多开发者的响应

Promise A+ 规定：

1. 所有的异步场景，都可以看作是一个异步任务，每个异步任务，在JS中应该表现为一个**对象**，该对象称之为**Promise对象**，也叫做任务对象

   <img src="http://mdrs.yuanjin.tech/img/20210618154556.png" alt="image-20210618154556558" style="zoom:50%;" />

2. 每个任务对象，都应该有两个阶段、三个状态

   <img src="http://mdrs.yuanjin.tech/img/20210618155145.png" alt="image-20210618155145355" style="zoom:50%;" />

   根据常理，它们之间存在以下逻辑：

   - 任务总是从未决阶段变到已决阶段，无法逆行
   - 任务总是从挂起状态变到完成或失败状态，无法逆行
   - 时间不能倒流，历史不可改写，任务一旦完成或失败，状态就固定下来，永远无法改变

3. `挂起->完成`，称之为`resolve`；`挂起->失败`称之为`reject`。任务完成时，可能有一个相关数据；任务失败时，可能有一个失败原因。

   ![image-20210618160538875](http://mdrs.yuanjin.tech/img/20210618160538.png)

4. 可以针对任务进行后续处理，针对完成状态的后续处理称之为``onFulfilled``，针对失败的后续处理称之为``onRejected``

   ![image-20210618161125894](http://mdrs.yuanjin.tech/img/20210618161125.png)

## 创建Promise

Promise的出现是为例解决回调地狱的问题，下面通过一个例子来演示回调地狱的模拟场景。

### 回调地狱

场景模拟：

小明已经做了三年的母胎 `solo`，终于，在大四下这一学年，他打算通过写一个程序向多个女生表白，当发送的表白信息被第一个女生拒绝后再向下一个女生发送表白信息，直到出现第一个同意交往的女生或者所有女生都拒绝的情况下就停止信息的发送程序。

```javascript
function sendMessage(name, success, failed) {
  // 发送表白信息
  console.log(`${name}，我喜欢你`);
  // 等待消息回复
  console.log("等待消息回复中");
  // 设置一个计时函数，模拟女生过了一段时间后回复
  setTimeout(() => {
    // 生成一个0-1的随机数模拟表白成功的结果，小于0.2表白成功
    const random = Math.random();
    if (random <= 0.2) {
      success("真的吗？小明，我也喜欢你");
    } else {
      failed("对不起，小明，你是个好人");
    }
  }, 1000);
}

sendMessage(
  "小红",
  (reply) => {
    console.log(reply);
  },
  (reply) => {
    console.log(reply);
    sendMessage(
      "小火",
      (reply) => {
        console.log(reply);
      },
      (reply) => {
        console.log(reply);
        //表白失败的情况下，后面继续回调中 ......
        //   直到最后一次表白
        sendMessage(
          "小爱",
          (reply) => {
            console.log(reply);
          },
          (reply) => {
            console.log(reply);
            console.log(
              "终于，小明要继续母胎solo下去，今年继续庆祝自己的双十一吧"
            );
          }
        );
      }
    );
  }
);

```

在这个过程中，回调函数嵌套在回调函数中，如果表白的对象数量过多（这里只是一个例子，在其他情景时程序处理的情况可能更加复杂），那么回调函数大量的循环嵌套，不易于阅读，也不易于维护，也就是所谓的回调地狱 `callback hell`。

### 创建 Promise

使用 `Promise` 构造函数来创建一个 Promise 实例。它接受一个带有两个参数的回调函数，分别是 `resolve` 和 `reject`。这些回调函数分别用于成功和失败的情况。

```javascript
const myPromise = new Promise((resolve, reject) => {
  // 异步操作，完成后调用 resolve 或 reject
});
```

对上面的表白例子创建Promise实例：

```javascript
function sendMessage(name) {
  return new Promise((resolve, reject) => {
    // 发送表白信息
    console.log(`${name}，我喜欢你`);
    // 等待消息回复
    console.log("等待消息回复中");
    // 设置一个计时函数，模拟女生过了一段时间后回复
    setTimeout(() => {
      // 生成一个0-1的随机数模拟表白成功的结果，小于0.2表白成功
      const random = Math.random();
      if (random <= 0.2) {
        resolve("真的吗？小明，我也喜欢你");
      } else {
        reject("对不起，小明，你是个好人");
      }
    }, 1000);
  });
}
```

对象实例被返回，这时处理对象实例的常见情形。对象实例在创建时会接受一个带有两个参数的回调函数，这里根据随机数来调用成功的 `resolve`回调，或者调用失败的 `reject` 回调。

### Promise 的 `then（）`方法

Promise对象实例可以调用 `then()`方法

`then()` 是 Promise 对象的一个方法，用于处理 Promise 的状态变化（从等待状态到成功或失败）并执行相应的回调函数。它接受两个参数，第一个参数是在 Promise 成功时要执行的回调函数，第二个参数是在 Promise 失败时要执行的回调函数。

基本语法如下：

```javascript
promise.then(`onFulfilled`, `onRejected`);
```

- ``onFulfilled``：当 Promise 成功解决时（状态变为 `fulfilled`），这个回调函数将被执行。它会接收成功时的结果作为参数。

- ``onRejected``：当 Promise 被拒绝时（状态变为 `rejected`），这个回调函数将被执行。它会接收拒绝时的原因（通常是一个 Error 对象）作为参数。

下面的例子是对上面创建的实例对象中 `then`方法的调用 ，演示了如何使用 `then()` 方法处理 Promise 的成功和失败情况：

```javascript
sendMessage("小红").then(
  (reply) => {
    console.log(reply);
  },
  (reply) => {
    console.log(reply);
  }
);
```

`then()` 方法用于指定成功和失败时的处理函数。两个处理函数最终都会在Promise 中被调用。

接收的第一个函数``onFulfilled``会传递给创建Promise时的 `resolve`形参，并在成功后被调用。

接收的第二个函数``onRejected``会传递给创建Promise时的 `reject`形参，并在失败后被调用。

需要注意的是，`then()` 方法返回一个新的 Promise 对象，它代表了第一个回调函数（无论是成功还是失败）返回的值。这意味着你可以链式调用多个 `then()` 方法来处理多个 Promise，形成 Promise 链，使异步代码更具可读性。

当 Promise 链中的任何一个 `then()` 方法的回调函数返回一个 Promise 时，该 Promise 会被等待，直到它解决或拒绝，然后继续执行 Promise 链中的下一个 `then()` 方法。这使得异步控制流更加灵活。

### Promise 的其他方法

#### 实例方法

Promise 实例具有以下一些重要的实例方法：

##### **then(`onFulfilled`, `onRejected`)**

`then` 方法用于附加成功和失败的回调函数。它接受两个参数，第一个参数是在 Promise 成功时执行的回调函数（`onFulfilled`），第二个参数是在 Promise 失败时执行的回调函数（`onRejected`）。`then` 方法返回一个新的 Promise，允许你链式调用。

```javascript
promise
  .then(result => {
    // 处理成功情况
  })
  .catch(error => {
    // 处理失败情况
  });
```

##### **catch(`onRejected`)**

`catch` 方法是用于处理 Promise 链中的拒绝（失败）情况的简化形式，它只接受一个回调函数用于处理拒绝情况。

```javascript
promise
  .then(result => {
    // 处理成功情况
  })
  .catch(error => {
    // 处理拒绝情况
  });
```

##### **`finally(onFinally)`**

`finally` 方法用于指定无论 Promise 成功还是失败都要执行的回调函数。通常用于执行清理工作或资源释放。

```javascript
promise
  .then(result => {
    // 处理成功情况
  })
  .catch(error => {
    // 处理失败情况
  })
  .finally(() => {
    // 无论成功还是失败都会执行这里的代码
  });
```

这些实例方法使得处理 Promise 非常方便，允许你在 Promise 链中处理成功和失败情况，并在需要时执行清理操作。它们也可以用于构建更复杂的异步控制流，使代码更具可读性和可维护性。

#### 静态方法

Promise对象具有一些静态方法，这些方法不是在Promise实例上调用的，而是在Promise类上直接调用。以下是一些常见的Promise静态方法：

如何利用这三个函数实现邓哥的要求呢？

| 方法名                         | 含义                                                         |
| ------------------------------ | ------------------------------------------------------------ |
| `Promise.resolve(data)`        | 直接返回一个完成状态的任务                                   |
| `Promise.reject(reason)`       | 直接返回一个拒绝状态的任务                                   |
| `Promise.all(任务数组)`        | 返回一个任务<br />任务数组全部成功则成功<br />任何一个失败则失败 |
| `Promise.any(任务数组)`        | 返回一个任务<br />任务数组任一成功则成功<br />任务全部失败则失败 |
| `Promise.allSettled(任务数组)` | 返回一个任务<br />任务数组全部已决则成功<br />该任务不会失败 |
| `Promise.race(任务数组)`       | 返回一个任务<br />任务数组任一已决则已决，状态和其一致       |

##### **`Promise.resolve(value)`**

返回一个立即成功的Promise，成功值为`value`。这用于将非Promise值转换为Promise。

```javascript
const resolvedPromise = Promise.resolve(42);
resolvedPromise.then(result => {
  console.log(result); // 输出：42
});
```

##### **`Promise.reject(reason)`**

返回一个立即失败的Promise，拒绝原因为`reason`。通常用于快速拒绝一个Promise。

```javascript
const rejectedPromise = Promise.reject("Something went wrong");
rejectedPromise.catch(error => {
  console.error(error); // 输出：Something went wrong
});
```

##### **`Promise.all(iterable)`**

接受一个可迭代对象（通常是包含多个Promise的数组）作为参数，返回一个新的Promise，当可迭代对象中的所有Promise都成功时，该Promise才会成功，否则它会失败。

```javascript
const promises = [promise1, promise2, promise3];
Promise.all(promises)
  .then(results => {
    // 当所有Promise都成功时，results包含所有结果
  })
  .catch(error => {
    // 如果任何一个Promise失败，捕获错误
  });
```

##### **`Promise.race(iterable)`**

接受一个可迭代对象，返回一个新的Promise，只要可迭代对象中的任何一个Promise解决（无论成功还是失败），该Promise就会解决。

```javascript
const promises = [promise1, promise2, promise3];
Promise.race(promises)
  .then(result => {
    // 返回第一个解决的Promise的结果
  })
  .catch(error => {
    // 返回第一个拒绝的Promise的错误
  });
```

##### **`Promise.allSettled(iterable`)**

接受一个可迭代对象，返回一个新的Promise，该Promise在可迭代对象中的所有Promise都已解决后解决，无论它们是成功还是失败。结果是一个包含每个Promise结果的数组，每个结果是一个对象，包含`status`（'fulfilled'或'rejected'）和`value`或`reason`字段。

```javascript
const promises = [promise1, promise2, promise3];
Promise.allSettled(promises)
  .then(results => {
    results.forEach(result => {
      if (result.status === "fulfilled") {
        console.log("成功：" + result.value);
      } else {
        console.error("失败：" + result.reason);
      }
    });
  });
```

这些静态方法使Promise更强大，提供了更多处理和组合异步操作的工具。它们有助于简化异步编程，提高代码的可读性和可维护性。

## Promise的链式调用

![image-20210621103501094](http://mdrs.yuanjin.tech/img/20210621103501.png)

了解Promise的链式调用可以更好的立即Promise任务对象的状态阶段以及数据的在任务中的传递过程。

### 判断 `new Promise` 的状态

在开始Promise的链式调用前，可以先学习如何判断链式调用前 `new Promise()`的状态

1.  `resolve`,表明Promise的阶段从未决阶段转变未已决阶段，状态为完成状态，同时将数据data传递给返回的新Promise任务对象。

   ```javascript
   const pro = new Promise((resolve, reject) => {
     resolve(data);
   });
   ```

   

2. `reject`,表明Promise的阶段从未决阶段转变为已决阶段，状态为失败状态，同时将错误error传递给返回的新Promise任务对象。

   ```javascript
   const pro = new Promise((resolve, reject) => {
     resolve(error);
   });
   ```

3. 当没有出现 `resolve`或者 `reject`被调用时，那么 `new Promise` 的处于未决阶段，状态会被挂起 `<pending>`。

4. 当出现多个 `resolve`或者 `reject`被调用时，只会根据第一个被调用的回调函数判断 `new Promise`的状态阶段以及传入的数据。后面代码会继续运行，但是 `resolve`或者 `reject`回调函数的运行会无效，不会起到再次改变 `new Promise`的状态阶段以及传入的数据的效果。

### 判断链式调用后新任务对象的状态

1. then方法必定会返回一个新的Promise

   可理解为`后续处理也是一个任务`

2. 新任务的状态取决于后续处理：

   - 若没有相关的后续处理，新任务的状态和前任务一致，数据为前任务的数据

     ```javascript
     const pro1 = new Promise((resolve, reject) => {
         reject('error')
     })
     const pro2 = pro1.then((data) => {
         console.log('成功后执行的回调');
     })
     ```
   
     示例中 `pro2` 是对 `pro1` 的链式调用，`pro1` 任务失败，同时 `pro2` 只对任务成功的情况传入了回调函数进行后续处理，但是没有对失败的情况传入回调函数进行后续处理，因此新任务 `pro2`的状态与前任务一致，状态为失败状态，数据为传递过来的错误 `error`
   
   - 若有后续处理但前任务还未执处理，新任务挂起。
   
     前面任务处于挂起状态，则后续任务也处于挂起状态
   
     ```javascript
     const pro1 = new Promise((resolve, reject) => {
         console.log('不进行处理，挂起')
     })
     const pro2 = pro1.then((data) => {
         console.log('成功后指向的回调');
     }, (error) => {
         console.log('失败后执行的回调')
     })
     ```
   
     示例中前任务没有处理，处于挂起状态，即使新任务对两种情况都进行了处理，新的任务还是会处于挂起状态。
   
   - 若后续任务处理了，则根据后续执行的情况确定新任务的状态
     - 后续处理执行无错，新任务的状态为完成，数据为后续处理的返回值
     - 后续处理执行有错，发生错误的代码执行无效并停止执行后续代码，新任务的状态为失败，数据为异常对象
     - 后续执行后返回的是一个任务对象，新任务的状态和数据与该任务对象一致

由于链式任务的存在，异步代码拥有了更强的表达力

## `async` 和 `await` 关键字

有了Promise，异步任务就有了一种统一的处理方式

有了统一的处理方式，ES官方就可以对其进一步优化

ES7推出了两个关键字``async``和`await`，用于更加优雅的表达Promise

### `async`

`async`关键字用于修饰函数，被它修饰的函数，一定返回Promise

```js
async function method1(){
  return 1; // 该函数的返回值是Promise完成后的数据
}

method1(); // Promise { 1 }

async function method2(){
  return Promise.resolve(1); // 若返回的是Promise，则method得到的Promise状态和其一致
}

method2(); // Promise { 1 }

async function method3(){
  throw new Error(1); // 若执行过程报错，则任务是rejected
}

method3(); // Promise { <rejected> Error(1) }
```

### await

`await`关键字表示等待某个Promise完成，**它必须用于``async``函数中**

```js
async function method(){
  const n = await Promise.resolve(1);
  console.log(n); // 1
}

// 上面的函数等同于
function method(){
  return new Promise((resolve, reject)=>{
    Promise.resolve(1).then(n=>{
      console.log(n);
      resolve(1)
    })
  })
}
```

`await`也可以等待其他数据

```js
async function method(){
  const n = await 1; // 等同于 await Promise.resolve(1)
}
```

如果需要针对失败的任务进行处理，可以使用`try-catch`语法

```js
async function method(){
  try{
    const n = await Promise.reject(123); // 这句代码将抛出异常
    console.log('成功', n)
  }
  catch(err){
    console.log('失败', err)
  }
}

method(); // 输出： 失败 123
```

## Promise面试题

Promise的面试题经常结合事件循环考察输出结果，因此先认识进入事件队列的几种情况。

根据目前所学，进入事件队列的函数有以下几种：

- `setTimeout`的回调，宏任务（macro task）
- `setInterval`的回调，宏任务（macro task）
- Promise的`then`函数回调，**微任务**（micro task）
- `requestAnimationFrame`的回调，宏任务（macro task）
- 事件处理函数，宏任务(macro task)

遇见微任务和宏任务

浏览器会优先处理微任务，再处理宏任务。在处理微任务Promise时，如果任务是链式调用，那么需要等前任务完成后才能继续，该任务进入微队列。如果不是链式调用，那么从上至下依次执行微。任务

现在开始面试题的审题与练习：

从上往下执行代码

遇见Promise

* 如果是构造函数，那么构造函数内的代码需要立即执行；
  * 构造函数中如果没有出现 `resolve` 或者 `reject` 方法被调用，那么Promise挂起
  * 构造函数中如果出现了多个 `resolve` 或者 `reject` 方法被调用，那么Promise的状态和数据以第一出现的处理方法为依据，后面的处理方法被调用时执行但是无效。注意，构造函数中处理方法被调用后，后面的代码仍然会继续执行，而不会停止或被跳过。
* 如果是链式调用，那么会进入微队列等待执行，只有在前任务的状态完成后（如果前任务有计时等宏任务处理完后才能处于完成状态，那么先处理宏任务），才能继续处理后面的链式调用，执行微队列中等待的Promise。注意，链式调用的状态和数据取决于最后链式调用的Promise的状态和数据。
* 如果是 `async` 关键字 ，如果没有出现await 关键字，那么从上到下执行，没有错误，状态为完成，数据为返回值；发生错误，状态为失败，数据为抛出的错误。如果出现了await 关键字，停止关键字之后代码的执行，状态为挂起，处于未决阶段。







1. 下面代码的输出结果是什么

   ```js
   const promise = new Promise((resolve, reject) => {
       console.log(1); 
       resolve(); 
       console.log(2);
   })
   // 1：已决 输出 1  数据 undefinded 输出 2
   promise.then(() => {
       console.log(3);
   })  
   // 1：未决 微队列挂起 2：已决 输出 3
   console.log(4);
   // 1：输出 4
   ```

   记录输出结果：

   ```js
   // 1
   // 2
   // 4
   // 3
   ```

2. 下面代码的输出结果是什么

   ```js
   const promise = new Promise((resolve, reject) => {
       console.log(1); 
       setTimeout(()=>{
         console.log(2)
         resolve(); 
       	console.log(3);
       })
   })
   // 1：输出1 未决 微队列 2：输出 2 已决 数据 undefinded 输出 3
   promise.then(() => {
       console.log(4);
   })
   // 1：未决 挂起 2:已决 输出 4
   console.log(5);
   // 1：输出 5
   ```

   输出结果：

   ```js
   //1
   //5
   //2
   //3
   //4
   ```

   

3. 下面代码的输出结果是什么

   ```js
   const promise1 = new Promise((resolve, reject) => {
   	setTimeout(() => {
       resolve()
     }, 1000)
   })
   // 1：未决 宏队列 2：已决 数据 undefinded
   const promise2 = promise1.catch(() => {
     return 2;
   })
   // 1：挂起 2:已决 成功 数据 undefinded
   console.log('promise1', promise1) 
   console.log('promise2', promise2) 
   // 1:输出 'promise1' Promise {<pending>}
   // 1:输出 'promise2' Promise {<pending>}
   setTimeout(() => {
     console.log('promise1', promise1) 
     console.log('promise2', promise2) 
   }, 2000)
   // 2:挂起 宏队列 2:输出  'promise1' Promise {<undefinded>} 'promise2' Promise {<undefinded>}
   ```

   最终输出结果：

   ```js
   //'promise1' Promise {<pending>}
   //'promise2' Promise {<pending>}
   //'promise1' Promise {<undefinded>}
   //'promise2' Promise {<undefinded>}
   ```

   

4. 下面代码的输出结果是什么

   ```js
   async function m(){
     const n = await 1;
     console.log(n);
   }
   m();
   // 1:await 相当于then类似链式调用 未决 微任务 2： 已决 数据 1 输出 1
   console.log(2);
   // 1:输出 2
   ```

   最终输出结果：2 1

5. 下面代码的输出结果是什么

   ```js
   async function m(){
     const n = await 1;
     console.log(n);
   }
   
   (async ()=>{
     await m();
     //1：未决 微队列 2：已决 数据 1 输出 1
     console.log(2);
    // 1：未决 挂起 微队列 2：已决 输出2
   })();
   
   console.log(3);
   //1：输出：3
   ```

   最终输出结果 3 1 2

6. 下面代码的输出结果是什么

   ```js
   async function m1(){
     return 1;
   }
   
   async function m2(){
     const n = await m1();
     console.log(n)
     return 2;
   }
   
   async function m3(){
     const n = m2();
     console.log(n);
     return 3; 
   }
   
   m3().then(n=>{
     console.log(n);
   });
   
   
   m3();
   
   console.log(4);
   
   ```

   结果：4 1 1 2 2 3

7. 下面代码的输出结果是什么

   ```js
   Promise.resolve(1)	
     .then(2)
     .then(Promise.resolve(3))
     .then(console.log)
   ```

8. 下面代码的输出结果是什么

   ```js
   var a;
   var b = new Promise((resolve, reject) => {
     console.log('promise1');
     setTimeout(()=>{
       resolve();
     }, 1000);
   }).then(() => {
     console.log('promise2');
   }).then(() => {
     console.log('promise3');
   }).then(() => {
     console.log('promise4');
   });
   
   a = new Promise(async (resolve, reject) => {
     console.log(a);
     await b;
     console.log(a);
     console.log('after1');
     await a
     resolve(true);
     console.log('after2');
   });
   
   console.log('end');
   ```

9. 下面代码的输出结果是什么

   ```js
   async function async1() {
       console.log('async1 start');
       await async2();
       console.log('async1 end');
   }
   async function async2() {
   	console.log('async2');
   }
   
   console.log('script start');
   
   setTimeout(function() {
       console.log('setTimeout');
   }, 0)
   
   async1();
   
   new Promise(function(resolve) {
       console.log('promise1');
       resolve();
   }).then(function() {
       console.log('promise2');
   });
   console.log('script end');
   ```

   
