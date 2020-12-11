interface ___interType___ {
    end: number,
    pass: number,
    callback: Function,
    target: any,
    arg: any,
}
var precision = 1
var dataList: ___interType___[] = []

var timerHandler: number = undefined!;
var isInit: boolean = false
function runTimer() {
    if (isInit) return
    isInit = true
    timerHandler = setInterval(() => {
        for (let index = 0; index < dataList.length; index++) {
            let element = dataList[index]
            if (!element) continue
            if (!element.callback) {
                dataList.splice(index, 1), index--
                continue
            }
            element.pass = element.pass + precision;
            if (element.pass >= element.end) {
                element.callback.apply(element.target, element.arg)
                dataList.splice(index, 1), index--
            }
        }
    }, 0)
}

export namespace Timer {
    export function push(callback: Function, t: number, target: any, ...arg: any[]) {
        let __argst__: ___interType___ = {
            end: t,
            pass: 0,
            callback: callback,
            target: target,
            arg: arg
        }
        dataList.push(__argst__)
    }

    export function pop(target: any) {
        dataList.forEach((element) => {
            element.target == target && (element.callback = null)
        })
    }

    export function stop() {
        timerHandler != undefined && (clearTimeout(timerHandler), timerHandler = undefined, isInit = false)
    }

    export function startTimer() {//可以恢复执行
        runTimer()
    }
}