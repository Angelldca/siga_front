import { useState } from "react"

import "./FormFilter.css";



interface FormFilterProps {
    onApply: (operator: string, text: string) => void;
    onClear: () => void;
}

function FormFilter({ onApply, onClear }: FormFilterProps) {
    const [operator, setOperator] = useState("LIKE");
    const [value, setValue] = useState("");
   

    return (
        <div className="form-filter-container">
            <form
                onSubmit={e => {
                    e.preventDefault();
                    onApply(operator, value);
                }}
            >
                <select
                    className="select-form-filter"
                    value={operator}
                    onChange={e => setOperator(e.target.value)}
                >
                    <option value="LIKE">Contiene</option>
                    <option value="EQUALS">Igual</option>
                    <option value="NOT_EQUALS">Distinto</option>
                </select>

                <input
                    type="text"
                    className="input-form-filter"
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    required
                />

                <div className="form-filter-buttons">
                    <button type="button" className="clean" onClick={onClear}>
                        Limpiar
                    </button>
                    <button type="submit" className="btn-primary">
                        Aplicar
                    </button>
                </div>
            </form>
        </div>
    );
}
export default FormFilter;