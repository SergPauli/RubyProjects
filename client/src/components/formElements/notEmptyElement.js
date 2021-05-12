import { Checkbox } from "primereact/checkbox"
import { Dropdown } from "primereact/dropdown"
const shortid = require("shortid")
const notemptyElement = (paraNum, label, checked, setCheck, field, options, value, setValue) => {
  const checkboxLabel = (
    <div className='p-inputgroup' key={shortid.generate()}>
      <span className='paragraph'>{paraNum}.</span>
      <label className='paragraph' htmlFor={"p" + paraNum}>
        {label}
      </label>
      <Checkbox        
        style={{ marginLeft: "0.4Rem" }}
        checked={checked}
        onChange={(e) =>{setCheck(e.checked)        
        }}
      />
    </div>
  )
  const canNullFlavor = checked ? (
    field
  ) : (
    <Dropdown
      id={"p" + paraNum}
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
