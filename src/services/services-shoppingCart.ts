import { DeleteProductoShoppingCartQuery } from "../helpers/ShoppingCart/querys-delete-shoppingCart";
import { AmountProductShoppingCartQuery, CountProductsShoppingCartQuery, ShoppingCartPaymentAllQuery, ShoppingCartUserQuery, WinesShoppingCartQuery } from "../helpers/ShoppingCart/querys-get-shoppingCart";
import { CreateShoppingCartQuery } from "../helpers/ShoppingCart/querys-post-shoppingCart";
import { PaymentShoppingCartQuery, UpdateAmountProductShoppingCartQuery } from "../helpers/ShoppingCart/querys-put-shoppingCart.ts";
import { InfoWineQuery, StockWineQuery } from "../helpers/Wine/querys-get-wine";
import { PaymentWine } from "../helpers/Wine/querys-put-wines";

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
    const { shoppingCartId } = props

    const transformData = {
        id: shoppingCartId
    }

    // Pagar el carrito actual
    const cart: any = await PaymentShoppingCartQuery(transformData)

    // Aumentar las ventas y reducir el stock de los vinos ventidos
    const { wines } = cart

    wines.map(async (wine: any) => {
        const infoWine: any = await InfoWineQuery({ id: wine.wineId })

        if (wine.amount > infoWine.stock) {
            throw new Error('No hay productos suficientes')
        }

        if(infoWine.stock === 0) {
            throw new Error('Ya no hay productos')
        }

        const transformData = {
            id: infoWine.id,
            stock: parseInt(infoWine.stock) - wine.amount,
            sale: parseInt(infoWine.sale) + wine.amount
        }

        await PaymentWine(transformData)
    })

    // Crear un nuevo carrito y agregarlo al usuario
    const newCart: any = await CreateShoppingCartQuery(parseInt(cart.userId))

    return newCart.id;
}

export const ShoppingCartPaymentAllService = async (props: any) => {
    const { email } = props

    const transformData = {
        email: email.toUpperCase()
    }

    const orders: any = await ShoppingCartPaymentAllQuery(transformData)

    return orders
}

export const ShoppingCartUserService = async (props: any) => {
    const { email } = props;

    const transformData = {
        email: email.toUpperCase()
    }

    const shoppingCart: any = await ShoppingCartUserQuery(transformData)

    return shoppingCart.id;
}