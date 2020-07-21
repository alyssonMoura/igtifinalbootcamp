import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import Formulario from "./Formulario";
import routes from "../../service/routes";

export default function ModalTransaction({ transaction, isOpen, modalClosed }) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [lunch, setLunch] = useState();
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    return modalClosed(false);
  }
  const handlerSave = () => {
    if (lunch._id) {
      routes
        .update(lunch._id, lunch)
        .then((response) => {
          closeModal();
        })
        .catch((e) => {
          console.log("Não salvou");
          console.log(e);
        });
    } else {
      routes
        .create(lunch)
        .then((response) => {
          closeModal();
        })
        .catch((e) => {
          console.log("Não salvou");
          console.log(e);
        });
    }
  };
  useEffect(() => {
    if (isOpen) {
      openModal();
    } else {
      closeModal();
    }
  }, [isOpen]);
  const hendlerTransaction = (newTransaction) => {
    setLunch(newTransaction);
  };
  return (
    <>
      <div>
        <button onClick={openModal} className="m-1 btn btn-sm btn-danger">
          NOVO LANÇAMENTO
        </button>
        <Modal
          ariaHideApp={false}
          style={customStyles}
          isOpen={modalIsOpen}
          // onRequestClose={closeModal}
          contentLabel="Lançamento de transação"
        >
          <div className="row">
            <div className="col s1 offset-s10">
              <button
                onClick={closeModal}
                className="m-1 btn btn-sm btn-danger red"
              >
                <span className="flow-text">X</span>
              </button>
            </div>
            <div className="col s12 center">
              <span className="flow-text">Novo Lançamento </span>
            </div>
          </div>
          <form>
            <Formulario
              transaction={transaction}
              hendlerTransaction={hendlerTransaction}
            />
            <div className="row">
              <div className="col s1 offset-s10">
                <button className="m-1 btn btn-sm blue" onClick={handlerSave}>
                  SALVAR
                </button>
              </div>
            </div>
          </form>
        </Modal>
      </div>
    </>
  );
}

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

// <div>
//   <button data-target="modal1" className="btn modal-trigger">
//     NOVO LANÇAMENTO
//   </button>
//   <div
//     ref={(Modal) => {
//       this.Modal = Modal;
//     }}
//     id="modal1"
//     className="modal"
//   >
//     <div className="modal-content row s12">
//       <div className="col s1 offset-s11">
//         <button
//           data-target="modal1"
//           className="modal-close red lighten-2 no-border"
//         >
//           <i className="small material-icons red lighten-2">cancel</i>
//         </button>
//       </div>
//     </div>
//     <div className="center-ali">
//       <Formulario />
//     </div>
//     <div className="modal-footer">
//       <button
//         data-target="modal1"
//         className="modal-close waves-effect waves-green btn-flat"
//       >
//         SALVAR
//       </button>
//     </div>
//   </div>
// </div>
