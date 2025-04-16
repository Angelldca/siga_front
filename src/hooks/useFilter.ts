import { useEffect, useState } from "react";
import { DataFilter, FilterType } from "../utils/interfaces";



export function useFilter(filtros: FilterType) {
    const [criteriaState, setCriteriaState] = useState<Record<string, { selected: string; input: string }>>(
      () =>
        filtros.criterio.reduce((acc, item) => {
          acc[item.name] = { selected: item.values[0], input: "" };
          return acc;
        }, {} as Record<string, { selected: string; input: string }>)
    );
  
    const handleSelectChange = (name: string, value: string) => {
      setCriteriaState((prev) => ({
        ...prev,
        [name]: {
          ...prev[name],
          selected: value
        }
      }));
    };
  
    const handleInputChange = (name: string, value: string) => {
      setCriteriaState((prev) => ({
        ...prev,
        [name]: {
          ...prev[name],
          input: value
        }
      }));
    };
  
    const clearFilter = () => {
      setCriteriaState((prev) =>
        Object.fromEntries(
          Object.entries(prev).map(([key, val]) => [key, { ...val, input: "" }])
        )
      );
    };
  
    const getFilterValues = () => {
      const result: Record<string, string> = {};
      Object.values(criteriaState).forEach(({ selected, input }) => {
        if (input.trim()) {
          result[selected.toLowerCase()] = input;
        }
      });
      return result;
    };
  
    return {
      criteriaState,
      handleSelectChange,
      handleInputChange,
      clearFilter,
      getFilterValues
    };
  }