# AngularWebFrontCRUD

Esta aplicación se construyó para ser el FRONT o interfaz de usuario de una arquitectura multi-capa. Esta aplicación de ejemplo es una aplicación que permite crear transacciones (giros), que son almacenados en una base de datos.

La siguiente es la URL de el despliegue de esta aplicación demo: http://company-app-default.openshift311-ea9753cca330b7f05a99ad5b2c8b5da1-0001.us-east.containers.appdomain.cloud/inicio

La aplicación esta compuesta por 3 contenedores:

- El Front, front desarrollado en Angular, para la interfaz de usuario Web --> Esta guía 
- CRUD, backend desarrollado en express, que expone API's para la operaciones hacia la base de datos
- MongoDB, un contenedor con el motor de la base de datos MongoDB

** Tanto el CRUD (backend) como la base de datos (MongDB) los pueden encontrar con su respectiva guía de despliegue en el siguiente link: https://github.com/emeloibmco/AngularWebCRUDMongo

# Funcionamiento de la aplicación 

El objetivo de la aplicación demo Web CRUD con MongoDB es generar un sistema de control de transacciones diarias por cliente de los establecimiento de la compañia company, esta aplicación tiene tres pantallas principales de interacción con el usuario.

La primera de ellas como se puede observar en la imagen inferior, consiste en la página de bienvenida al sistema, que le muestra al usuario dos botones, con las dos funcionalidades principales, las cuales son observar las transacciones realizadas y agregar una nueva transacción.

<img width="960" alt="com" src="https://user-images.githubusercontent.com/60987042/77773230-4dcc1300-7017-11ea-813e-02d4b544df04.PNG">


La siguiente parte es al seleccionar la opción de agregar una nueva transacción, donde se puede observar la pantalla con un formulario que obtiene los datos principales de control de una transacción, los cuales son: nombre, apellido, cedula, fecha de la transacción, dirección de residencia, ciudad, valor y tipo de transacción. Aquí lo que se espera es que los cajeros de las sedes de company, registren los datos y mantengan en control las transacciones realizadas por los clientes de la empresa.

<img width="949" alt="tra" src="https://user-images.githubusercontent.com/60987042/77773359-7e13b180-7017-11ea-91f2-98e0eb354f24.PNG">

Por último, se observa la siguiente opción del menu de bienvenida que es el de observar el historial de transacciones, dentro de esta pantalla se pueden observar las distintas transacciones que se han realizado en el sistema con su información pertinente, además de presentar la funcionalidad de eliminar una transacción por medio del boton borrar, donde elimina completamente todo el registro de la transacción.

<img width="945" alt="ver" src="https://user-images.githubusercontent.com/60987042/77773493-adc2b980-7017-11ea-9fed-088c36eeaa5d.PNG">


# Pre-requisitos

- Haber realizado y desplegado el Backend del CRUD y la creación de la base de datos del link: https://github.com/emeloibmco/AngularWebCRUDMongo

# Despliegue en OpenShift desde IBM Cloud shell: 🚀

### Haga 'login' a IBM Cloud desde la línea de comando

_Inicialmente debe acceder al shell de IBM Cloud desde el siguiente link:_
```
https://cloud.ibm.com/shell
```
_1.	Inicie sesión desde la consola de IBM Cloud Shell, para hacerlo utilizamos el siguiente comando:_

```
ibmcloud login --sso
```
_Al digitar el comando anterior nos aparece una pregunta la cual debemos responder con una **Y**_

_En este momneto nos pide un codigo de seguridad, el cual debemos obtener en el siguiente link y pegarlo en la consola de IBM Cloud Shell._
```
https://identity-2.us-south.iam.cloud.ibm.com/identity/passcode
```
_Al digitar el comando anterior nos aparecera una pregunta en la cual debemos indicar el numero perteneciente a la cuenta en la que se va a trabajar._

_2.	Configure el entorno de trabajo. Es necesario asignar (target) la region y el grupo de recursos, en donde esta desplegado el cluster de Open Shift, que vamos a utilizar en el ejercicio.

Para esto debe colocar el siguiente comando en la terminal._
```
ibmcloud target -r us-east -g openshift-workshop
```
_De este modo tenemos el 'login' en IBM Cloud y el ingreso por linea de comando al cluster de Open Shift, para iniciar para el despliegue de la aplicación._


### Acceda el cluster de Open Shift (ROKS) desplegado en IBM Cloud 📦


_3.	Inicie sesión e ingrese desde la CLI de OpenShift al clúster en el que se va a trabajar._

_Para ingresar al clúster que tengamos aprovisionado en nuestra cuenta de IBM Cloud se deben realizar los siguientes pasos:_

_•	Ingresar a la plataforma de IBM cloud con sus credenciales de inicio de sesión, lo puede hacer desde el siguiente link:_

```
https://cloud.ibm.com/
```

_•	Diríjase al resource list._
_Primero debe dar clic en el navigation menu y luego donde dice Resource list, como se puede ver en la siguiente imagen:_

<img width="700" alt="7" src="https://user-images.githubusercontent.com/60987042/76996077-da434b00-691e-11ea-92be-558da48f7d97.PNG">


_•	Diríjase a la sección de clústers y dar clic en el que se desea acceder._

_•	Se da clic en el botón OpenShift web console._

### Haga 'login' en el cluster de Open Shift (ROKS) desde la linea de comando 📦

