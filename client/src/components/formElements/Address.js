import React, { useEffect, useState, useMemo } from "react"
import { InputText } from "primereact/inputtext"
import { AutoComplete } from "primereact/autocomplete"
import { Dropdown } from "primereact/dropdown"
import "primeflex/primeflex.css"
import { CloudKLADRService } from "../../service/CloudKLADRService"
import { getOptions, UniversalService } from "../../service/UniversalService"
import notemptyElement from "../../components/formElements/notEmptyElement"

const emptyAddress = {
  district: { name: "" },
  city: { name: "" },
  town: { name: "" },
  street: { name: "" },
  building: { name: "" },
  flat: "",
  zip: "",
}
const uniService = new UniversalService()
const cloudKLADRservice = new CloudKLADRService()
const toRemove = new Set()
const getRegions = getOptions("Region").map((r) => 
      ({ id: r.id + "00000000000", name: r.SUBJECT })
    )
export default function AddressFC(props) {
  console.time("Address") 
  const eReasons = useMemo(() => props.emptyOptions || [], [props.emptyOptions])
  const regions = useMemo(() => getRegions, [])   
    
      
  const [address, setAddress] = useState(props.address ? { ...emptyAddress, ...props.address } : { nullFlavor: eReasons[1] })
  const [addresses, setAddresses] = useState([]) 
  const [checkAddress, setCheckAddress] = useState(address.district ? true : false)
  
  useEffect(() => {
    if (regions.length === 0) {
      uniService.index("Region", true).then((data) => {
        data.forEach((r) => regions.push({ id: r.id + "00000000000", name: r.SUBJECT }))
      })};
    return () => {
      // componentWillUnmount - just clear localStorage
      toRemove.forEach((item) => localStorage.removeItem(item))
      toRemove.clear()
    }
  }, [regions])

  useEffect(() => {
    if (props && props.address && checkAddress) setAddress({ ...emptyAddress, ...props.address })
    else if (checkAddress) setAddress({ ...emptyAddress })
    else setAddress({ nullFlavor: eReasons[1] })
  }, [props, checkAddress, eReasons]) 

  const getSuggestions = (event, params) => {
    if (event.query !== undefined && event.query.length > 0) params.query = event.query
    params.regionId = address.region.id
    params.withParent = 1
    if (address.district && address.district.id && params.contentType !== "district") params.districtId = address.district.id
    if (address.city && address.city.id && !"town city district".includes(params.contentType)) params.cityId = address.city.id
    if (address.town && address.town.id && !"town city district".includes(params.contentType)) params.cityId = address.town.id
    if (address.street && address.street.id && !"street town city district".includes(params.contentType)) params.streetId = address.street.id
    const casheKey = Object.values(params).reduce((val, result) => result + val, "")
    const cashed = localStorage.getItem(casheKey)
    if (cashed) {
      try {
        setAddresses(JSON.parse(cashed))
        return
      } catch (e) {
        console.log("error parse in", cashed)
      }
    }
    cloudKLADRservice.getItems(params).then((data) => {
      setAddresses(data)
      localStorage.setItem(casheKey, JSON.stringify(data))
      if (
        params.regionId !== "2800000000000" ||
        event.query ||
        (address.district && address.district.id) ||
        !"city district".includes(params.contentType)
      )
        toRemove.add(casheKey)
    })
  }
  const cleanAddres = ({ id, name, region, ...rest }) => rest
  const onAddressChange = (event) => {
    const newState = cleanAddres({ ...event.value })
    setAddress({ region: address.region, ...emptyAddress, ...newState })
  }  
  const inputElement = checkAddress && address.district ? (
    <div className='p-fluid p-formgrid p-grid' key={props.paraNum+'_div'}>
      <div className='p-field p-col-12 p-md-4'>
        <label htmlFor='region'>регион</label>
        <Dropdown
          id='region'
          value={address.region}
          filter
          showClear
          filterBy='name'
          options={regions}
          optionLabel='name'
          onChange={(e) => {
            setAddress({ ...emptyAddress, region: e.value })
          }}
        />
      </div>
      <div className='p-field p-col-12 p-md-4'>
        <label htmlFor='district'>район</label>
        <AutoComplete
          id='district'
          value={address.district.name}
          dropdown
          forceSelection
          suggestions={addresses}
          completeMethod={(e) => getSuggestions(e, { contentType: "district" }, setAddresses, addresses)}
          field='name'
          onChange={(e) => {
            //console.log("1st", e.value)
            if (e.value.district) onAddressChange(e)
            else
              setAddress({
                ...emptyAddress,
                region: address.region,
                district: { name: e.value },
              })
          }}
        />
      </div>
      <div className='p-field p-col-6 p-md-4'>
        <label htmlFor='city'>город</label>
        <AutoComplete
          id='city'
          value={address.city.name}
          dropdown
          forceSelection
          suggestions={addresses}
          field='name'
          completeMethod={(e) => getSuggestions(e, { contentType: "city" })}
          onChange={(e) => {
            if (e.value.city) {
              onAddressChange(e)
            } else setAddress({ ...emptyAddress, region: address.region, district: address.district, city: { name: e.value } })
          }}
        />
      </div>
      <div className='p-field p-col-6 p-md-4'>
        <label htmlFor='town'>населенный пункт</label>
        <AutoComplete
          id='town'
          value={address.town.name}
          dropdown
          forceSelection
          suggestions={addresses}
          completeMethod={(e) => getSuggestions(e, { contentType: "town" })}
          field='name'
          onChange={(e) => {
            if (e.value.town) {
              onAddressChange(e)
            } else setAddress({ ...address, town: { name: e.value }, street: { name: "" }, building: { name: "" }, zip: "" })
          }}
        />
      </div>
      <div className='p-field p-col-6 p-md-4'>
        <label htmlFor='street'>улица</label>
        <AutoComplete
          id='street'
          value={address.street.name}
          dropdown
          forceSelection
          field='name'
          suggestions={addresses}
          completeMethod={(e) => getSuggestions(e, { contentType: "street" })}
          onChange={(e) => {
            if (e.value.street) {
              onAddressChange(e)
            } else setAddress({ ...address, street: { name: e.value }, building: { name: "" }, zip: "" })
          }}
        />
      </div>
      <div className='p-field p-col-6 p-md-2'>
        <label htmlFor='address'>дом</label>
        <AutoComplete
          id='address'
          dropdown
          forceSelection
          value={address.building.name}
          suggestions={addresses}
          completeMethod={(e) => getSuggestions(e, { contentType: "building" }, setAddresses, addresses)}
          field='name'
          onChange={(e) => {
            if (e.value.building) onAddressChange(e)
            else setAddress({ ...address, building: { name: e.value }, zip: "" })
          }}
        />
      </div>
      <div className='p-field p-col-6 p-md-1'>
        <label htmlFor='flat'>кв.</label>
        <InputText id='flat' value={address.flat} name='flat' type='text' onChange={(e) => setAddress({ ...address, flat: e.target.value })} />
      </div>
      <div className='p-field p-col-6 p-md-2'>
        <label htmlFor='zip'>индекс</label>
        <InputText id='zip' value={address.zip} name='zip' type='text' onChange={(e) => setAddress({ ...address, zip: e.target.value })} />
      </div>
    </div>
  ) : null
  console.timeEnd("Address")
  return (
    <div className='p-field p-col-12'>
      {notemptyElement(
          props.paraNum,
          props.label,
          checkAddress,
          setCheckAddress,
          inputElement,
          eReasons,
          address,
          setAddress
        )}
    </div>
  )
}
