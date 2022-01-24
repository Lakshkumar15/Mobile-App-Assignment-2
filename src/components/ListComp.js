import * as React from 'react';
import { 
    View,
    Text,
    StyleSheet, 
    TouchableOpacity,
    Dimensions,
    Image
 } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const ListComp = (props) => {
    const {item,onPress} = props;

    const st = () => {
        if( item.status == 0)
        {
            return{
                flex: 1,
      width: windowWidth*0.9,
      marginHorizontal: windowWidth*0.05,
      height: windowHeight*0.06,
      borderRadius: 10,
      borderColor: 'grey',
      borderWidth: 1,
      alignItems: 'center',
      paddingLeft: 10,
      marginTop: 5,
      flexDirection: 'row',
      backgroundColor: 'rgb(240, 155, 149)'
            };
        }
        else
        {
            return{
                flex: 1,
      width: windowWidth*0.9,
      marginHorizontal: windowWidth*0.05,
      height: windowHeight*0.06,
      borderRadius: 10,
      borderColor: 'grey',
      borderWidth: 1,
      alignItems: 'center',
      paddingLeft: 10,
      marginTop: 5,
      flexDirection: 'row',
      backgroundColor: 'rgb(181, 255, 201)'
            };
        }
    }
  return (
  <TouchableOpacity onPress={() => {onPress(item)}}>
      <View style={st()}>
     
      <Text style={{marginLeft: 10}}>
          Title: {`${item.title}`}
      </Text>
      </View>
  </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: windowWidth*0.9,
      marginHorizontal: windowWidth*0.05,
      height: windowHeight*0.06,
      borderRadius: 10,
      borderColor: 'grey',
      borderWidth: 1,
      alignItems: 'center',
      paddingLeft: 10,
      marginTop: 5,
      flexDirection: 'row'
    },
  });

export default ListComp;