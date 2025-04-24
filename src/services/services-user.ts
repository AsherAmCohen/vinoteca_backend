import { CheckEmailQuery } from "../helpers/User/query-get-user";
import { SignUpQuery } from "../helpers/User/query-post-user";
import bcrypt from 'bcrypt';
import { SignInServiceProps, SignUpServiceProps } from "../interfaces/interfaces-user";
import jwt from "jsonwebtoken"

export async function SignUpService(data: SignUpServiceProps) {
    let { email, password, birthdate, phone, ...rest } = data;

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
    const uppercasedData = {
        ...rest,
        email: email.toUpperCase(),
        gender: data.gender.toUpperCase(),
        address: data.address.toUpperCase(),
        name: data.name.toUpperCase(),
        lastname: data.lastname.toUpperCase(),
    };

    await SignUpQuery({
        ...uppercasedData,
        phone: phoneFormatted,
        birthdate: birthDateFormatted,
        password: hashedPassword,
    });
}

export async function SignInService(data: SignInServiceProps) {
    let {email, password} = data;

    // Convertir correo en mayusculas para una mejor comparación
    email = email.toUpperCase();

    // Comprobar si el usuario esta en la base de datos
    const user: any = await CheckEmailQuery(email)

    if(!user) {
        throw new Error('Correo electronicó no registrado')
    }
    
    // Comparar contraseña
    const passwordMatch = await bcrypt.compare(password, user.Password)

    if(!passwordMatch) {
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