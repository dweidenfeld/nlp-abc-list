import { assertEquals } from "https://deno.land/std@0.153.0/testing/asserts.ts";

import { csvToItems, itemsToCSV, itemsToTable } from './csv.ts'

Deno.test("itemsToTable min", () => {
    const table = itemsToTable(["VAKOG", "Visual", "Audio", "Kinesthetic", "Olfactory", "Gustatory"])

    assertEquals([
        ["Begriff", "Buchstabe", "Zuordnung"],
        ["Audio", "A", "Audio"],
        ["Gustatory", "B", ""],
        ["Kinesthetic", "C", ""],
        ["Olfactory", "D", ""],
        ["VAKOG", "E", ""],
        ["Visual", "F", ""],
        ["", "G", "Gustatory"],
        ["", "H", ""],
        ["", "I", ""],
        ["", "J", ""],
        ["", "K", "Kinesthetic"],
        ["", "L", ""],
        ["", "M", ""],
        ["", "N", ""],
        ["", "O", "Olfactory"],
        ["", "P", ""],
        ["", "Q", ""],
        ["", "R", ""],
        ["", "S", ""],
        ["", "T", ""],
        ["", "U", ""],
        ["", "V", "VAKOG, Visual"],
        ["", "W", ""],
        ["", "X", ""],
        ["", "Y", ""],
        ["", "Z", ""],
    ], table)
})

Deno.test("itemsToTable max", () => {
    // letter A-Z
    const table = itemsToTable(["VAKOG", "Visual", "Audio", "Kinesthetic", "Olfactory", "Gustatory",
        ...Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i))])

    assertEquals([
        ["Begriff", "Buchstabe", "Zuordnung"],
        ["A", "A", "A, Audio"],
        ["Audio", "B", "B"],
        ["B", "C", "C"],
        ["C", "D", "D"],
        ["D", "E", "E"],
        ["E", "F", "F"],
        ["F", "G", "G, Gustatory"],
        ["G", "H", "H"],
        ["Gustatory", "I", "I"],
        ["H", "J", "J"],
        ["I", "K", "K, Kinesthetic"],
        ["J", "L", "L"],
        ["K", "M", "M"],
        ["Kinesthetic", "N", "N"],
        ["L", "O", "O, Olfactory"],
        ["M", "P", "P"],
        ["N", "Q", "Q"],
        ["O", "R", "R"],
        ["Olfactory", "S", "S"],
        ["P", "T", "T"],
        ["Q", "U", "U"],
        ["R", "V", "V, VAKOG, Visual"],
        ["S", "W", "W"],
        ["T", "X", "X"],
        ["U", "Y", "Y"],
        ["V", "Z", "Z"],
        ["VAKOG", "", ""],
        ["Visual", "", ""],
        ["W", "", ""],
        ["X", "", ""],
        ["Y", "", ""],
        ["Z", "", ""],
    ], table)
})

Deno.test("itemsToCSV", () => {
    const csv = itemsToCSV(["a", "b", "c"])

    assertEquals(
`Begriff;Buchstabe;Zuordnung
a;A;a
b;B;b
c;C;c
;D;
;E;
;F;
;G;
;H;
;I;
;J;
;K;
;L;
;M;
;N;
;O;
;P;
;Q;
;R;
;S;
;T;
;U;
;V;
;W;
;X;
;Y;
;Z;`, csv)
})

Deno.test("csvToItems", () => {
    // given
    const testItems = ["a", "b", "c"]

    // when
    const items = csvToItems(itemsToCSV(testItems))

    // then
    assertEquals(items, testItems)
})
