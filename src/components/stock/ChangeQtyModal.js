import { Modal } from 'react-bootstrap'
import React from 'react'
import ChangeQty from './ChangeQty'

export default function ChangeQtyModal(props) {
    return (
        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter" style ={{textTransform:'capitalize'}}>
            {props.func} Quantity
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <ChangeQty func={props.func} toedit={props.toedit}/>
        </Modal.Body>
      </Modal>
      )
}