_•	Ahora en la parte superior derecha se da clic sobre el ID del correo con el que ingresamos y luego en la sección que dice Copy Login Command._

<img width="144" alt="1" src="https://user-images.githubusercontent.com/60987042/76917049-53479180-6890-11ea-91a1-b2c2c9213729.PNG">

_•	Y por último volvemos a la terminal que se estaba utilizando pegamos y damos enter._

### Cree un nuevo proyecto en Open Shift para desplegar las aplicaciones 📦

_4.	Cree un nuevo proyecto en el cluster de la siguiente manera:_
```
oc new-project <projectname>
```
_**Nota:** Para el **projectname** coloque **openshift + las iniciales de su nombre y apellido.**_

_5.	Acceda al proyecto que acabo de crear de la siguiente manera:_

```
oc project <projectname>
```

## Despliegue Del FRONT de la Aplicación 📦

### Clonar repositorio desde GitHub

_6.	Clone el repositorio de la aplicación que se desea desplegar._

_**URL app de AngularWebFrontCRUD:** https://github.com/emeloibmco/AngularWebFrontCRUD.git_

_7.	Desde el Shell de IBM cloud digite el comando:_

```
Git clone <url_repositorio>
```
_8.	Dirigirse desde a esta carpeta con el comando:_

_•	Para la carpeta del proyecto AngularWebFrontCRUD:_
```
cd AngularWebFrontCRUD
```

### Cambio credenciales CRUD en el proyecto Angular 

** En caso de no haber desplegado el Back, se puede manejar la conexión que ya se encuentra en el OpenShift y puede seguir al siguiente paso de la guía que seria el despliegue de la aplicación en OpenShift  ** 

_Despues de realizar el despliegue del Backend del CRUD en OpenShift es necesario cambiar las credenciales de acceso desde el FRONT, por lo tanto se debe seguir los siguientes pasos para modificar el archivo query.service.ts, el cual es donde está ubicado la conexión al BackEnd:_

_1. Desde el shell de IBM Cloud se digita el comando para ir a la locación del archivo que vamos a editar:_
```
cd src/app/services
```
_Este comando lo que hace es redirigir a la carpeta donde esta alojado el archivo previamente mencionado_

_2. Para editar el archivo se va a utilizar el editor de texto por defecto del IBM Cloud Shell, el cual es nano, por lo tanto se debe digitar el siguiente comando para modificar las credenciales:_
```
nano query.service.ts
```
_Aquí se accede a una pantalla similar a está, que es donde se editará el código de acceso al BackEnd:_

<img width="700" alt="img 1" src="https://user-images.githubusercontent.com/45157348/77068099-05c44500-69b4-11ea-8a85-035d4e35fe6f.PNG">

_3. Para hacer el cambio de las credenciales, se necesita la URL que arroja el despliegue del BackEnd, con dicha URL lo que se debe hacer es remplazar esta sección con las nuevas credenciales de la siguiente manera:_
```
  readonly URL_API_CREATE_TRANSACTION = '<URL DEL NUEVO DESPLIEGUE>/api/customers';
  readonly URL_API_GET_TRANSACTIONS = '<URL DEL NUEVO DESPLIEGUE>/api/customers';
  readonly URL_API_DELETE = '<URL DEL NUEVO DESPLIEGUE>/api/customers';
```
_Para cada una de las variables a editar es necesario que al final siempre termine con /api/customers para que acceda a los puertos indicados._

_4. Se guarda el archivo con la nueva edición digitando CTRL+X , cuando aparezca la pregunta si se desea guardar los cambios se digita Y y se pulsa ENTER, ya de esta manera los cambios quedan guardados y se puede realizar el siguiente paso._

_5. Por último, regresamos a la carpeta principal del proyecto digitando 3 veces el siguiente comando:_
```
  cd ..
```
_Despues de este paso es necesario, verificar que en el shell aparezca esta ruta como la actual:_

<img width="238" alt="img 2" src="https://user-images.githubusercontent.com/45157348/77068097-052bae80-69b4-11ea-9d5c-004ce93905da.PNG">

### Despliegue de la aplicación en OpenShift

_9.	Para desplegar la aplicación en OpenShift es necesario escribir el siguiente comando:_
```
npx nodeshift --strictSSL=false --dockerImage=nodeshift/ubi8-s2i-web-app --imageTag=10.x --build.env OUTPUT_DIR=dist/angular-web-app --expose
```
_El resultado de este comando va a ser una respuesta de este tipo, que nos indica que 
la aplicación se desplego correctamente._

<img width="700" alt="company oc" src="https://user-images.githubusercontent.com/45157348/77031132-ab54c580-696e-11ea-8f1f-e2d4276ee826.PNG">

_10.	Para poder acceder al la URL de la aplicación y realizar la verificación de la misma debemos:_

_•Acceder a IBM cloud._

_•Dirigirse al resource list._

_•Dirigirse a la sección de clusters._

_•Ingresar al cluster que lleva por nombre openshift.311._

_•Ingrese a la sección de openshift web console._

_•Buscar el proyecto que creo con sus iniciales y buscar la aplicación que se desplego._

_Y por último solo faltaría dar clic en el link que lo llevara a la aplicación desplegada._


<img width="700" alt="company oc 2" src="https://user-images.githubusercontent.com/45157348/77031131-aabc2f00-696e-11ea-95a9-8a6ee3c72128.PNG">

_De esta forma se daría por terminado el despliegue de la aplicación angular en openshift._

