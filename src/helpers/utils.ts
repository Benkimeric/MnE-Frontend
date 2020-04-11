class UtilsHelper {
  static getInitials(name: string) {
    const names = name.match(/\b\w/g) || [];
    const initials = (
      (names.shift() || '') + (names.pop() || '')
    ).toUpperCase();
    return initials;
  }

  static checkUserPermission(
    history: any,
    allowedRoles: any[],
    userRoles: any[]
  ) {
    const roles = userRoles.map(role => role.roleName)
    const hasPermission = roles.some((role) => allowedRoles.includes(role));
    if (!hasPermission && allowedRoles.length !== 0) {
      history.push('/dashboard');
      return false;
    } else {
      return true;
    }
  }
}

export default UtilsHelper;
