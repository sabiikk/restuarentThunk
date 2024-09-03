import React from 'react'
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

function RestCard({resturant}) {
  return (
   <>
   <Link  to={`/resturant_view/${resturant?.id}`} style={{textDecoration:'none',}}>
   <Card style={{ width: '18rem' }} className='p-2'>
      <Card.Img variant="top" src={resturant.photograph} style={{height:'220px'}} />
      <Card.Body>
        <Card.Title className='text-center text-warning'>{resturant.name.slice(0,15)}</Card.Title>
        <Card.Text>
           Neighbor Hood:<span className='text-warning ms-2'>{resturant.neighborhood}</span>
        </Card.Text>
      </Card.Body>
    </Card>
   
   </Link>

   

   </>
  )
}

export default RestCard