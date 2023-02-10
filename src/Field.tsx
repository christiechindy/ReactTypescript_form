import React, { ChangeEvent } from 'react'
import { useState } from 'react';
import { IData } from './Interfaces';
import List from './List';

let id = 0;

const Form = () => {
    const [data, setData] = useState<IData[]>([]);

    const [nama, setNama] = useState<string>("");
    const [nim, setNim] = useState<string>("");
    const [angkatan, setAngkatan] = useState<number>(2020);
    const [hobi, setHobi] = useState<string>("");

    const handleInput = (e: ChangeEvent<HTMLInputElement>): void => {
        if (e.target.name === "nama") {
            setNama(e.target.value);
        } else if (e.target.name === "nim") {
            setNim(e.target.value);
        } else if (e.target.name === "angkatan") {
            setAngkatan(Number(e.target.value));
        } else if (e.target.name === "hobi") {
            setHobi(e.target.value);
        } else {
            console.log("error");
        }
    }

    const handleSubmit = (): void => {
        // console.log(nama, nim, angkatan, hobi);
        setData([
            ...data, {id: id++, nama, nim, angkatan, hobi}
        ])
        setNama("")
        setNim("")
        setAngkatan(2020)
        setHobi("")
    }

    const handleChange = (updatedData: IData): void => {
        setData(data.map(d => {
            if (d.id === updatedData.id) {
                return {
                    ...d,
                    nama: updatedData.nama,
                    nim: updatedData.nim,
                    angkatan: updatedData.angkatan,
                    hobi: updatedData.hobi
                }
            } else {
                return d;
            }
        }))
    }

    const handleDelete = (dataId: number): void => {
        setData(data.filter(d => d.id !== dataId))
    }
    
    return (
        <div className='field'>
            <div className='inputContainer'>
                <label>Nama: <input type="text" placeholder='Nama' name='nama' value={nama} onChange={handleInput} /></label>
                
                <label>NIM: <input type="text" name='nim' placeholder='NIM' value={nim} onChange={handleInput} /></label>
                
                <label>Angkatan: <input type="number" name='angkatan' placeholder='Angkatan' value={angkatan} onChange={handleInput} /></label>
                
                <label>Hobi: <input type="text" name='hobi' placeholder='Hobi' value={hobi} onChange={handleInput} /></label>
            </div>

            <button onClick={handleSubmit}>Submit</button>

            <div className="listData">
                {data.map((d:IData) => (
                    <List key={d.id} atts={d} onDelete={handleDelete} onChange={handleChange}/>
                ))}
            </div>
        </div>
    )
}

export default Form