/**
 * List of public routes
 * @type {string[]}
 * // This is an example of a public route
 */
export const publicRoutes = ["/", "/auth/new-verification"]

/**
 * List of auth routes
 * @type {string[]}
 * // This is an example of an auth route
 */
export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
  "/auth/reset",
  "/auth/new-password",
]

export const apiAuthPrefix = "/api/auth"

export const DEFAULT_LOGIN_REDIRECT = "/settings"
