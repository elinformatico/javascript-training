

document.addEventListener('DOMContentLoaded', function()
{    

    const ajaxVanilla = (type, url, response, reject) => {

        const xhr = new XMLHttpRequest();
        xhr.onload = () => {

            if(xhr.status >= 200 && xhr.status < 300){
                response(xhr.response);
            } else {
                reject({
                    'status'  : 'fail',
                    'message' : 'ocurrio un error al hacer la peticion al servidor'
                });
            }
        }

        // GET, POST, PUT, DELETE, UPDATE
        xhr.open(type, url);
        xhr.send();
    }

    const ajaxPromise = (type, url) => {

        return new Promise( (resolver, reject) => {

            const xhr = new XMLHttpRequest();
            xhr.onload = () => {

                if(xhr.status >= 200 && xhr.status < 300){
                    resolver(xhr.response);
                } else {
                    reject({
                        'status'  : 'fail',
                        'message' : 'ocurrio un error al hacer la peticion al servidor'
                    });
                }
            }
            // GET, POST, PUT, DELETE, UPDATE
            xhr.open(type, url);
            xhr.send();

        });

    }

    // Ejemplo usando Callbacks
   /* ajaxVanilla('GET', 'https://elinformatico.net/fnz/api/public/get/usuarios', 
        function(response) {
            console.log(response);
        },
        function(reject) {
            console.log(reject);
        });*/
    
    
    // Ejemplo usando Promises
    ajaxPromise('GET', 'https://elinformatico.net/fnz/api/public/get/usuarios')
    .then(function(resolver) {

        const result = JSON.parse(resolver);
        const {msg, status, usuarios} = result;

        console.log(usuarios);

        let containerListadoUsuarios = document.getElementById('listadoUsuarios');
        usuarios.forEach(usuario => {
            
            let userLabel = document.createElement('label');
            let br = document.createElement('br');

            userLabel.innerHTML = usuario.usr_nombre_usuario;

            containerListadoUsuarios.appendChild(userLabel);
            containerListadoUsuarios.appendChild(br);
        });

    })
    .catch((reject) => {
        console.log(resolver);
    });

    const callbackExample = (name, callback) => {

        // Funcion para simular un delay de 3 segudos y luego mandamos como objeto un nombre y un status
        setTimeout(() =>{
            callback({
                'nombre' : name,
                'status' : 'success',
                'message': `Hello ${name}`
            });
        }, 3000);
    }

    callbackExample('Noe Hernandez', (callback) => {
        console.log(callback);
        //alert(callback.message);
    });
});





