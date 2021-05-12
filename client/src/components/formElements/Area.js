import React, { useEffect, useState, useMemo } from "react"
import { RadioButton } from "primereact/radiobutton"
import notemptyElement from "../../components/formElements/notEmptyElement"

export default function AreaFC(props) {
  const eReasons = useMemo(() => props.emptyOptions || [], [props.emptyOptions])
  const [area, setArea] = useState(props.area || { nullFlavor: eReasons[1] })
  const [checkArea, setCheckArea] = useState(area.code ? true : false)
  useEffect(() => {    
    if (props && props.area && checkArea) setArea(props.area)
    else if (checkArea) setArea({ code: "1", name: "городская" })
    else setArea({ nullFlavor: eReasons[1] })
  }, [props, checkArea, eReasons]) 

  const inputElement = checkArea && area.code ? (
      <div className='p-formgroup-inline' key={props.paraNum+'_area'}>
        <div className='p-field-checkbox'>
          <RadioButton
            inputId='urban'
            name='area'
            key={"urban"}
            value={area}
            onChange={(e) => setArea({ code: "1", name: "городская" })}
            checked={area && area.code === "1"}
          />
          <label key={"urbanl"} htmlFor='urban'>
            городская - 1
          </label>
        </div>
        <div className='p-field-checkbox'>
          <RadioButton
            inputId='vilage'
            key={"vilage"}
            name='area'
            value={area}
            onChange={(e) => setArea({ code: "2", name: "сельская" })}
            checked={area && area.code === "2"}
          />
          <label key={"vilagel"} htmlFor='vilage'>
            сельская - 2
          </label>
        </div>
      </div>
    ) : null 
  return (
    <div className='p-field p-col-12 p-md-4'>
      {notemptyElement(props.paraNum, props.label, checkArea, setCheckArea, inputElement, eReasons, area, setArea)}
    </div>
  )
}
