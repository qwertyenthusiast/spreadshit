export class NotImplementedError extends Error { }

var cooldownList = []
export function cooldown(fn, delay) {
    if (!cooldownList[fn] || cooldownList[fn] < Date.now()) {
        fn()
        cooldownList[fn] = Date.now() + delay
    }
}

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
export function numberToLetter(num) {
    if (num >= 26) {
         return numberToLetter(Math.floor(num / 26) - 1) + ALPHABET[num % 26]
    }

    return ALPHABET[num % 26]
}

export function range(start, end) {
    const ret = Array(end - start + 1).keys()
    return Array.from(ret.map((x) => x + start))
}