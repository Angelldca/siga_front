import { useEffect, useState } from "react";
import { DataFilter, FilterType } from "../utils/interfaces";



interface CriteriaStateEntry {
  selectedKey: string;
  input: string;
}

export function useFilter(filtros: FilterType) {
  // Aquí inicializas selectedKey usando la key de la primera opción de cada criterio:
  const [criteriaState, setCriteriaState] = useState<
    Record<string, CriteriaStateEntry>
  >(() =>
    filtros.criterio.reduce((acc, item) => {
      acc[item.name] = {
        selectedKey: item.values[0].key, 
        input: ""
      };
      return acc;
    }, {} as Record<string, CriteriaStateEntry>)
  );

  const handleSelectChange = (name: string, key: string) => {
    setCriteriaState(prev => ({
      ...prev,
      [name]: { ...prev[name], selectedKey: key }
    }));
  };

  const handleInputChange = (name: string, text: string) => {
    setCriteriaState(prev => ({
      ...prev,
      [name]: { ...prev[name], input: text }
    }));
  };

  const clearFilter = () => {
    setCriteriaState(prev =>
      Object.fromEntries(
        Object.entries(prev).map(([name, entry]) => [
          name,
          { ...entry, input: "" }
        ])
      )
    );
  };

  const getFilterValues = (): Record<string, string> => {
    const result: Record<string, string> = {};
    for (const { selectedKey, input } of Object.values(criteriaState)) {
      if (input.trim()) {
        result[selectedKey] = input;
      }
    }
    
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