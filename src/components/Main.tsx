import React, { useEffect, useState } from 'react'
import { FlatList, Text, View } from 'react-native'
import StyledText from './StyledText';

export const Main = () => {
  interface PersonalObjectInterface{
  id: number,
  worker: string,
  position: string,
  frente: string,
  contract_code: number,
  activity: string
}
interface PersonalInterface {
  construction:PersonalObjectInterface[],
  office:PersonalObjectInterface[],
  equipment:PersonalObjectInterface[]
}

  const [api, setApi] = useState<PersonalInterface>()

  const callFetch=async() => {
  const api = fetch('http://localhost:3000/api/personal').then(response => response.json()).then(data => {return data})
  await api.then(response => setApi(response))
  }
useEffect(()=>{
  callFetch()
},[])

const construction = api?.construction
const office = api?.office
const equipment = api?.equipment

  
  return (
<>
    {/* Se usa el flatList porque es un componente que permite hacer scroll, está pensado para manejar listas scrolleables
    el data es el array de donde se va a consumir la información
    el render item es el elemento por unitario, vendria siendo como el item en el map
    el ItemSeparatorComponent es lo que va a separar a cada objeto del array
    */}
      <View style={{marginLeft:5}} >
        <StyledText bold red big>
          Construcción
        </StyledText>
      </View>
    <FlatList data={construction} ItemSeparatorComponent={()=>(<Text></Text>)} renderItem={ ({item}) => (
      <div style={{display:'flex', flexDirection:'row', textAlign:'left', gap:15, padding:5, paddingTop:2}}>
        <View>
            <StyledText bold>Trabajador</StyledText>
            <StyledText>{item.worker}</StyledText>
          </View>
          <View>
            <StyledText bold>Actividad</StyledText>
            <StyledText>{item.activity}</StyledText>
          </View>
          <View>
            <StyledText bold>Cargo</StyledText>
            <StyledText>{item.position}</StyledText>
          </View>
          <View>
            <StyledText bold> Frente de obra</StyledText>
            <StyledText>{item.frente}</StyledText>
          </View>
          {/* <View>
            <StyledText bold> Frente de obra</StyledText>
            <StyledText>{item.frente}</StyledText>
          </View> */}
        </div>
    )} />
    <View style={{marginTop:10, marginLeft:5}} >
      <StyledText bold red big>
        Oficina
      </StyledText>
    </View>
    <FlatList data={office} ItemSeparatorComponent={()=>(<Text>  </Text>)} renderItem={ ({item}) => (
      <div style={{display:'flex', flexDirection:'row', gap:20, padding:5}}>
        <View>
            <StyledText bold>Trabajador</StyledText>
            <StyledText>{item.worker}</StyledText>
          </View>
          <View>
            <StyledText bold>Actividad</StyledText>
            <StyledText>{item.activity}</StyledText>
          </View>
          <View>
            <StyledText bold>Cargo</StyledText>
            <StyledText>{item.position}</StyledText>
          </View>
          <View>
            <StyledText bold> Frente de obra</StyledText>
            <StyledText>{item.frente}</StyledText>
          </View>
        </div>
    )} />
    <View style={{marginTop:10, marginLeft:5}} >
      <StyledText bold red big>
        Equipo
      </StyledText>
    </View>
    <FlatList data={equipment} ItemSeparatorComponent={()=>(<Text>  </Text>)} renderItem={ ({item}) => (
      <div style={{display:'flex', flexDirection:'row', gap:20, padding:5}}>
        <View>
            <StyledText bold>Trabajador</StyledText>
            <StyledText>{item.worker}</StyledText>
          </View>
          <View>
            <StyledText bold>Actividad</StyledText>
            <StyledText>{item.activity}</StyledText>
          </View>
          <View>
            <StyledText bold>Cargo</StyledText>
            <StyledText>{item.position}</StyledText>
          </View>
          <View>
            <StyledText bold> Frente de obra</StyledText>
            <StyledText>{item.frente}</StyledText>
          </View>
        </div>
    )} />
</>
  )
}