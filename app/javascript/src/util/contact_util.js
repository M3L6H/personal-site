import axios from "./axios";

export const createContact = (contact) => (
  axios({
    method: "post",
    url: "/api/contact",
    data: { contact, "g-recaptcha-response": contact.captcha },
    headers: { "X-Requested-With": "XMLHttpRequest" }
  })
);
