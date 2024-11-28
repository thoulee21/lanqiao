function compose(...middlewares) {
    return function(initialValue, callback) {
        function dispatch(index, value) {
            if (index === middlewares.length) {
                return callback(value);
            }
            const middleware = middlewares[index];
            middleware(value, (nextValue) => dispatch(index + 1, nextValue));
        }
        dispatch(0, initialValue);
    };
}

// 示例中间件函数
function middleware1(value, next) {
    console.log('middleware1:', value);
    next(value + 1);
}

function middleware2(value, next) {
    console.log('middleware2:', value);
    next(value * 2);
}

function middleware3(value, next) {
    console.log('middleware3:', value);
    next(value - 3);
}

// 使用 compose 函数
const composedMiddleware = compose(middleware1, middleware2, middleware3);

composedMiddleware(5, (finalValue) => {
    console.log('最终值:', finalValue);
});