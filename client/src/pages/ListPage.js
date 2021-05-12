import React from "react"
import WrappedLayout from "../components/Layout"
import "primeflex/primeflex.css"


export default function ListPage(props) {    
    const content = (
      <div className='p-fluid p-formgrid p-grid' >
        <div className='p-field p-col-12' >
          
        </div>
        <div className='p-field p-col-12 p-md-4'>
          
        </div>
      </div>
    )
   
    return (
        <WrappedLayout title="Список" content={content} />
    )
}