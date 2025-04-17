import './Table.css'
import filter from '../../assets/filter.png'
import sort from '../../assets/sort.png'
import filter_fill from '../../assets/filter_fill.png'
import asc from '../../assets/asc.png'
import des from '../../assets/des.png'
import { DataRow, ThData } from '../../utils/interfaces'



interface Props {
    th_element: ThData;
    children?: React.ReactNode;
    data: DataRow[];
    selectedIds: Set<number | string>;
    onSelectAll: () => void;
    onSelectOne: (id: number | string) => void;
}


const Table = ({ 
  th_element,
  data, 
  children, 
  selectedIds,
  onSelectAll,
  onSelectOne }: Props) => {
    const allSelected = (data?.length > 0 && selectedIds.size === data?.length );

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
                                                    <img src={sort} />
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