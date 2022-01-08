import React from "react";
import { Breadcrumbs, AppBar, Toolbar } from "@material-ui/core";
import { Link, useLocation } from "react-router-dom";

const SimpleBreadcrumbs = () => {
  let location = useLocation();
  let { pathname } = location;
  return (
    <AppBar position="static" style={{ marginBottom: "20px" }}>
      <Toolbar>
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            style={{
              textDecoration: "none",
              color: "white"
            }}
            to="/"
          >
            Home
          </Link>

          <Link
            style={{
              textDecoration: "none",
              color: "white"
            }}
            color="inherit"
            to="/terms-conditions"
          >
            Terms & Conditions
          </Link>

          {pathname.startsWith("/pokemon") && (
            <Link
              style={{
                textDecoration: "none",
                color: "white"
              }}
              to={pathname}
            >
              {pathname.split("/")[2]}
            </Link>
          )}
          {pathname.startsWith("/pokemon") && pathname.includes("/moves/") && (
            <Link
              style={{
                textDecoration: "none",
                color: "white"
              }}
              to={pathname}
            >
              {pathname.split("/")[4]}
            </Link>
          )}
        </Breadcrumbs>
      </Toolbar>
    </AppBar>
  );
};

export default SimpleBreadcrumbs;
