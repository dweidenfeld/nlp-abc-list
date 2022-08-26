export default function sortItems(items: string[]) {
    // deduplicate items
    const dedupedItems = Array.from(new Set(items))
    // sort items
    return dedupedItems.sort((a, b) => a.localeCompare(b))
}
