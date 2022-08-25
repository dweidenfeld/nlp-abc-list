/** @jsx h */
import { h } from "preact";
import ABCList from '../islands/ABCList.tsx'

export default function Home() {
    return (
        <ABCList items={['VAKOG', 'Visuell', 'Auditiv', 'Kinästhetisch']}/>
    );
}
