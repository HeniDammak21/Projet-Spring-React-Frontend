import { Modal } from 'react-bootstrap'
import React from 'react'
import AddProduct from './AddProduct'

export default function AddProductModal(props) {
    return (
        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Product
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <AddProduct/>
        </Modal.Body>
      </Modal>
      )
}
