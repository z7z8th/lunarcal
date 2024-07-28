let LunarDate;
try {
    ({ default: LunarDate } = await import('./backend/ytliu0.js'));
} catch (e0) {
    console.log('error importing backend ytliu0', e0)
    try {
        ({ default: LunarDate } = await import('./backend/yetist.js'));
    } catch (e1){
        console.log('error importing backend yetist', e1)
        e0.message = 'lunarcal: could not load Lunar Calendar back-end: ' + e0.message;
        throw e0;
    }
}

export default LunarDate;
