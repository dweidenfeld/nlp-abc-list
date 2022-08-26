/** @jsx h */
import { tw } from "@twind";
import { h } from "preact";
import sortItems from '../utils/sortItems.ts'
import Input from './Input.tsx'

export interface ListInputProps {
    items?: string[];
    onUpdate: (items: string[]) => void;
}

export default function ListInput(props: ListInputProps) {
    // sort items
    const items = sortItems(props.items || [])

    // sort items helper function
    const updateItems = (items: string[]) => {
        props.onUpdate(sortItems(items))
    }

    // update item helper function
    const updateItem = (index: number, item: string) => {
        const newItems = [...items]
        newItems[index] = item
        updateItems(newItems)
    }

    // delete item helper function
    const deleteItem = (index: number) => {
        const newItems = [...items]
        newItems.splice(index, 1)
        updateItems(newItems)
    }

    return (
        <div class={tw`p-4 mx-auto max-w-screen-md`}>
            <ul class={tw`list-none space-y-2.5`}>
                {items.map((value, index) => (
                    <li>
                        <Input key={value}
                               value={value}
                               onEnter={(input) => updateItem(index, input)}
                               onDelete={() => deleteItem(index)}
                               clearOnEnter={true}
                               enableDelete={true}/>
                    </li>
                ))}
            </ul>
        </div>
    );
}
