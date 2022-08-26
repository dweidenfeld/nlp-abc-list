/** @jsx h */
import { tw } from '@twind'
import { h } from 'preact'
import { csvToItems } from '../utils/csv.ts'

export interface UploadButtonProps {
    onUpload: (items: string[]) => void;
}

export default function UploadButton(props: UploadButtonProps) {

    const onChange = (e: h.JSX.TargetedEvent<HTMLInputElement>) => {
        // check for input files
        const files = e.currentTarget.files
        if (!files || files.length < 1) {
            return
        }

        // read file
        const reader = new FileReader()
        reader.onload = (e: ProgressEvent<FileReader>) => {
            const csv = e.currentTarget?.result as string
            props.onUpload(csvToItems(csv))
        }
        reader.readAsText(files[0])
    }

    return (
        <div className={tw`h-10 w-10`}>
            <label
                className={tw`button n text-blue-500 hover:text-blue-700 h-12 w-12 flex-none border-blue-500 rounded-lg focus:ring-blue-500 focus:border-blue-500`}
                for="csv-import">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                     stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"/>
                </svg>
            </label>

            <input className={tw`hidden`}
                   id="csv-import"
                   type="file"
                   onChange={onChange}/>
        </div>
    )
}
