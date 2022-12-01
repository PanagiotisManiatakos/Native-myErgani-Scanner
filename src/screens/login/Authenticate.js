/* eslint-disable no-undef */
import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, ScrollView, Pressable, Text } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import SelectDropdown from "react-native-select-dropdown";
import authenticate from "../../services/authenticate";
import Loader from "../../components/ui/Loader";
import { ReduxContext } from "../../Context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Authenticate = ({ login }) => {
  const { setSession } = React.useContext(ReduxContext);
  const [loading, setLoading] = useState(true);
  const submitRef = useRef();
  const [uniqueAuth, setUniqueAuth] = useState(false);

  const [company, setCompany] = useState({ code: "", name: "" });
  const [branch, setBranch] = useState({ code: "", name: "" });
  const [user, setUser] = useState({ code: "", name: "" });

  const [companies, setCompanies] = useState([]);
  const [branches, setBranches] = useState([]);
  const [users, setUsers] = useState([]);

  const onCompanyChange = (company) => {
    let branchesArray = [];
    for (let i = 0; i < login.objs.length; i++) {
      if (login.objs[i].COMPANY === company) {
        branchesArray.push(login.objs[i]);
      }
    }
    branchesArray = [...new Map(branchesArray.map((item) => [item.BRANCH, item])).values()];
    setBranches(branchesArray);
    setBranch({ code: branchesArray[0].BRANCH, name: branchesArray[0].BRANCHNAME });

    let userArray = [];
    for (let i = 0; i < login.objs.length; i++) {
      if (login.objs[i].COMPANY === company && login.objs[i].BRANCH === branch.code) {
        userArray.push(login.objs[i]);
      }
    }
    userArray = [...new Map(userArray.map((item) => [item.REFID, item])).values()];
    setUsers(userArray);
    setUser({ code: userArray[0].REFID, name: userArray[0].REFIDNAME });
  };

  const onBranchChange = (branch) => {
    let userArray = [];
    for (let i = 0; i < login.objs.length; i++) {
      if ((login.objs[i].COMPANY = company.code) && (login.objs[i].BRANCH = branch)) {
        userArray.push(login.objs[i]);
      }
    }
    setUsers([...new Map(userArray.map((item) => [item.REFID, item])).values()]);
  };

  const handleAuthenticate = async (e) => {
    e && e.preventDefault();
    setLoading(true);
    const Company = company.code === "" ? login.objs[0].COMPANY : company.code;
    const Branch = branch.code === "" ? login.objs[0].BRANCH : branch.code;
    const RefID = user.code === "" ? login.objs[0].REFID : user.code;
    const Authenticate = await authenticate({
      username: login.username,
      company: Company,
      branch: Branch,
      refID: RefID,
      module: 0,
      sn: login.sn,
      clientID: login.clientID,
    });
    if (Authenticate.success) {
      Authenticate.success = undefined;
      await AsyncStorage.setItem("session", JSON.stringify(Authenticate));
      setSession(Authenticate);
    } else {
      console.log(Authenticate);
      setLoading(false);
    }
  };

  useEffect(() => {
    var coomm = login?.objs ? [...new Map(login.objs.map((item) => [item.COMPANY, item])).values()] : [];
    setCompanies(coomm);
    setCompany({ code: coomm[0].COMPANY, name: coomm[0].COMPANYNAME });
    let objs = login.objs;
    let branchesArray = [];
    for (let i = 0; i < objs.length; i++) {
      if (objs[i].COMPANY === coomm[0].COMPANY) {
        branchesArray.push(objs[i]);
      }
    }
    branchesArray = [...new Map(branchesArray.map((item) => [item.BRANCH, item])).values()];
    setBranches(branchesArray);
    setBranch({ code: branchesArray[0].BRANCH, name: branchesArray[0].BRANCHNAME });
    let userArray = [];
    for (let i = 0; i < objs.length; i++) {
      if (objs[i].COMPANY === coomm[0].COMPANY && objs[i].BRANCH === branchesArray[0].BRANCH) {
        userArray.push(objs[i]);
      }
    }
    userArray = [...new Map(userArray.map((item) => [item.REFID, item])).values()];
    setUsers(userArray);
    setUser({ code: userArray[0].REFID, name: userArray[0].REFIDNAME });

    if (coomm.length === 1) {
      setTimeout(() => setUniqueAuth(true), 500);
      setTimeout(handleAuthenticate, 1000); // eslint-disable-line
    }
    setLoading(false);
  }, []); // eslint-disable-line

  const renderToogleBtn = (isOpened) => (
    <FontAwesome name={isOpened ? "chevron-up" : "chevron-down"} color={"#FFF"} size={18} />
  );

  return (
    <>
      <View style={styles.viewContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical={false}
          contentContainerStyle={styles.scrollViewContainer}
        >
          <SelectDropdown
            data={companies}
            defaultValue={companies[0]}
            onSelect={(selectedItem) => onCompanyChange(selectedItem.COMPANY)}
            defaultButtonText={company.name}
            buttonTextAfterSelection={(selectedItem) => selectedItem.COMPANYNAME}
            rowTextForSelection={(item) => item.COMPANYNAME}
            buttonStyle={styles.dropdownBtnStyle}
            buttonTextStyle={styles.dropdownBtnTxtStyle}
            renderDropdownIcon={(isOpened) => renderToogleBtn(isOpened)}
            selectedRowStyle={{ backgroundColor: "#446" }}
            dropdownIconPosition={"right"}
            dropdownStyle={styles.dropdownDropdownStyle}
            rowStyle={styles.dropdownRowStyle}
            rowTextStyle={styles.dropdownRowTxtStyle}
          />
          <SelectDropdown
            data={branches}
            defaultValue={branches[0]}
            onSelect={(selectedItem) => onBranchChange(selectedItem.BRANCH)}
            defaultButtonText={branches.name}
            buttonTextAfterSelection={(selectedItem) => selectedItem.BRANCHNAME}
            rowTextForSelection={(item) => item.BRANCHNAME}
            buttonStyle={styles.dropdownBtnStyle}
            buttonTextStyle={styles.dropdownBtnTxtStyle}
            renderDropdownIcon={(isOpened) => renderToogleBtn(isOpened)}
            selectedRowStyle={{ backgroundColor: "#446" }}
            dropdownIconPosition={"right"}
            dropdownStyle={styles.dropdownDropdownStyle}
            rowStyle={styles.dropdownRowStyle}
            rowTextStyle={styles.dropdownRowTxtStyle}
          />
          <SelectDropdown
            data={users}
            defaultValue={users[0]}
            onSelect={(selectedItem) => setUser({ code: selectedItem.REFID, name: selectedItem.REFIDNAME })}
            defaultButtonText={users.name}
            buttonTextAfterSelection={(selectedItem) => selectedItem.REFIDNAME}
            rowTextForSelection={(item) => item.REFIDNAME}
            buttonStyle={styles.dropdownBtnStyle}
            buttonTextStyle={styles.dropdownBtnTxtStyle}
            renderDropdownIcon={(isOpened) => renderToogleBtn(isOpened)}
            selectedRowStyle={{ backgroundColor: "#446" }}
            dropdownIconPosition={"right"}
            dropdownStyle={styles.dropdownDropdownStyle}
            rowStyle={styles.dropdownRowStyle}
            rowTextStyle={styles.dropdownRowTxtStyle}
          />
          <Pressable
            ref={submitRef}
            style={uniqueAuth ? styles.buttonSuccess : styles.button}
            onPress={handleAuthenticate}
          >
            <Text className="text-slate-900 font-medium text-sm">Σύνδεση</Text>
          </Pressable>
        </ScrollView>
      </View>
      {loading && <Loader />}
    </>
  );
};

export default Authenticate;

const styles = StyleSheet.create({
  viewContainer: { flex: 1, justifyContent: "center", alignContent: "center" },
  scrollViewContainer: { padding: 30 },
  dropdownBtnStyle: {
    height: 50,
    width: "100%",
    marginVertical: 10,
    marginHorizontal: 0,
    paddingHorizontal: 0,
    backgroundColor: "transparent",
    borderRadius: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#aaa",
  },
  dropdownBtnTxtStyle: { color: "#FFF", marginStart: 0, textAlign: "start", fontWeight: "bold" },
  dropdownDropdownStyle: { backgroundColor: "#444", borderBottomLeftRadius: 12, borderBottomRightRadius: 12 },
  dropdownRowStyle: { backgroundColor: "#444", borderBottomColor: "#C5C5C5" },
  dropdownRowTxtStyle: { color: "#FFF", textAlign: "center", fontWeight: "bold" },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    backgroundColor: "#ffc107",
    padding: 10,
    borderRadius: 5,
  },
  buttonSuccess: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    backgroundColor: "#198754",
    padding: 10,
    borderRadius: 5,
  },
});
