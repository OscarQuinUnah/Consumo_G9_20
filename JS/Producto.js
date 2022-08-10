var UrlProductos = 'http://20.216.41.245:90/G9_20/controller/producto_negocio.php?opc=GetProductos';
var UrlInsertSocio = 'http://20.216.41.245:90/G9_20/controller/producto_negocio.php?opc=InsertProducto';

$(document).ready(function(){
    CargarProductos();
});

function CargarProductos(){
    $.ajax({
        url: UrlProductos,
        type: 'GET',
        datatype: 'JSON',
        success: function(response){
            var MisItems = response;
            var Valores = '';

            for(i = 0; i < MisItems.length; i++){
                Valores += '<tr>'+
                '<td>'+ MisItems[i].NumeroDePedido + '</td>'+
                '<td>'+ MisItems[i].NombreArticulo + '</td>'+
                '<td>'+ MisItems[i].PrecioUnitario + '</td>'+
                '<td>'+ MisItems[i].FechaDePedido + '</td>'+
                '<td>'+ MisItems[i].CantidadDeArticulo + '</td>'+
                '<td>'+ MisItems[i].MontoTotal + '</td>'+
                '<td>'+ MisItems[i].AplicaImpuesto + '</td>'+
            '</tr>';
            $('#DataProductos').html(Valores);
            }
        }
    });
}

function AgregarProducto(){
    var datosProductos = {
        NumeroDePedido : $('#NumeroDePedido').val(),
        NombreArticulo : $('#NombreArticulo').val(),
        PrecioUnitario : $('#PrecioUnitario').val(),
        FechaDePedido : $('#FechaDePedido').val(),
        CantidadDeArticulo : $('#CantidadDeArticulo').val(),
        MontoTotal : $('#MontoTotal').val(),
        AplicaImpuesto : $('#AplicaImpuesto').val()
    };
    var datosProductosjson = JSON.stringify(datosProductos);

    $.ajax({
        url: UrlInsertSocio,
        type: 'POST',
        data: datosProductosjson,
        datatype: 'JSON',
        contenttype: 'application/json',
        success: function(response){
            console.log(response);
            alert('Producto Agregado Correctamente');
        },
        error: function(textStatus, errorThrow){
            alert('Error al agregar el producto'+ textStatus + errorThrow);
        }
    });
    alert('Aviso');
}