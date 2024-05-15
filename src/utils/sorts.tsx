export const mapOrder = (originalArray: any[], orderArray: any[], key: any) => {
    if (!originalArray || !orderArray || !key) return []

    const clonedArray = [...originalArray]
    const orderedArray = clonedArray.sort((a, b) => {
        return orderArray?.indexOf(a[key]) - orderArray?.indexOf(b[key])
    })

    return orderedArray
}