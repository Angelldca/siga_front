
import left from '../../assets/left.svg';
import right from '../../assets/right.svg';
import left_double from '../../assets/double_arrow_left.svg';
import right_double from '../../assets/double_arrow_right.svg';
import './FooterTable.css';
import { DataFilter, PaginationInfo } from '../../utils/interfaces';


interface FooterTableProps {
    setDatafilter: (data: any) => void;
    dataFilter: DataFilter;
    paginate: PaginationInfo
}

const FooterTable: React.FC<FooterTableProps> = ({
    setDatafilter,
    dataFilter,
    paginate,
  }) => {
    const { page, totalPages } = paginate;
    const isFirst = page <= 0;
    const isLast = page >= totalPages - 1;
  
    const updatePage = (newPage: number) => {
      setDatafilter({
        filter: dataFilter.filter,
        query: dataFilter.query,
        pageSize: dataFilter.pageSize,
        page: newPage,
        sortBy: dataFilter.sortBy,
        sortType: dataFilter.sortType,
      });
    };
  
    const handleFirst = () => {
      if (!isFirst) updatePage(0);
    };
    const handlePrev = () => {
      if (!isFirst) updatePage(page - 1);
    };
    const handleNext = () => {
      if (!isLast) updatePage(page + 1);
    };
    const handleLast = () => {
      if (!isLast) updatePage(totalPages - 1);
    };
  
    const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newSize = parseInt(e.target.value, 10);
      setDatafilter({
        filter: dataFilter.filter,
        query: dataFilter.query,
        pageSize: newSize,
        page: 0,
        sortBy: dataFilter.sortBy,
        sortType: dataFilter.sortType,
      });
    };
  
    return (
      <div className="footer-table">
        <div className="btn-footer-table">
          <img
            src={left_double}
            alt="Primera página"
            onClick={handleFirst}
            className={isFirst ? "disabled" : "clickable"}
          />
          <img
            src={left}
            alt="Página anterior"
            onClick={handlePrev}
            className={isFirst ? "disabled" : "clickable"}
          />
          <p>{page + 1} / {totalPages}</p>
          <img
            src={right}
            alt="Página siguiente"
            onClick={handleNext}
            className={isLast ? "disabled" : "clickable"}
          />
          <img
            src={right_double}
            alt="Última página"
            onClick={handleLast}
            className={isLast ? "disabled" : "clickable"}
          />
        </div>
  
        <select
          className="select-footer-table"
          value={dataFilter.pageSize}
          onChange={handlePageSizeChange}
        >
          {[10, 50, 100, 200, 500, 1000].map((n) => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
  
        <p className="total-footer-table">
          Total registros: {paginate.totalElements}
        </p>
      </div>
    );
  };
export default FooterTable;