# Actualización de los servidor Producción

## Backend
Ingresar a la carpeta del proyecto backend

> cd minsalud-servicio-pcd

Actualizar la rama master.

```
git checkout master
git pull origin master
```

Reiniciar el proceso para que agarre los cambios :

> supervisorctl

XXXX                      RUNNING    pid 12614, uptime 1:49:37

**Reiniciar el proceso XXXX del backend.**

> supervisorctl restart XXXX

Verificar el proceso inicializado

> supervisorctl status XXXX

XXXX                      RUNNING    pid 12614, uptime 1:49:37

#### - Sacar backup de base de datos
Por si ocurriera algún error en el proceso.