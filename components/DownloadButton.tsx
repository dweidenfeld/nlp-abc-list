/** @jsx h */
import { tw } from '@twind'
import { h } from 'preact'
import { itemsToCSV } from '../utils/csv.ts'


export interface DownloadButtonProps {
    items: string[];
    filename?: string;
}

export default function DownloadButton(props: DownloadButtonProps) {
    if (props.items.length == 0) {
        return null
    }

    const csv = itemsToCSV(props.items)
    const content = `data:text/csv;charset=utf-8,${encodeURIComponent(csv)}`

    return (
        <a className={tw`button text-blue-500 hover:text-blue-700 h-12 w-12 flex-none border-blue-500 rounded-lg focus:ring-blue-500 focus:border-blue-500`}
           href={content}
           download={props.filename || "abc-liste.csv"}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round"
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
        </a>
    )
}
