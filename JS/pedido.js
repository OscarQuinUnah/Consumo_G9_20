var urlpedidos = 'http://20.216.41.245:90/G9_20/controller/pedido.php?opc=GetPedidos';
var urlinsertpedido = 'http://20.216.41.245:90/G9_20/controller/pedido.php?opc=InsertPedido';
var urlGetpedido = 'http://20.216.41.245:90/G9_20/controller/pedido.php?opc=GetPedido';
var urlUpdatepedido='http://20.216.41.245:90/G9_20/controller/pedido.php?opc=UpdatePedido';
var urldeletepedido='http://20.216.41.245:90/G9_20/controller/pedido.php?opc=DeletePedido';

$(document).ready(function(){
    Cargarpedidos();
});

function Cargarpedidos(){
    $.ajax({
        url:urlpedidos,
        type:'GET',
        datatype: 'JSON',
        success: function(reponse){
            var MiItems=reponse;
            var valores= '';

            for(i=0; i< MiItems.length; i++){
                valores +=  '<tr>'+
                '<td>'+ MiItems[i].NumeroPedido +'</td>'+
                '<td>'+ MiItems[i].NumeroCliente +'</td>'+
                '<td>'+ MiItems[i].Empresa +'</td>'+
                '<td>'+ MiItems[i].FechaPedido +'</td>'+
                '<td>'+ MiItems[i].Direccion +'</td>'+
                '<td>'+ MiItems[i].TipodePago +'</td>'+
                '<td>'+ MiItems[i].MontoTotal +'</td>'+
                '<td>'+
                '<button class="btn btn-info" onclick="Cargarpedido('+ MiItems[i].NumeroPedido +')">Editar</button>'+
                '</td>'+
                '<td>'+
                '<button class="btn btn-danger" onclick="Eliminarpedido('+ MiItems[i].NumeroPedido +')">Eliminar</button>'+
                '</td>'+
            '</tr>';
            $('#DataPedidos').html(valores);
            }
        }
    });
}

function Agregarpedido(){
    var datospedido={
        NumeroPedido:$('#NumeroPedido').val(),
        NumeroCliente:$('#NumeroCliente').val(),
        Empresa:$('#Empresa').val(),
        FechaPedido:$('#FechaPedido').val(),
        Direccion:$('#Direccion').val(),
        TipodePago:$('#TipodePago').val(),
        MontoTotal:$('#MontoTotal').val()
    };
    var datospedidojson= JSON.stringify(datospedido);
    $.ajax({
        url:urlinsertpedido,
        type: 'POST',
        data: datospedidojson,
        datatype: 'JSON',
        contenttype: 'application/json',
        success: function(reponse){
            console.log(reponse);
            alert('Pedido Agregado Correctamente');
        },
        error:function(textStatus, errorThown ){
            alert('error al agregar el pedido'+ textStatus+ errorThown);
        }
    });
    alert('aviso');
}

function Cargarpedido(idpedido) {
    var datospedido = {
        NumeroPedido: idpedido
    };
    var datospedidojson = JSON.stringify(datospedido); 

    $.ajax({
        url: urlGetpedido,
        type:'POST',
        data: datospedidojson,
        datatype: 'JSON',
        contenttype:'application/json',
        success: function(reponse) {
            var MiItems = reponse;
            $('#NumeroPedido').val(MiItems[0].NumeroPedido);
            $('#NumeroCliente').val(MiItems[0].NumeroCliente);
            $('#Empresa').val(MiItems[0].Empresa);
            $('#FechaPedido').val(MiItems[0].FechaPedido);
            $('#Direccion').val(MiItems[0].Direccion);
            $('#TipodePago').val(MiItems[0].TipodePago);
            $('#MontoTotal').val(MiItems[0].MontoTotal);
            var btnActualizar = '<input type="submit" id="btn_actualizar" onclick="Actualizarpedido(' + MiItems[0].NumeroPedido + ')"'+'value="Actualizar Pedido" class="btn btn-primary"></input>';
            $('#btnagregarpedido').html(btnActualizar);
        }
    });
}

function Actualizarpedido(idpedido){
    var datospedido = {
        NumeroPedido: idpedido,
        NumeroCliente: $('#NumeroCliente').val(),
        Empresa: $('#Empresa').val(),
        FechaPedido: $('#FechaPedido').val(),
        Direccion: $('#Direccion').val(),
        TipodePago: $('#TipodePago').val(),
        MontoTotal: $('#MontoTotal').val()
    };
    var datospedidojson = JSON.stringify(datospedido);

    $.ajax({
        url: urlUpdatepedido,
        type: 'PUT',
        data: datospedidojson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response){
            console.log(response);
            alert("Pedido Actualizado");
        },
        error: function(textStatus, errorThrow){
            alert('Error al Actualizar Pedido' + textStatus + errorThrow);
        }
    });
    alert('Aviso');
}

function Eliminarpedido(idpedido){
    var datospedido = {
        NumeroPedido: idpedido
    };
    var datospedidojson = JSON.stringify(datospedido);

    $.ajax({
        url: urldeletepedido,
        type: 'DELETE',
        data: datospedidojson,
        datatype: 'JSON',
        contenttype: 'application/json',
        success: function(reponse){
            console.log(reponse);
        }
    });
    alert('Pedido eliminado');
    Cargarpedidos();
}