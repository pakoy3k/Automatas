import Papa from 'papaparse'
import React, { ReactNode, useEffect, useState } from 'react'
function useCsvData(filename:string){
    const [state,setState] = useState<string[][]|null>(null)
    useEffect(()=>{
        fetch(filename).then(r=>r.text()).then(text => setState(Papa.parse<string[]>(text).data))
    },[])
    return state
}
interface DataGridRow{
    semana:ReactNode
    fechaLun:ReactNode
    contenidoLun:ReactNode
    fechaMie:ReactNode
    contenidoMie:ReactNode,
    presentado:ReactNode,
    entregado:ReactNode
}
export default function Calendar({filename,dateStart}:{filename:string,dateStart:string}){
    const data = useCsvData(filename)
    const start = new Date(dateStart);
    if(data===null){
        return null
    }
    const rows:DataGridRow[] =data.slice(1).map((row,index)=>{
        const [contenidoLun,contenidoMie,presentado, entregado,..._extra] = row
        const fechaLun=new Date(start);
        fechaLun.setDate(start.getDate()+index*7)
        const fechaMie=new Date(start);
        fechaMie.setDate(start.getDate()+index*7+2)
        return {
            semana: index + 1,
            contenidoLun:<p style={{whiteSpace:"pre-wrap"}}>{contenidoLun}</p>,
            contenidoMie:<p style={{whiteSpace:"pre-wrap"}}>{contenidoMie}</p>,
            fechaLun:fechaLun.toLocaleDateString(),
            fechaMie:fechaMie.toLocaleDateString(),
            presentado:<p style={{whiteSpace:"pre-wrap"}}>{presentado}</p>,
            entregado:<p style={{whiteSpace:"pre-wrap"}}>{entregado}</p>,
        }
    })

    return <table>
        <tr>
            <th>Semana</th>
            <th>Fecha Lunes</th>
            <th>Contenido Lunes</th>
            <th>Fecha Miércoles</th>
            <th>Contenido Miércoles</th>
            <th>Lab presentado</th>
            <th>Lab Entregado</th>
        </tr>
        {rows.map((args)=><tr>
            <td>{args.semana}</td>
            <td>{args.fechaLun}</td>
            <td>{args.contenidoLun}</td>
            <td>{args.fechaMie}</td>
            <td>{args.contenidoMie}</td>
            <td>{args.presentado}</td>
            <td>{args.entregado}</td>
        </tr>)}
    </table>
}