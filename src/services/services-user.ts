import { CheckEmailQuery, UserInformationQuery, UserInformationTokenQuery, UsersRegisterQuery } from "../helpers/User/querys-get-user";
import { SignUpQuery } from "../helpers/User/querys-post-user";
import bcrypt from 'bcrypt';
import { SignInServiceProps, SignUpServiceProps, UserInformationServiceProps } from "../interfaces/interfaces-user";
import jwt from "jsonwebtoken"
import { CreateShoppingCartQuery } from "../helpers/ShoppingCart/querys-post-shoppingCart";
import { ChangePasswordQuery, ChangeUserDataQuery, UpdateRoleQuery, VerifiedUserQuery } from "../helpers/User/querys-put-user";
import { DeleteUserQuery } from "../helpers/User/querys-delete-users";
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer'
import path from "path";
import { InfoRoleWhereName } from "../helpers/Role/querys-get-role";

const SECRET_KEY = `${process.env.SECRET_KEY}`
const EMAIL_USER = `${process.env.EMAIL_USER}`
const EMAIL_PASS = `${process.env.EMAIL_PASS}`
const FRONTEND = `${process.env.FRONTEND_URL}`

const sendEmail = async (email: string, token: string) => {
    const transporter: Transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // true para 465, false para 587
        auth: {
            user: EMAIL_USER, // tu-email@gmail.com
            pass: EMAIL_PASS  // contraseña de aplicación (NO tu contraseña real)
        }
    })

    const htmlContent = `
                            <!DOCTYPE html>
                            <html>
                            <body style="margin: 0; padding: 0; font-family: sans-serif; background-color: #f7f7f7;">
                                <table width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td align="center">
                                    <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; padding: 40px;">
                                        <tr>
                                        <td align="center">
                                            <img
                                            src="cid:logo"
                                            alt="Logo"
                                            width="150"
                                            style="display: block; margin: 0 auto;"
                                            />
                                        </td>
                                        </tr>
                                        <tr>
                                        <td align="center" style="padding: 20px 0;">
                                            <h2 style="margin: 0; color: #333;">¡Bienvenido a Vinoteca!</h2>
                                        </td>
                                        </tr>
                                        <tr>
                                        <td align="center" style="padding: 10px 20px; color: #555;">
                                            Por favor verifica tu correo electrónico para activar tu cuenta.
                                        </td>
                                        </tr>
                                        <tr>
                                        <td align="center" style="padding: 30px 0;">
                                            <a
                                            href="${FRONTEND}/verify-email?token=${token}"
                                            style="background-color: #8B0000; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 4px;"
                                            >
                                            Verificar cuenta
                                            </a>
                                        </td>
                                        </tr>
                                        <tr>
                                        <td align="center" style="padding-top: 30px; color: #999; font-size: 12px;">
                                            © 2025 Vinoteca. Todos los derechos reservados.
                                        </td>
                                        </tr>
                                    </table>
                                    </td>
                                </tr>
                                </table>
                            </body>
                            </html>
                            `

    await transporter.sendMail({
        from: '"Vinoteca" <no-reply@vinoteca.com>',
        to: email,
        subject: 'Verifica tu cuenta',
        html: htmlContent,
        attachments: [
            {
                filename: 'logo.png',
                path: path.join(__dirname, '../../public/logo.png'),
                cid: 'logo', // debe coincidir con src="cid:logo"
            },
        ],
    })
}

const generateVerificationToken = () => {
    return crypto.randomBytes(32).toString('hex')
}

