import React from 'react'
import { Modal } from 'react-bootstrap'
import AddCategoryCmp from './AddCategoryCmp'

function AddCategoryModal(props) {
  return (
    <Modal
    {...props}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">
        Add Category
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
     <AddCategoryCmp/>
    </Modal.Body>
  </Modal>
  )
}

export default AddCategoryModal
