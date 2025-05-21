import { Request, Response, NextFunction } from 'express'

export const authorize = (requiredPermissions: string[]) => {
    return (request: Request, response: Response, next: NextFunction) => {
        const user = request.user

        if (!user || !user.permissions) {
            response.status(403).json({
                msg: 'No tienes permisos asignados'
            })

            return;
        }


        const hasPermission = requiredPermissions.some(p => user?.permissions.includes(p))

        if (!hasPermission) {
            response.status(403).json({ msg: 'No tienes los suficientes permisos' })
        }

        next();
    }
}