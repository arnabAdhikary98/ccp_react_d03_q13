# Dynamic Form Field Management

## Problem Statement

Design a form that allows users to add multiple "email" fields dynamically. Implement the following features:

* A "Add Email" button that appends a new email input field.
* Use `useState` to track and display all entered email addresses below the form in real time.
* Validate that each email field contains a properly formatted email address.
* Display errors for invalid fields.

## Solution (React Code)

```jsx
import React, { useState } from "react";

function DynamicEmailForm() {
  const [emails, setEmails] = useState([{ value: "", error: "" }]);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleEmailChange = (index, newValue) => {
    const newEmails = [...emails];
    newEmails[index].value = newValue;

    if (newValue === "") {
      newEmails[index].error = "Email is required";
    } else if (!validateEmail(newValue)) {
      newEmails[index].error = "Invalid email format";
    } else {
      newEmails[index].error = "";
    }

    setEmails(newEmails);
  };

  const handleAddEmail = () => {
    setEmails([...emails, { value: "", error: "" }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const hasErrors = emails.some((email) => email.error || email.value === "");
    if (hasErrors) {
      alert("Please fix the errors before submitting.");
      return;
    }
    alert("All emails are valid!");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Dynamic Email Form</h2>
      <form onSubmit={handleSubmit}>
        {emails.map((emailObj, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            <input
              type="email"
              placeholder={`Email ${index + 1}`}
              value={emailObj.value}
              onChange={(e) => handleEmailChange(index, e.target.value)}
              style={{ padding: "5px", width: "250px" }}
            />
            {emailObj.error && (
              <div style={{ color: "red", fontSize: "0.8em" }}>{emailObj.error}</div>
            )}
          </div>
        ))}
        <button type="button" onClick={handleAddEmail} style={{ marginRight: "10px" }}>
          Add Email
        </button>
        <button type="submit">Submit</button>
      </form>

      <h3>Entered Emails:</h3>
      <ul>
        {emails.map((emailObj, index) => (
          <li key={index}>{emailObj.value}</li>
        ))}
      </ul>
    </div>
  );
}

export default DynamicEmailForm;
```

## Explanation

* **State**: I used `useState` to hold an array of email objects, each containing a `value` and `error`.
* **Adding Fields**: Clicking "Add Email" appends a new empty email object to the state.
* **Validation**: On every input change, the corresponding email is validated. If empty or invalid, an appropriate error message is set.
* **Displaying Emails**: All entered email addresses are shown live below the form.
* **Submission**: On submit, if any email is empty or invalid, an alert is shown to fix errors first. Otherwise, a success message is shown.
