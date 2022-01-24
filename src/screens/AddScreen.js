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
          style = {{borderWidth: 1}}
          />
          <TextInput
          placeholder="content"
          value={cont}
          onChangeText={(val) => setCont(val)}
          style = {{borderWidth: 1, height: 200}}
          />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical:15}}>
<Text>
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
           style={{ alignSelf: 'center', borderWidth: 1, marginVertical: 10}}>
              <Text>
                  {props.route.params.work} Task
              </Text>
          </TouchableOpacity>
</View>
    );
}

const styles = StyleSheet.create({
    
});

export default AddScreen;