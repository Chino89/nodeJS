# Ejercicio de entrega de NodeJs 

## Por Emmanuel Vivas

Puerto: **3030**

*Se solicitaron las siguientes entidades con sus respectivos endpoints*  

### Libreria: /library

|   |  |  |
| ------------- |:-------------:| ------------- | 
| id      | Int     | El identificador de la librería.|
| name     | String     | Nombre de la librería.|
| location      | String     | Dirección física de la librería.|
| telephone      | String     | Número de teléfono.|
***
### Libro: /book

|   |  |  |
| ------------- |:-------------:| ------------- | 
| id      | Int     | El identificador de este libro en particular.|
| isbn     | Int     | Identificador único y a nivel mundial del libro.|
| title      | String     | Título del libro.|
| author      | String     | Autor del libro.|
| year      | String     | Año de edición del libro.|
| library      | Int     | El identificador de la librería en donde este libro se encuentra.|
***
### Usuario: /user
*Tomé la decisión de mantener la estructura de Modelo de Usuarios sugerida en clase*  

|   |  |  |
| ------------- |:-------------:| ------------- | 
| id      | Int     | El identificador del usuario.|
| firstName     | String     | Nombre del Usuario.|
| lastName      | String     | Apellido del Usuario.|
| email      | String     | Email.|
| password     | String     | Contraseña.|

***
### Admin
_Generé un **Admin**_ 

|   |  |  |
| ------------- |:-------------:| ------------- | 
| id      | Int     | id único del admin.|
| user     | String     | 'admin'|
| pass      | String     | 'admin'|

***
## Inicializacion
La api se inicializa ejecutando el código **npm start** en la terminal. 

Esto en primera instancia **inicializa la base de datos**, y crea las tablas que componen la API.
En segundo lugar **genera el usuario admin automaticamente**, el cual es inyectado en el modelo correspondiente.

Al estar seteado **{force: true}** cada vez que se inicializa el proyecto la base de datos está limpia y con el admin preparado para el **login**.

***
## Login
***Solo para el user: admin***

Debido a que hay algunas acciones que requieren autenticación por medio de un token, surge la necesidad de un login. 

En la app la **ruta /login** utiliza el **routerLogin**, el cual recibe solo llamadas del tipo **Post** y utiliza el **loginController**, el cual del body toma el **user** y la **pass** y, busca en la base de datos el usuario que corresponde con las credenciales provistas, las cuales son:
```
{
  "user": "admin",
  "pass": "admin",
}
```
Luego de que lo obtiene, genera un objeto que sera pasado al **payload**. Éste objeto está compuesto del usuario que encontro en la base de datos, al cual se le inyecta **{'role' : 'admin'}** quedando compuesto de ésta manera:
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
Éste objeto junto con el **SERVER_SECRET** son utilizados para generar el **token**, luego de ejecutar el metodo sing() de jwt.

Si sucede todo esto, el server devuelve un **status 200** y se ejecuta el login. 
Si algo falló, devuelve un **status 401** y nos dice que no estamos autorizados y que falló el Login. 

### userIsAdminMDW
Éste es un middleware que actua para limitar los permisos de usuarios comunes y el admin. Justamente chequea que en el payload venga el atributo **"role": "Admin"**. Para hacer esto, se llama al método **authenticate** de passport, se le pasa como parámetro la estrategia definida (jwt). 
Dentro de este middleware, se valida si el user tiene role Admin.

La session es seteada en **false** para que la token no expire, ya que estamos trabajando en una **API REST**

Si existe un error, devuelve el error junto con un **status 401**; si no devuelve el User y continua el proceso.

**Este MDW es utilizado en todos los endpoints que necesitan autenticación, ya que las mismas solamente podrán ser realizadas por el Admin.**
***

# Descripcion del proceso. 
Desarrollé un **CRUD** para las entidades: **Librería**, **Libro** y **Usuario**. 
***
## Método CREATE
***Requiere autenticación***
### bookCreate
El flujo es el siguiente, una vez que se realiza una llamada por método **post**, se ejecuta el userIsAdminMDW para verificar que el usuario que intenta realizar la acción tenga el token necesario. Si no lo tuviera devuelve un **status 401**, Si tiene el token, se llama al método createBook del **book Controller**. La logica de negocio del controller, y el req.body, es pasada al **book Service**, en el metodo createBook, el cual para poder desarrollar el método **Create** que nos provee sequelize, requiere del Book model, por lo cual le pasa la lógica interna, junto al body, al **book Provider** donde corresponde requerir los modelos y ejecutar el create. Este metodo devuelve el Libro y un **Status 201**. 

