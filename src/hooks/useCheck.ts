import { useState } from "react";
import { DataRow } from "../utils/interfaces";





export function useCheck(data: DataRow[]) {
    const [selectedIds, setSelectedIds] = useState<Set<number| string>>(new Set());

    const handleSelectOne = (id: number | string) => {
      setSelectedIds(prev => {
        const next = new Set(prev);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        return next;
      });
    };
    const handleSelectAll = () => {
      setSelectedIds(prev => {
        if (prev.size === data?.length) {
          return new Set();        
        } else {
          return new Set(data?.map(r => r.id));
        }
      });
    };

    return {
        data,
        selectedIds,
        handleSelectOne,
        handleSelectAll,
        setSelectedIds

    };
}