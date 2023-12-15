import React from 'react'
import { Modal } from 'react-bootstrap'
import TestModalCmp from './TestModalCmp'

export default function TestModal(props) {
    return (
        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Ajouter Salle
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <TestModalCmp/>
        </Modal.Body>
      </Modal>
      )
    }
