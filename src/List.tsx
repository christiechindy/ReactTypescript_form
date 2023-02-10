import React, { FC, ChangeEvent } from 'react'
import { IData } from './Interfaces';
import { useState } from 'react';

interface IProps {
    atts: IData;
    onDelete(idToDelete: number): void;
    onChange(updatedData: IData): void;
}

const List:FC<IProps> = ({atts, onDelete, onChange}: IProps) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);

    const [editingData, setEditingData] = useState<IData>({
        id: atts.id,
        nama: atts.nama,
        nim: atts.nim,
        angkatan: atts.angkatan,
        hobi: atts.hobi
    })

    const handleEditing = (e: ChangeEvent<HTMLInputElement>): void => {
        setEditingData({
            ...editingData,
            [e.target.name]: e.target.value
        })
    }

    let content;

    if (isEditing) {
        content = (
            <>
                <label>
                    Nama: {" "}
                    <input type="text" placeholder='Nama' value={editingData.nama} name="nama" onChange={handleEditing} />
                </label>
                <label>
                    NIM: {" "}
                    <input type="text" placeholder='NIM' value={editingData.nim} name="nim" onChange=   {handleEditing} />
                </label>
                <label>
                    Angkatan: {" "}
                    <input type="number" placeholder='Angkatan' value={editingData.angkatan} name="angkatan" onChange={handleEditing} />
                </label>
                <label>
                    Hobi: {" "}
                    <input type="text" placeholder='Hobi' value={editingData.hobi} name="hobi" onChange={handleEditing} />
                </label>
                <button onClick={() => {
                    setIsEditing(isEditing => !isEditing);
                    onChange(editingData);
                }}>Save</button>
            </>
        )
    } else {
        content = (
            <>
                <span>Nama: {atts.nama}</span>
                <span>NIM: {atts.nim}</span>
                <span>Angkatan: {atts.angkatan}</span>
                <span>Hobi: {atts.hobi}</span>
                <button onClick={() => setIsEditing(!isEditing)}>Edit</button>
            </>
        )
    }

    return (
        <div className='datas'>
            {content}
            <button onClick={() => onDelete(atts.id)}>Delete</button>
        </div>
    )
}

export default List