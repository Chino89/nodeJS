# Ejercicio de entrega de NodeJs 

## API REST DE Libros 
Puerto: **3030**

*Se solicitaron las siguientes entidades*  

### Libreria

|   |  |  |
| ------------- |:-------------:| ------------- | 
| id      | Int     | El identificador de la librería.|
| name     | String     | Nombre de la librería.|
| location      | String     | Dirección física de la librería.|
| telephone      | String     | Número de teléfono.|

### Libro

|   |  |  |
| ------------- |:-------------:| ------------- | 
| id      | Int     | El identificador de este libro en particular.|
| isbn     | Int     | Identificador único y a nivel mundial del libro.|
| title      | String     | Título del libro.|
| author      | String     | Autor del libro.|
| year      | String     | Año de edición del libro.|
| library      | Int     | El identificador de la librería en donde este libro se encuentra.|

### Usuario
*Tomé la decisión de mantener la estructura de Modelo de Usuarios sugerida en clase*  

|   |  |  |
| ------------- |:-------------:| ------------- | 
| id      | Int     | El identificador del usuario.|
| firstName     | String     | Nombre del Usuario.|
| lastName      | String     | Apellido del Usuario.|
| email      | String     | Email.|
| password     | String     | Contraseña.|


### Admin

|   |  |  |
| ------------- |:-------------:| ------------- | 
| id      | Int     | id único del admin.|
| user     | String     | 'admin'|
| pass      | String     | 'admin'|


## Descripcion del proceso. 
Desarrollé un **CRUD** para las entidades: **Libreria**, **Libro** y **Usuario**. 

### Login
Solo el usuario 'admin', mediante una token obtenida luego de hacer login, tendrá los permisos necesarios para poder ejecurar los métodos **create** **update** y **delete** de los modelos Libreria y Libro. 

La autenticación es llevada a cabo por el middleware **userIsAdminMDW** presente en el router de Libreria y Libro. 

Cuando se hace una llamada con el método http **post** a la ruta /login, el controlador de login toma la request y extrae del body el user y la pass. Busca en el Admin Model el usuario que coincida con las credenciales provistas y luego de que lo obtiene, genera un objeto que sera pasado al payload. Éste objeto está compuesto del user, la pass y se inyecta {'role' : 'admin'} quedando compuesto de ésta manera:
```
{
  "id": 1,
  "user": "admin",
  "pass": "admin",
  "createdAt": "2023-06-27T23:52:48.662Z",
  "updatedAt": "2023-06-27T23:52:48.662Z",
  "role": "Admin",
  "iat": 1687979592
}
```
Éste objeto junto con el SERVER_SECRET son utilizados para generar el token, luego de ejecutar el metodo sing de jwt.

Si sucede todo esto, el server devuelve un **status 200** y se ejecuta el login. 
Si algo falló, devuelve un **status 401** y nos dice que no estamos autorizados y que falló el Login. 

### userIsAdminMDW
Éste es un middleware que actua para limitar los permisos de usuarios comunes y el admin. Justamente chequea que en el payload venga el atributo **"role": "Admin"**. Para hacer esto, se llama al metodo authenticate de passport, el cual pide que se le defina la estrategia (jwt) y verifica 

