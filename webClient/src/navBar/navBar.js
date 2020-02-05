import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
  <div className="navbar-fixed">
    <nav className="z-depth-0">
      <div className="nav-wrapper white">
        <Link
          to="/"
          style={{
            fontFamily: 'monospace',
          }}
          className="col s5 brand-logo center black-text"
        >
          Cat Time
        </Link>
      </div>
    </nav>
  </div>
);
