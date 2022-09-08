/** @jsx h */
import { IS_BROWSER } from '$fresh/src/runtime/utils.ts'
import { tw } from "@twind";
import { h } from "preact";
import { useState } from 'preact/hooks'

export interface InputProps extends h.JSX.HTMLAttributes<HTMLInputElement> {
    onEnter: (input: string) => void;
    onDelete?: () => void;
    value?: string;
    placeholder?: string;
    clearOnEnter?: boolean;
    enableDelete?: boolean;
    isPrimary?: boolean;
}

export default function Input(props: InputProps) {
    const [value, setValue] = useState(props.value || '')

    // delete handler
    const onDelete = () => {
        if (props.onDelete) {
            props.onDelete()
        }
    }

    // onChange handler
    const onChange = (e: h.JSX.TargetedEvent<HTMLInputElement>) => {
        // determine actual input value
        const value = e.currentTarget.value

        // clear input if clearOnEnter is true
        if (props.clearOnEnter) {
            setValue("")
        }
        // propagate input value
        if (value.length > 0) {
            if (props.onEnter) {
                props.onEnter(value)
            }
        } else {
            onDelete()
        }
    }

    // button classes
    let buttonClasses = tw`flex-auto border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`
    if (props.isPrimary) {
        buttonClasses += ' ' + tw`bg-blue-50 border-blue-500`
    } else {
        buttonClasses += ' ' + tw`bg-gray-50 border-gray-300`
    }

    return (
        <div className={tw`flex space-x-2.5`}>
            <input
                className={buttonClasses}
                disabled={!IS_BROWSER}
                onChange={onChange}
                value={value}
                placeholder={props.placeholder}
            />
            {props.enableDelete && value.length > 0 && (
                <div className={tw`flex-none h-12 w-12 text-red-500 focus:text-red-700 hover:text-red-700`}>
                    <a href="#" onClick={onDelete}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                    </a>
                </div>
            )}
        </div>
    )
}
