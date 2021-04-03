import { Checkbox } from "primereact/checkbox"
import { Dropdown } from "primereact/dropdown"
const shortid = require("shortid")
const notemptyElement = (idName, label, checked, setCheck, field, options, value, setValue) => {
  const checkboxLabel = (
    <div className='p-inputgroup' key={shortid.generate()}>
      <Checkbox checked={checked} onChange={(e) => setCheck((currentChecked) =>{
          if (currentChecked) setValue({ nullFlavor: options[1]}) 
          return !currentChecked})} />
      <label htmlFor={idName}>{label}</label>
    </div>
  )
  const canNullFlavor = checked ? (
    field
  ) : (
    <Dropdown
      id={idName}
      key={shortid.generate()}
      value={value.nullFlavor}
      options={options}
      onChange={(e) => setValue({ nullFlavor: e.value })}
      optionLabel='NAME'
      tooltip={value.nullFlavor ? value.nullFlavor.DESCRIPTION : ""}
      placeholder='Причина отсутствия'
    />
  )
  return [checkboxLabel, canNullFlavor]
}
export default notemptyElement
