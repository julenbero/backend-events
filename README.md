# API Rest Eventos

Ejercicio de API Rest de eventos hecho con NodeJS y MongoDB tomando como base los requerimientos del siguiente repositorio
https://github.com/ingenious-agency/backend-test/tree/master/instructions#requerimientos-no-funcionales

## Link Deploy Heroku

https://julenbero-backend-events.herokuapp.com/

## Notas Importantes antes de empezar

Antes de inicializar el proyecto se recomienda que en la carpeta principal del proyecto vas a tener que crear un archivo llamado: `.env` que tenga la siguiente estructura:

```
MONGO_DB_URI= url de acceso a cluster o bd local
SECRET= Frase secreta
HOST= Host a usar (Localhost)
```

## Stack de dependencias principal usado

- express
- mongoose
- bcrypt
- jsonwebtoken
- dotenv

## Endpoints

### **Eventos**

- Devuelve eventos ordenados por fecha, igualmente los eventos destacados. Cuando el usuario no esta logueado solo mostrara 4 eventos, en caso de loguearse devolvera 8 eventos eventos paginados

```rest
    GET api/events
    GET api/events?pag=1
```

- Devuelve el detalle de un evento especifico buscado por id

```rest
    GET api/events/:id
```

- Devuelve mensaje simulando ser compartido en Twitter de un evento especifico con la siguiente estructura "Iré al NOMBRE DEL EVENTO @ FECHA DEL EVENTO LINK DEL EVENTO".

```rest
    GET api/events/twtter/:id
```

- Agrega un evento cuando el usuario esta logueado  

```rest
    POST api/events
```
Parametros que deben ser enviados para la creacion del evento:

```json
    {
        "eventName" : "Evento Prueba",
	    "location"  : "Bogota",
	    "datesEvent" : [{"date" : "2021-08-10T14:00:00", "price" : 50},{"date" : "2021-08-12T20:30:00", "price" : 60.75}],
        "resume": "Evento Programado por Cadena Radial Pepito",
	    "image" : "http://lorempixel.com/640/480/fashion/",
	    "outstanding" : true
    }
```

- Borrado de un evento

```rest
    DELETE api/events/:id
```

- Actualiza un evento solo con algunos datos enviados por el body segun id

```rest
    PUT api/events/:id
```

```json
    {
        "eventName" : "Evento Prueba 2",
	    "location"  : "Bogota",
	    "resume": "Evento Programado por Cadena Radial Paquito",
	    "image" : "http://lorempixel.com/640/480/fashion/",
	    "outstanding" : true
    }
```
### **Usuarios**

- Agrega un usuario  

```rest
    POST api/users
```
Parametros que deben ser enviados para la creacion del usuario:

```json
    {
    "username"   : "batman",
    "name":"Bruce Wayne",
    "password": "baticueva"
    }
```

### **Login Usuario**

- Loguear un usuario  

```rest
    POST api/login
```
Parametros que deben ser enviados para loguear un usuario:

```json
    {
    "username"   : "batman",
    "password": "baticueva"
    }
```