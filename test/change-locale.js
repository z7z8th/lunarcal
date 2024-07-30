import Gettext from 'gettext';

import GObject from 'gi://GObject';
import LunarDate from 'gi://LunarDate';
import libc from 'gi://libc';

let _ld = Gettext.domain('lunar-date').gettext;

// setlocale and env LANGUAGE will effect other extensions/ui
// Gettext.setlocale(Gettext.LocaleCategory.ALL, holidayRegion+".UTF-8");
// GLib.setenv('LANGUAGE', holidayRegion, true)
// setTimeout(() => GLib.setenv('LANGUAGE', holidayRegion, true), 1000);

// console.log('getlocale', Gettext.setlocale(Gettext.LocaleCategory.ALL, null));
// Gettext.setlocale(Gettext.LocaleCategory.ALL, holidayRegion+".UTF-8");
// console.log('getlocale', Gettext.setlocale(Gettext.LocaleCategory.ALL, null));

console.log('Rùn', _ld('Rùn'));

// for (let f in libc) {
//     console.log('libc.*', f, libc[f])
// }
// console.log('LC_ALL_MASK', libc.LC_ALL_MASK, 'type', typeof libc.LC_ALL_MASK)

let nl = libc.newlocale(libc.LC_ALL_MASK, 'zh_CN.UTF-8', null);
console.log('newlocale ret', nl.toString(16), typeof nl);

// let dl = libc.duplocale(nl)
// console.log('duplocale ret', dl)
// // console.log('newlocale ret', nl.toString(16))

let ol = libc.uselocale(nl);
console.log('uselocale ret', ol.toString(16));

console.log('Rùn', _ld('Rùn'));

let ool = libc.uselocale(-1);
console.log('uselocale ret2', ool.toString(16));
libc.freelocale(nl);

console.log('Rùn', _ld('Rùn'));
