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
    data?: DataRow[];
}


const Table = ({ th_element,data, children }: Props) => {
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
                                            <input type="checkbox" name='select_all' className='check-input'/> 
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
          {data?.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {th_element.th.map((th, cellIndex) => (
                <td key={cellIndex}>
                  {th.type === "Check" ? (
                    <input
                      type="checkbox"
                      checked={!!row[th.key]}
                      onChange={() => null}
                    />
                  ) : th.type === "Boolean"? (
                    row[th.key] === true ? <p>Si</p>:<p>No</p>
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