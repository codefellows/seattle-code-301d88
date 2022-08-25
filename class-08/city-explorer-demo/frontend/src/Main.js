import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import axios from "axios";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: "",
			photos: [],
    };
  }

	updateSearchQuery = (event) => {
		this.setState({ searchQuery: event.target.value });
	}

  handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const server = process.env.REACT_APP_SERVER_URL;
			const url = `${server}/photos`;
			const response = await axios.get(url, { params: { searchQuery: this.state.searchQuery }});
			this.setState({ photos: response.data });
    } catch (err) {
        console.log(err);
    }
  }

  render() {
		console.log(this.state);
    return (
      <>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label>Look Up Photos About...</Form.Label>
            <Form.Control onChange={this.updateSearchQuery} type="text" placeholder="Enter search term here"/>
          </Form.Group>
        </Form>
      </>
    );
  }
}

export default Main;
