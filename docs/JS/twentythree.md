// 函数调用栈

golb1 --> glob1_promise --> glob2_promise


// 宏任务
immediate2

// 微任务




// 最终执行结果
golb1 --> glob1_promise --> glob2_promise -->glob1_nextTick --> glob1_then --> glob2_nextTick --> glob2_then --> timeout1 --> timeout1_promise timeout1_nextTick --> timeout1_then --> immediate1 --> immediate1_promise --> immediate1_nextTick --> timeout2 --> timeout2_promise -->timeout2_nextTick -->timeout2_then --> immediate2 --> immediate2 --> immediate2_nextTick --> immediate2_nextTick