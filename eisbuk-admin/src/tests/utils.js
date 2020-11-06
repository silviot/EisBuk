const retry = function (func, maxTries, delay) {
  // Retry running the (asyncrhronous) function func
  // until it resolves
  var reTry = 0;
  return new Promise((resolve, reject) => {
    function callFunc() {
      try {
        // eslint-disable-next-line promise/catch-or-return
        func().then(resolve, (reason) => {
          if (++reTry >= maxTries) {
            reject(reason);
          } else {
            setTimeout(
              callFunc,
              typeof delay == "function" ? delay(retry) : delay
            );
          }
        });
      } catch (e) {
        reject(e);
      }
    }
    callFunc();
  });
};

exports.retry = retry;
