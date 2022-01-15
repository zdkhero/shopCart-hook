import { useState, useEffect } from 'react'

// 导入 aioxs
import request from './utils/request'

import './App.scss'

// 导入头部组件 
import CartHeader from './components/CartHeader'
// 导入底部组件
import CartFooter from './components/CartFooter'
// 导入详情页组件
import GoodsItem from './components/GoodsItem'

export default function App() {
  const [goodsList, setGoodsList] = useState([])

  useEffect(() => {
    const loadData = async () => {
      const res = await request.get('/goodsList')
      setGoodsList(res.data)
    }
    loadData()
  }, [])

  return (
    <div className="app">
      {/* 标题 */}
      <CartHeader>购物车</CartHeader>

      {/* 商品列表项 */}
      {
        goodsList.map(item => (
          <GoodsItem key={item.id} {...item} />
        ))
      }

      {/* 底部 */}
      <CartFooter></CartFooter>
    </div>
  )
}
