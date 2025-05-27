import { DeleteProductoShoppingCartQuery } from "../helpers/ShoppingCart/querys-delete-shoppingCart";
import { AmountProductShoppingCartQuery, CountProductsShoppingCartQuery, ShoppingCartPaymentAllQuery, ShoppingCartUserQuery, WinesShoppingCartQuery } from "../helpers/ShoppingCart/querys-get-shoppingCart";
import { CreateShoppingCartQuery } from "../helpers/ShoppingCart/querys-post-shoppingCart";
import { PaymentShoppingCartQuery, UpdateAmountProductShoppingCartQuery } from "../helpers/ShoppingCart/querys-put-shoppingCart.ts";
import { UserInformationQuery } from "../helpers/User/querys-get-user";
import { StockWineQuery } from "../helpers/Wine/querys-get-wine";
import { formatEuro } from "./services-wine";

export const AmountProductShoppingCartService = async (props: any) => {
    const { wineId, shoppingCartId } = props;

    const transformData = {
        wineId: parseInt(wineId),
        shoppingCartId: parseInt(shoppingCartId)
    }

    const amount: any = await AmountProductShoppingCartQuery(transformData)

    return (amount)
}

export const UpdateAmountProductShoppingCartService = async (props: any) => {
    const { wineId, shoppingCartId, amount } = props;

    const transformData = {
        wineId: parseInt(wineId),
        shoppingCartId: parseInt(shoppingCartId),
        amount: parseInt(amount)
    }

    if (transformData.amount === 0) {
        await DeleteProductoShoppingCartQuery(transformData)
    } else {
        // Comprobar si hay stock
        const stock: any = await StockWineQuery(transformData.wineId)

        if (stock >= transformData.amount) {
            await UpdateAmountProductShoppingCartQuery(transformData)
        }
    }

    return;
}

export const CountProductsShoppingCartService = async (props: any) => {
    const { shoppingCartId } = props;


    const transformData = {
        shoppingCartId: parseInt(shoppingCartId)
    }

    const wines: any = await CountProductsShoppingCartQuery(transformData)

    let count = 0
    wines.map((wine: any) => {
        count += wine.amount
    })

    return count;
}

export const WinesShoppingCartService = async (props: any) => {
    const { shoppingCartId } = props;

    const transformData = {
        shoppingCartId: parseInt(shoppingCartId)
    }

    const wines: any = await WinesShoppingCartQuery(transformData)

    const total = formatEuro(wines.reduce((sum: number, wine: any) => sum + (wine.wine.price * wine.amount), 0))

    const allWines: any = [];

    wines.map((wine: any) => {
        const Data = {
            id: wine.wine.id,
            amount: wine.amount,
        }

        allWines.push(Data)
    })

    return allWines
}

export const PaymentShoppingCartService = async (props: any) => {
    const { shoppingCart } = props

    const transformData = {
        id: shoppingCart
    }

    // Pagar el carrito actual
    const cart: any = await PaymentShoppingCartQuery(transformData)

    // Crear un nuevo carrito y agregarlo al usuario
    await CreateShoppingCartQuery(parseInt(cart.userId))

    return;
}

export const ShoppingCartPaymentAllService = async (props: any) => {
    const { email } = props

    const transformData = {
        email: email.toUpperCase()
    }

    const orders: any = await ShoppingCartPaymentAllQuery(transformData)

    const { shoppingCart } = orders

    console.log(shoppingCart)

    const allOrders = []

    shoppingCart.map((cart: any) => {

    })

    return
}

export const ShoppingCartUserService = async (props: any) => {
    const { email } = props;

    const transformData = {
        email: email.toUpperCase()
    }

    const shoppingCart: any = await ShoppingCartUserQuery(transformData)

    return shoppingCart.id;
}