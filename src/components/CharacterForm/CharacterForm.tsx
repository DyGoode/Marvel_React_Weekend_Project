import React from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Button } from '@mui/material';

import { 
    chooseName,
    chooseAlias, 
    choosePowers,
    chooseHistory,
    chooseAllegiance
} from '../../redux/slices/rootSlice';
import { Input } from '../sharedComponents/Input';
import { serverCalls } from '../../api';
import { useGetData } from '../../custom-hooks';

interface CharacterFormProps {
    id?:string;
    data?:{}
}

interface CharacterState {
    name: string;
    alias: string;
    powers: string;
    history: string;
    allegiance: string;
}

export const CharacterForm = (props:CharacterFormProps) => {

    const dispatch = useDispatch();
    let { characterData, getData } = useGetData();
    const store = useStore()
    const name = useSelector<CharacterState>(state => state.name)
    const { register, handleSubmit } = useForm({ })

    const onSubmit = async (data:any, event:any) => {
        console.log(props.id)

        if( props.id!){
            await serverCalls.update(props.id!, data)
            console.log(`Updated:${data} ${props.id}`)
            window.location.reload()
            event.target.reset();
        } else {
            dispatch(chooseName(data.name))
            dispatch(chooseAlias(data.alias))
            dispatch(choosePowers(data.powers))
            dispatch(chooseHistory(data.history))
            dispatch(chooseAllegiance(data.allegiance))
            console.log(store.getState())
            await serverCalls.create(store.getState())
            window.location.reload()
        }
    }

    return (
        <div>
            <form onSubmit = {handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="name">Character Name</label>
                    <Input {...register('name')} name="name" placeholder='Name' />
                </div>

                <div>
                    <label htmlFor="alias">Alias</label>
                    <Input {...register('alias')} name="alias" placeholder="Alias"/>
                </div>

                <div>
                    <label htmlFor="powers">Powers</label>
                    <Input {...register('powers')} name="powers" placeholder="Powers"/>
                </div>

                <div>
                    <label htmlFor="history">History</label>
                    <Input {...register('history')} name="history" placeholder="History"/>
                </div>

                <div>
                    <label htmlFor="allegiance">Allegiance</label>
                    <Input {...register('allegiance')} name="allegiance" placeholder="Allegiance"/>
                </div>
                <Button type='submit'>Submit</Button>
            </form>
        </div>
    )
}

