/** @jsx h */
import { tw } from "@twind";
import { useState } from 'preact/hooks'
import { h } from "preact";
import DownloadButton from '../components/DownloadButton.tsx'
import Input from '../components/Input.tsx'
import ListInput from '../components/ListInput.tsx'
import UploadButton from '../components/UploadButton.tsx'

export interface ABCListProps {
    items?: string[];
}

export default function ABCList(props: ABCListProps) {
    const [items, setItems] = useState(props.items || [])

    // add item function
    const addItem = (item: string) => setItems([...items, item])

    // add items function
    const addItems = (newItems: string[]) => setItems([...items, ...newItems])

    return (
        <div className={tw`p-4 mx-auto max-w-screen-md`}>
            <h1 className={tw`text-2xl font-bold text-center underline`}>ABC-Liste</h1>
            <div className={tw`p-2.5`}/>
            <Input onEnter={addItem}
                   clearOnEnter={true}
                   placeholder={"Bitte einen Begriff eingeben"}
                   isPrimary={true}/>
            <div className={tw`p-1.5`}/>
            <div className={tw`flex flex-wrap items-center justify-center space-x-2.5`}>
                <UploadButton onUpload={addItems}/>
                <label className={tw`border-2 border-blue-500 rounded-full w-10 h-10 flex items-center justify-center font-bold`}>{items.length}</label>
                <DownloadButton items={items}/>
            </div>
            <ListInput key={items.length} items={items} onUpdate={setItems}/>

        </div>
    )
}
