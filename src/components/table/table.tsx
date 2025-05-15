import './Table.css'
import filter from '../../assets/filter.png'
import sort from '../../assets/sort.png'
import filter_fill from '../../assets/filter_fill.png'
import asc from '../../assets/asc.png'
import des from '../../assets/des.png'
import { DataFilter, DataRow, SortConfig, ThData } from '../../utils/interfaces'
import { useEffect, useRef, useState } from 'react'
import FormFilter from '../formFilter/form-filter'




interface Props {
  th_element: ThData;
  children?: React.ReactNode;
  data: DataRow[];

  selectedIds: Set<number | string>;
  onSelectAll: () => void;
  onSelectOne: (id: number | string) => void;
  sortConfig: SortConfig;      // viene del padre
  onSortChange: (key: string | null, order: "ASC" | "DES" | null) => void;
  setDatafilter: React.Dispatch<React.SetStateAction<DataFilter>>;
}


const Table = ({
  th_element, data, children, selectedIds,
  onSelectAll, onSelectOne, onSortChange,
  sortConfig, setDatafilter
}: Props) => {
  const allSelected = (data?.length > 0 && selectedIds.size === data?.length);
  const [openFilterFor, setOpenFilterFor] = useState<string | null>(null);

  const handleFilterIconClick = (key: string) => {
    setOpenFilterFor(prev => (prev === key ? null : key));
  };

  const getValueFromPath = (obj: any, path: string) => {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  };
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
  const getFilterIcon = (key: string) => {
    if (openFilterFor === key) return filter_fill;
    return filter;
  }
  const onApplyFilter = (key: string, operator: string, text: string) => {
    setDatafilter({
      filter: [
        {
          key: key,
          operator: operator,
          value: text,
          logicalOperation: "AND",
        }
      ],
      query: "",
      pageSize:  100,
      page: 0,
      sortBy:"createdAt",
      sortType:"DES",
    });

  }

  const onClearFilter = (key: string) => {
    setDatafilter({
      filter: [],
      query: "",
      pageSize:  100,
      page: 0,
      sortBy:"createdAt",
      sortType:"DES",
    });

  }

  const filterRef = useRef<HTMLDivElement>(null);

  
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setOpenFilterFor(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [filterRef]);


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
                <th key={index} className={th.type === "Check" ? "check-column" : ""}>
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
                        : th.type === "Action" ?  <p>{th.value + ""}</p>
                        :
                        <>
                          <div className='th-sort'>
                            <p>{th.value + ""}</p>
                            <img
                              src={getIcon(th.key)}
                              alt="sort"
                              className="sort-img"
                              onClick={() => handleSort(th.key)}
                            />
                          </div>
                          <img src={getFilterIcon(th.key)}
                            className="sort-img"
                            onClick={() => handleFilterIconClick(th.key)}
                          />
                        </>
                    }
                  </div>

                  {openFilterFor === th.key && (
                    <div
                    ref={filterRef}>
                      <FormFilter
                        onApply={(operator, text) => {
                          onApplyFilter(th.key, operator, text);
                          setOpenFilterFor(null);
                        }}
                        onClear={() => {
                          onClearFilter(th.key);
                          setOpenFilterFor(null);
                        }}
                      />
                    </div>
                  )}
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
                  <td key={cellIndex} className={th.type === "Check" ? "check-column" : ""}>
                    {th.type === "Check" ? (
                      <input
                        type="checkbox"
                        className='check-input'
                        checked={selectedIds.has(row.id)}
                        onChange={() => onSelectOne(row.id)}
                      />
                    ) : th.type === "Boolean" ? (
                        getValueFromPath(row, th.key) === true ?
                        <p className='success-p'>Si</p>
                        : <p className='error-p'>No</p>
                    ) : th.type === "Action" ? (
                      children
                    ) : (
                      getValueFromPath(row, th.key) ?? ""
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