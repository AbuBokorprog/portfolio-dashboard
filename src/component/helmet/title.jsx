// eslint-disable-next-line no-unused-vars
import React from "react";
import { Helmet } from "react-helmet";
// import { Helmet } from "react-helmet-async";

// eslint-disable-next-line react/prop-types
const Title = ({ title, content }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta name="description" content={content}></meta>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
    </div>
  );
};

export default Title;
