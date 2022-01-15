import './App.scss'

// 导入头部组件 
import CartHeader from './components/CartHeader'
// 导入底部组件
import CartFooter from './components/CartFooter'
// 导入详情页组件
import GoodsItem from './components/GoodsItem'


export default function App() {
  return (
    <div className="app">
      {/* 标题 */}
      <CartHeader>购物车</CartHeader>

      {/* 商品列表项 */}
      <GoodsItem></GoodsItem>
      <GoodsItem></GoodsItem>
      <GoodsItem></GoodsItem>

      {/* 底部 */}
      <CartFooter></CartFooter>
    </div>
  )
}
