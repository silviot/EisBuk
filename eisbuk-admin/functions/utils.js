// round the given val to the nearest multiple of modbase
// roundTo(12, 5) === 10
// roundTo(12, 4) === 12
// roundTo(12, 7) === 7
// roundTo(17, 4) === 16
exports.roundTo = (val, modbase) => Math.floor(val / modbase) * modbase;
