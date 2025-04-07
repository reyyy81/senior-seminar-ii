import { DropPin } from './DropPin';
import {React} from "react";
import { View, StyleSheet} from "react-native";

export function DropsLayout(props) {
    const  drops = props.drops;
    return (
          <View style = {styles.container}> 
            <View style= {styles.leftColumn}>
              {drops.filter((_, index) => index %2 == 0 ).map((drop) => (
                <DropPin key = {drop.id} pin={drop}/>
              ))}
            </View>
            <View style= {styles.rightColumn}>
            {drops.filter((_, index) => index %2 != 0 ).map((drop) => (
                <DropPin key = {drop.id} pin={drop}/>
              ))}
            </View>
        </View>
      );
}
const styles = StyleSheet.create({
    leftColumn: {flex:1, paddingRight: 10, marginRight:5},
    rightColumn: { flex:1, paddingRight:10},
    container: { backgroundColor:"white", padding: 10, flexDirection:"row", justifyContent: "space-between"},
  });