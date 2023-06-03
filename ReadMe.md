# **Blog Application**

This is a simple blog application that allows users to create, read, update, and delete blog posts. The application is deployed at **[https://blog-app-kr-aashish.vercel.app](https://blog-app-kr-aashish.vercel.app/)**.


## **API Endpoints**

### **User Routes**

- **`POST /api/auth/signup`** - Create a new user account.
- **`POST /api/auth/login`** - Log in to the application and obtain access and refresh tokens.
- **`PUT /api/auth/:userId`** - Update the user details. Requires a valid access token.

### Article **Routes**

- **`GET /api/articles`** - Get all blog posts. Requires a valid access token.
- **`POST /api/articles/:userId`** - Create a new blog post. Requires a valid access token.

## **Authentication**

The application uses JSON Web Tokens (JWT) for authentication. When a user logs in, an access token and a refresh token are generated and returned in the response. The access token should be included in the **`Authorization`** header of subsequent requests as a bearer token.

Example:

```
authorization: <access-token>

```

If the access token expires, a new one can be obtained by sending a request to the **`/api/auth/refresh`** endpoint with the refresh token in the body.

Example:

```
POST /api/auth/refresh
Body: {
  "refreshToken": "<refresh-token>"
}

```

## **Error Handling**

The application handles errors gracefully and returns appropriate error messages and status codes in the response.