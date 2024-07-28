let LunarDate
try {
  ;({default: LunarDate} = await import('./backend/ytliu0.js'))
} catch (e0) {
  try {
    ;({default: LunarDate} = await import('./backend/yetist.js'))
  } catch {
    e0.message = "lunarcal: could not load Lunar Calendar back-end: " + e0.message
    throw e0
  }
}
export default LunarDate
