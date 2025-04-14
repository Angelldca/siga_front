


export function hasPermission(userAuthorities: string[], module: string, permission: string) {
    return userAuthorities.includes(`${module}:${permission}`);
}

export function hasAnyPermissionInModule(userAuthorities: string[], module: string) {
    return userAuthorities.some(p => p.startsWith(`${module}:`));
}

export function hasModule(userAuthorities: string[], module: string) {
    return userAuthorities.some(p => p.startsWith(`${module}:`));
}