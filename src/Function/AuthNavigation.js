import { StyleSheet, View } from "react-native";

import { useGlobalContext } from "./Context";


import AdminNavigation from "./AdminNavigation";

import Login from "../Backend/Authentication/Auth";

const AuthNavigations = () => {
  const { currentAdmin, currentAdminF } = useGlobalContext();

  return <>{!currentAdmin ? <Login /> : <AdminNavigation />}</>;
};

export default AuthNavigations;

const styles = StyleSheet.create({});
