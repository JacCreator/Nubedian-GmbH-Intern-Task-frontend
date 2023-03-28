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
import { useParams } from "react-router-dom";

export default function AddressForm(props) {
  const id = props.id;

  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const [socket, setSocket] = useState([]);

  // fetch all sockets
  const getSocketData = () => {
    try {
      axios.get("http://localhost:8080/socket/get-all").then((res) => {
        setSocket(res.data);
      });
    } catch (e) {
      console.log(e);
    }
  };

  //fetch one cpu
  const [cpu, setCpu] = useState({
    // id: 1,
    // brand: "Amd",
    // model: "Core i5-13500",
    // clockspeedBase: 2.5,
    // clockspeedTurbo: 4.8,
    // coresNum: 14,
    // threadsNum: 20,
    // tdp: 75.0,
    // price: 1319,
    // socket: {
    //   id: 2,
    //   name: "Socket AM4",
    // },
  });

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

  function updateCpu() {
    console.log(cpu);
    axios
      .put(`http://localhost:8080/cpu/update/${id}`, { cpu })
      .catch((err) => console.log(err));
  }

  const handleEdit = (name, newBrand) => {
    setCpu({ ...cpu, [name]: newBrand });
  };

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
                value={cpu.brand}
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
                <InputLabel id="demo-simple-select-label">Socket</InputLabel>
                {cpu.id !== null && (
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Socket"
                    name="socket"
                    defaultValue="asdf"
                    onChange={(e) => {
                      setCpu({
                        ...cpu,
                        socket: e.target.value.item,
                      });
                    }}
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
                onClick={() => updateCpu(id)}
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
