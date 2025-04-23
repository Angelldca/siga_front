
import './Alert.css';


interface Props {
  type:string;
  message:string;
  onClose:()=> void
}

export default function Alert({ type = 'error', message, onClose }:Props) {
  return (
    <div className={`alert alert-${type} animate__animated animate__fadeInRight`}>
      <div className='title-alert'>
        <small className="alert-icon">{
          type === 'success' ? '✅ Operacion Exisota' :
            type === 'warning' ? '⚠️ Advertencia' :
              '❌ Error'
        }</small>
        <button className="alert-close" onClick={onClose}>✕</button>
      </div>
      <p className="alert-message">{message}</p>
    </div>
  );
}