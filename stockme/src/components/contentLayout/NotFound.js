import React from 'react';
import notFound from '../../assets/404.jpg';
const NotFound = () => {
  return (
    <div>
        <img src={notFound} alt="notfound" style={{position: 'relative', top: 100, width: "100%"}} />
    </div>
  );
}

export default NotFound;