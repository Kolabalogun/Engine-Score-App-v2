import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#edeff2",
    paddingHorizontal: 15,
    paddingVertical: 15,
  },

  // Nav

  navMenu: {
    marginVertical: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  // Home

  dashboard: {
    marginBottom: 10,
  },
  dashboardTitle: {
    fontSize: 18,
    fontWeight: "500",
  },

  dashboardBox: {
    marginVertical: 10,
  
    alignItems: "center",
    borderRadius: 10,
    padding: 15,
  },
  dashboardTitle: {
    fontSize: 18,
    fontWeight: "500",
  },

  competitionName: {
    color: "white",
    fontSize: 14,
    marginBottom: 5,
  },
  matchDay: {
    fontSize: 13,
    color: "#aaa",
  },

  scoreBoard: {
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  teamBoard: {
    fontSize: 18,
    fontWeight: "500",
    alignItems: "center",
  },

  score: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    color: "white",
  },

  teamTxt: {
    color: "white",
    paddingTop: 5,
  },

  scoreTxt: {
    color: "white",
    fontSize: 48,
  },

  eachMatch: {
    borderRadius: 10,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginVertical: 5,
    borderWidth: 3,

    alignItems: "center",

    borderColor: "rgba(209, 225, 240, 0.782)",
  },

  eachMatchTeam: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    color: "white",
    alignItems: "center",
  },

  eachMatchTime: {
    flex: 1,
    alignItems: "center",
  },

  eachMatchTeamTxt: {
    fontWeight: "500",
  },

  eachMatchTeamTime: {
    color: "red",
    fontWeight: "500",
  },

  eachMatchTeamDate: {
    color: "#aaa",
    fontWeight: "400",
  },

  eachMatchTeamTimeScore: {
    color: "red",
    fontWeight: "500",
    fontSize: 20,
  },

  eachMatchTeamDateScore: {
    color: "#aaa",
    fontWeight: "400",
    fontSize: 20,
    paddingHorizontal: 8,
  },

  // Home
});

export { styles };
