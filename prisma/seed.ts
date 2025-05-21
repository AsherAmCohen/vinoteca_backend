import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt';

const prisma = new PrismaClient()

async function main() {
    // 1. Crear permisos
    const permissions = await prisma.permission.createMany({
        data: [
            // Perfiles
            { name: 'VIEW_PROFILE', description: 'Ver la información del usuario' },
            // Vinos
            { name: 'VIEW_WINE', description: 'Ver la lista de vinos' },
            // Marcas
            { name: 'VIEW_MARK', description: 'Ver la lista de marcas' },
            // Categorias
            { name: 'VIEW_CATEGORY', description: 'Ver la lista de categorias' },
            // Ordenes
            { name: 'VIEW_ORDER', description: 'Ver la lista ordenes' },
            // Ususarios
            { name: 'VIEW_USER', description: 'Ver la lista de usuarios' },
            { name: 'EDIT_USER', description: 'Editar rol de usuario' },
            // Roles
            { name: 'VIEW_ROLE', description: 'Ver la lista de roles' },
            { name: 'ADD_ROLE', description: 'Agregar roles' },
            { name: 'EDIT_ROLE', description: 'Modificar permisos de rol' }
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

    // 3. Obtener todos los permisos
    const allPermissions = await prisma.permission.findMany()

    // 4. Asignar todos los permisos al rol ADMIN
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

    // 5. Buscar los permisos del usuario USER
    const userPermissions = await prisma.permission.findMany({
        where: {
            name: {
                in: ['VIEW_PROFILE']
            }
        }
    })

    // 6. Asignar los permisos al rol
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

    // 6. Agregar al usuario administrador
    await prisma.user.upsert({
        where: { email: 'ADMIN@ADMIN.COM' },
        update: {},
        create: {
            name: 'ADMINISTRADOR',
            lastname: 'PRINCIPAL',
            gender: 'INDEFINIDO',
            email: 'ADMIN@ADMIN.COM',
            address: 'CALLE DEL OLVIDO',
            phone: 123456789,
            birthdate: new Date('1999-09-14'),
            password: await bcrypt.hash('SG9sYU11bmRv*', 10),
            roleId: adminRole.id,
        }
    })

    // Agregar usuario de prueba
    await prisma.user.upsert({
        where: { email: 'pablo@pablo.com' },
        update: {},
        create: {
            name: 'PABLO',
            lastname: 'VAZQUEZ REYES',
            gender: 'MASCULINO',
            email: 'PABLO@PABLO.COM',
            address: 'NUEVO LEON #1306',
            phone: 226104835,
            birthdate: new Date('1999-09-14'),
            password: await bcrypt.hash('SG9sYU11bmRv*', 10),
            roleId: userRole.id,
        }
    })

    // 7. Agregar el carrito inicial al administrador
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