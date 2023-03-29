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
import Button from "@mui/material/Button";
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

  function timeout(delay) {
    return new Promise(function (resolve) {
      setTimeout(resolve, delay);
    });
  }
  // ------------------------------------------------------------------

  // EDIT FUNCTIONALITY ------------------------------------------------
  async function updateCpu() {
    try {
      await axios
        .put(`http://localhost:8080/cpu/update/${id}`, cpu)
        .then({ alert });
      // debugging purpose
      console.log(cpu);
      // -----------------
    } catch (e) {
      console.log(e);
    }
  }

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

  const handleEdit = (name, value) => {
    setCpu({ ...cpu, [name]: value });
  };

  const handleEditForSelect = (value) => {
    setCpu({ ...cpu, socket: value.item });
  };
  // ------------------------------------------------------------------

  return (
    <React.Fragment>
      <Paper elevation={3} sx={{ marginRight: "15%", marginLeft: "15%" }}>
        <Box sx={{ padding: 5 }}>
          <Typography variant="h6" gutterBottom sx={{ paddingBottom: 5 }}>
            Edit table record
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={2}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  fontWeight: 700,
                }}
              >
                Brand
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={10}>
              <TextField
                required
                id="brand"
                name="brand"
                fullWidth
                size="small"
                autoComplete="off"
                variant="outlined"
                value={cpu?.brand ?? ""}
                onChange={(e) => handleEdit(e.target.name, e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  fontWeight: 700,
                }}
              >
                Model
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={10}>
              <TextField
                required
                id="model"
                name="model"
                multiline
                fullWidth
                rows={3}
                autoComplete="off"
                variant="outlined"
                value={cpu.model}
                onChange={(e) => handleEdit(e.target.name, e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  fontWeight: 700,
                }}
              >
                Cores
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={10}>
              <TextField
                required
                id="coresNum"
                name="coresNum"
                fullWidth
                size="small"
                autoComplete="off"
                variant="outlined"
                value={cpu.coresNum}
                onChange={(e) => handleEdit(e.target.name, e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  fontWeight: 700,
                }}
              >
                Threads
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={10}>
              <TextField
                required
                id="threadsNum"
                name="threadsNum"
                fullWidth
                size="small"
                autoComplete="off"
                variant="outlined"
                value={cpu.threadsNum}
                onChange={(e) => handleEdit(e.target.name, e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  fontWeight: 700,
                }}
              >
                Clockspeed
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                required
                id="clockspeedBase"
                name="clockspeedBase"
                fullWidth
                size="small"
                autoComplete="off"
                variant="outlined"
                value={cpu.clockspeedBase}
                onChange={(e) => handleEdit(e.target.name, e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  fontWeight: 700,
                }}
              >
                Turbo clock
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                required
                id="clockspeedTurbo"
                name="clockspeedTurbo"
                fullWidth
                size="small"
                autoComplete="off"
                variant="outlined"
                value={cpu.clockspeedTurbo}
                onClick={(e) => handleEdit(e.target.name, e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={2}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  fontWeight: 700,
                }}
              >
                TDP
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={10}>
              <TextField
                required
                id="tdp"
                name="tdp"
                fullWidth
                size="small"
                autoComplete="off"
                variant="outlined"
                value={cpu.tdp}
                onChange={(e) => handleEdit(e.target.name, e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={2}>
              <InputLabel
                sx={{
                  display: "flex",
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
                  justifyContent: "center",
                  fontWeight: 700,
                }}
              >
                Price
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                required
                id="price"
                name="price"
                fullWidth
                size="small"
                autoComplete="off"
                variant="outlined"
                value={cpu.price}
                onChange={(e) => handleEdit(e.target.name, e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={2}></Grid>
            <Grid item xs={12} sm={6} />
            <Grid item xs={12} sm={5} />
            <Grid item xs={12} sm={4}>
              <Button
                onClick={alert} //() => updateCpu(id)}
                variant="contained"
                sx={{ background: "#2E3B55" }}
              >
                Update
              </Button>
            </Grid>
            <Grid item xs={12} sm={5} />
          </Grid>
        </Box>
      </Paper>
    </React.Fragment>
  );
}
