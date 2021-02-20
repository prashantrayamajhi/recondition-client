import { useEffect, useState } from 'react'
import Axios from '../../api/server'
import Card from './Card'
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core'
import './../Products/index.scss'
import './index.scss'

export default function LatestProducts() {
  const [products, setProducts] = useState<any>([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await Axios.get('/api/v1/admin/products/limit/'+3)
        setProducts(res.data.data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, [])
  const mappedData = products.slice(0).reverse().map((product: any, index: number) => {
    return <Card key={index} id={product._id} title={product.name} thumbnail={product.thumbnail} price={product.price} />
  })
  return (
    <>
      <section className='products-section'>
        <h2>Latest products</h2>
        <p>Some of our latest products.</p>
        <div className='products-wrapper'>
          { mappedData }
        </div>
        <Link className='link' to='/products'><Button className='btn' variant='contained' color='primary'>See More</Button></Link>
      </section>
    </>
  )
}
