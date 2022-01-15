import { useState, useEffect } from 'react'

// 导入 aioxs
import request from './utils/request'

import './App.scss'

import { CountContext } from './count-context'

// 导入头部组件 
import CartHeader from './components/CartHeader'
// 导入底部组件
import CartFooter from './components/CartFooter'
// 导入详情页组件
import GoodsItem from './components/GoodsItem'

export default function App() {
  const [goodsList, setGoodsList] = useState([])
  // 全选与全不选
  const [checkAll, setCheckAll] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      const res = await request.get('/goodsList')
      setGoodsList(res.data)

      // every() 方法用于检测数组所有元素是否都符合指定条件
      // 如果所有元素都满足条件，则返回 true，有一个元素不满足，则整个表达式返回 false ，且剩余的元素不会再进行检测。
      setCheckAll(res.data.every(item => item.goods_state))
    }
    loadData()
  }, [])

  // 全选与全不选
  const changeCheckAll = checkAll => {
    setCheckAll(checkAll)

    // 本地数据状态修改
    setGoodsList(
      goodsList.map(item => {
        return {
          ...item,
          goods_state: checkAll
        }
      })
    )

    // 接口数据状态修改
    goodsList.forEach(item =>
      request.patch(`/goodsList/${item.id}`, {
        goods_state: checkAll
      })
    )
  }

  // 更改商品状态
  const changeGoodsState = async (id, goods_state) => {
    // 拿到要更新的 goodsList 值
    const newGoodsList = goodsList.map(item => {
      if (item.id === id) {
        return {
          ...item,
          goods_state
        }
      }
      return item
    })

    setGoodsList(newGoodsList)
    // 注意：此处遍历的是 newGoodsList 
    setCheckAll(newGoodsList.every(item => item.goods_state))

    await request.patch(`/goodsList/${id}`, {
      goods_state
    })
  }

  // 计算购买总数
  const totalCount = goodsList.reduce((count, item) => {
    if (item.goods_state) {
      return count + item.goods_count
    }
    return count
  }, 0)

  // 计算购买总价
  const totalPrice = goodsList.reduce((count, item) => {
    if (item.goods_state) {
      return count + item.goods_count * item.goods_price
    }
    return count
  }, 0)

  const changeCount = async (id, goods_count) => {
    if (goods_count < 1) return

    setGoodsList(
      goodsList.map(item => {
        if (item.id === id) {
          return {
            ...item,
            goods_count
          }
        }
        return item
      })
    )

    await request.patch(`/goodsList/${id}`, {
      goods_count
    })
  }

  return (
    <CountContext.Provider value={{ changeCount }}>
      <div className="app">
        {/* 标题 */}
        <CartHeader>购物车</CartHeader>

        {/* 商品列表项 */}
        {
          goodsList.map(item => (
            <GoodsItem changeState={changeGoodsState} key={item.id} {...item} />
          ))
        }

        {/* 底部 */}
        <CartFooter
          checkAll={checkAll}
          changeCheckAll={changeCheckAll}
          totalCount={totalCount}
          totalPrice={totalPrice}
        />
      </div>
    </CountContext.Provider>
  )
}
