import * as React from "react";
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function AddressForm(props) {
  // fetch the cpu's id number from the url
  const id = props.id;

  // HOOKS SECTION ---------------------------------------------------
  // fetch all sockets
  const [socket, setSocket] = useState([]);
  const getSocketData = () => {
    try {
      axios.get("http://localhost:8080/socket/get-all").then((res) => {
        setSocket(res.data);
      });
    } catch (e) {
      console.log(e);
    }
  };

  // fetch the exact cpu
  const [cpu, setCpu] = useState({});
  const getCpuData = () => {
    try {
      axios.get(`http://localhost:8080/cpu/get/${id}`).then((res) => {
        setCpu(res.data);
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getSocketData();
    getCpuData();
  }, []);
  // ------------------------------------------------------------------

  // SUPPORT FUNCTIONS ------------------------------------------------
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  const alert = () => {
    Swal.fire({
      title: "Success!",
      width: 600,
      padding: "3em",
      color: "#716add",
      backdrop: `
        rgba(0,0,123,0.4)
      `,
    }).then(goBack);
  };
  // ------------------------------------------------------------------

  // EDIT FUNCTIONALITY -----------------------------------------------
  async function updateCpu() {
    try {
      await axios
        .put(`http://localhost:8080/cpu/update/${id}`, cpu)
        .then(console.log(cpu));
    } catch (e) {
      console.log(e);
    }
    alert();
  }

  const handleEdit = (name, value) => {
    setCpu({ ...cpu, [name]: value });
    //setErrors(null);
  };

  const handleEditForSelect = (value) => {
    setCpu({ ...cpu, socket: value.item });
    //setErrors(null);
  };
  // ------------------------------------------------------------------

  // VALIDATION -------------------------------------------------------
  const [errors, setErrors] = useState({
    brand: false,
    brandMess: "",
    model: false,
    modelMess: "",
    cores: false,
    coresMess: "",
    threads: false,
    threadsMess: "",
    clockspeed: false,
    clockspeedMess: "",
    turboclock: false,
    turboclockMess: "",
    tdp: false,
    tdpMess: "",
    price: false,
    priceMess: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    // string regex
    const stringRegex = new RegExp("[A-Z][a-z]*");
    // ------------

    // brand
    let str = JSON.stringify(cpu.brand).slice(1, -1);
    if (!cpu.brand) {
      setErrors({
        ...errors,
        brand: true,
        brandMess: "Brand name is required.",
      });
    } else if (!stringRegex.test(str)) {
      setErrors({ ...errors, brand: true });
      setErrors({
        ...errors,
        brand: true,
        brandMess: "Brand should start with a capital letter and be a word",
      });
    }

    // model
    str = JSON.stringify(cpu.model).slice(1, -1);
    if (!cpu.model) {
      setErrors({
        ...errors,
        model: true,
        modelMess: "Model name is required.",
      });
    } else if (!stringRegex.test(str)) {
      setErrors({ ...errors, model: true });
      setErrors({
        ...errors,
        model: true,
        modelMess: "Model should start with a capital letter and be a word",
      });
    }

    // number regex
    const numberRegex = new RegExp("\\d+");
    // ------------

    // cores
    let num = JSON.stringify(cpu.coresNum);
    if (cpu.cores == "") {
      setErrors({
        ...errors,
        cores: true,
        coresMess: "Cores quantity is required.",
      });
    } else if (num.at(-1) == '"') {
      num = num.slice(1, -1);
      if (!numberRegex.test(parseInt(num))) {
        setErrors({ ...errors, cores: true });
        setErrors({
          ...errors,
          cores: true,
          coresMess: "Cores should be a number",
        });
      }
    }

    // threads
    num = JSON.stringify(cpu.threadsNum);
    if (cpu.threadsNum == "") {
      setErrors({
        ...errors,
        threads: true,
        threadsMess: "Threads quantity is required.",
      });
    } else if (num.at(-1) == '"') {
      num = num.slice(1, -1);
      if (!numberRegex.test(parseInt(num))) {
        setErrors({ ...errors, threads: true });
        setErrors({
          ...errors,
          threads: true,
          threadsMess: "Threads should be a number",
        });
      }
    }

    // clockspeed
    num = JSON.stringify(cpu.clockspeedBase);
    if (cpu.clockspeedBase == "") {
      setErrors({
        ...errors,
        clockspeed: true,
        clockspeedMess: "Clockspeed is required.",
      });
    } else if (num.at(-1) == '"') {
      num = num.slice(1, -1);
      if (!numberRegex.test(num)) {
        setErrors({ ...errors, clockspeed: true });
        setErrors({
          ...errors,
          clockspeed: true,
          clockspeedMess: "Clockspeed should be a number",
        });
      }
    }

    // turbo clock
    num = JSON.stringify(cpu.clockspeedTurbo);
    if (cpu.clockspeedTurbo == "") {
      setErrors({
        ...errors,
        turboclock: true,
        turboclockMess: "Turbo clock is required.",
      });
    } else if (num.at(-1) == '"') {
      num = num.slice(1, -1);
      if (!numberRegex.test(num)) {
        setErrors({ ...errors, turboclock: true });
        setErrors({
          ...errors,
          turboclock: true,
          turboclockMess: "Turbo clock should be a number",
        });
      }
    }

    // tdp
    num = JSON.stringify(cpu.tdp);
    if (cpu.tdp == "") {
      setErrors({
        ...errors,
        tdp: true,
        tdpMess: "TDP value is required.",
      });
    } else if (num.at(-1) == '"') {
      num = num.slice(1, -1);
      if (!numberRegex.test(num)) {
        setErrors({ ...errors, tdp: true });
        setErrors({
          ...errors,
          tdp: true,
          tdpMess: "TDP value should be a number",
        });
      }
    }

    // price
    num = JSON.stringify(cpu.price);
    if (cpu.price == "") {
      setErrors({
        ...errors,
        price: true,
        priceMess: "Price value is required.",
      });
    } else if (num.at(-1) == '"') {
      num = num.slice(1, -1);
      if (!numberRegex.test(num)) {
        setErrors({ ...errors, price: true });
        setErrors({
          ...errors,
          price: true,
          priceMess: "Price value should be a number",
        });
      }
    }
  };

  const validate = () => {};

  // ------------------------------------------------------------------

  return (
    <React.Fragment>
      <Paper elevation={3} sx={{ marginRight: "15%", marginLeft: "15%" }}>
        <form onSubmit={handleSubmit}>
          <Box sx={{ padding: 5 }}>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ paddingBottom: 5, textAlign: "right" }}
            >
              Edit table record
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={2}>
                <InputLabel
                  sx={{
                    display: "flex",
                    paddingTop: 1,
                    justifyContent: "center",
                    fontWeight: 700,
                  }}
                >
                  Brand
                </InputLabel>
              </Grid>
              <Grid item xs={12} sm={10}>
                <TextField
                  id="brand"
                  name="brand"
                  fullWidth
                  size="small"
                  autoComplete="off"
                  variant="outlined"
                  value={cpu?.brand ?? ""}
                  onChange={(e) => handleEdit(e.target.name, e.target.value)}
                  error={errors.brand}
                  helperText={errors.brand ? errors.brandMess : ""}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <InputLabel
                  sx={{
                    display: "flex",
                    paddingTop: 1,
                    justifyContent: "center",
                    fontWeight: 700,
                  }}
                >
                  Model
                </InputLabel>
              </Grid>
              <Grid item xs={12} sm={10}>
                <TextField
                  id="model"
                  name="model"
                  multiline
                  fullWidth
                  rows={3}
                  autoComplete="off"
                  variant="outlined"
                  value={cpu?.model ?? ""}
                  onChange={(e) => handleEdit(e.target.name, e.target.value)}
                  error={errors.model}
                  helperText={errors.model ? errors.modelMess : ""}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <InputLabel
                  sx={{
                    display: "flex",
                    paddingTop: 1,
                    justifyContent: "center",
                    fontWeight: 700,
                  }}
                >
                  Cores
                </InputLabel>
              </Grid>
              <Grid item xs={12} sm={10}>
                <TextField
                  id="coresNum"
                  name="coresNum"
                  fullWidth
                  size="small"
                  autoComplete="off"
                  variant="outlined"
                  value={cpu?.coresNum ?? ""}
                  onChange={(e) => handleEdit(e.target.name, e.target.value)}
                  error={errors.cores}
                  helperText={errors.cores ? errors.coresMess : ""}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <InputLabel
                  sx={{
                    display: "flex",
                    paddingTop: 1,
                    justifyContent: "center",
                    fontWeight: 700,
                  }}
                >
                  Threads
                </InputLabel>
              </Grid>
              <Grid item xs={12} sm={10}>
                <TextField
                  id="threadsNum"
                  name="threadsNum"
                  fullWidth
                  size="small"
                  autoComplete="off"
                  variant="outlined"
                  value={cpu?.threadsNum ?? ""}
                  onChange={(e) => handleEdit(e.target.name, e.target.value)}
                  error={errors.threads}
                  helperText={errors.threads ? errors.threadsMess : ""}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <InputLabel
                  sx={{
                    display: "flex",
                    paddingTop: 1,
                    justifyContent: "center",
                    fontWeight: 700,
                  }}
                >
                  Clockspeed
                </InputLabel>
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  id="clockspeedBase"
                  name="clockspeedBase"
                  fullWidth
                  size="small"
                  autoComplete="off"
                  variant="outlined"
                  value={cpu?.clockspeedBase ?? ""}
                  onChange={(e) => handleEdit(e.target.name, e.target.value)}
                  error={errors.clockspeed}
                  helperText={errors.clockspeed ? errors.clockspeedMess : ""}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <InputLabel
                  sx={{
                    display: "flex",
                    paddingTop: 1,
                    justifyContent: "center",
                    fontWeight: 700,
                  }}
                >
                  Turbo clock
                </InputLabel>
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  id="clockspeedTurbo"
                  name="clockspeedTurbo"
                  fullWidth
                  size="small"
                  autoComplete="off"
                  variant="outlined"
                  value={cpu?.clockspeedTurbo ?? ""}
                  onChange={(e) => handleEdit(e.target.name, e.target.value)}
                  error={errors.turboclock}
                  helperText={errors.turboclock ? errors.turboclockMess : ""}
                />
              </Grid>

              <Grid item xs={12} sm={2}>
                <InputLabel
                  sx={{
                    display: "flex",
                    paddingTop: 1,
                    justifyContent: "center",
                    fontWeight: 700,
                  }}
                >
                  TDP
                </InputLabel>
              </Grid>
              <Grid item xs={12} sm={10}>
                <TextField
                  id="tdp"
                  name="tdp"
                  fullWidth
                  size="small"
                  autoComplete="off"
                  variant="outlined"
                  value={cpu.tdp}
                  onChange={(e) => handleEdit(e.target.name, e.target.value)}
                  error={errors.tdp}
                  helperText={errors.tdp ? errors.tdpMess : ""}
                />
              </Grid>

              <Grid item xs={12} sm={2}>
                <InputLabel
                  sx={{
                    display: "flex",
                    paddingTop: 1,
                    justifyContent: "center",
                    fontWeight: 700,
                  }}
                >
                  Socket
                </InputLabel>
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth size="small">
                  {cpu.id !== null && (
                    <Select
                      labelId="socketLabel"
                      id="socket"
                      name="socket"
                      onChange={(e) => handleEditForSelect(e.target.value)}
                    >
                      {socket.map((item, index) => {
                        return (
                          <MenuItem value={{ item }} key={index}>
                            {item.name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={2}>
                <InputLabel
                  sx={{
                    display: "flex",
                    paddingTop: 1,
                    justifyContent: "center",
                    fontWeight: 700,
                  }}
                >
                  Price
                </InputLabel>
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  id="price"
                  name="price"
                  fullWidth
                  size="small"
                  autoComplete="off"
                  variant="outlined"
                  value={cpu.price}
                  onChange={(e) => handleEdit(e.target.name, e.target.value)}
                  error={errors.price}
                  helperText={errors.price ? errors.priceMess : ""}
                />
              </Grid>

              <Grid item xs={12} sm={2}></Grid>
              <Grid item xs={12} sm={6} />
              <Grid item xs={12} sm={5} />
              <Grid item xs={12} sm={4}>
                <button
                  onClick={validate}
                  variant="contained"
                  sx={{
                    background: "#2E3B55",
                    display: "flex",
                    justifyContent: "end",
                  }}
                >
                  Update
                </button>
              </Grid>
              <Grid item xs={12} sm={5} />
            </Grid>
          </Box>
        </form>
      </Paper>
    </React.Fragment>
  );
}
