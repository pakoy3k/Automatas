import Papa from 'papaparse'
import React, { ReactNode, useEffect, useState } from 'react'
function useCsvData(filename:string){
    const [state,setState] = useState<string[][]|null>(null)
    useEffect(()=>{
        fetch(filename).then(r=>r.text()).then(text => setState(Papa.parse<string[]>(text).data))
    },[])
    return state
}
export default function CsvTable({filename}:{filename:string}){
    const data = useCsvData(filename)
    if(data===null){
        return null
    }

    console.log(data)

    return <table>
        <tr>
            {data[0].map(cell => <th>{cell}</th>)}
        </tr>
        {data.slice(1).map((row)=><tr>
            {row.map(cell => <td>{cell}</td>)}
        </tr>)}
    </table>
}