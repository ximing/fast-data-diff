/*
 * 类型不一样就停止比较,直接使用新数据
 * 基本数据类型直接比较
 * 只在同层节点做对比
 * */

const keyList = Object.keys;
const hasProp = Object.prototype.hasOwnProperty;

const isArray = (arg) => {
    return Array.isArray(arg);
};

const diffArrToPath = (to: any[], from: any[], res: any = {}, keyPrev = '') => {
    const len = to.length;
    for (let i = 0; i < len; i++) {
        const toItem = to[i];
        const fromItem = from[i];
        const targetKey = `${keyPrev}[${i}]`;
        if (toItem === fromItem) {
            continue;
        } else if (typeof toItem !== typeof fromItem) {
            res[targetKey] = toItem;
        } else {
            if (typeof toItem !== 'object') {
                res[targetKey] = toItem;
            } else {
                const arrTo = isArray(toItem);
                const arrFrom = isArray(fromItem);
                if (arrTo !== arrFrom) {
                    res[targetKey] = toItem;
                } else if (arrTo && arrFrom) {
                    if (toItem.length < fromItem.length) {
                        res[targetKey] = toItem;
                    } else {
                        // 数组
                        diffArrToPath(toItem, fromItem, res, `${targetKey}`);
                    }
                } else {
                    if (!toItem || !fromItem || keyList(toItem).length < keyList(fromItem).length) {
                        res[targetKey] = toItem;
                    } else {
                        // 对象
                        let shouldDiffObject = true;
                        Object.keys(fromItem).some((key) => {
                            if (typeof toItem[key] === 'undefined') {
                                shouldDiffObject = false;
                                return true;
                            }
                        });
                        if (shouldDiffObject) {
                            diffObjToPath(toItem, fromItem, res, `${targetKey}.`);
                        } else {
                            res[targetKey] = toItem;
                        }
                    }
                }
            }
        }
    }
    return res;
};

const diffObjToPath = (to: any, from: any, res: any = {}, keyPrev = '') => {
    const keys = keyList(to);
    const len = keys.length;
    if (to == null) {
        res[keyPrev] = null;
        return res;
    }
    if (from == null) {
        res[keyPrev] = to;
        return res;
    }
    for (let i = 0; i < len; i++) {
        const key = keys[i];
        const toItem = to[key];
        const fromItem = from[key];
        const targetKey = `${keyPrev}${key}`;
        if (toItem === fromItem) {
            continue;
        } else if (!hasProp.call(from, key)) {
            res[targetKey] = toItem;
        } else if (typeof toItem !== typeof fromItem) {
            res[targetKey] = toItem;
        } else {
            if (typeof toItem !== 'object') {
                res[targetKey] = toItem;
            } else {
                const arrTo = isArray(toItem);
                const arrFrom = isArray(fromItem);
                if (arrTo !== arrFrom) {
                    res[targetKey] = toItem;
                } else if (arrTo && arrFrom) {
                    if (toItem.length < fromItem.length) {
                        res[targetKey] = toItem;
                    } else {
                        // 数组
                        diffArrToPath(toItem, fromItem, res, `${targetKey}`);
                    }
                } else {
                    // null
                    if (!toItem || !fromItem) {
                        res[targetKey] = toItem;
                    } else {
                        // 对象
                        let shouldDiffObject = true;
                        Object.keys(fromItem).some((key) => {
                            if (typeof toItem[key] === 'undefined') {
                                shouldDiffObject = false;
                                return true;
                            }
                        });
                        if (shouldDiffObject) {
                            diffObjToPath(toItem, fromItem, res, `${targetKey}.`);
                        } else {
                            res[targetKey] = toItem;
                        }
                    }
                }
            }
        }
    }
    return res;
};

export const diff = function(newData: any, oldData: any,keyPrev = '') {
    const target = {};
    diffObjToPath(newData, oldData, target, keyPrev);
    return target;
};
