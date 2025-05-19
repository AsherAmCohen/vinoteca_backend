import { DeleteProductoShoppingCartQuery } from "../helpers/ShoppingCart/querys-delete-shoppingCart";
import { AmountProductShoppingCartQuery, CountProductsShoppingCartQuery } from "../helpers/ShoppingCart/querys-get-shoppingCart";
import { UpdateAmountProductShoppingCartQuery } from "../helpers/ShoppingCart/querys-put-shoppingCart.ts";
import { StockWineQuery } from "../helpers/Wine/querys-get-wine";

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
    const {shoppingCartId} = props;

    const transformData = {
        id: parseInt(shoppingCartId)
    }

    const wines: any = await CountProductsShoppingCartQuery(transformData)

    let count = 0
    wines.map((wine: any) => {
        count += wine.amount
    })

    return count;
}