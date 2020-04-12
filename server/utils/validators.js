module.exports.validateRegisterInput = (
  username,
  email,
  password,
  confirmPassword,
  termAgree
) => {
  const errors = {};
  if (username.trim() === "") {
    errors.username = "Username must not be empty";
  }
  if (email.trim() === "") {
    errors.email = "Email must not be empty";
  } else {
    const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email.match(regEx)) {
      errors.email = "Please use a valid email address";
    }
  }
  if (!termAgree) {
    errors.termAgree = "You must agree to the terms";
  }
  if (password === "") {
    errors.password = "Password must not be empty";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords must match";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1
  };
};

module.exports.validateLoginInput = (username, password) => {
  const errors = {};
  if (username.trim() === "") {
    errors.username = "Username must not be empty";
  }
  if (password.trim() === "") {
    errors.password = "Password must not be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1
  };
};

module.exports.validateTaskInput = (body, tag, topic, importance) => {
  const errors = {};
  if (body.trim() === "") {
    errors.body = "Task body must not be empty";
  }

  if (tag.trim() === "") {
    errors.tag = "Task tag must not be empty";
  }

  if (topic.trim() === "") {
    errors.topic = "Task topic must not be empty";
  }

  if (importance.trim() === "") {
    errors.importance = "Task importance must not be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1
  };
};
