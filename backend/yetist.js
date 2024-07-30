import Gettext from 'gettext';

import GObject from 'gi://GObject';
import LunarDate from 'gi://LunarDate';
import libc from 'gi://libc';

let _ld = Gettext.domain('lunar-date').gettext;

const diZhi = 'Zǐ, Chǒu, Yín, Mǎo, Chén, Sì, Wǔ, Wèi, Shēn, Yǒu, Xū, Hài'.split(', ');
const holidayFormat =
    LunarDate.DATE_MAJOR_VERSION >= 3 ||
    (LunarDate.DATE_MAJOR_VERSION == 2 && LunarDate.DATE_MINOR_VERSION >= 9)
        ? '%(holiday)'
        : '%(jieri)';
const run = _ld('Rùn');
class CLunarDateX extends LunarDate.Date {
    constructor() {
        super();
        this._lang = LunarDateX.lang;
        this._holidayRegion = 'zh_CN.UTF-8';
    }

    setDate(date) {
        this.set_solar_date(
            date.getFullYear(),
            1 + date.getMonth(),
            date.getDate(),
            date.getHours()
        );
    }

    setDateNoon(date) {
        this.set_solar_date(date.getFullYear(), 1 + date.getMonth(), date.getDate(), 12);
    }

    getShi() {
        return _ld(diZhi[~~((+this.strftime('%(hour)') + 1) / 2) % 12]);
    }

    strftimex(str) {
        return this.strftime(str).replace('月月', '月');
    }

    getHoliday() {
        return this.strftime(holidayFormat);
    }

    setLang(lang) {
        this._lang = LunarDateX.lang = lang;
    }

    setHoliday(holidayRegion) {
        this._holidayRegion = holidayRegion + '.UTF-8';
    }
}

Function.prototype.wrap = function () {
    let fn = this;
    // () => {} will not work here,
    // since arrow function does not bind this to the calling object
    // see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this
    return function () {
        // console.log('in wrap', fn, 'arguments', arguments);
        let nl = libc.newlocale(libc.LC_ALL_MASK, 'zh_CN.UTF-8', null);
        // console.log('newlocale ret', nl, typeof nl);
        let ol = libc.uselocale(nl);
        // console.log('uselocale ret', ol);

        let ret = fn.apply(this, arguments);

        let ool = libc.uselocale(-1);
        // console.log('uselocale ret2', ool);
        // console.log('in wrap', fn, arguments, 'ret', ret);
        return ret;
    };
};

// !!! Why can't found getShi and getHoliday when iterating CLunarDateX???
// console.log('typeof LunarDateX', typeof CLunarDateX);
//
// for (const key in CLunarDateX) {
//     const func = CLunarDateX[key];
//     console.log('Iter CLunarDateX.', key, typeof func, func);

//     if (typeof func == 'function' && key.search(/^get|^strftime/) >= 0) {
//         console.log('Wrapping CLunarDateX.', key, typeof func, func);
//         CLunarDateX[key] = func.wrap();
//     }
// }

_ld = _ld.wrap();

console.log('typeof LunarDate.Date.prototype', typeof LunarDate.Date.prototype);

for (const key in LunarDate.Date.prototype) {
    const func = LunarDate.Date.prototype[key];
    if (typeof func == 'function' && key.search(/^get_jieri|^strftime/) >= 0) {
        console.log('Wrapping LunarDate.Date.prototype', key, typeof func, func);
        if (!func.wrap) {
            console.log('no wrap for ', key, func);
        } else {
            LunarDate.Date.prototype[key] = func.wrap();
        }
    }
}

const LunarDateX = GObject.registerClass(CLunarDateX);

// LunarDateX.lang = run == "閏" ? 1 : run == "闰" ? 2 : 0
LunarDateX.backend = 'yetist';

console.log('importing backend', LunarDateX.backend, 'lang', LunarDateX.lang);

export default LunarDateX;
