import './App.scss'

// 导入头部组件 
import CartHeader from './components/CartHeader'
// 导入底部组件
import CartFooter from './components/CartFooter'


export default function App() {
  return (
    <div className="app">
      {/* 标题 */}
      <CartHeader>购物车</CartHeader>

      {/* 商品列表项 */}
      <div className="my-goods-item">
        <div className="left">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="input"
            />
            <label className="custom-control-label" htmlFor="input">
              <img
                src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                alt=""
              />
            </label>
          </div>
        </div>
        <div className="right">
          <div className="top">商品名称</div>
          <div className="bottom">
            <span className="price">¥ 商品价格</span>
            <span>counter组件</span>
          </div>
        </div>
      </div>

      {/* 底部 */}
      <CartFooter></CartFooter>
    </div>
  )
}
