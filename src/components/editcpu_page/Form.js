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

export default function AddressForm() {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const [socket, setSocket] = useState([]);

  // fetch all sockets
  const getSocketData = () => {
    try {
      axios.get("http://localhost:8080/socket/get-all").then((res) => {
        console.log(res.data);
        setSocket(res.data);
      });
    } catch (e) {
      console.log(e);
    }
  };

  //fetch one cpu
  const [cpu, setCpu] = useState([]);

  const getCpuData = () => {
    try {
      axios.get("http://localhost:8080/cpu/get/1").then((res) => {
        console.log(res.data);
        setCpu(res.data);
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => (getSocketData(), getCpuData()), []);

  const categories = [];

  socket.map((item, index) => {
    categories.push(item.name);
  });

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
                onChange={(e) => setCpu(e.target.value)}
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
                id="outlined-multiline-static"
                multiline
                fullWidth
                rows={3}
                value={cpu.model}
                onChange={(e) => setCpu(e.target.value)}
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
                id="cores"
                name="cores"
                //label="Cores"
                fullWidth
                size="small"
                autoComplete="off"
                variant="outlined"
                value={cpu.coresNum}
                onChange={(e) => setCpu(e.target.value)}
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
                id="threads"
                name="threads"
                fullWidth
                size="small"
                autoComplete="off"
                variant="outlined"
                value={cpu.threadsNum}
                onChange={(e) => setCpu(e.target.value)}
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
                id="price"
                name="price"
                fullWidth
                size="small"
                autoComplete="off"
                variant="outlined"
                value={cpu.clockspeedBase}
                onChange={(e) => setCpu(e.target.value)}
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
                id="price"
                name="price"
                fullWidth
                size="small"
                autoComplete="off"
                variant="outlined"
                value={cpu.clockspeedTurbo}
                onChange={(e) => setCpu(e.target.value)}
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
                id="cores"
                name="cores"
                //label="Cores"
                fullWidth
                size="small"
                autoComplete="off"
                variant="outlined"
                value={cpu.tdp}
                onChange={(e) => setCpu(e.target.value)}
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
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Socket"
                  onChange={handleChange}
                >
                  {categories.map((item) => (
                    <MenuItem value={item}>{item}</MenuItem>
                  ))}
                </Select>
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
                onChange={(e) => setCpu(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={2}></Grid>
            <Grid item xs={12} sm={6} />
            <Grid item xs={12} sm={5} />
            <Grid item xs={12} sm={4}>
              <Button variant="contained" sx={{ background: "#2E3B55" }}>
                Save
              </Button>
            </Grid>
            <Grid item xs={12} sm={5} />
          </Grid>
        </Box>
      </Paper>
    </React.Fragment>
  );
}
