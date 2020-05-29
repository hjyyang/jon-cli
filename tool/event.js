"use strict";
import Vue from "vue";

//自定义防抖指令--------------------------------
let debOP = {
    //防抖默认参数对象
    wait: 1000, //默认延迟时间为1s
    type: false, //事件类型，false为事件捕获，true为事件冒泡
    cancel: false, //取消事件执行
    flush: false, //立即执行，且只执行一次
};
Vue.directive("debounce", {
    // 当被绑定的元素插入到 DOM 中时
    inserted: function (el, cb) {
        Object.assign(debOP, cb.value); //浅拷贝cb传值

        if (el.nodeType != 1 && !debOP.handle) {
            throw "Error referencing self command";
        }
        el.addEventListener(
            debOP.event,
            debOP.cancel
                ? debounce(debOP.handle, debOP.wait).cancel()
                : debOP.flush
                ? debounce(debOP.handle, debOP.wait).flush()
                : debounce(debOP.handle, debOP.wait),
            debOP.type
        );
    },
    unbind: function (el, cb) {
        //当节点销毁时移除节点事件监听
        el.removeEventListener(
            debOP.event,
            debOP.cancel
                ? debounce(debOP.handle, debOP.wait).cancel()
                : debOP.flush
                ? debounce(debOP.handle, debOP.wait).flush()
                : debounce(debOP.handle, debOP.wait),
            debOP.type
        );
    },
});

function debounce(func, wait = 0) {
    //防抖函数
    let timer = null,
        args;
    function debounced(...arg) {
        args = arg;
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
        return new Promise((res, rej) => {
            timer = setTimeout(async () => {
                try {
                    const result = await func.apply(this, args);
                    res(result);
                } catch {
                    rej(e);
                }
            }, wait);
        });
    }
    //允许取消
    function cancel() {
        clearTimeout(timer);
        timer = null;
    }
    //允许立即执行
    function flush() {
        cancel();
        return func.apply(this, args);
    }
    debounced.cancel = cancel;
    debounced.flush = flush;
    return debounced;
}

//自定义事件代理指令-----------------------------
let dirOp = {
    //事件代理默认参数对象
    event: "click", //执行方法，默认为点击事件
    type: false, //同上放抖事件
    nodeName: "", //代理的每个item节点名
    nodeClass: "", //代理的每个item class
    tagName: "", //当前自定义指令绑定节点名
    handle: null, //代理执行事件方法
    elClass: "", //当前自定义指令绑定节点class,在使用class方式代理时需在该节点加上class
};
Vue.directive("delegation", {
    // 当被绑定的元素插入到 DOM 中时
    inserted: function (el, cb) {
        Object.assign(dirOp, cb.value);
        if (el.nodeType != 1) {
            throw "Error referencing self command";
        }
        dirOp.tagName = el.tagName.toLocaleLowerCase(); //获取指令绑定小写节点名
        dirOp.elClass = el.classList.value;
        el.addEventListener(dirOp.event, delegation, dirOp.type);
    },
    unbind: function (el) {
        el.removeEventListener(dirOp.event, delegation, dirOp.type);
    },
});
function delegation(e) {
    let ev = e || window.event,
        target = ev.target || ev.srcElement,
        tagName = "",
        regStr = dirOp.nodeClass,
        reg = RegExp(regStr);
    if (dirOp.nodeClass) {
        while (
            dirOp.tagName != tagName &&
            dirOp.elClass != target.classList.value //当前目标class与标签名与自定义指令绑定节点相同时停止遍历
        ) {
            tagName = target.tagName.toLocaleLowerCase(); //获取当前目标小写节点名
            if (target.classList.value.match(reg) !== null) {
                //当前目标class列表中匹配到代理的item的class时
                if (!dirOp.handle) {
                    throw "Incorrect event binding";
                }
                dirOp.handle(target); //执行传入方法
                break;
            }
            target = target.parentNode; //往上级节点移动
        }
    } else if (dirOp.nodeName) {
        while (dirOp.tagName != tagName) {
            tagName = target.tagName.toLocaleLowerCase();
            if (tagName === dirOp.nodeName) {
                if (!dirOp.handle) {
                    throw "Incorrect event binding";
                }
                dirOp.handle(target);
                break;
            }
            target = target.parentNode;
        }
    } else {
        throw "No proxy target";
    }
}

//自定义节流指令--------------------------------
Vue.directive("throttle", {
    // 当被绑定的元素插入到 DOM 中时
    inserted: function (el, cb) {},
});

function throttle(func, wait = 0, execFirstCall) {
    let timeout = null,
        args,
        firstCallTimestamp;
    function throttled(...arg) {
        if (!firstCallTimestamp) firstCallTimestamp = new Date().getTime();
        if (!execFirstCall || !args) {
            // console.log("set args:", arg);
            args = arg;
        }
        if (timeout) {
            clearTimeout(timeout);
            timeout = null;
        }
        // 以Promise的形式返回函数执行结果
        return new Promise(async (res, rej) => {
            console.log(new Date().getTime() - firstCallTimestamp);
            if (new Date().getTime() - firstCallTimestamp >= wait) {
                try {
                    const result = await func.apply(this, args);
                    res(result);
                } catch (e) {
                    rej(e);
                } finally {
                    cancel();
                }
            } else {
                timeout = setTimeout(async () => {
                    try {
                        const result = await func.apply(this, args);
                        res(result);
                    } catch (e) {
                        rej(e);
                    } finally {
                        cancel();
                    }
                }, firstCallTimestamp + wait - new Date().getTime());
            }
        });
    }
    function cancel() {
        clearTimeout(timeout);
        args = null;
        timeout = null;
        firstCallTimestamp = null;
    }
    // 允许立即执行
    function flush() {
        cancel();
        return func.apply(this, args);
    }
    throttled.cancel = cancel;
    throttled.flush = flush;
    return throttled;
}

export default throttle;
