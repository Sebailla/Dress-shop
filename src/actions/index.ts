
export {getPaginatedProductsWithImages} from './products/product-pagination'
export {getProductBySlug} from './products/getProductBySlug'
export {getStockBySlug} from './products/getStockBySlug'
export{getCategories} from'./products/getCategorys'
export {createUpdateProduct}from './products/createUpdateProduct'
export {deleteImageProduct} from './products/deleteImageProduct'



export {authenticate} from './auth/login'
export {autoLogin} from './auth/login'
export {logout} from './auth/logout'

export{registerUser} from './auth/register'

export {getCountries} from './countries/getCountries'

export {setUserAddress} from './address/setUserAddress'
export {deleteUserAddress} from './address/deleteUserAddress'
export {getUserAddress} from './address/getUserAddress'

export {placeOrder} from './orders/placeOrder'
export {getOrderById} from './orders/getOrderById'
export {getOrderByUser} from './orders/getOrdersByUser'
export {getPaginatedOrders} from './orders/getPaginatedOrder'


export {setTransactionId} from './payments/setTransactionId'
export {paypalCheckPayment} from './payments/paypalCheckPayment'

export {getUsers} from './users/getUsers'
export {roleChange} from './users/roleChange'



