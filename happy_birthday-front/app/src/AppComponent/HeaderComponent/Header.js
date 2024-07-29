import React, { Component } from 'react';
import axios from 'axios';
const { DateTime } = require("luxon");

class HeaderComponent extends Component {
  constructor() {
    super();
    this.state = {
      currentTime: DateTime.local(),
      birthdayFile: null,
      quoteFile: null,
    };
  }

  componentDidMount() {
    this.intervalID = setInterval(this.updateTime, 10); // Mettre à jour toutes les secondes
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  updateTime = () => {
    this.setState({
      currentTime: DateTime.local(),
    });
  };

  handleFileUploadBirthday = (event) => {
    const formData = new FormData();
    formData.append('birthday', event.target.files[0]);

    try {
      axios.post('http://localhost:3002/sendUploadBithday', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (err) {
      console.error('Error uploading files:', err);
    }
    console.log('Files uploaded successfully:', formData);
  };

  handleFileUploadQuote = async (event) => {
    const formData = new FormData();
    const file = event.target.files[0];

    if (!file) {
      console.error('No file selected for upload.');
      return;
    }

    formData.append('quotes', file);

    try {
      const response = await axios.post('http://localhost:3002/sendUploadQuotes', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Files uploaded successfully:', response.data);
    } catch (err) {
      console.error('Error uploading files:', err.response ? err.response.data : err.message);
    }
  }

  render() {
    const { currentTime } = this.state;
    const currentDate = DateTime.now().setLocale('fr').toFormat('cccc dd MMMM yyyy')


    return (
      <div className="fixed min-w-full bg-white py-6 px-12 flex border-b-2 border-slate-900 place-content-between font-bison text-4xl tracking-wide uppercase">
        <div>
          <h1>Citation et anniversaires</h1>
        </div>
        <div>
          <label>IMPORT BIRTHDAY</label>
          <input type="file" accept=".csv" onChange={this.handleFileUploadBirthday} />
          <label>IMPORT QUOTES</label>
          <input type="file" accept=".csv" onChange={this.handleFileUploadQuote} />
        </div>
        <div>
          <span>
            {currentDate}| 
            {currentTime.toLocaleString(DateTime.TIME_24_WITH_SECONDS)}
          </span>
        </div>
      </div>
    );
  }
}

export default HeaderComponent;