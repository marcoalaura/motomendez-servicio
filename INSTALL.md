# Proyecto Base Servicio PCD

#### Pasos para instalar GIT

```sh
sudo apt-get install git-core
```

#### Instalación

Para instalar el proyecto debemos clonarlo desde nuestro repositorio:

```sh
git clone https://gitlab.geo.gob.bo/agetic/minsalud-servicio-pcd.git
```
Es posible que al descargar el proyecto con HTTPs, nos lance el siguiente error:

```sh
Cloning into 'nombre-del-proyecto'...
fatal: unable to access 'https://url-del-proyecto.git/': server certificate verification failed. CAfile: /etc/ssl/certs/ca-certificates.crt CRLfile: none
```

Configurar lo siguiente e intentar nuevamente la clonación:

```sh
git config --global http.sslverify false
git clone https://gitlab.geo.gob.bo/agetic/minsalud-servicio-pcd.git
```

Ingresar a la carpeta:
```sh
cd minsalud-servicio-pcd
```
Podemos verificar que estamos en el branch master:

```
git status
```
Nos devolverá:
```
On branch master
```
(Opcional) Si necesitamos trabajar un branch específico (en este ejemplo, el nombre del branch es `branch_copia_master`) ejecutamos:

```
git checkout branch_copia_master
```

Al volver a verificar con git status:
```
git status
```

Se obtiene como respuesta que el proyecto se sitúa en el branch elegido:
```
On branch branch_copia_master
```

Para instalar la aplicación, se tienen las siguientes opciones:

###### Instalar dependencias del proyecto

Ejecutar el comando npm install que instalará todas las dependencias que el proyecto necesita:
```
npm install
```

#### Archivos de Configuración

Para modificar los datos de conexion a la base de datos y para modificar el puerto de conexion realizar una copia del archivo `config/config.sample.js` y cambiar los datos de conexión a la base de datos respectiva, el archivo debería ser nombrado de la siguiente manera:

- `config/config.js`

Es importante cambiar lo siguiente:
- `username - nombre de usuario de la base de datos`
- `password - contraseña del usuario de la base de datos`
- `database - nombre de la base de datos`
- `host - servidor donde se encuentra la base de datos`
- `demás variables`

## Iniciar la aplicación

+ Levanta el servicio
```
npm run start
```

##### Creación del Token

Para que los clientes puedan conectarse es necesario generar un token, para ello ejecutar
```
npm run token nro_dias
```
Donde nro_dias es un valor entero que representa el número de dias que estará vigente el token a partir de la fecha en curso


## Configuración de supervisor
Si se desea hacer correr la aplicación mediante `supervisor` se debe realizar la siguiente configuración:

Navegar hasta la ruta:
```sh
cd /etc/supervisor/conf.d/
```
Crear un archivo para hacer correr la aplicación de backend, en este ejemplo, se definirá el archivo bajo el nombre de `backend_baseBackendDEV`:
```sh
sudo touch minsalud-servicio-pcd.conf
```
Nota
- Si no te permite modificar el archivo minsalud-servicio-pcd.conf
```
sudo chmod 777 minsalud-servicio-pcd.conf
```
Y colocar el siguiente contenido:

##### Ambiente de DESARROLLO

```sh
[program:minsalud-servicio-pcd.conf]
command=/home/usuario/.nvm/versions/node/v6.10.1/bin/npm start
directory=/home/usuario/minsalud-servicio-pcd
autostart=true
autorestart=true
stderr_logfile=/var/log/minsalud-servicio-pcd.err.log
stdout_logfile=/var/log/minsalud-servicio-pcd.out.log
user=usuario
```
##### Ambiente de TEST

```sh
[program:minsalud-servicio-pcd.conf]
command=/home/usuario/.nvm/versions/node/v6.10.1/bin/npm start
directory=/home/usuario/minsalud-servicio-pcd
autostart=true
autorestart=true
environment=NODE_ENV=test
stderr_logfile=/var/log/minsalud-servicio-pcd.err.log
stdout_logfile=/var/log/minsalud-servicio-pcd.out.log
user=usuario
```
##### Ambiente de PRODUCCION
##### Reiniciar "supervisor"
Cuando se hagan cambios y se requiere reiniciar el servicio "supervisor" para que se ejecute la aplicación:
```sh
sudo /etc/init.d/supervisor restart
```
Para verificar que la aplicación este efectivamente corriendo, se puede ejecutar el siguiente comando, y verificar que la aplicación este corriendo en el puerto configurado:
```sh
netstat -ltpn

Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name
tcp        0      0 0.0.0.0:80              0.0.0.0:*               LISTEN      -               
tcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN      -               
tcp        0      0 0.0.0.0:5432            0.0.0.0:*               LISTEN      -               
tcp6       0      0 :::4000                 :::*                    LISTEN      32274/nodejs
tcp6       0      0 :::3000                 :::*                    LISTEN      4381/gulp
```

Ó se puede revisar las tareas del `supervisor`, buscar el nombre de la tarea y su respectivo estado:

```sh
sudo supervisorctl

backend_baseBackendDEV                   RUNNING    pid 4617, uptime 3 days, 21:41:05
```
