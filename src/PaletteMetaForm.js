import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Picker } from 'emoji-mart';

import 'emoji-mart/css/emoji-mart.css';

class PaletteMetaForm extends Component {
    state = {
        open: true,
        newPaletteName: ''
    };
    
    componentDidMount() {
        ValidatorForm.addValidationRule('isPaletteNameUnique', value => {
            return this.props.palettes.every(({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase());
        });
    }    

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value})
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { newPaletteName } = this.state;
        const { hideForm, handleSubmit } = this.props;
        return (
            <Dialog
                open={this.state.open}
                onClose={hideForm}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
                <ValidatorForm onSubmit={() => handleSubmit(newPaletteName)}>
                    <DialogContent>
                    <DialogContentText>
                        Please enter a name for your new palette. Make this unique.
                    </DialogContentText>
                    <Picker />
                    <TextValidator 
                        label='Palette Name' 
                        name='newPaletteName'
                        value={newPaletteName} 
                        onChange={this.handleChange}
                        fullWidth
                        margin='normal'
                        validators={['required', 'isPaletteNameUnique']}
                        errorMessages={['enter palette name', 'palette name already taken']} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={hideForm} color="primary">
                            Cancel
                        </Button>
                        <Button variant='contained' color='primary' type='submit'>
                            Save Palette
                        </Button>
                    </DialogActions>
                </ValidatorForm>
            </Dialog>
        );
    }
}

export default PaletteMetaForm;