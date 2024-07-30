let LunarDate;
try {
    console.log('try importing backend yetist');

    ({ default: LunarDate } = await import('./backend/yetist.js'));
} catch (e0) {
    console.log('error importing backend yetist', e0);

    try {
        console.log('try importing backend ytliu0');

        ({ default: LunarDate } = await import('./backend/ytliu0.js'));
    } catch (e1) {
        console.log('error importing backend ytliu0', e1);
        e0.message = 'lunarcal: could not load Lunar Calendar back-end: ' + e0.message;
        throw e0;
    }
}

export default LunarDate;
