import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function createData(id, name, calories, fat, history) {
  return {
    id,
    name,
    calories,
    fat,
    history: Array.isArray(history)
      ? history.map((item) => ({
          date: item.date,
          customerId: item.customerId,
          amount: item.amount,
          threads: item.threads,
          tdp: item.tdp,
          price: item.price,
        }))
      : [],
  };
}

export default function CollapsibleTable() {
  const [cpu, setCpu] = useState([]);

  const getCpuData = () => {
    try {
      axios.get("http://localhost:8080/cpu/get-all").then((res) => {
        setCpu(res.data);
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => getCpuData(), []);

  const rows = [];

  cpu.map((item, index) => {
    const history = [
      {
        date: item.clockspeedBase,
        customerId: item.clockspeedTurbo,
        amount: item.coresNum,
        threads: item.threadsNum,
        tdp: item.tdp,
        price: item.price,
      },
    ];

    rows.push(
      createData(item.id, item.brand, item.model, item.socket.name, history)
    );
  });

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Brand</TableCell>
            <TableCell align="left">Model</TableCell>
            <TableCell align="left">Socket</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} state={{ data: cpu }} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);
  const [cpu, setCpu] = useState([]);

  const getCpuData = () => {
    try {
      axios.get("http://localhost:8080/cpu/get-all").then((res) => {
        setCpu(res.data);
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => getCpuData(), []);

  // const handleEdit = (id, brand) = {

  // }

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="left">{row.calories}</TableCell>
        <TableCell align="left">{row.fat}</TableCell>
        <IconButton
          aria-label="edit"
          style={{ paddingTop: 20 }}
          size="small"
          component={Link}
          to={`/edit-cpu/${row.id}`}
          onClick={() => console.warn(row.id)}
        >
          <BorderColorIcon fontSize="small" />
        </IconButton>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Details
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Base clockspeed</TableCell>
                    <TableCell>Turbo clockspeed</TableCell>
                    <TableCell align="left">Number of cores</TableCell>
                    <TableCell align="left">Number of threads</TableCell>
                    <TableCell align="left">TDP</TableCell>
                    <TableCell align="left">EUR</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="left">{historyRow.amount}</TableCell>
                      <TableCell align="left">{historyRow.threads}</TableCell>
                      <TableCell align="left">{historyRow.tdp}</TableCell>
                      <TableCell align="left">{historyRow.price}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.string.isRequired,
    fat: PropTypes.string.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.number.isRequired,
        date: PropTypes.number.isRequired,
        threads: PropTypes.number.isRequired,
        tdp: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
};