const fechaLegible = (date: string) => {
    if (!date) {
        return null;
    }

    const createdAt = new Date(date)
    const ReadableDate = createdAt.toLocaleString('es-ES', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })

    return ReadableDate
}

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

    // Creación de token para verificar la cuenta
    const token = generateVerificationToken()

    // Crear fecha de expiración del token de 1 hora
    const expires = new Date(Date.now() + 1000 * 60 * 60)

    // Obtener el rol de invitado
    const role: any = await InfoRoleWhereName('GUEST')

    // Transformar en mayusculas para facilitar la comparación
    const transformData = {
        ...rest,
        email: email.toUpperCase(),
        gender: gender.toUpperCase(),
        address: address.toUpperCase(),
        name: name.toUpperCase(),
        lastname: lastname.toUpperCase(),
        verificationToken: token,
        tokenExpires: expires,
        phone: phoneFormatted,
        birthdate: birthDateFormatted,
        password: hashedPassword,
        roleId: role.id
    };

    const user: any = await SignUpQuery(transformData);

    // Enviar correo de verificacion
    await sendEmail(user.email, user.verificationToken)

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

    // Comprobar si esta eliminado
    if (user.deletedAt) {
        throw new Error('Cuenta desactivada, si considera que fue un error contacte con el administrador')
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

    return ({ token: token })

}

export const UserInformationService = async (props: UserInformationServiceProps) => {
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

    const dataUser = {
        name: userInfo.name,
        lastname: userInfo.lastname,
        gender: userInfo.gender,
        email: userInfo.email,
        address: userInfo.address,
        phone: userInfo.phone,
        verifiedAt: userInfo.verifiedAt,
        birthdate: legible.toUpperCase()
    }

    return dataUser
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
        const Data = {
            id: user.id,
            name: user.name,
            lastname: user.lastname,
            email: user.email,
            role: user.Role,
            createdAt: fechaLegible(user.createdAt),
            deletedAt: fechaLegible(user.deletedAt),
            verifiedAt: fechaLegible(user.verifiedAt)
        }

        AllUsers.push(Data)
    })

    const sendData = { users: AllUsers, count: count }

    return sendData
}

export const UpdateRoleService = async (props: any) => {
    const { userId, role } = props

    const transformData = {
        id: parseInt(userId),
        roleId: parseInt(role.id)
    }

    await UpdateRoleQuery(transformData)

    return;
}

export const DeleteUserService = async (props: any) => {
    const { userId } = props;

    const transformData: any = {
        id: parseInt(userId)
    }

    await DeleteUserQuery(transformData)

    return
}

export const VerifiedUserService = async (props: any) => {
    const { token } = props

    if (!token) {
        throw new Error('No se ha proporcionado un token')
    }

    // Obtener información del suario
    const user: any = await UserInformationTokenQuery(token)

    // Comprobar si el usuario existe 
    if (!user) {
        throw new Error('El usuario no existe')
    }

    // Comprobar si el usuario no fue eliminado
    if (user.deletedAt) {
        throw new Error('El usuario fue eliminado')
    }

    // Comprobar si el usuario ya fue verificado
    if (user.verifiedAt) {
        throw new Error('El usuario ya fue verificado')
    }

    // Buscar el role de usuario para cambiarlo si ya valido su correo
    const role: any = await InfoRoleWhereName('USER')

    await VerifiedUserQuery(token, role.id)

    return;
}

export const ChangePasswordService = async (props: any) => {
    const { email, password, newPassword } = props;

    // Validar que la contraseña sea la actual
    const user: any = await CheckEmailQuery(email)

    // Comparar contraseña
    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
        throw new Error('La contraseña actual no es correcta')
    }

    // Hash la nueva contraseña
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const transformData = {
        email: email.toUpperCase(),
        password: hashedPassword
    }

    await ChangePasswordQuery(transformData)

    return;
}

export const ChangeUserDataService = async (props: any) => {
    const { name, lastname, address, phone, email } = props

    // Dar formato al número telefonico
    const phoneFormatted = parseInt(phone.replace(/\s+/g, ''));

    const transformData = {
        email: email,
        name: name.toUpperCase(),
        lastname: lastname.toUpperCase(),
        phone: phoneFormatted,
        address: address
    }

    await ChangeUserDataQuery(transformData)

    return;
}