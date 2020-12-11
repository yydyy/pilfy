export const GEventTypes = {
    EVENT_SERVER: 0,
    EVENT_REFRESH_PAGE: 1,
}

type TYPE = EventIDs

var EVENT_ID = -1;

export default class EventIDs {
    private eventID: number = null!;
    get id() {
        return this.eventID
    }
    constructor(...arg) {
        this.eventID = (++EVENT_ID);
    }

    execute(data: any): void {
    }
}

//全局派发
export namespace Dispatch {
    var disMap: Object = {}
    var isInit: boolean = false;//防止误碰

    function init() {
        if (isInit) return

        for (let key in GEventTypes) {
            GEventTypes[key] != undefined && (disMap[GEventTypes[key]] = [])
        }
    }
    init()
    export function push(key: number | string, className: TYPE): void {
        disMap[key] instanceof Array && disMap[key].push(className)
    }

    export function pop(key: number | string, className?: TYPE): TYPE | TYPE[] {
        if (className != undefined) {
            let targets = disMap[key] as Array<TYPE>
            let resObj: TYPE = null
            targets.forEach((obj: TYPE, index: number) => {
                if (obj.id == className.id) {
                    resObj = targets.splice(index, 1).shift()
                    return
                }
            })
            return resObj
        }
        let objs = disMap[key] as Array<TYPE>
        delete disMap[key]
        disMap[key] = [];
        return objs
    }

    export function execute(key: string | number, data: any): void {
        let targets = disMap[key] as Array<TYPE>
        targets.forEach((target:TYPE) => {
            target.execute(data)
        })
    }

    // export function executes() {
    //     for (let key in disMap) {
    //         let targets = disMap[key] as Array<TYPE>
    //         for (let target of targets) {
    //             target && target.execute && target.execute()
    //         }
    //     }
    // }

}

declare global {
    interface Window {
        log: Function
    }
    var log: Function;
}

globalThis.log = console.log