Si ocurrió un error, devuelve un **Status 401** junto con el mensaje **Unauthorized to create**.         
### libraryCreate
El flujo es igual al anterior. Desde el **library Controller** se pasa el req.body hacia el **library Service**, el cual se lo deriva hasta el **library Provider**, donde se importa el library Model y se ejecuta el método create, que nos provee **sequelize**. Utiliza los datos pasados por el body y devuelve un **status 201** si la librería fue creada o un **401** si no tiene autorización para crear el recurso. 

### userCreate
Para este método es el mismo flujo, solo que en el **user Provider** se ejecuta una **validación** antes de crear el usuario donde evalúa si el email existe en la base de datos. Si existe, devuelve un **Status 409** haciendo notar el conflicto, ya que el email tiene una **constraint** de unique en el user Model. 

Si el email está disponible, lo siguiente es que se toma del body el password que provee el usuario y es **hasheado** para luego ejecutar el método create y en la base de datos guardar el dato con mayor seguridad. Para poder desarrollar esta acción, utilizo la librería **bcrypt**.
Luego de creado el usuario, la API, por medio de una interpolación, saluda al nuevo usuario. 
***
## Método GET
* getBook
* getLibrary
* getUser

***Los tres métodos funcionan de la misma manera***

Al Router, desde la app.js, llega una llamada del tipo **Get**, con un id el cual es especificado por un param (**:xxxxId**). Este dato viaja hasta la última capa, la cual es el provider del recurso que estemos intentando obtener, donde se hace un **findByPk** (función que nos provee sequelize) con el xxxxId, el cual corresponde con el id del recurso en la base de datos 

Si se encuentra el recurso, lo devuelve junto a un **Status 200**, si no lo hace, devuelve un **404**
***
## Método GET ALL
* getAllBooks
* getAllLibraries
* getAllUsers

En este caso, la llamada también es del tipo **Get**, pero **no se especifica un param**, ya que lo que busca son todos los recursos activos del modelo. El controlador, espera que se resuelva el servicio, el cual derivó la lógica de negocio al provider, ya que éste último, puede interactuar con los modelos y hace un findAll() **filtrando los recursos que estén activos**. 

**en el caso de ***getAllLibraries***, en éste momento se incluyen los libros que estén activos, para que cuando recibamos las librerías, veamos también si tienen libros asociados.**

Hay dos status posibles para ésta llamada, los cuales son **200** si se resuelve y devuelven los recursos esperados, o **404** si no hubieran. 
Cabe destacar también que en el controller, si existiera algun error de servidor, devuelve un **status 500**
***
## Método UPDATE
***Requiere autenticación***
* updateBook
* updateLibrary
* updateUser

Esta llamada es del tipo **Post**. Desde el Controller, _(del recurso que se esté modificando)_, se toma el param que viene por la ruta (**:xxxxId**) y el body. Esto es pasado al service, y luego al provider para que pueda hacer el **update** (de sequelize) utilizando el modelo. Se pasan dos objetos, en el primero se pisan los campos del modelo con lo que se recibe por body, y en el segundo se filtra el id para encontrar el recurso que se intenta actualizar. 
Update **devuelve un array**, en el indice 0 inserta el valor de los recursos afectados. **Si es mayor a 0**, se vuelve a buscar el recurso para **devolverlo actualizado, junto a un status 200**.
Si no se lo encuentra o no ha modificado ninguno, devuelve un **status 404**

La salvedad está en el **userUpdate**, donde el primer paso es **verificar si el email recibido en el body esta en uso** en la base de datos (_exceptuando al usuario recibido por params_) si el email está en uso, devuelve un **Status 409** junto a un mensaje que hace notar el error. El resto de la lógica es igual a lo anterior descripto. 
***
## Método DELETE
***Requiere autenticación***
* deleteBook
* deleteLibrary
* deleteUser

Esta llamada del tipo **Delete**, pasa por params un id (**:xxxxId**) que será el identificador para buscar en la base de datos el recurso. 

Se ejecuta un **soft delete**, lo cual significa que se hace un update del campo **'active'** del id que corresponda con el params recibido desde el Controller.

De la misma manera que en el update, se chequea si existe algún item afectado por el update. Si lo encuentra, se hace una búsqueda utilizando el id y se devuelve el recurso actualizado, donde ahora se puede ver **'active': 'false'** y un **Status 200**.

Si no lo encuentra o no se ha modificado ninguno, devuelve un **status 404** junto a un mensaje.
***
