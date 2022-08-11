var UrlPagos = 'http://20.216.41.245:90/G9_20/controller/pago.php?opc=GetPagos';
var UrlInsertPago = 'http://20.216.41.245:90/G9_20/controller/pago.php?opc=InsertPago';
var UrlGetPago = 'http://20.216.41.245:90/G9_20/controller/pago.php?opc=GetPago';
var UrlUpdatePago = 'http://20.216.41.245:90/G9_20/controller/pago.php?opc=UpdatePago';
var UrlDeltePago = 'http://20.216.41.245:90/G9_20/controller/pago.php?opc=DeletePago';

$(document).ready(function(){
    CargarPagos();
});

function CargarPagos(){
    $.ajax({
        url: UrlPagos,
        type: 'GET',
        datatype: 'JSON',
        success: function (reponse) {
            var MiItems = reponse;
            var Valores = '';

            for (i = 0; i < MiItems.length; i++) {
                Valores += '<tr>' +
                    '<td>' + MiItems[i].Numero_de_Pago + '</td>' +
                    '<td>' + MiItems[i].Fecha_de_Pago + '</td>' +
                    '<td>' + MiItems[i].Monto_de_Pago + '</td>' +
                    '<td>' + MiItems[i].Tipo_de_Pago + '</td>' +
                    '<td>' + MiItems[i].Numero_de_Pedido + '</td>' +
                    '<td>' + MiItems[i].Empresa + '</td>' +
                    '<td>'+
                    '<button class="btn btn-info" onclick="CargarPago('+ MiItems[i].Numero_de_Pago +')">Editar</button>'+
                    '</tr'+
                    '<td>'+
                    '<button class="btn btn-danger" onclick="EliminarPago('+ MiItems[i].Numero_de_Pago +')">Eliminar</button>'+
                    '</tr'+
                '</tr>';
                $('#DataPagos').html(Valores);
            }
        }
    });
}

function AgregarPago(){
    var datospago = {
        Numero_de_Pago: $('#Numero_de_Pago').val(),
        Fecha_de_Pago: $('#Fecha_de_Pago').val(),
        Monto_de_Pago: $('#Monto_de_Pago').val(),
        Tipo_de_Pago: $('#Tipo_de_Pago').val(),
        Numero_de_Pedido: $('#Numero_de_Pedido').val(),
        Empresa: $('#Empresa').val()
    };
    var datospagojson = JSON.stringify(datospago);

    $.ajax({
        url: UrlInsertPago, 
        type: 'POST',
        data: datospagojson,
        datatype: 'JSON',
        contenttype: 'application/json',
        success: function(reponse){
            console.log(reponse);
            alert('Pago Agregado Exitosamente');
        },
        error: function(textStatus, errorThrown){
            alert('!!Error al agregar el Pago'+ textStatus,errorThrown);
        }
    });
    alert('Aviso');
}

function CargarPago(idPago){
    var datospago = {
        Numero_de_Pago :  idPago
    }
    var datospagojson=JSON.stringify(datospago);

    $.ajax({
        url: UrlGetPago, 
        type: 'POST',
        data: datospagojson,
        datatype: 'JSON',
        contenttype: 'application/json',
        success: function(reponse){
            var MiItems = reponse;
            $('#Numero_de_Pago').val(MiItems[0].Numero_de_Pago);
            $('#Fecha_de_Pago').val(MiItems[0].Fecha_de_Pago);
            $('#Monto_de_Pago').val(MiItems[0].Monto_de_Pago);
            $('#Tipo_de_Pago').val(MiItems[0].Tipo_de_Pago);
            $('#Numero_de_Pedido').val(MiItems[0].Numero_de_Pedido);
            $('#Empresa').val(MiItems[0].Empresa);
            var btnactualizar = '<input type="submit" id="btn_actualizar" onclick="ActualizarPago(' + MiItems[0].Numero_de_Pago + ')"'+
            'value ="Actualizar Pago" class="btn btn-primary"></input';
            $('#btnagregarpago').html(btnactualizar);
        }
    });
}

function ActualizarPago(idPago){
    var datospago = {
    Numero_de_Pago :  idPago,
    Fecha_de_Pago: $('#Fecha_de_Pago').val(),
    Monto_de_Pago: $('#Monto_de_Pago').val(),
    Tipo_de_Pago: $('#Tipo_de_Pago').val(),
    Numero_de_Pedido: $('#Numero_de_Pedido').val(),
    Empresa: $('#Empresa').val()
    };
    var datospagojson=JSON.stringify(datospago);

    $.ajax({
        url: UrlUpdatePago, 
        type: 'PUT',
        data: datospagojson,
        datatype: 'JSON',
        contenttype: 'application/json',
        success: function(reponse){
            console.log(reponse);
            alert("Pago Actualizado");
        },
        error: function(textStatus, errorThrown){
            alert('Error al Actualizar Pago'+ textStatus + errorThrown)
        }
    });
    alert('Aviso');
}

function EliminarPago(idPago){
    var datospago = {
        Numero_de_Pago :  idPago
    }
    var datospagojson=JSON.stringify(datospago);

    $.ajax({
        url: UrlDeltePago, 
        type: 'DELETE',
        data: datospagojson,
        datatype: 'JSON',
        contenttype: 'application/json',
        success: function(reponse){
            console.log(reponse);
            alert("Pago Eliminado");
        },
        error: function(textStatus, errorThrown){
            alert('!!Error al eliminar Pago¡¡'+ textStatus + errorThrown)
        }
    });
    alert('Aviso');
    CargarPagos();
}