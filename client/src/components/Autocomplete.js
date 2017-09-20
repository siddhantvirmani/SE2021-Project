import Select from 'react-select';
import React, { Component } from 'react';
import 'react-select/dist/react-select.css';
import { Button, Form, FormGroup, Radio } from 'react-bootstrap';

class Autocomplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
        selectedSuburb: null,
        selectedProfile: null,
        options: []
    };
    this.updateSuburb = this.updateSuburb.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.getSuburbs();
  }
 
  updateSuburb (newValue) {
    if (newValue != null) {
      this.setState({
        selectedSuburb: newValue.value
      })
      console.log("Selected Suburb is: ", newValue.value)
    }
  }

  updateProfile (newValue) {
    if (newValue != null) {
      this.setState({
        selectedProfile: newValue
      })
      console.log("Selected Profile is: ", newValue)
    }
  }

  handleSubmit (event) {
    event.preventDefault();
    if ((this.state.selectedSuburb != null) && (this.state.selectedProfile != null)){
      console.log("Ready to submit")
    }
  }

  async getSuburbs () {
    const response = await fetch('/suburbs');
    const data = await response.json();
    var suburbs = [];
    var i = 0;
    data.docs.forEach(function(elem) {
      suburbs[i] = {};
      suburbs[i].value = elem.name;
      suburbs[i].label = elem.name + ' ' + elem.post;
      i++;
    });
    this.setState({
      options: suburbs
    });
  }

  render () {
    return (
      <div>
       <Select 
          autofocus={true} 
          options={this.state.options}
          clearable={false} 
          value={this.state.selectedSuburb}
          onChange={this.updateSuburb} 
          searchable={this.state.searchable}
          noResultsText="No suburbs found..." 
          placeholder="Select a suburb..."
          />
        <p>What kind of a user are you?</p>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup role="form">
            <Radio name="radioGroup" inline onChange={this.updateProfile.bind(this,"Investor")}>
              Investor
            </Radio>
            {' '}
            <Radio name="radioGroup" inline onChange={this.updateProfile.bind(this,"General User")}>
              General User
            </Radio>
            {' '}
            <Radio name="radioGroup" inline onChange={this.updateProfile.bind(this,"Researcher")}>
              Researcher
            </Radio>
            {' '}
            <Button type="submit">Submit</Button>
          </FormGroup>
        </Form>
      </div>
    )
  }

}

export default Autocomplete;