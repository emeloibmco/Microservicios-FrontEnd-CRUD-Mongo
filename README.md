# Microservicios-Frontend-CRUD-Mongo ☁
## Despliegue Frontend CRUD MongoDB en Kubernetes 💻

## Índice  📰
1. [Pre-Requisitos](#Pre-Requisitos-pencil)
2. [Paso 1. Clonar Repositorio](#Paso-1)
3. [Paso 2. Editar Frontend de la aplicación](#Paso-2)
4. [Paso 3. Crear imagen del Frontend](#Paso-3)
5. [Paso 4. Subir imagen del Front a IBM Cloud Container Registry](#Paso-4)
6. [Paso 5. Desplegar imagen del Frontend en Kubernetes](#Paso-5)
7. [Paso 6. Prueba de Funcionamiento](#Paso-6)

## Pre-requisitos :pencil:
* Tener instalado *Git* en su computador para clonar el respositorio.
* Tener instalada la CLI de *Docker*.
* Tener instalado *Docker Desktop* para verificar la creación de su imagen.
* Tener instalada la CLI de IBM Cloud.
* Contar con una cuenta en <a href="https://cloud.ibm.com/"> IBM Cloud </a>.
* Contar con un clúster en Kubernetes.
* Haber desplegado de forma previa el Backend de la aplicación en Kubernetes, para ello revise el repositorio <a href="https://github.com/emeloibmco/Microservicios-Backend-CRUD-Mongo"> Microservicios-Backend-CRUD-Mongo</a>.

## Paso 1
### Clonar Repositorio 🗂
La aplicación utilizada en esta guía la puede encontrar en este repositorio. Para clonar el repositorio en su computador, realice los siguientes pasos:

1. En su computador cree una carpeta a la que pueda acceder con facilidad y asígnele un nombre relacionado con la aplicación.
2. Abra una ventana de *Windows PowerShell* y vaya hasta la carpeta que creó en el ítem 1 con el comando *cd* .
3. Una vez se encuentre dentro de la carpeta creada coloque el siguiente comando para clonar el repositorio:
```
git clone https://github.com/emeloibmco/Microservicios-FrontEnd-CRUD-Mongo
```
4. Acceda a la carpeta **"Microservicios-FrontEnd-CRUD-Mongo"** creada al clonar el repositorio y verifique que se encuentran descargados los archivos de la aplicación que se muestran en este repositorio.


## Paso 2. 
### Editar Frontend de la aplicación 🛠
Para que el frontend de su aplicación funcione correctamente junto con el backend, debe agregar el enlace obtenido un vez ha desplegado el backend en Kubernetes. Por esto, siga los pasos que se muestran a continuación:
1. Abra el código del frontend en su computador e ingrese a la siguiente ruta: src/app/services. En esta ubicación debe encontrar el archivo *query.service.ts*. Abra el archivo  y complete los siguientes campos con la URL obtenida en el despliegue del backend en Kubernetes (no olvide colocar **/api/customers**):

```
readonly URL_API_CREATE_TRANSACTION = 'URL_Backend';
readonly URL_API_GET_TRANSACTIONS = 'URL_Backend';
readonly URL_API_DELETE = 'URL_Backend';
```

2. Guarde los cambios realizados al frontend de la aplicación. Si desea probar el código abra una ventana de *Windows PowerShell*, vaya a la carpeta que contiene el archivo *package.json* y ejecute el comando *npm run start*. Posteriormente en el navegador escriba:
```
localhost:4200
```
Una vez cargue la aplicación puede observar 3 ventanas distintas de la siguiente manera:

Una ventana **Inicio** en donde puede observar dos botones que le dan las opciones: Agregar Transacción y Ver Transacciones.
<p align="center"><img width="700" src="https://github.com/emeloibmco/Microservicios-FrontEnd-CRUD-Mongo/blob/master/Imagenes/Inicio.PNG"></p>

Una ventana **Agregar** en donde puede colocar los datos respectivos de su transacción.
<p align="center"><img width="700" src="https://github.com/emeloibmco/Microservicios-FrontEnd-CRUD-Mongo/blob/master/Imagenes/Agregar.PNG"></p>

Una ventana **Ver Transacciones** en donde puede visualizar las transacciones agregadas.
<p align="center"><img width="700" src="https://github.com/emeloibmco/Microservicios-FrontEnd-CRUD-Mongo/blob/master/Imagenes/Transacciones.PNG"></p>

> Nota: en este caso la aplicación de forma local funciona con el puerto 4200, que es por defecto el que utlizan las aplicaciones en Angular.



## Paso 3. 
### Crear imagen del Frontend 📱
Al clonar este repositorio puede encontrar dentro de los archivos el *Dockerfile* utilizado para crear la imagen de la aplicación. Realice los siguientes pasos:
1. En la ventaja de *Windows PowerShell* y asegurándose que se encuentra dentro de la carpeta que contiene los archivos de la aplicación y el Dockerfile, coloque el siguiente comando para crear la imagen de su aplicación:
```
docker build -t <nombre_imagen:tag> .
```

2. Una vez finalice el proceso, verifique en *Docker Desktop* que la imagen que acaba de crear aparece en la lista de imágenes.

3. Si desea probar el funcionamiento de la imagen de forma local, ejecute el siguiente comando (cambie los valores de port, port_dockerfile y nombre_imagen:tag):
```
docker run --publish port:port_dockerfile <nombre_imagen:tag>
```
y coloque en el navegador
```
localhost:port
```

> Nota: En la variable port puede colocar cualquier valor, por ejemplo 8085. En la variable port_dockerfile por defecto coloque 8080, ya que es el puerto establecido para este ejercicio.


## Paso 4. 
### Subir imagen del Frontend a IBM Cloud Container Registry 📤
Para subir la imagen creada a *IBM Cloud Container Registry* realice lo siguiente:
1. En la ventana de *Windows PowerShell* y sin salir en ningún momento de la carpeta que contiene los archivos, inicie sesión en su cuenta de *IBM Cloud* con el siguiente comando:
```
ibmcloud login --sso
```

2. Seleccione la cuenta en donde se encuentra su clúster de Kubernetes.

3. Una vez ha iniciado sesión, configure el grupo de recursos y la región que está utilizando su clúster de Kubernetes. Para ello utilice el siguiente comando:
```
ibmcloud target -r <REGION> -g <GRUPO_RECURSOS>
```
>**Nota**: Reemplace \<REGION> y <GRUPO_RECURSOS> con su información.

4. Registre el daemon de Docker local en *IBM Cloud Container Registry* con el comando:
```
ibmcloud cr login
```

5. Cree un espacio de nombres (*namespace*) dentro de *IBM Cloud Container Registry* para su imagen. Para ello ejecute el siguiente comando:
```
ibmcloud cr namespace-add <namespace>
```
>**Nota**: Reemplace \<namespace> con un nombre fácil de recordar y que esté relacionado con la imagen de la aplicación. 

6. Elija un repositorio y una etiqueta con la que pueda identificar su imagen. En este caso, debe colocar la información de la imagen que creó en *Docker* y el espacio de nombres (*namespace*) creado en el ítem anterior. Coloque el siguiente comando:
```
docker tag <nombre_imagen:tag> us.icr.io/<namespace>/<nombre_imagen:tag>
```
>**Nota**: En el nombre de dominio **us.icr.io**, debe tener en cuenta colocar el dato correcto en base a la región en donde se encuentra su clúster y grupo de recursos. Para mayor información puede consultar <a href="https://cloud.ibm.com/docs/Registry?topic=Registry-registry_overview#registry_regions"> regiones </a>.

7. Envíe la imagen a *IBM Cloud Container Registry* mediante el comando:
```
docker push us.icr.io/<namespace>/<nombre_imagen:tag>
```

8. Verifique en *IBM Cloud Container Registry* que aparece el espacio de nombres (namespace), el repositorio y la imagen. Tenga en cuenta los nombres que asignó en cada paso.


## Paso 5.
### Desplegar imagen del Frontend en Kubernetes🚀
Para desplegar la imagen del frontend de la aplicación en Kubernetes, realice lo siguiente:
1. En la ventana de *Windows PowerShell* en la que ha trabajado, coloque el siguiente comando para ver la lista de clústers de Kubernetes que hay en su cuenta:
```
ibmcloud cs clusters
```

2. Verifique el nombre de clúster en el que va a desplegar la imagen y habilite el comando kubectl de la siguiente manera:
```
ibmcloud ks cluster config --cluster <cluster_name>
```

3. Cree el servicio de despliegue en Kubernetes, para esto, ejecute los comandos que se muestran a continuación (recuerde cambiar \<deployment> con un nombre para su servicio de despliegue):  
```
kubectl create deployment <deployment> --image=us.icr.io/<namespace>/<nombre_imagen:tag>
```
  
4. A continuación, debe exponer su servicio en Kubernetes, para ello realice lo siguiente.
>**NOTA 1**: Si esta trabajando con infraestructura clásica ejecute el siguiente comando:

```
kubectl expose deployment/<deployment> --type=NodePort --port=8080
```

>**NOTA 2**: Si esta trabajando con VPC (Load Balancer) ejecute el siguiente comando:
```
kubectl expose deployment/<deployment> --type=LoadBalancer --name=<service>  --port=8080 --target-port=8080
```
En la etiqueta **\<service>** indique un nombre para su servicio. Recuerde colocar el valor del puerto en base a lo establecido en el Dockerfile de la aplicación.


5. Por último verifique que el deployment y el service creados aparecen de forma exitosa en el panel de control de su clúster.
<p align="center"><img width="1000" src="https://github.com/emeloibmco/Microservicios-FrontEnd-CRUD-Mongo/blob/master/Imagenes/Dashboard-K-Frontend.gif></p>


## Paso 6.
### Prueba de Funcionamiento 🏆
Para verificar el correcto funcionamiento de su aplicación en Kubernetes realice lo siguiente:

1. Si trabaja con infraestructura clásica su aplicación funcionará si coloca en el navegador **IP_Publica:port**. Para obtener la IP Pública coloque el comando:
```
ibmcloud ks workers --cluster <ID_Cluster>
```

Para obtener el puerto use el comando:
```
kubectl get service <deployment>
```

2. Si trabaja con VPC (Load Balancer), diríjase a la pestaña Service/Services dentro del panel de control de Kubernetes, visualice el servicio creado y de click en el external endpoint.  
<p align="center"><img width="700" src="https://github.com/emeloibmco/Microservicios-FrontEnd-CRUD-Mongo/blob/master/Imagenes/Funcionamiento-Frontend.gif"></p>



## Autores ✒
Equipo IBM Cloud Tech Sales Colombia.
