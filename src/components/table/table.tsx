import './Table.css'
import filter from '../../assets/filter.png'
import sort from '../../assets/sort.png'
import filter_fill from '../../assets/filter_fill.png'
import asc from '../../assets/asc.png'
import des from '../../assets/des.png'
import { DataFilter, DataRow, SortConfig, ThData } from '../../utils/interfaces'
import { useState } from 'react'




interface Props {
    th_element: ThData;
    children?: React.ReactNode;
    data: DataRow[];
  
    selectedIds: Set<number | string>;
    onSelectAll: () => void;
    onSelectOne: (id: number | string) => void;
    sortConfig: SortConfig;      // viene del padre
    onSortChange: (key: string|null, order: "ASC"|"DES"|null) => void;
}


const Table = ({ 
  th_element,data,children, selectedIds,
   onSelectAll,onSelectOne,onSortChange ,
   sortConfig,
  }: Props) => {
    const allSelected = (data?.length > 0 && selectedIds.size === data?.length );
    //const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, order: null });
    
    
    const handleSort = (key: string) => {
      let nextOrder: SortConfig["order"];
      if (sortConfig.key !== key) nextOrder = "ASC";
      else
        nextOrder =
          sortConfig.order === "ASC" ? "DES" :
          sortConfig.order === "DES" ? null : "ASC";
  
      onSortChange(nextOrder ? key : null, nextOrder);
    };
  
    const getIcon = (key: string) => {
      if (sortConfig.key !== key || sortConfig.order === null) return sort;
      return sortConfig.order === "ASC" ? asc : des;
    };

   




    if (!data || data.length === 0) {
      return (
        <div className="no-data">
          <p>No hay datos disponibles</p>
        </div>
      );
    }
    return (
        <div className="table-container">
            <table className='table'>
            <thead>
                <tr>
                    {
                        th_element.th.map((th, index) => (
                            <th key={index}>
                                <div className='th-container'>
                                    {
                                        th.type === "Check" ?
                                            <input 
                                            type="checkbox" 
                                            name='select_all' 
                                            className='check-input'
                                            checked={allSelected}
                                            onChange={onSelectAll}
                                            /> 
                                            :
                                            <>
                                                <div className='th-sort'>
                                                    <p>{th.value+""}</p>
                                                    <img 
                                                     src={getIcon(th.key)}
                                                     alt="sort"
                                                     className="sort-img"
                                                     onClick={() => handleSort(th.key)}
                                                    />
                                                </div>
                                                <img src={filter} />
                                            </>
                                    }
                                </div>
                            </th>
                        ))
                    }

                </tr>
                </thead>
                <tbody>
          {
          
          data?.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {th_element.th.map((th, cellIndex) => (
                <td key={cellIndex}>
                  {th.type === "Check" ? (
                    <input
                      type="checkbox"
                      className='check-input'
                      checked={selectedIds.has(row.id)}
                      onChange={() => onSelectOne(row.id)}
                    />
                  ) : th.type === "Boolean"? (
                    row[th.key] === true ? 
                    <p className='success-p'>Si</p>
                    :<p className='error-p'>No</p>
                  ):th.type === "Action"? (
                     children
                  ):(
                    // muestra el valor de row[th.key] o vacío
                    row[th.key] ?? ""
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
            </table>
        </div>
    )
}

export default Table;