import addIcon from '../../assets/add.png';
import detail from '../../assets/info_blue.png';
import asignIcon from '../../assets/list_add.png';
import del from '../../assets/delete_withe.png';
import editIcon from '../../assets/edit_white.png';

import "./Action_btn.css"
import { useEffect, useState } from 'react';


interface ActionProps {
  module: string;
  avaible: number;
  create: boolean;
  edit: boolean;
  deleteBtn: boolean;
  show: boolean;
  asign?: boolean;
  createModule?: () => void;
  showDetail?: () => void;
  asigElement?: () => void;
  deleteModule?: () => void;
  editModule?: () => void;
}

const ActionBtn = ({
  module,
  avaible,
  create = true,
  edit = true,
  deleteBtn = true,
  show = true,
  asign=false,
  createModule,
  showDetail,
  asigElement,
  deleteModule,
  editModule
}: ActionProps) => {

  const [detailEnabled, setDetailEnabled] = useState(avaible === 1);
  const [asignEnable, setAsignEnable] = useState(avaible === 1);
  const [deleteEnabled, setDeleteEnabled] = useState(avaible > 0);

  const primaryHandler = avaible === 1 ? editModule : createModule;
  const primaryIcon = avaible === 1 ? editIcon : addIcon;
  const primaryLabel = avaible === 1 ? "Editar" : "Crear";

  const detailHandler = detailEnabled ? showDetail : undefined;
  const deleteHandler = deleteEnabled ? deleteModule : undefined;

  useEffect(() => {
    setDetailEnabled(avaible === 1);
    setAsignEnable(avaible === 1);
    setDeleteEnabled(avaible > 0);
  }, [avaible]);

  return (
    <div className="event-action">
      <h3>{module}</h3>
      <div className="actions">
        {/* Crear / Editar */}
        {(create || edit) && (
          <div className="btn-container">
            <button
              className="btn-primary btn_action"
              onClick={primaryHandler}
            >
              <img alt={primaryLabel} src={primaryIcon} />
            </button>
            <span className="tooltip">{primaryLabel}</span>
          </div>
        )}

        {/* Detalles */}
        {show && (
          <div className="btn-container">
            <button
              className={`btn-secondary btn_action ${detailEnabled ? "" : "opacity-btn"}`}
              onClick={detailHandler}
              disabled={!detailEnabled}
            >
              <img alt="Detalles" src={detail} />
            </button>
            <span className="tooltip">Detalles</span>
          </div>
        )}
         {/* Asignar */}
         {asign && (
          <div className="btn-container">
            <button
              className={`btn-secondary btn_action ${asignEnable ? "" : "opacity-btn"}`}
              onClick={asigElement}
              disabled={!asignEnable}
            >
              <img alt="Asignar" src={asignIcon} />
            </button>
            <span className="tooltip">Asignar</span>
          </div>
        )}

        {/* Eliminar */}
        {deleteBtn && (
          <div className="btn-container">
            <button
              className={`btn-danger btn_action ${deleteEnabled ? "" : "opacity-btn"}`}
              onClick={deleteHandler}
              disabled={!deleteEnabled}
            >
              <img alt="Eliminar" src={del} />
            </button>
            <span className="tooltip">Eliminar</span>
          </div>
        )}

     
      </div>
    </div>
  );
};

export default ActionBtn;