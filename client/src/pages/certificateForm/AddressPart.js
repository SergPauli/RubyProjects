import React, { useEffect, useMemo } from "react"
import AddressFC from "../../components/formElements/Address"
import AreaFC from "../../components/formElements/Area"
import { getOptions, UniversalService } from "../../service/UniversalService"
import WrappedLayout from "../../components/Layout"
const uniService = new UniversalService()
const emptyOptions = getOptions("NullFlavor").filter((r) => "ASKU NA UNK".includes(r.CODE))
export default function AddressPart(props) {
  const eReasons = useMemo(() => emptyOptions, [])
  useEffect(() => {
    if (emptyOptions.length === 0) {
      uniService.index("NullFlavor", true).then((data) => data.filter((r) => "ASKU NA UNK".includes(r.CODE)).map((item) => emptyOptions.push(item)))
    }
  }, [eReasons])
   const content = (
    <div className='p-fluid p-formgrid p-grid'>
      <AddressFC
        paraNum={props.isDeadPlace ? "7" : "5"}
        label={props.isDeadPlace ? "Место смерти" : "Место постоянного жительства (регистрации) умершего(ей)"}
        emptyOptions={eReasons}
        address = {props.address}
      />
      <AreaFC paraNum={props.isDeadPlace ? "8" : "6"} label='Местность' emptyOptions={eReasons} area={props.area} />
    </div>
  )
  return <WrappedLayout title={props.title} content={content} />
}
