# Challenge Acciones

Pasos para levantar la aplicación:

## Web:

- Si es la primera vez que se va a ejecutar hacer:

npm install

- Ejecutar:

npm start

## Api:

- Si es la primera vez que se va a ejecutar hacer:

npm install

Se debe ir al entorno donde se creará la base de datos (Workbench / DB Beaver) y crear un schema con el nombre que quieran.

Luego ir a la carpeta de scripts y ejecutar:

structure.sql: Para crear las tablas del proyecto.
data.sql: Es un pequeño set de datos para poder probar la aplicación.

// Las claves hasheadas en los usuarios de prueba, para todos es 1234.

- En el archivo .env configurar las variables de entorno:

PORT= // Puerto en el que se levantará la aplicación

HOST= // Host de la conexión a la base de datos
USER= // Usuario de la conexión a la base de datos
PASSWORD= // Contraseña de la base de datos
DATABASE= // Nombre de la base de datos que hayan escogido.
