import Gettext from 'gettext';

import GObject from 'gi://GObject';
import LunarDate from 'gi://LunarDate';
import cairo from 'gi://cairo'
import libc from 'gi://libc'
console.log('cairo ret', cairo.image_surface_create(cairo.rgb24, 1234, 979))

const _ld = Gettext.domain('lunar-date').gettext;

const diZhi = 'Zǐ, Chǒu, Yín, Mǎo, Chén, Sì, Wǔ, Wèi, Shēn, Yǒu, Xū, Hài'.split(', ');
const holidayFormat =
    LunarDate.DATE_MAJOR_VERSION >= 3 ||
    (LunarDate.DATE_MAJOR_VERSION == 2 && LunarDate.DATE_MINOR_VERSION >= 9)
        ? '%(holiday)'
        : '%(jieri)';
const run = _ld('Rùn');

const LunarDateX = GObject.registerClass(
    class LunarDateX extends LunarDate.Date {
        constructor() {
            super();
            this._lang = LunarDateX.lang;
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
            this.set_solar_date(
                date.getFullYear(),
                1 + date.getMonth(),
                date.getDate(),
                12
            );
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
            // setlocale and env LANGUAGE will effect other extensions/ui
            // Gettext.setlocale(Gettext.LocaleCategory.ALL, holidayRegion+".UTF-8");
            // GLib.setenv('LANGUAGE', holidayRegion, true)
            // setTimeout(() => GLib.setenv('LANGUAGE', holidayRegion, true), 1000);

            // console.log('getlocale', Gettext.setlocale(Gettext.LocaleCategory.ALL, null));
            // Gettext.setlocale(Gettext.LocaleCategory.ALL, holidayRegion+".UTF-8");
            // console.log('getlocale', Gettext.setlocale(Gettext.LocaleCategory.ALL, null));


            for (let f in libc) {
                console.log('libc.*', f, libc[f])
            }
            console.log('LC_ALL_MASK', libc.LC_ALL_MASK, 'type', typeof libc.LC_ALL_MASK)

            let nl = libc.newlocale(libc.LC_ALL_MASK, "zh_CN.UTF-8", null);
            console.log('newlocale ret', nl, typeof(nl))

            let dl = libc.duplocale(nl)
            console.log('duplocale ret', dl)
            // console.log('newlocale ret', nl.toString(16))

            let ol = libc.uselocale(nl);
            console.log('uselocale ret', ol)

            console.log('Rùn', _ld('Rùn'))

            let ool = libc.uselocale(ol);
            console.log('uselocale ret2', ool)
        }
    }
);
// LunarDateX.lang = run == "閏" ? 1 : run == "闰" ? 2 : 0
LunarDateX.backend = 'yetist';

console.log('importing backend', LunarDateX.backend, 'lang', LunarDateX.lang);

export default LunarDateX;
