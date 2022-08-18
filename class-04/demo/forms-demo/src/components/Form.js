import React from 'react';
import Form from 'react-bootstrap/Form';

class OurForm extends React.Component {

  render() {
    return (
      <form onSubmit={this.props.submitHandler}>
        <Form.Select onChange={this.props.changeHandler}>
          <option></option>
          <option>John</option>
          <option>Jo</option>
          <option>a</option>
        </Form.Select>

        <Form.Group>
          <Form.Label>Filter Criteria</Form.Label>
          <Form.Control type="text" onChange={this.props.changeHandler} />
        </Form.Group>

        <button type="submit">Submit the form</button>
      </form>
    );
  }

}

export default OurForm;
