import { CheckEmailQuery, UserInformationQuery } from "../helpers/User/query-get-user";
import { SignUpQuery } from "../helpers/User/query-post-user";
import bcrypt from 'bcrypt';
import { SignInServiceProps, SignUpServiceProps, UserInformationServiceProps } from "../interfaces/interfaces-user";
import jwt from "jsonwebtoken"

export const SignUpService = async (data: SignUpServiceProps) => {
    let { email, password, birthdate, phone, gender, address, name, lastname, ...rest } = data;

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

    await SignUpQuery({
        ...transformData,
        phone: phoneFormatted,
        birthdate: birthDateFormatted,
        password: hashedPassword,
    });
}

export const SignInService = async (data: SignInServiceProps) => {
    let { email, password } = data;

    // Convertir correo en mayusculas para una mejor comparación
    email = email.toUpperCase();

    // Comprobar si el usuario esta en la base de datos
    const user: any = await CheckEmailQuery(email)

    if (!user) {
        throw new Error('Correo electronicó no registrado')
    }

    // Comparar contraseña
    const passwordMatch = await bcrypt.compare(password, user.Password)

    if (!passwordMatch) {
        throw new Error('Contraseña incorrecta')
    }

    const SECRET_KEY = `${process.env.SECRET_KEY}`

    // Generar JWT
    const token = jwt.sign({
        id: user.Id,
        name: user.Name,
        email: user.Email
    }, SECRET_KEY, {
        expiresIn: '1h'
    })

    return {
        id: user.Id,
        name: user.Name,
        email: user.Email,
        token
    }
}

export async function UserInformationService(data: UserInformationServiceProps) {
    let { email } = data

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
    const fecha = new Date(userInfo.Birthdate)
    const legible = fecha.toLocaleDateString("es-ES", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: 'UTC'
    })

    return {
        name: userInfo.Name,
        lastname: userInfo.Lastname,
        gender: userInfo.Gender,
        email: userInfo.Email,
        address: userInfo.Address,
        phone: userInfo.Phone,
        birthdate: legible.toUpperCase()
    }
}