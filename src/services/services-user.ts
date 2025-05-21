import { CheckEmailQuery, UserInformationQuery, UsersRegisterQuery } from "../helpers/User/querys-get-user";
import { SignUpQuery } from "../helpers/User/querys-post-user";
import bcrypt from 'bcrypt';
import { SignInServiceProps, SignUpServiceProps, UserInformationServiceProps } from "../interfaces/interfaces-user";
import jwt from "jsonwebtoken"
import { CreateShoppingCartQuery } from "../helpers/ShoppingCart/querys-post-shoppingCart";

const SECRET_KEY = `${process.env.SECRET_KEY}`

export const SignUpService = async (props: SignUpServiceProps) => {
    let { email, password, birthdate, phone, gender, address, name, lastname, ...rest } = props;

    // Comprobar si el correo ya fue registrado
    if (await CheckEmailQuery(email.toUpperCase())) {
        throw new Error('El correo electrónico ya está registrado')
    }

    // Hash contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Transformar la fecha de cumpleaños en un formato mas adecuado
    const [year, month, day] = birthdate.split('-');
    const birthDateFormatted = new Date(Number(year), Number(month) - 1, Number(day));

    // Dar formato al número telefonico
    const phoneFormatted = parseInt(phone.replace(/\s+/g, ''));

    // Transformar en mayusculas para facilitar la comparación
    const transformData = {
        ...rest,
        email: email.toUpperCase(),
        gender: gender.toUpperCase(),
        address: address.toUpperCase(),
        name: name.toUpperCase(),
        lastname: lastname.toUpperCase(),
    };

    const user: any = await SignUpQuery({
        ...transformData,
        phone: phoneFormatted,
        birthdate: birthDateFormatted,
        password: hashedPassword,
    });

    // Tambien se crea el carrito
    await CreateShoppingCartQuery(user.id)

    return;
}

export const SignInService = async (props: SignInServiceProps) => {
    let { email, password } = props;

    // Convertir correo en mayusculas para una mejor comparación
    email = email.toUpperCase();

    // Comprobar si el usuario esta en la base de datos
    const user: any = await CheckEmailQuery(email)

    if (!user) {
        throw new Error('Correo electronicó no registrado')
    }

    // Comparar contraseña
    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
        throw new Error('Contraseña incorrecta')
    }

    // Rol
    const role = user.Role.name

    // Permisos
    const permissions = user.Role?.permissions.map((p: any) => p.Permission.name)

    // Generar JWT
    const token = jwt.sign({
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: role,
        permissions: permissions,
        shoppingCart: user.shoppingCart.id
    }, SECRET_KEY, {
        expiresIn: '1h'
    })

    return {
        token
    }
}

export async function UserInformationService(props: UserInformationServiceProps) {
    let { email } = props

    // Comprobar si se envio un correo
    if (!email) {
        throw new Error('No se ha recibido un correo electronico')
    }

    // Convertir el correo en mayusculas para facilitar la comparación
    email = email.toUpperCase();

    // Obtener la la información del usuario
    const userInfo: any = await UserInformationQuery(email)

    if (!userInfo) {
        throw new Error('No se ha encontrado información del usuario')
    }

    // Convertir fecha a un formato mas legible
    const fecha = new Date(userInfo.birthdate)
    const legible = fecha.toLocaleDateString("es-ES", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: 'UTC'
    })

    return {
        name: userInfo.name,
        lastname: userInfo.lastname,
        gender: userInfo.gender,
        email: userInfo.email,
        address: userInfo.address,
        phone: userInfo.phone,
        birthdate: legible.toUpperCase()
    }
}

export const UsersRegisterService = async (props: any) => {
    const { page, rowsPerPage, email } = props

    const transformData: any = {
        skip: (Number(rowsPerPage) * (Number(page) + 1) - Number(rowsPerPage)),
        take: Number(rowsPerPage),
        email: email.toUpperCase()
    }

    const data: any = await UsersRegisterQuery(transformData)

    const { users, count } = data

    const AllUsers: any = [];

    users.map((user: any) => {
        const createdAt = new Date(user.createdAt)
        const readableDate = createdAt.toLocaleString('es-ES', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })

        const Data = {
            name: user.name,
            lastname: user.lastname,
            email: user.email,
            role: user.Role.name,
            createdAt: readableDate
        }

        AllUsers.push(Data)
    })

    const sendData = { users: AllUsers, count: count }

    return sendData
}