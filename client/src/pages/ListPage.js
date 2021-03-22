import React, { useState } from "react"
import { InputText } from "primereact/inputtext"
import { RadioButton } from "primereact/radiobutton"
import WrappedLayout from "../components/Layout"
import { AutoComplete } from "primereact/autocomplete"
import { InputSwitch } from "primereact/inputswitch"
import { Dropdown } from "primereact/dropdown"
import "primeflex/primeflex.css"
import { CloudKLADRService } from "../service/CloudKLADRService"
import { UniversalService } from "../service/UniversalService"
    


export default function ListPage() {
    const [checked1, setChecked1] = useState(false)
    const [regions, setRegions] = useState([])
    const [districts, setDistricts] = useState([])
    const [cities, setCities] = useState([])    
    const [selectedAddress, setSelectedAddress] = useState(null)
    const [region, setRegion] = useState({ id: "2800000000000", name: "Амурская обл"})
    const [area, setArea] = useState({ code: "1", name: "городская" })
    const [zip, setZip] = useState("")
    const [flat, setFlat] = useState("")
    const [district, setDistrict] = useState(null)
    const [city, setCity] = useState(null)
    const [filteredAddresses, setFilteredAddresses] = useState(null)
    const [eReasons, setEReasons] = useState([]) 
    const cloudKLADRservice = new CloudKLADRService()
    const uniService = new UniversalService()
    const params = {
      select: ["CODE", "NAME", "DESCRIPTION"],      
      q: {},      
    }
    
    uniService.index("NullFlavor", params).then((data) =>{            
      if (eReasons.length === 0) setEReasons(data.filter((r) => "ASKU NA UNK".includes(r.CODE)))      
    }) 
     
    const onReasonChange = (e) => {      
      setArea(e.value)
    }
        
    const showError = (detail) => {
      this.toast.show({
        severity: "error",
        summary: "Ошибка ",
        detail: detail,
      })
    }
    const searchRegions = (event) => {
      const params = { contentType: "region" }
      if (event.query !== undefined && event.query.length > 0) params.query = event.query
      cloudKLADRservice.getItems(params, "100")
        .then((data) => setRegions(data))
        .catch((error) => showError(error.toString()))
    }
    const searchDistricts = (event) => {      
      const params = { contentType: "district", regionId: region.id }
      if (event.query !== undefined && event.query.length > 0) params.query = event.query      
      cloudKLADRservice.getItems(params)
        .then((data) => setDistricts(data))        
    }
    
    const searchCities = (event) => {      
      const params = { contentType: "city", regionId: region.id }
      if (district && district.id) params.districtId = district.id
      if (event.query !== undefined && event.query.length > 0) params.query = event.query
      cloudKLADRservice.getItems(params)
        .then((data) => setCities(data))       
    }
    
    const searchAddress = (event) => {
      const params = { regionId: region.id, withParent: 1}
      if (event.query !== undefined && event.query.length > 0) { 
        params.query = event.query
        params.oneString = 1 
      } else {         
        params.contentType = "street"        
      }
      if (district && district.id) params.districtId = district.id
      if (city && city.id) params.cityId = city.id
      cloudKLADRservice.getItems(params)
        .then((data) => setFilteredAddresses(data))        
    }

    const clearCity = () => {
      setCity(null)
      setSelectedAddress(null)
      setCities([])
      setZip("")
      setFilteredAddresses([])
    }    
    const clearDistrict = () => {
      setDistrict(null)
      clearCity()
      setDistricts([])
    }
    const content2 = checked1 ? (
      <div className='p-formgroup-inline p-null-flour'>
        <div className='p-field-checkbox'>
          <RadioButton
            inputId='urban'
            name='area'
            value={area}
            onChange={(e) => setArea({ code: "1", name: "городская" })}
            checked={area.code === "1"}
          />
          <label htmlFor='urban'>городская - 1</label>
        </div>
        <div className='p-field-checkbox'>
          <RadioButton
            inputId='vilage'
            name='area'
            value={area}
            onChange={(e) => setArea({ code: "2", name: "сельская" })}
            checked={area.code === "2"}
          />
          <label htmlFor='vilage'>сельская - 2</label>
        </div>
      </div>
    ) : (
      <Dropdown
        class='p-null-flour'
        value={area}
        options={eReasons}
        onChange={onReasonChange}
        optionLabel='NAME'
        tooltip={area.DESCRIPTION}
        placeholder='Причина'
      />
    )
    const content = (
      <div>
        <h1>Ввод адреса из облака КЛАДР</h1>
        <div className='p-fluid p-formgrid p-grid'>
          <div className='p-field p-col-11'>
            <label htmlFor='address'>Полный адрес здания</label>
            <AutoComplete
              id='address'
              dropdown
              forceSelection
              value={selectedAddress}
              suggestions={filteredAddresses}
              completeMethod={searchAddress}
              field='name'
              onChange={(e) => {
                console.log("e.value", e.value)
                setSelectedAddress(e.value)
                if (e.value.zip) setZip(e.value.zip)
              }}
            />
          </div>
          <div className='p-field p-col-1'>
            <label htmlFor='flat'>Квартира</label>
            <InputText id='flat' name='flat' value={flat} type='text' onChange={(e) => setFlat(e.value)} />
          </div>
          <div className='p-field p-col-12 p-md-6'>
            <label htmlFor='region'>Регион</label>
            <AutoComplete
              id='region'
              value={region}
              dropdown
              forceSelection
              suggestions={regions}
              completeMethod={searchRegions}
              field='name'
              onChange={(e) => {
                setRegion(e.value)
                clearDistrict()
              }}
            />
          </div>
          <div className='p-field p-col-12 p-md-6'>
            <label htmlFor='district'>Район</label>
            <AutoComplete
              id='district'
              value={district}
              dropdown
              forceSelection
              suggestions={districts}
              completeMethod={searchDistricts}
              field='name'
              onChange={(e) => {
                setDistrict(e.value)
                clearCity()
              }}
            />
          </div>
          <div className='p-field p-col-12 p-md-6'>
            <label htmlFor='city'>Город</label>
            <AutoComplete
              id='city'
              value={city}
              dropdown
              forceSelection
              suggestions={cities}
              completeMethod={searchCities}
              field='name'
              onChange={(e) => {
                setCity(e.value)
                setSelectedAddress(null)
                if (e.value.zip) setZip(e.value.zip)
              }}
            />
          </div>
          <div className='p-field p-col-12 p-md-2'>
            <label htmlFor='zip'>Индекс</label>
            <InputText id='zip' value={zip} name='zip' type='text' onChange={(e) => setZip(e.value)} />
          </div>
          <div className='p-field p-col-12 p-md-4 p-grid'>
            <div className='p-field p-col-9 p-md-10'>
              <label htmlFor='point'>Местность</label>
              {content2}
            </div>
            <div className='p-col-3 p-md-2 p-null-flour'>
              <InputSwitch checked={checked1} onChange={(e) => setChecked1(e.value)} />
            </div>
          </div>
        </div>
      </div>
    )
    return (
        <WrappedLayout title="Список" content={content} />
    )
}