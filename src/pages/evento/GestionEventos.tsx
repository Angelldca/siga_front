import React, { useEffect, useState } from "react";
import Filter from "../../components/filter/filter";
import "./Event.css"
import { CriteriaFilter, DataFilter } from "../../utils/interfaces";
import { searchEvent } from "../../services/event.service";
import { useAuth } from "../../context/AuthContext";


const GestionEventos = () => {
    const {token, user,loadingSession } = useAuth();
    const [data, setData] = useState<DataFilter>({
        filter: [],
        query: "",
        pageSize: 10,
        page: 0,
        sortBy: "createdAt",
        sortType: "DES",
    });
    const filtro = {
        criterio: [
            {
                name: "criterio_1",
                values: ["Nombre"]
            }
        ]
    }
    const handleFilter = (values: Record<string, string>) => {
        const filterValues: CriteriaFilter[] = Object.entries(values).map(([key, value]) => {
            return {
                key: key,
                operator: "EQUALS",
                value: value,
                logicalOperation: "AND"
            }
        })
        setData(
            {
                filter: filterValues.length > 0 ? filterValues : [],
                query: "",
                pageSize: 10,
                page: 0,
                sortBy: "createdAt",
                sortType: "DES",
            })
    }

    useEffect(() => {
        if(loadingSession && !data) return;
        searchEvent(data, token||"")
        .then((res) => {
            console.log(res.data)
        }).catch((err) => {
            console.log(err)
        })
    },[data])

    return (
        <div className="event-container">
            <h3>Eventos</h3>
            <Filter filtros={filtro} onSubmit={handleFilter}/>
        </div>
    )
}

export default GestionEventos;