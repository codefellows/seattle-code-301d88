import React from 'react';
import './App.css';
import Cats from './Cats';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cats: [],
    }
  }

  getCats = async () => {
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

  updateCats = async(catToUpdate) => {
    try {
      let url = `${process.env.REACT_APP_SERVER}/cats/${catToUpdate._id}`;
      let updatedCat = await axios.put(url, catToUpdate);

      let updatedCatArray = this.state.cats.map(existingCat => {
        return existingCat._id === catToUpdate._id
        ? updatedCat.data
        : existingCat
      });
      this.setState({
        cats: updatedCatArray
      });

    } catch (error) {
      console.log('error is cat post: ', error.response);
    }
  }

  componentDidMount() {
    this.getCats();
  }

  render() {
    console.log(this.state.cats);
  
    return (
      <>
        <header>
          <h1>Cool Cats</h1>
        </header>
        <main>
          {
            this.state.cats.length > 0 &&
            <>
              <Cats
                cats={this.state.cats}
                handleDelete={this.handleDelete}
                updateCats={this.updateCats}
              />           
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
