import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  RefreshControl,
} from "react-native";
import React from "react";
import { useGlobalContext } from "../../Function/Context";
import { styles } from "../../Function/styles";
import Grouplist from "../Components/Group/Grouplist";

import Header from "../Components/Others/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import Nav from "../Components/Others/Nav";
import Loader from "../Components/Others/Loader";

const Group = ({ navigation }) => {
  const { TeamsFromDB, getTeamsFromDB, competitionType, loader } =
    useGlobalContext();

  const points = TeamsFromDB;
  points.sort(function (a, b) {
    return b.stat.points - a.stat.points;
  });

  const Group1Elements = points.map((group, index) => {
    if (group.TeamGroup === 1 && group.Competition === competitionType) {
      return (
        <Grouplist
          key={index}
          id={group.id}
          name={group.TeamName}
          played={group.stat.matchplayed}
          draw={group.stat.draw}
          win={group.stat.wins}
          lost={group.stat.loss}
          gd={group.stat.gd}
          point={group.stat.points}
        />
      );
    }
  });
  const Group2Elements = points.map((group, index) => {
    if (group.TeamGroup === 2 && group.Competition === competitionType) {
      return (
        <Grouplist
          key={index}
          id={group.id}
          name={group.TeamName}
          played={group.stat.matchplayed}
          draw={group.stat.draw}
          win={group.stat.wins}
          lost={group.stat.loss}
          gd={group.stat.gd}
          point={group.stat.points}
        />
      );
    }
  });

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getTeamsFromDB();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />

      <Nav />

      {loader ? (
        <Loader />
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              colors={["#377D71"]}
              onRefresh={onRefresh}
            />
          }
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.group}>
            <Text style={styles.groupName}>Group One</Text>
            <View style={styles.table}>
              <View style={styles.topTable}>
                {/* <Text style={styles.tableHead}>No</Text> */}
                <Text style={styles.tableHeadOne}>Teams</Text>
                <Text style={styles.tableHead}>P</Text>
                <Text style={styles.tableHead}>W</Text>
                <Text style={styles.tableHead}>L</Text>
                <Text style={styles.tableHead}>D</Text>
                <Text style={styles.tableHead}>GD</Text>
                <Text style={styles.tableHead}>Pts</Text>
              </View>
              {Group1Elements}
            </View>
          </View>
          <View style={styles.group}>
            <Text style={styles.groupName}>Group Two</Text>
            <View style={styles.table}>
              <View style={styles.topTable}>
                {/* <Text style={styles.tableHead}>No</Text> */}
                <Text style={styles.tableHeadOne}>Teams</Text>
                <Text style={styles.tableHead}>P</Text>
                <Text style={styles.tableHead}>W</Text>
                <Text style={styles.tableHead}>L</Text>
                <Text style={styles.tableHead}>D</Text>
                <Text style={styles.tableHead}>GD</Text>
                <Text style={styles.tableHead}>Pts</Text>
              </View>
              {Group2Elements}
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Group;


