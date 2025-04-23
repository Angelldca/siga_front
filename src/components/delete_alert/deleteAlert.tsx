
import "./DeleteAlert.css"
import deleteIcon from "../../assets/deletered.png"


interface Props {
    module: string;
    handlerDelete: () => void;
    onClose: () => void;
}

export default function DeleteAlert({ module,handlerDelete,onClose }: Props) {

    return (
        <div className="delete-alert">
            <header className="header-delete">{`Eliminar ${module}`}</header>
            <div className="content-delete">
                <img src={deleteIcon} alt="delete" className="img-delete" />
                <p>Estas seguro de elimirar el/los {module}(s)</p>

                <div className="btn-delete-container">
                    <button className="btn-secondary" 
                    onClick={onClose}
                    >Cancelar</button>
                    <button 
                    className="btn-primary"
                    onClick={handlerDelete}
                    >Aceptar</button>

                </div>
            </div>
        </div>
    )
}