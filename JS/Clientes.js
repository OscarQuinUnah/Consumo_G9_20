var UrlClientes = 'http://20.216.41.245:90/G9_20/controller/C_Clientes.php?opc=GetClientes';
var UrlInsertCliente = 'http://20.216.41.245:90/G9_20/controller/C_Clientes.php?opc=InsertCliente';
var UrlGetCliente = 'http://20.216.41.245:90/G9_20/controller/C_Clientes.php?opc=GetCliente';
var UrlUpdateCliente = 'http://20.216.41.245:90/G9_20/controller/C_Clientes.php?opc=UpdateCliente';
var UrldeleteCliente= 'http://20.216.41.245:90/G9_20/controller/C_Clientes.php?opc=DeleteCliente';
$(document).ready(function () {
    CargarClientes();
});

function CargarClientes() {
    $.ajax({
        url: UrlClientes,
        type: 'GET',
        datatype: 'JSON',
        success: function (reponse) {
            var MiItems = reponse;
            var Valores = '';

            for (i = 0; i < MiItems.length; i++) {
                Valores += '<tr>' +
                    '<td>' + MiItems[i].Numero_Cliente + '</td>' +
                    '<td>' + MiItems[i].Nombre + '</td>' +
                    '<td>' + MiItems[i].Apellidos + '</td>' +
                    '<td>' + MiItems[i].Fecha_registro + '</td>' +
                    '<td>' + MiItems[i].Direccion_Cliente + '</td>' +
                    '<td>' + MiItems[i].RTN + '</td>' +
                    '<td>' + MiItems[i].Email + '</td>' +
                    '<td>' +
                    '<button class="btn btn-info" onclick="CargarCliente(' + MiItems[i].Numero_Cliente + ')">Editar</button>' +
                    '</td>' +
                    '<td>' +
                    '<button class="btn btn-danger" onclick="EliminarCliente('+MiItems[i].Numero_Cliente+')">Eliminar</button>'+
                    '</td>' +
                '</tr>';
                $('#DataClientes').html(Valores);
            }
        }
    })
}

function AgregarClientes() {
    var datoscliente = {
        Numero_Cliente: $('#Numero_Cliente').val(),
        Nombre: $('#Nombre').val(),
        Apellidos: $('#Apellidos').val(),
        Fecha_registro: $('#Fecha_registro').val(),
        Direccion_Cliente: $('#Direccion_Cliente').val(),
        RTN: $('#RTN').val(),
        Email: $('#Email').val()
    };
    var datosclientejson = JSON.stringify(datoscliente);
    $.ajax({
        url: UrlInsertCliente,
        type: 'POST',
        data: datosclientejson,
        datatype: 'JSON',
        contenttype: 'application/json',
        success: function (response) {
            console.log(response)
            alert('Cliente Agregado con Exito')
        },
        error: function (textStatus, errorThrown) {
            alert('Error al Agregar el Cliente' + textStatus + errorThrown);
        }
    });
    alert('Aviso')
}

function CargarCliente(idcliente) {
    var datoscliente = {
        Numero_Cliente: idcliente
    };
    var datosclientejson = JSON.stringify(datoscliente);

    $.ajax({
        url: UrlGetCliente,
        type: 'POST',
        data: datosclientejson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function (response) {
            var MiItems = response;
            $('#Numero_Cliente').val(MiItems[0].Numero_Cliente);
            $('#Nombre').val(MiItems[0].Nombre);
            $('#Apellidos').val(MiItems[0].Apellidos);
            $('#Fecha_registro').val(MiItems[0].Fecha_registro);
            $('#Direccion_Cliente').val(MiItems[0].Direccion_Cliente);
            $('#RTN').val(MiItems[0].RTN);
            $('#Email').val(MiItems[0].Email);
            var btnactualizar = '<input type="submit" id="btn_actualizar" onclick="ActualizarCliente(' + MiItems[0].Numero_Cliente + ')"' +
                'value="Actualizar Cliente" class= "btn btn-primary"></input>';
            $('#btnagregarcliente').html(btnactualizar);
        }
    });

}

function ActualizarCliente(idcliente) {
    var datoscliente = {
        Numero_Cliente: idcliente,
        Nombre: $('#Nombre').val(),
        Apellidos: $('#Apellidos').val(),
        Fecha_registro: $('#Fecha_registro').val(),
        Direccion_Cliente: $('#Direccion_Cliente').val(),
        RTN: $('#RTN').val(),
        Email: $('#Email').val()
    };
    var datosclientejson = JSON.stringify(datoscliente);
 
    $.ajax({
        url: UrlUpdateCliente,
        type: 'PUT',
        data: datosclientejson,
        datatype: 'JSON',
        contenttype: 'application/json',
        success: function (response) {
            console.log(response);
            alert("Cliente Actualiazdo con Exito");
        },
        error: function (textStatus, errorThrown) {
            alert('Error al Actualizar el Cliente' + textStatus + errorThrown);
        }
    });
    alert('Aviso')
}

function EliminarCliente(idcliente){
    var datoscliente = {
        Numero_Cliente: idcliente
    };
    var datosclientejson = JSON.stringify(datoscliente);

    $.ajax({
        url: UrldeleteCliente,
        type: 'DELETE',
        data: datosclientejson,
        contentType: 'application/json',
        success: function(response) {
            console.log(response);
        }
    });
    alert("Cliente eliminado con exito");
    CargarClientes();
}