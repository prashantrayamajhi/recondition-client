import '../../admin/Products/index.scss'
import './index.scss'
import { useState, useEffect } from 'react'
import Card from '../LatestProducts/Card'
import Navbar from '../navbar/HomeNav'
import Axios from '../../../api/server'
import Footer from '../Footer/Footer'
import ProductEntity from '../../../entity/ProductEntity'

export default function Product() {
  const [products, setProducts] = useState<ProductEntity[]>([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await Axios.get('/api/v1/admin/products')
        setProducts(res.data.data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchData().then()
  }, [])

  const mappedData = products.slice(0).reverse().map((product: ProductEntity, index: number) => {
    return <Card key={index} id={product._id} title={product.name} thumbnail={product.images[0]}
      price={product.price} color={product.color} km={product.km} model={product.model}  />
  })

  return (
    <>
      <Navbar />
      <div className='products-wrapper buyers' style={{ margin: 0, paddingTop: 70, paddingBottom: 150 }}>
        {mappedData}
      </div>
      <Footer />
    </>
  )
}
