import sortItems from "./sortItems.ts"
import CSV from "https://deno.land/x/deno_csv_string@v0.0.2/mod.js";

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

export function tableToItems(table: string[][]): string[] {
    // get all items from table
    const items = table.filter((_, i) => i > 0)
        .map(row => row[0])
        .filter(item => item !== "")

    // sort items
    return sortItems(items)
}

export function itemsToCSV(items: string[]): string {
    // format items to table
    const table = itemsToTable(items)

    // serialize csv
    return CSV.stringify(table)
}

export function csvToItems(csv: string): string[] {
    // deserialize csv
    const table = CSV.parse(csv)

    // format table to items
    return tableToItems(table)
}
