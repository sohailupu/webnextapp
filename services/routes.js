const BASE_URL = '/app';
const MACHINE_URL = `${BASE_URL}/machine`
const PRODUCT_URL = `${BASE_URL}/product`
const PERSON_URL = `${BASE_URL}/person`

export const API_ROUTES = {
  AUTH: {
    LOGIN: `/auth/login`,
    LOGOUT: `/auth/logout`,
    FORGOT_PASSWORD: `/auth/forgot-password`,
  },
  USER: {
    GET_PROFILE: `${BASE_URL}/user/profile`,
    UPDATE_PROFILE: `${BASE_URL}/user/update`,
  },
  PRODUCT: {
    GET_ALL: `${BASE_URL}/products`,
    GET_BY_ID: (id) => `${BASE_URL}/products/${id}`,
  },
};

//client-side routes
export const CLIENT_ROUTES = {
  HOME: `${MACHINE_URL}/digital-twin`,
  LOGIN: '/auth/login',
  FORGOT_PASSWORD: '/auth/forgot-password',
  MACHINE: `${MACHINE_URL}/digital-twin`,
  PERSON: `${PERSON_URL}/person`,
  PRODUCT: `${PRODUCT_URL}/product`,
  SETTINGS: `${MACHINE_URL}/settings`,
};

// usage
{/* <nav>
<Link href={CLIENT_ROUTES.HOME}>Home</Link>
</nav> */}
