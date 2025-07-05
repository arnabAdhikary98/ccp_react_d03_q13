import React, { useState } from "react";

function DynamicEmailForm() {
  const [emails, setEmails] = useState([{ value: "", error: "" }]);

  // Regex to validate email
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Handle change in email input
  const handleEmailChange = (index, newValue) => {
    const newEmails = [...emails];
    newEmails[index].value = newValue;

    // Validate
    if (newValue === "") {
      newEmails[index].error = "Email is required";
    } else if (!validateEmail(newValue)) {
      newEmails[index].error = "Invalid email format";
    } else {
      newEmails[index].error = "";
    }

    setEmails(newEmails);
  };

  // Add a new email field
  const handleAddEmail = () => {
    setEmails([...emails, { value: "", error: "" }]);
  };

  // Submit handler
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
    <div className="App" style={{ padding: "20px" }}>
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
