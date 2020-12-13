import React from "react"
import WrappedLayout from "../components/Layout"
const content = (
  <div>
    <h1>MainPage</h1>
  </div>
)
export default function MainPage() {
  return <WrappedLayout title="Главная" content={content} />
}
