import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import "./FamilyDetails.css";
import DetailGrid from "./DetailGrid";
import SearchDetail from "./SearchDetail";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import SaveIcon from "@material-ui/icons/Save";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    display: "flex",
    flexWrap: "wrap",
  },
  container: {
    padding: theme.spacing(3),
  },
  fieldSpace: {
    padding: "16px 8px 16px 8px",
  },
  searchSpace: {
    padding: "16px 8px 0px 8px",
  },
  okButton: {
    color: "#181d1f",
    border: "1px solid #999",
    margin: theme.spacing(1),
    background: "linear-gradient(45deg, #ffffff 50%, rgb(0 0 0 /40%) 95%)",
  },
  blockField: {
    "&:invalid": {
      border: "red solid 2px",
    },
  },
  multiSelect:{
    minWidth: 201
  },
  apartmentNumber:{
    minWidth: 201
  }
}));

export default function FamilyDetail() {
  const classes = useStyles();
  const [familyName, setFamilyName] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [block, setBlock] = React.useState("");
  const [apartmentNumber, setApartmentNumber] = React.useState("");
  const [name, setName] = React.useState("");
  const [age, setAge] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [relationshipToHead, setRelationshipToHead] = React.useState("");
  const [rowData, setRowData] = React.useState("");
  const [saveBtnDisabled, setSaveBtnDisabled] = React.useState(true);

  const genderChange = (event) => {
    setGender(event.target.value);
  };

  const relationshipToHeadChange = (event) => {
    setRelationshipToHead(event.target.value);
  };

  function saveButtonClick() {
    const url = "http://127.0.0.1:8000/home";
    const payLoad = {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rowData),
    };

    fetch(url, payLoad)
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
        setSaveBtnDisabled(true);
      });
  }

  const addButtonClick = () => {
    let gridData = {};
    gridData.familyName = familyName;
    gridData.phoneNumber = phoneNumber;
    gridData.block = block;
    gridData.apartmentNumber = apartmentNumber;
    gridData.apartmentDetail = block + apartmentNumber;
    gridData.name = name;
    gridData.age = age;
    gridData.gender = gender;
    gridData.relationshipToHead = relationshipToHead;
    setRowData([gridData, ...rowData]);
    setInitialState();
    setSaveBtnDisabled(false);
  };

  function setInitialState() {
    setFamilyName("");
    setPhoneNumber("");
    setBlock("");
    setApartmentNumber("");
    setName("");
    setAge("");
    setGender("");
    setRelationshipToHead("");
  }

  const deleteData = (rowIndex) => {
    rowData.splice(rowIndex, 1);
    setRowData([...rowData]);
  };

  const editData = (rowIndex, updatedData) =>
    setRowData((rowData[rowIndex] = updatedData));

  return (
    <div>
      <Container fixed={true} maxWidth={"md"} className={classes.searchSpace}>
        <Paper elevation={1} className={classes.fieldSpace}>
          <SearchDetail />
        </Paper>
      </Container>
      <Container fixed={true} maxWidth={"md"} className={classes.container}>
        <Paper elevation={2}>
          <Typography variant="h6" align="center">
            Apartment Details
          </Typography>
          <Grid container>
            <Grid item sm={3} className={classes.fieldSpace}>
              <TextField
                required
                fullWidth
                id="familyName"
                name="familyName"
                label="Family Name"
                value={familyName}
                onChange={(value) => setFamilyName(value.target.value)}
              />
            </Grid>
            <Grid item sm={3} className={classes.fieldSpace}>
              <TextField
                fullWidth
                type="number"
                required
                onInput={(e) => {
                  e.target.value = Math.max(0, parseInt(e.target.value))
                    .toString()
                    .slice(0, 10);
                }}
                id="phoneNumber"
                name="phoneNumber"
                label="Phone Number"
                value={phoneNumber}
                onChange={(value) => setPhoneNumber(value.target.value)}
              />
            </Grid>
            <Grid item sm={3} className={classes.fieldSpace}>
              <TextField
                fullWidth
                required
                id="block"
                name="block"
                label="Block"
                inputProps={{ maxLength: 1, pattern: "[A-Za-z]{1}" }}
                value={block}
                onChange={(value) => setBlock(value.target.value)}
              />
            </Grid>
            <Grid item sm={3} className={classes.fieldSpace + " " + classes.apartmentNumber}>
              <TextField
                fullWidth
                type="number"
                required
                onInput={(e) => {
                  e.target.value = Math.max(0, parseInt(e.target.value))
                    .toString()
                    .slice(0, 2);
                }}
                inputProps={{
                  min: 0,
                  max: 99,
                }}
                id="apartmentNumber"
                name="apartmentNumber"
                label="Apartment Number"
                value={apartmentNumber}
                onChange={(value) => setApartmentNumber(value.target.value)}
              />
            </Grid>
          </Grid>
          <br />
          <Typography variant="h6" align="center">
            Family Details
          </Typography>
          <Grid container>
            <Grid item sm={3} className={classes.fieldSpace}>
              <TextField
                fullWidth
                id="name"
                name="name"
                label="Name"
                value={name}
                onChange={(value) => setName(value.target.value)}
              />
            </Grid>
            <Grid item sm={3} className={classes.fieldSpace}>
              <TextField
                fullWidth
                type="number"
                onInput={(e) => {
                  e.target.value = Math.max(0, parseInt(e.target.value))
                    .toString()
                    .slice(0, 2);
                }}
                min={0}
                id="age"
                name="age"
                label="Age"
                value={age}
                onChange={(value) => setAge(value.target.value)}
              />
            </Grid>
            <Grid item sm={3} className={classes.fieldSpace}>
              <FormControl fullWidth className={classes.multiSelect}>
                <InputLabel id="Gender"> Gender </InputLabel>
                <Select
                  labelId="Gender"
                  id="genderSelect"
                  value={gender}
                  onChange={genderChange}
                >
                  <MenuItem value={"Male"}> Male </MenuItem>
                  <MenuItem value={"Female"}> Female </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item sm={3} className={classes.fieldSpace}>
              <FormControl fullWidth className={classes.multiSelect}>
                <InputLabel id="relationship">Relationship To Head</InputLabel>
                <Select
                  labelId="relationship"
                  id="relationshipToHeadSelect"
                  value={relationshipToHead}
                  onChange={relationshipToHeadChange}
                >
                  <MenuItem value={"Head"}> Head </MenuItem>
                  <MenuItem value={"Wife"}> Wife </MenuItem>
                  <MenuItem value={"Child"}> Child </MenuItem>
                  <MenuItem value={"Father"}> Father </MenuItem>
                  <MenuItem value={"Mother"}> Mother </MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid item className={classes.fieldSpace} align="center">
            <Button
              align="center"
              variant="outlined"
              size="medium"
              color="secondary"
              className={classes.okButton}
              onClick={addButtonClick}
              startIcon={<AddIcon />}
            >
              ADD
            </Button>
            <Button
              align="center"
              variant="outlined"
              size="medium"
              color="secondary"
              disabled={saveBtnDisabled}
              className={classes.okButton}
              onClick={saveButtonClick}
              startIcon={<SaveIcon />}
            >
              SAVE
            </Button>
          </Grid>
        </Paper>
      </Container>
      <Grid container>
        <Paper elevation={3}>
          <DetailGrid data={rowData} edit={editData} delete={deleteData} />
        </Paper>
      </Grid>
    </div>
  );
}
