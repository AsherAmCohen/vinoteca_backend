import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt';

const prisma = new PrismaClient()
import dotenv from 'dotenv';
dotenv.config(); // Carga las variables de entorno

async function main() {
    // 1. Crear permisos
    await prisma.permission.createMany({
        data: [
            // Perfiles
            { name: 'VIEW_PROFILE', description: 'Ver la información del usuario' },
            // Vinos
            { name: 'VIEW_WINE', description: 'Ver la lista de vinos' },
            { name: 'ADD_WINE', description: 'Agregar vino' },
            { name: 'EDIT_WINE', description: 'Editar vino' },
            // Marcas
            { name: 'VIEW_MARK', description: 'Ver la lista de marcas' },
            { name: 'ADD_MARK', description: 'Agregar marca' },
            { name: 'EDIT_MARK', description: 'Editar marca' },
            // Categorias
            { name: 'VIEW_CATEGORY', description: 'Ver la lista de categorias' },
            { name: 'ADD_CATEGORY', description: 'Agregar categoria' },
            { name: 'EDIT_CATEGORY', description: 'Editar categoria' },
            // Ordenes
            { name: 'VIEW_ORDER', description: 'Ver la lista ordenes' },
            // Ususarios
            { name: 'VIEW_USER', description: 'Ver la lista de usuarios' },
            { name: 'EDIT_USER', description: 'Editar rol de usuario' },
            { name: 'DELETE_USER', description: 'Elimina usuarios registrados' },
            // Roles
            { name: 'VIEW_ROLE', description: 'Ver la lista de roles' },
            { name: 'ADD_ROLE', description: 'Agregar roles' },
            { name: 'EDIT_ROLE', description: 'Modificar permisos de rol' },
            // Pagos
            { name: 'PAYMENT', description: 'Permite realizar la compra del carrito' }
        ],
        skipDuplicates: true
    })

    // 2. Crear rol ADMIN
    const adminRole = await prisma.role.upsert({
        where: { name: 'ADMIN' },
        update: {},
        create: {
            name: 'ADMIN',
            description: 'Administrador de la aplicación'
        }
    })

    // 3. Crear role USER
    const userRole = await prisma.role.upsert({
        where: { name: 'USER' },
        update: {},
        create: {
            name: 'USER',
            description: 'Usuario normal'
        }
    })

    // 4. Crear role GUEST (Invitado)
    const guestRole = await prisma.role.upsert({
        where: { name: 'GUEST' },
        update: {},
        create: {
            name: 'GUEST',
            description: 'Usuario invitado o no verificado'
        }
    })

    // 5. Obtener todos los permisos
    const allPermissions = await prisma.permission.findMany()

    // 6. Asignar todos los permisos al rol ADMIN
    await Promise.all(
        allPermissions.map(permission =>
            prisma.permission_has_Role.upsert({
                where: {
                    roleId_permissionId: {
                        roleId: adminRole.id,
                        permissionId: permission.id
                    }
                },
                update: {},
                create: {
                    roleId: adminRole.id,
                    permissionId: permission.id
                }
            })
        )
    )

    // 7. Buscar los permisos del rol USER
    const userPermissions = await prisma.permission.findMany({
        where: {
            name: {
                in: ['VIEW_PROFILE', 'VIEW_ORDER', 'PAYMENT']
            }
        }
    })

    // 8. Asignar los permisos al rol administrador
    await Promise.all(
        userPermissions.map(permission =>
            prisma.permission_has_Role.upsert({
                where: {
                    roleId_permissionId: {
                        roleId: userRole.id,
                        permissionId: permission.id
                    }
                },
                update: {},
                create: {
                    roleId: userRole.id,
                    permissionId: permission.id
                }
            })
        )
    )

    // 9. Buscar los permisos del rol GUEST
    const guestPermissions = await prisma.permission.findMany({
        where: {
            name: {
                in: ['VIEW_PROFILE']
            }
        }
    })

    // 10. Asignar los permisos al rol GUEST (Invitado)
    await Promise.all(
        guestPermissions.map(permission =>
            prisma.permission_has_Role.upsert({
                where: {
                    roleId_permissionId: {
                        roleId: guestRole.id,
                        permissionId: permission.id
                    }
                },
                update: {},
                create: {
                    roleId: guestRole.id,
                    permissionId: permission.id
                }
            })
        )
    )

    // 11. Agregar al usuario administrador
    await prisma.user.upsert({
        where: { email: 'ADMIN@ADMIN.COM' },
        update: {},
        create: {
            name: 'ADMINISTRADOR',
            lastname: 'PRINCIPAL',
            gender: 'INDEFINIDO',
            email: `${process.env.EMAIL_ADMIN?.toUpperCase() || 'ADMIN@ADMIN.COM'}`,
            address: 'CALLE DEL OLVIDO',
            phone: 123456789,
            birthdate: new Date('1999-09-14'),
            password: await bcrypt.hash(`${process.env.PASSWORD_ADMIN}`, 10),
            verifiedAt: new Date(),
            roleId: adminRole.id,
        }
    })

    // 13. Agregar el carrito inicial al administrador
    await prisma.shoppingCart.create({
        data: {
            userId: adminRole.id
        }
    })
}

main()
    .catch(e => {
        process.exit(1)
    }).finally(async () => {
        await prisma.$disconnect()
    })