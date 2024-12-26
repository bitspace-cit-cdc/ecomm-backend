class CustomError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = "CustomError";
    this.status = status;
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

const ROLES = {
  CUSTOMER: "CUSTOMER",
  EMPLOYEE: "EMPLOYEE",
};

type Role = "EMPLOYEE" | "MANAGER" | "ADMIN";

const getRoleNum = (enumLevel: Role): number => {
  const roleToLevel: Record<Role, number> = {
    EMPLOYEE: 1,
    MANAGER: 2,
    ADMIN: 3,
  };

  return roleToLevel[enumLevel];
};

const getRole = (roleId: number): string => {
  let role = "";
  if (roleId === 1) role = "EMPLOYEE";
  else if (roleId === 2) role = "MANAGER";
  return role;
};

const STATUS_CODE = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
};

export { CustomError, STATUS_CODE, ROLES, getRoleNum, getRole };
