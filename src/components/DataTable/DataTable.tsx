import React, { useState } from 'react';
import { DataGrid, GridColDef, GridSelectionModel } from '@mui/x-data-grid';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@mui/material'; 

import { serverCalls } from '../../api';
import { useGetData } from '../../custom-hooks';
import { CharacterForm } from '../../components/CharacterForm';



const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    {
        field: 'name',
        headerName: 'Name',
        width: 150,
        editable: true,
    },
    {
        field: 'alias',
        headerName: 'Alias',
        width: 150,
        editable: true,
    },
    {
        field: 'powers',
        headerName: 'Powers',
        width: 250,
        editable: true,
    },
    {
        field: 'history',
        headerName: 'History',
        width: 250,
        editable: true,
    },
    {
        field: 'allegiance',
        headerName: 'Allegiance',
        width: 75,
        editable: true,
    },
];


interface gridData{
    data:{
      id?:string;
    }
}


export const DataTable = () => {
    let { characterData, getData } = useGetData();
    let [open, setOpen] = useState(false);
    let [gridData, setData] = useState<GridSelectionModel>([])

    let handleOpen = () => {
    setOpen(true)
    }

    let handleClose = () => {
    setOpen(false)
    }

    let deleteData = () => {
    serverCalls.delete(`${gridData[0]}`)
    getData()
    }
  
    console.log(gridData) 

    const MyAuth = localStorage.getItem('myAuth')
    console.log(MyAuth)

    if (MyAuth == 'true'){
        return (
            <div style={{ height: 400, width: '100%' }}>
                <h2>Your Squad</h2>
                <DataGrid
                rows={characterData}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                onSelectionModelChange={(newSelectionModel) => { setData(newSelectionModel); }}
                {...characterData}
                />

                <Button onClick={handleOpen}>Update</Button>
                <Button variant="contained" color="secondary" onClick={deleteData}>Delete</Button>

                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Update A Character</DialogTitle>
                    <DialogContent>
                        <DialogContentText>Character id: {gridData[0]}</DialogContentText>
                            <CharacterForm id={`${gridData[0]}`}/>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick = {handleClose} color="primary">Cancel</Button>
                        <Button onClick={handleClose} color = "primary">Done</Button> 
                    </DialogActions>
                </Dialog>
            </div>
        )
    }else {
        return (
            <div>
                <h3>Please Sign In to View Your Squad</h3>
            </div>
        )
    }
}

