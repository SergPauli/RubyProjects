import React from 'react'
import WrappedLayout from '../components/Layout'
const content = (
    <div>
        <h1>ListPage</h1>
    </div>
)
export default function ListPage() {
    return (
        <WrappedLayout title="Список" content={content} />
    )
}