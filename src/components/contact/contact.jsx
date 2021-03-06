import React from "react";
import { Row, Col } from "react-flexbox-grid";
import "./contact.scss";
import * as emailjs from "emailjs-com";
import Title from "../ui-components/title/title";
import Modal from "../contact-modal/Modal";

import ContactBackground from "../../assets/contact/bg.png";

class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      message: "",
      sending: false,
      successModal: false,
      errorModal: false,
    };
  }

  inputHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (e) => {
    var self = this;
    this.setState({ sending: true });
    e.preventDefault();

    var template_params = {
      name: this.state.name,
      email: this.state.email,
      message: this.state.message,
    };

    // YOUR EMAIL.JS API KEY IN FORMAT user_xxxxxxxxxxxxxxxxxx
    let API_KEY = "user_HIwbFJVNmnbEHCI8KA4G1";

    // YOUR EMAIL.JS TEMPLATE ID
    let TEMPLATE_ID = "template_87fb0nr";

    emailjs.send("default_service", TEMPLATE_ID, template_params, API_KEY).then(
      function (response) {
        if (response.status === 200) {
          self.showSuccessModal();
        } else {
          self.showErrorModal();
        }
      },
      function (error) {
        self.showErrorModal();
      }
    );
  };

  // SUCCESS MODAL
  showSuccessModal = () => {
    this.setState({ successModal: true, sending: false });
    this.resetForm();
  };
  // ERROR MODAL
  showErrorModal = () => {
    this.setState({ errorModal: true, sending: false });
    this.resetForm();
  };
  // RESET CONTACT FORM
  resetForm() {
    this.setState({ name: "", email: "", message: "" });
  }
  // CLOSE ALL MODALS
  closeModal = () => {
    this.setState({ successModal: false, errorModal: false });
  };

  resetForm = () => {
    this.setState({ name: "", email: "", message: "" });
  };

  render() {
    let submitButtonRender = (
      <div className="small__button">
        <button aria-label="send message" type="submit" value="Enviar Mensaje">
          Enviar Mensaje
        </button>
      </div>
    );
    if (this.state.sending) {
      submitButtonRender = (
        <div className="small__button sending-btn">
          <div className="flex-center">
            <div className="sbl-circ"></div>
          </div>
        </div>
      );
    }
    let modalRender = null;
    if (this.state.successModal) {
      modalRender = <Modal closeModal={this.closeModal} status="success" />;
    } else if (this.state.errorModal) {
      modalRender = <Modal closeModal={this.closeModal} status="error" />;
    }
    return (
      <div id="contact">
        {modalRender}
        <div className="wrapper">
          <Title title="CONTÁCTAME" />

          <Row className="padding20">
            <Col md={12} lg={6}>
              <form id="contact-form" onSubmit={this.handleSubmit}>
                <h4 className="font30 weight800 padding5">
                  ¿Tienes alguna idea o pregunta?
                </h4>
                <input
                  type="text"
                  placeholder="Nombre"
                  required
                  name="name"
                  value={this.state.name}
                  onChange={this.inputHandler}
                />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  name="email"
                  value={this.state.email}
                  onChange={this.inputHandler}
                />
                <textarea
                  rows="6"
                  cols="50"
                  placeholder="Mensaje"
                  required
                  name="message"
                  value={this.state.message}
                  onChange={this.inputHandler}
                ></textarea>
                <Row>{submitButtonRender}</Row>
              </form>
            </Col>
            <Col md={12} lg={6}>
              <div className="flex-center">
                <img src={ContactBackground}   alt = "Michael comber - COMBERsemos!"   />
              </div>
              <div className="flex-center pad padb">
                <p className="font30 weight800 padding5 color-b">
                <span className="font30 weight800 padding5 color-y">
                  COMBERsemos{" "}
                  </span>
                   <br></br>{" "} 
                  por WhatsApp {" "}
                  <span className="font30 weight800 padding15 color-y">
                  <a href="https://chat.whatsapp.com/L8DpaaArgmM0qPPrFSMgpP" className="color-y" target ="#blank">
                    aquí 
                  <br></br></a>
                  </span>
                  por Telegram {" "}
                  <span className="font30 weight800 padding5 color-y ">
                  <a href="https://t.me/COMBERsemos" className="color-y" target ="#blank">
                    aquí 
                  <br></br></a>
                  </span>
                </p>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default Contact;
