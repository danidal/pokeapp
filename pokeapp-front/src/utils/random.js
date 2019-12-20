const random = (max, min = 0) => Math.floor(Math.random() * (max - min + 1)) + min

export { random }