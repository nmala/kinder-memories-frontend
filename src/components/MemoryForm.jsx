import React, { Component } from 'react';
import { Button, Modal, Form } from 'semantic-ui-react';
import '../css/MemoryForm.css';

const options = [
  { key: 'photo', text: 'Photo', value: 'photo' },
  { key: 'video', text: 'Video', value: 'video' },
  { key: 'letter', text: 'Letter', value: 'letter' }
];

class MemoryForm extends Component {
  // Function checks if all input fields are filled in order to enable Submit button.
  formCompleted = () => {
    const {
      newMemTitle,
      newMemDescription,
      newMemType,
      newMemDate,
      newMemLetter,
      newMemFile
    } = this.props;

    if (
      newMemType === 'letter' &&
      newMemTitle &&
      newMemDescription &&
      newMemType &&
      newMemDate &&
      newMemLetter
    ) {
      return true;
    } else if (
      newMemType !== 'letter' &&
      newMemTitle &&
      newMemDescription &&
      newMemType &&
      newMemDate &&
      newMemFile
    ) {
      return true;
    } else {
      return false;
    }
  };

  formFileUploadValidation = () => {
    const {
      newMemTitle,
      newMemDescription,
      newMemType,
      newMemDate,
      newMemFile
    } = this.props;

    if (
      newMemType !== 'letter' &&
      newMemTitle &&
      newMemDescription &&
      newMemType &&
      newMemDate &&
      newMemFile === ''
    ) {
      return 'Please attach file';
    } else {
      return 'Pleae complete form';
    }
  };

  render() {
    const {
      newMemTitle,
      newMemDescription,
      newMemType,
      newMemDate,
      newMemLetter,
      handleChange,
      showAddModal,
      handleSubmit,
      handleSelectChange,
      handleFileUpload,
      childName,
      history
    } = this.props;

    return (
      <Modal open={showAddModal} size='tiny' id='modal-form'>
        <Modal.Header id='modal-header'>Add New Memory</Modal.Header>
        <Modal.Content>
          <Form onSubmit={handleSubmit} id='new-memory-form'>
            <Form.Select
              fluid
              selection
              label='Memory Type'
              color='black'
              name='newMemType'
              options={options}
              placeholder='Type'
              onChange={handleSelectChange}
              value={newMemType}
              required
            />
            <Form.Input
              label='Date of Memory'
              type='date'
              name='newMemDate'
              min='2018-04-13'
              max='2050-04-13'
              onChange={handleChange}
              value={newMemDate}
              required
            />
            <Form.Input
              fluid
              label='Title'
              placeholder='Title'
              name='newMemTitle'
              onChange={handleChange}
              value={newMemTitle}
              required
            />
            <Form.TextArea
              label='Description'
              placeholder={`Tell us more about your memory of ${childName}...`}
              name='newMemDescription'
              onChange={handleChange}
              value={newMemDescription}
              required
            />

            {newMemType === 'photo' || newMemType === 'video' ? (
              <Form.Input
                label={`Attach ${newMemType}`}
                type='file'
                name='file'
                accept={newMemType === 'photo' ? 'image/*' : 'video/*'}
                onChange={handleFileUpload}
                required
              />
            ) : null}
            {newMemType === 'letter' ? (
              <Form.TextArea
                label='Letter (max 500 characters)'
                placeholder={`Write a note for ${childName}...`}
                name='newMemLetter'
                maxLength='500'
                onChange={handleChange}
                id='newMemLetter'
                value={newMemLetter}
                required
              />
            ) : null}
            <Form.Group id='new-form-buttons'>
              <Button negative onClick={() => history.goBack()}>
                Go Back
              </Button>
              <Form.Button
                content={
                  this.props.newMemFile
                    ? 'Submit'
                    : this.formFileUploadValidation()
                }
                positive
                disabled={!this.formCompleted()}
              />
            </Form.Group>
          </Form>
        </Modal.Content>
      </Modal>
    );
  }
}

export default MemoryForm;
