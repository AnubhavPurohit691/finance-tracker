import { useMemo, useState } from "react"
import { financerecord, useFinancialRecords } from "../../context/financial-record-context"

import {useTable,Column,CellProps,Row}from "react-table"

interface Edittablecellprops extends CellProps<financerecord>{
  updaterecord:(rowIndex:number,columnId:string,value:any)=>void
  editable:Boolean
}
export const Financelist = () => {
  const {records,updaterecord,deleterecord}=useFinancialRecords()
  const updateCellRecord = (rowIndex: number, columnId: string, value: any) => {
    const id = records[rowIndex]?._id;
    updaterecord(id ?? "", { ...records[rowIndex], [columnId]: value });
  };


  

  const Edittablecell:React.FC<Edittablecellprops>=({value:initialvalue,row,column,updaterecord,editable})=>{
    const [Isediting,setIsediting]=useState(false)
    const [value,setvalue]=useState(initialvalue)
    const onblur=()=>{
      setIsediting(false)
      updaterecord(row.index,column.id,value)
    }
    return (<div style={{cursor: editable?"pointer":"default"}} onClick={()=>editable&&setIsediting(true)}>{Isediting?(<input value={value} onChange={(e)=>setvalue(e.target.value) } onBlur={onblur} autoFocus style={{width:"100%"}}/>)
    :typeof value ==="string"?(value)
    :(value.toString())}</div>)
  }
  const columns :Array<Column<financerecord>>=useMemo(()=>[{
    Header:"Description",
    accessor:"description",
  Cell:(props)=>(
    <Edittablecell {...props} updaterecord={updateCellRecord} editable={true}/>
  )    
  },{
    Header:"Amount",
    accessor:"amount",
  Cell:(props)=>(
    <Edittablecell {...props} updaterecord={updateCellRecord} editable={true}/>
  )    
  },{
    Header:"Category",
    accessor:"category",
  Cell:(props)=>(
    <Edittablecell {...props} updaterecord={updateCellRecord} editable={true}/>
  )    
  },{
    Header:"Payment Method",
    accessor:"paymentMethod",
  Cell:(props)=>(
    <Edittablecell {...props} updaterecord={updateCellRecord} editable={true}/>
  )    
  },
  {
    Header:"Date",
    accessor:"date",
  Cell:(props)=>(
    <Edittablecell {...props} updaterecord={updateCellRecord} editable={false}/>
  )    
  },
  {
    Header:"Delete",
    id:"delete",
  Cell:({row})=>(
    <button onClick={()=>deleterecord(row.original._id??"") } className="button">Delete</button>
  )    
  }],[records])
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: records,
    })
  return <div>
      <table {...getTableProps()} className="table">
        <thead>
          {headerGroups.map((hg)=><tr {...hg.getHeaderGroupProps()}>
            {hg.headers.map((column)=><th {...column.getHeaderProps()}>{column.render("Header")}</th>)}
          </tr>)}
        </thead>
        <tbody {...getTableBodyProps()}>
        {rows.map((row, idx) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}> {cell.render("Cell")} </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  
}

export default Financelist
