import React, { Component } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  CircularProgress,
  Divider,
  Backdrop,
  FormControlLabel,
  FormGroup,
  FormLabel,
  FormControl,
  FormHelperText,
  TextField,
  Switch,
  InputLabel,
  Autocomplete,
  Input,
  InputAdornment,
  OutlinedInput,
  ButtonGroup,
  Box,
  Icon,
  List,
  ListSubheader,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
  Typography,
  AppBar,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  CssBaseline,
  Grid,
  Toolbar,
  Radio,
  RadioGroup,
  Container,
  Paper,
  Alert,
  AlertColor,
  AlertTitle,
  AlertDescription,
  AlertIcon,
  AlertAction,
  AlertActionGroup,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Tooltip,
  Stack,
  IconButton,
  Link,
  StepConnector,
  StepConnectorClasses,
  LinearProgress,
} from "@mui/material/";
import SaveIcon from "@mui/icons-material/SaveAltTwoTone";
import DeleteIcon from "@mui/icons-material/Delete";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
//import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

import events from "./events";

const DnDCalendar = withDragAndDrop(Calendar);

class Mui extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: events,
    };

    this.theme = createTheme({
      status: {
        danger: "#e53e3e",
      },
      palette: {
        primary: {
          main: "#0971f1",
          darker: "#053e85",
        },
        neutral: {
          main: "#64748B",
          contrastText: "#fff",
        },
      },
      components: {
        // Name of the component
        MuiButtonBase: {
          defaultProps: {},
          styleOverrides: {
            root: ({ ownerState }) => ({
              ...(ownerState.variant === "contained" &&
                ownerState.color === "primary" && {
                  backgroundColor: "#202020",
                  color: "#fff",
                }),
            }),
          },
        },
      },
    });

    const locales = {
      "en-US": require("date-fns/locale/en-US"),
    };

    this.localizer = dateFnsLocalizer({
      format,
      parse,
      startOfWeek,
      getDay,
      locales,
    });
    
  }

  

  onEventResize = (data) => {
    const { start, end } = data;

    this.setState((state) => {
      state.events[0].start = start;
      state.events[0].end = end;
      return { events: this.state.events };
    });
  };

  onEventDrop = (data) => {
    console.log(data);
  };

  render() {
    return (
      <div className="Mui">
        <ThemeProvider theme={this.theme}>
          <CssBaseline enableColorScheme={true} />
          <main className="Mui-main">
            <Container maxWidth="lg">
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Paper>
                    <Alert
                      role="info"
                      variant="filled"
                      style={{ background: "#02cf86" }}
                      severity="info"
                    >
                      <Typography variant="h6">
                        <Link href="https://material-ui.com/">Material-UI</Link>
                      </Typography>
                      <Typography variant="body1">
                        Material-UI is a React component library that lets you
                        build high-quality material-design components.
                      </Typography>
                    </Alert>
                    <DnDCalendar
                      defaultView="month"
                      events={this.state.events}
                      localizer={this.localizer}
                      onEventDrop={this.onEventDrop}
                      onEventResize={this.onEventResize}
                      resizable
                      style={{ height: "100vh" }}
                      eventPropGetter={(event, start, end, isSelected) => ({
                        event,
                        start,
                        end,
                        isSelected,
                        style: { backgroundColor: "green" },
                      })}
                    />
                  </Paper>
                </Grid>
              </Grid>
            </Container>
          </main>
        </ThemeProvider>
      </div>
    );
  }
}

export default Mui;
