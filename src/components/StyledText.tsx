import { StyleSheet,Text } from 'react-native';
const styles = StyleSheet.create({
  text:{
    fontSize:13,
    color:'black'
  },
  bold:{
    fontWeight:'bold'
  },
  red:{
    color:'red'
  },
  big:{
    fontSize:20
  },
  small:{
    fontSize:10
  }
})

// se crea una funcion que va a tener como props el objeto que se creó anteriormente, junto con el children  
export default function StyledText({text, bold, red, children,big, small}:any){
  
  //se crea este array que va a verificar
  const textsTyles=[
    styles.text,
    //si tiene la prop bold, entonces va a contener ese estilo
    bold && styles.bold,
    red && styles.red,
    big&& styles.big,
    small&& styles.small
  ]

  return (
    <Text style={textsTyles} >
      {/* aqui va a aparecer el children (texto) que se le ponga */}
      {children} 
    </Text>
  )
}