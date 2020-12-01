import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { Col } from "shards-react";

const LoginPageTitle = ({ title, subtitle, className, ...attrs }) => {
  const classes = classNames(
    className,
    "text-center",
    "text-md-center",
    "mb-sm-0",
    "col-sm-12"
  );

  return (
    <Col className={classes} { ...attrs }>
      <span className="text-uppercase page-subtitle">{subtitle}</span>
      <h2 className="page-title">{title}</h2>
    </Col>
  )
};

LoginPageTitle.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string
};

export default LoginPageTitle;
