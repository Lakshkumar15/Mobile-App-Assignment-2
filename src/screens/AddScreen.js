import React,{useState} from "react";
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, Alert, Switch } from "react-native";
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'UserDatabase.db' });


const AddScreen = (props) => {
    //console.log(props.route.params)
    const [title, setTitle] = useState(props.route.params.item.title);
    const [cont, setCont] = useState(props.route.params.item.cont);
    const [comp, setComp] = useState(props.route.params.item.status);
    const toggleSwitch = () => setComp(previousState => !previousState);

    let add_task = () => {
    
        if (!title) {
          alert('Please fill title');
          return;
        }
        if (!cont) {
          alert('Please fill content');
          return;
        }
    
        db.transaction(function (tx) {
            
          tx.executeSql(
            'INSERT INTO table_todo (title, cont, status) VALUES (?,?,?)',
            [title, cont, comp],
            (tx, results) => {
              console.log('Results', results.rowsAffected);
              if (results.rowsAffected > 0) {
                Alert.alert(
                  'Success',
                  'Task Successfully',
                  [
                    {
                      text: 'Ok',
                      onPress: () => props.navigation.navigate('Home'),
                    },
                  ],
                  { cancelable: false }
                );
              } else alert('adding failed Failed');
            }
          );
        });
      };

      let deleteTask = () => {
        db.transaction((tx) => {
          tx.executeSql(
            'DELETE FROM  table_todo where id=?',
            [props.route.params.item.id],
            (tx, results) => {
              console.log('Results', results.rowsAffected);
              if (results.rowsAffected > 0) {
                Alert.alert(
                  'Success',
                  'Task deleted successfully',
                  [
                    {
                      text: 'Ok',
                      onPress: () => props.navigation.navigate('Home'),
                    },
                  ],
                  { cancelable: false }
                );
              }
            }
          );
        });
      };

      let update_task = () => {
    
        if (!title) {
          alert('Please fill title');
          return;
        }
        if (!cont) {
          alert('Please fill content');
          return;
        }
    
        db.transaction((tx) => {
            tx.executeSql(
              'UPDATE table_todo set title=?, cont=? , status=? where id=?',
              [title, cont, comp, props.route.params.item.id],
              (tx, results) => {
                console.log('Results', results.rowsAffected);
                if (results.rowsAffected > 0) {
                  Alert.alert(
                    'Success',
                    'User updated successfully',
                    [
                      {
                        text: 'Ok',
                        onPress: () => props.navigation.navigate('Home'),
                      },
                    ],
                    { cancelable: false }
                  );
                } else alert('Updation Failed');
              }
            );
          });
        }




    return(
<View>

          <TextInput
          placeholder="Title"
          value={title}
          onChangeText={(val) => setTitle(val)}
          style = {{fontWeight: 'bold', paddingHorizontal: 20, fontSize: 17,borderWidth: 1, borderRadius: 10, width: "90%", alignSelf: 'center', marginTop: 15}}
          />
          <TextInput
          placeholder="content"
          value={cont}
          onChangeText={(val) => setCont(val)}
          style = {{fontWeight: 'bold', paddingHorizontal: 20, fontSize: 17,borderWidth: 1, borderRadius: 10, width: "90%", alignSelf: 'center', marginTop: 15, height: 200}}
          />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical:15, width: "90%", alignSelf: 'center', marginTop: 15,borderWidth: 0.5, borderRadius: 5, paddingHorizontal: 5}}>
<Text style={{alignSelf: 'center'}}>
    Turn on switch if task completed.
</Text>
          <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={comp ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={comp}
      />

          </View>
          

          <TouchableOpacity
          onPress={() => {
              if(props.route.params.work == 'Add')
                { 
                    add_task();
                }
                else 
                {
                    update_task();
                }
    
    }}
           style={{ alignSelf: 'center', borderWidth: 1, marginVertical: 10, borderRadius: 5, }}>
              <Text style={{fontSize: 20, margin: 10, color: 'black'}}>
                  {props.route.params.work} Task
              </Text>
          </TouchableOpacity>
          {
            props.route.params.work == 'Edit' ? 
            <TouchableOpacity
          onPress={() => { deleteTask() }}
           style={{ alignSelf: 'center', borderWidth: 1, marginVertical: 10, borderRadius: 5}}>
              <Text style={{fontSize: 20, margin: 10, color: 'black'}}>
                Delete Task
              </Text>
          </TouchableOpacity>: null
          }
</View>
    );
}

const styles = StyleSheet.create({
    
});

export default AddScreen;
