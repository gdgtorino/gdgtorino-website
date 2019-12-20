export const chunk = (arr: Array<any>, size: number) =>
    Array(Math.ceil(arr.length / 4)).fill(null).map((_, i) => arr.slice(i * size, i * size + size));
