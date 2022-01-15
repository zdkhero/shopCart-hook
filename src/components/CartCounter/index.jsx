import { useContext } from 'react'
import { CountContext } from '../../count-context'

import './index.scss'

const CartCounter = ({ id, goods_count }) => {
  const { changeCount } = useContext(CountContext)

  return (
    <div className="my-counter">
      <button
        type="button"
        className="btn btn-light"
        onClick={() => changeCount(id, goods_count - 1)}
      >
        -
      </button>
      <input type="number" className="form-control inp" value={goods_count} onChange={() => {}} />
      <button
        type="button"
        className="btn btn-light"
        onClick={() => changeCount(id, goods_count + 1)}
      >
        +
      </button>
    </div>
  )
}

export default CartCounter
