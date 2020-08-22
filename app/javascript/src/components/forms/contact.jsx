import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';

import { createContact } from '../../util/contact_util';
import { receiveFlash, SUCCESS, ERROR } from '../../actions/flash_actions';

import { Button, Form, Input } from 'semantic-ui-react';
import ReCAPTCHA from 'react-google-recaptcha';

import TextareaAutosize from 'react-textarea-autosize';

const ContactForm = ({ setFlash }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const captchaRef = useRef(null);
  
  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);
    createContact({ name, email, message, captcha })
      .then(() => {
        setFlash({ message: "Email sent!", type: SUCCESS });
        setName("");
        setEmail("");
        setMessage("");
        setCaptcha("");
        setErrors({});

        captchaRef.current.reset();
        
        setLoading(false);
      })
      .catch(err => {
        setFlash({ message: "There were some errors sending your message.", type: ERROR });
        setErrors(err.response.data);
        setLoading(false);
      });
  };
  
  return (
    <Form
      onSubmit={ handleSubmit }
      loading={ loading }
    >
      <Form.Input
        error={ errors.name && errors.name.join(". ") }
        required
        placeholder="John Doe"
        label="Name"
        value={ name }
        id="form-input-name"
        onChange={ (_, { value }) => setName(value) }
      />

      <Form.Input
        error={ errors.email && errors.email.join(". ") }
        required
        placeholder="jdoe@example.com"
        label="Email"
        value={ email }
        id="form-input-email"
        onChange={ (_, { value }) => setEmail(value) }
      />

      <Form.Field required>
        <label>Message</label>
        <TextareaAutosize
          minRows={ 3 }
          rows={ 3 }
          maxRows={ 10 }
          placeholder="Message goes here..."
          value={ message }
          onChange={ (e) => setMessage(e.currentTarget.value) }
        />
      </Form.Field>

      <div className="captcha">
        <ReCAPTCHA
          sitekey={ window.siteKey }
          onChange={ setCaptcha }
          ref={ captchaRef }
        />
      </div>

      <Button 
        type="submit" 
        fluid 
        positive
        disabled={ !name || !email || !message }
      >
        Contact Me
      </Button>
    </Form>
  );
};

const mapDispatchToProps = dispatch => ({
  setFlash: flash => dispatch(receiveFlash(flash))
});

export default connect(null, mapDispatchToProps)(ContactForm);
