import React, { useEffect, useRef, useState } from 'react'
import { Button, FlatList, Pressable, ScrollView, Text, View,Image } from 'react-native'
import StyledText from './StyledText';
import axios from 'axios';

export const Main = () => {
  interface PersonalObjectInterface{
  id: number,
  worker: string,
  position: string,
  frente: string,
  contract_code: number,
  activity: string
}

interface DtoPersonal{
  worker_id:number|null
  position_id:number|null
  activity_id:number|null
  contract_code:number|null
  place_id:number|null
}


interface PersonalInterface {
  construction:PersonalObjectInterface[],
  office:PersonalObjectInterface[],
  equipment:PersonalObjectInterface[]
}

interface WorkersInterface{
  id: number,
  name: string
}

interface ActivitiesInterface{
  id: number,
  activity: string,
  role: string
}

interface PositionsInterface extends WorkersInterface{
}

interface PlacesInterface {
  id: number,
  latitude: number,
  longitude: number,
  name: string
}

const codes = [{
  id:101,
  name:'Obra-C1'
},
{
  id:121,
  name:'Obra-C2'
},
{
  id:102,
  name:'Obra-C3'
},
{
  id:200,
  name:'Oficina'
},
{
  id:300,
  name:'Equipo'
}
]


interface userAuth{
  id:number,
  password:string,
  username:string,
  token:string
}


  const [personal, setPersonal] = useState<PersonalInterface>()
  const [workers,setWorkers] = useState<WorkersInterface[]>()
  const [activities, setActivities] = useState<ActivitiesInterface[]>()
  const [positions, setPositions] = useState<PositionsInterface[]>()
  const [places,setPlaces] = useState<PlacesInterface[]>()

  const [user,setUser]=useState<userAuth>()

  const [dto, setDto] = useState<DtoPersonal>({
    activity_id:null,
    worker_id:null,
    position_id:null,
    place_id:null,
    contract_code:null
  })

  const callFetch=async() => {


    // axios.get(
    //   'http://localhost:3000/api/personal'
    // ).then(({data}) => setPersonal( data))

    axios.get(
      'http://localhost:3000/api/workers'
    ).then(({data}) => setWorkers(data))

    axios.get(
      'http://localhost:3000/api/activities'
    ).then(({data}) => setActivities(data))

    axios.get(
      'http://localhost:3000/api/positions'
    ).then(({data}) =>  setPositions(data))

    axios.get(
      'http://localhost:3000/api/places'
    ).then(({data}) => setPlaces(data))
  }
useEffect(()=>{
  callFetch()
},[])

const [selected,setSelected] = useState<number>()

const construction = personal?.construction
const office = personal?.office
const equipment = personal?.equipment

const usernameRef = useRef<HTMLInputElement>(null)
const passwordRef = useRef<HTMLInputElement>(null)

const onLogin = () => {
  const username = (usernameRef.current?.value)
  const password = (passwordRef.current?.value)
  axios.post('http://localhost:3000/api/auth/login',{
    username,
    password
  }).then(e=> 
  {
    setUser(e.data)
  }
  ).catch(
    error => alert(error.response.statusText)) 

}

const authAxios = user && axios.create({
  baseURL:'http://localhost:3000/api',
  headers:{
    'Authorization': `Bearer ${user.token}`
  }
})

  useEffect( () =>{
    console.log('hola')
    user && authAxios!.get('/personal').then(data => setPersonal(data.data)).catch(e=> console.log('effecterror',e))
  },[user]
)



console.log('personal',personal)
  return (
<>
    {/* Se usa el flatList porque es un componente que permite hacer scroll, está pensado para manejar listas scrolleables
    el data es el array de donde se va a consumir la información
    el render item es el elemento por unitario, vendria siendo como el item en el map
    el ItemSeparatorComponent es lo que va a separar a cada objeto del array
    */}

    <View style={{backgroundColor:'black', display:'flex', justifyContent:'center', alignItems:'center', paddingBottom:10, paddingTop:10 }}>
      <input ref={usernameRef} type='text' placeholder='username' style={{width:100}}/>
      <input ref={passwordRef} type='password' placeholder='password' style={{width:100, marginBottom:10}}/>
      <Button onPress={onLogin} title='ingresar'  />
    </View>
    {/* <View style={{backgroundColor:'black'}}>
      <Image source={{uri:'http://jmsingenieria.com/jms/wp-content/uploads/2019/03/logo_blanco_jms.png'}} style={{width:100, height:100}} />
    </View> */}
      <View style={{marginLeft:5}} >
        <StyledText bold red big>
          Construcción
        </StyledText>
      </View>
    <FlatList data={construction} ItemSeparatorComponent={()=>(<Text></Text>)} renderItem={ ({item}) => (
      <Pressable onPress={()=>{
        setSelected(item.id)
        alert(`El item con el id: ${item.id} fue seleccionado`)
      }}>
        <div style={{display:'flex', flexDirection:'row', textAlign:'left', gap:10, padding:5, paddingTop:2}}>
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
      </Pressable>
    )} />
    <View style={{marginTop:10, marginLeft:5}} >
      <StyledText bold red big>
        Oficina
      </StyledText>
    </View>
    <FlatList data={office} ItemSeparatorComponent={()=>(<Text>  </Text>)} renderItem={ ({item}) => (
       <Pressable onPress={()=>{
        setSelected(item.id)
        alert(`El item con el id: ${item.id} fue seleccionado`)
      }}>
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
      </Pressable>
    )} />
    <View style={{marginTop:10, marginLeft:5}} >
      <StyledText bold red big>
        Equipo
      </StyledText>
    </View>
    <FlatList data={equipment} ItemSeparatorComponent={()=>(<Text>  </Text>)} renderItem={ ({item}) => (
      <Pressable onPress={()=>{
        setSelected(item.id)
        alert(`El item con el id: ${item.id} fue seleccionado`)
      }}>
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
      </Pressable>
    )} />
    <StyledText bold big>Crear nuevo registro de personal</StyledText>
    <ScrollView horizontal>
    <View style={{marginTop:10, display:'flex', justifyContent:'space-around', flexDirection:'row'}}>
      <View style={{padding:5}}>
        <StyledText bold>Empleado</StyledText>
        <FlatList data={workers} renderItem={({item}) => (
            <Pressable onPress={
              // ()=>alert(item.name)
              () => {
                alert(item.name)
                setDto({
                ...dto,
                worker_id:item.id!
              })
              }}>
            <StyledText>
              {item.name.split('').map((letter)=> letter.replace('_',' '))}
            </StyledText>
            </Pressable>
        )} />
      </View>
      <View style={{padding:10}}>
        <StyledText bold>Cargo</StyledText>
        <FlatList data={positions} renderItem={({item}) => (
            <Pressable onPress={ ()=>
            {
              alert(item.name)
              setDto({
                ...dto,
                position_id:item.id
              })
            }
            }>
            <StyledText>
              {item.name}
            </StyledText>
            </Pressable>
        )} />
      </View>
      <View style={{padding:10}}>
        <StyledText bold>Actividad</StyledText>
        <FlatList data={activities} renderItem={({item}) => (
            <Pressable onPress={()=>
            {
              alert(item.activity)
              setDto({
                ...dto,
                activity_id:item.id
              })
            }
            }>
            <StyledText>
              {item.activity}
            </StyledText>
            </Pressable>
        )} />
      </View>
      <View style={{padding:10}}>
        <StyledText bold>Código</StyledText>
        <FlatList data={codes} renderItem={({item}) => (
            <Pressable onPress={()=>
            {
              alert(item.name)
              setDto({
                ...dto,
                contract_code:item.id
              })
            }
            }>
            <StyledText>
              {item.name}
            </StyledText>
            </Pressable>
        )} />
      </View>
      <View style={{padding:10}}>
        <StyledText bold>Frente</StyledText>
        <FlatList data={places} renderItem={({item}) => (
            <Pressable onPress={()=>
            {
              alert(item.name)
              setDto({
                ...dto,
                place_id:item.id
              })
            }
            }>
            <StyledText>
              {item.name}
            </StyledText>
            </Pressable>
        )} />
      </View>
    </View>
    </ScrollView>
    <Button onPress={()=>
    {
    axios.post('http://localhost:3000/api/personal',dto)
    alert('creado')}
    } title='Crear'/>
    
    <Button
      title='eliminar'
      onPress={()=>{
        axios.delete(`http://localhost:3000/api/personal/${selected}`)
        alert(`El item con el id:${selected} fue eliminado`)
    }}
      color={'red'} 
    />
</>
  )
}
