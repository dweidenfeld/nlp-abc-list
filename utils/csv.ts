import sortItems from "./sortItems.ts"

export function itemsToTable(items: string[]): string[][] {
    // sort items
    const sortedItems = sortItems(items)

    // setup table header
    const table = [["Begriff", "Buchstabe", "Zuordnung"]]

    // iterate through all letters from A-Z
    let letterIndex = 0
    let sortedItemIndex = 0
    for (let i = 0; i < Math.max(sortedItems.length, 26); i++) {
        // set letter for current row
        let letter = ""
        let itemsStartingWithLetter = ""
        if (letterIndex < 26) {
            // get letter from A-Z
            letter = String.fromCharCode(65 + letterIndex++)
            // get items starting with letter, case-insensitive
            itemsStartingWithLetter = sortedItems.filter(item => item.toUpperCase().startsWith(letter)).join(", ")
        }

        // get affected sorted item for row
        const sortedItem = sortedItems[sortedItemIndex++]

        // create row
        table.push([
            sortedItem || "",
            letter || "",
            itemsStartingWithLetter || ""
        ])
    }

    return table
}

export function itemsToCSV(items: string[]): string {
    const table = itemsToTable(items)
    return table.map(row => row.join(";")).join("\n")
}

export function csvToItems(csv: string): string[] {
    return csv.split("\n")
        .filter((_, index) => index > 0)
        .map(row => row.split(";")[0])
        .filter((item) => item.length > 0)
}
