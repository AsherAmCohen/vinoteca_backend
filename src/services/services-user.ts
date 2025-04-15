import { CheckEmailQuery } from "../helpers/User/query-get-user";
import { CreateQuery } from "../helpers/User/query-post-user";
import { CreateServiceProps } from "../interfaces/interfaces-user"
import bcrypt from 'bcrypt';

export async function CreateService(data: CreateServiceProps) {
    let { email, password, birthdate, phone, ...rest } = data;

    // Comprobar si el correo ya fue registrado
    if (await CheckEmailQuery(email.toUpperCase())) {
        throw new Error('El correo electrónico ya está registrado')
    }

    // Hash contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Transformar la fecha de cumpleaños en un formato mas adecuado
    const [day, month, year] = birthdate.split('/');
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

    await CreateQuery({
        ...uppercasedData,
        email: uppercasedData.email,
        phone: phoneFormatted,
        birthdate: birthDateFormatted,
        password: hashedPassword,
    });
}