import React, {useState, useEffect} from "react";
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import ListComp from "../components/ListComp";
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'UserDatabase.db' });

const HomeScreen = (props) => {

    const item = {
        title: '',
        cont: '',
        status: 0
    }
    const [data, setData] = useState();




    useEffect(() => {
        db.transaction(function (txn) {
          txn.executeSql(
            "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
            [],
            function (tx, res) {
              console.log('item:', res.rows.length);
              if (res.rows.length == 1) {
                //txn.executeSql('DROP TABLE IF EXISTS table_todo', []);
                
                txn.executeSql(
                  'CREATE TABLE IF NOT EXISTS table_todo(id INTEGER PRIMARY KEY AUTOINCREMENT, title VARCHAR(1000), cont VARCHAR(1000), status INTEGER)',
                  [],
                  function (tx, res) {
                      console.log(res)
                  }
                );

               
              }
            }
          );


          db.transaction(function (tx) {
            
            tx.executeSql(
                'SELECT * FROM table_todo',
                [],
                (tx, results) => {
                  var temp = [];
                  
                  for (let i = 0; i < results.rows.length; ++i)
                    {temp.push(results.rows.item(i));
                        console.log(results.rows.item(i))
                    }
                  setData(temp);
                }
              );
          });
          


          
        });
      }, [props.navigation]);
    


const openToDo = (item) => {
    props.navigation.navigate('AddScreen',{work: 'Edit',item: item});
    
  };

    return(
<View style={styles.container}>
<FlatList 
      data = {data}
      keyExtractor = {item => `${item.title}`}
      renderItem = {({item}) => {
        return (
          <View>
           <ListComp 
                item={item}
                onPress={openToDo}
            />
          </ View>
        )
      }}
      />
      <TouchableOpacity style={styles.add} onPress={() => {props.navigation.navigate('AddScreen',{work: 'Add', item})}}>
          <Text style={styles.addtxt}>+</Text>
      </TouchableOpacity>
</View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    add: {
        height: 50,
        width: 50,
        backgroundColor: 'black',
        position: 'absolute',
        bottom: 10,
        alignSelf: 'auto',
        marginLeft: 10,
        borderRadius: 25 
    },
    addtxt: {
        fontSize: 35,
        color: 'white',
        textAlign: 'center'
    }
});

export default HomeScreen;