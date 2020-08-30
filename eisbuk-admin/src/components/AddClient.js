import React from 'react'

import { Typography, Box } from "@material-ui/core"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"

import TextField from "@material-ui/core/TextField"
import Slider from '@material-ui/core/Slider'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'


const AddClient = () => {
    const inputProps = {
        step: 300,
    };
    
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('invia')
    }
    return (
            <Grid container>
                <Grid item xs={12}>
                    <Paper>
                        <Box p={3}>
                            <Typography variant="h3">Nuovo cliente</Typography>
                            <form onSubmit={handleSubmit}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} lg={3}>
                                        <TextField
                                            required
                                            id="name"
                                            label="Nome"
                                            defaultValue=""
                                            variant="outlined"
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12} lg={3}>
                                        <TextField
                                            required
                                            id="surname"
                                            label="Cognome"
                                            defaultValue=""
                                            variant="outlined"
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12} lg={3}>
                                        <TextField
                                            required
                                            id="email"
                                            type="email"
                                            label="Email"
                                            defaultValue=""
                                            variant="outlined"
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12} lg={3}>
                                        <TextField
                                            required
                                            id="phone"
                                            type="tel"
                                            label="Telefono"
                                            defaultValue=""
                                            variant="outlined"
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12} lg={6}>
                                        <FormControl variant="outlined" fullWidth>
                                            <InputLabel id="demo-simple-select-outlined-label">Abbonamento</InputLabel>
                                            <Select
                                                    labelId="subscription-type"
                                                    value="standard"
                                                    label="Abbonamento"
                                                >
                                                <MenuItem value="standard">Standard</MenuItem>
                                                <MenuItem value="professional">Professional</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} lg={6}>
                                        <Typography gutterBottom>
                                            Livello
                                        </Typography>
                                        <Slider
                                            defaultValue={5}
                                            valueLabelDisplay="auto"
                                            step={1}
                                            min={1}
                                            max={10}
                                            valueLabelDisplay="on"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button type="submit" variant="contained" color="primary">
                                            Aggiungi
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>

    )
}

export default AddClient