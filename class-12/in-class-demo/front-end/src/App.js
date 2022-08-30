import React from 'react';
import './App.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      cats: [],
    }
  }

  getCats = async() => {
    try {
      // make a call to my server/cats to get cats
      let catData = await axios.get(`${process.env.REACT_APP_SERVER}/cats`);
      // catData.data
      this.setState({
        cats: catData.data
      })

    } catch (error) {
      console.log('we have an error: ', error.response);
    }
  }

  handleCatCreate = async (catInfo) => {
    console.log(catInfo);
    try {
      const response = await axios.post(`${process.env.REACT_APP_SERVER}/cats`, catInfo);
      const newCat = response.data;
      this.setState({
        cats: [...this.state.cats, newCat],
      });
    } catch (error) {
      console.log('error is cat post: ', error.response);
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.handleCatCreate({
      name: event.target.formName.value,
      color: event.target.formColor.value,
      spayNeuter: event.target.formSpayNeuter.checked,
      location: event.target.formLocation.value,
    })
  }

  handleDelete = async (catToDelete) => {
    try {
      // make axios.delete request
      const response = await axios.delete(`${process.env.REACT_APP_SERVER}/cats/${catToDelete._id}`);

      // console.log response.status
      console.log(response.status);

      // .filter on the front end
      const filteredCats = this.state.cats.filter(cat => {
        return cat._id !== catToDelete._id;
      })

      // .setState with the filteredCats
      this.setState({
        cats: filteredCats
      })

    } catch (error) {
      console.log(error);
    }
  }

  // React Lifecycle function that will run this block of code as soon as the component is rendered to the DOM tree... net effect: it will call this.getCats() right on site load.
  componentDidMount() {
    this.getCats();
  }

  render() {
    console.log(this.state.cats);
    let cats = this.state.cats.map(cat => (
      <>
        <p key={cat._id}>{cat.name} is a {cat.color}</p>
        <button onClick={() => this.handleDelete(cat)}>Remove from database?</button>
      </>
    ))
    return (
      <>
        <header>
          <h1>Cool Cats</h1>
        </header>
        <main>
        {
          this.state.cats.length > 0 &&
          <>
            {cats}
          </>
        }
        <Form onSubmit={this.handleSubmit}>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="name" placeholder="Enter cat name" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formColor">
            <Form.Label>Color</Form.Label>
            <Form.Control type="name" placeholder="Enter cat color" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formSpayNeuter">
            <Form.Check type="checkbox" label="Is spayed or neutered?" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formLocation">
            <Form.Label>Location</Form.Label>
            <Form.Control type="name" placeholder="Enter cat location" />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        </main>
      </>
    );
  }
}

export default App;
