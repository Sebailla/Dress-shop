export const sleep = (s: number = 1) => {
    return new Promise(res => {
        setTimeout(() => {
            res(true)
        }, s * 1000)
    })
}
