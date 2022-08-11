var UrlProductos = 'http://20.216.41.245:90/G9_20/controller/producto_negocio.php?opc=GetProductos';
var UrlInsertSocio = 'http://20.216.41.245:90/G9_20/controller/producto_negocio.php?opc=InsertProducto';
var UrlGetProducto = 'http://20.216.41.245:90/G9_20/controller/producto_negocio.php?opc=GetProducto';
var UrlUpdateProducto = 'http://20.216.41.245:90/G9_20/controller/producto_negocio.php?opc=UpdateProducto';
var UrlDeleteProducto = 'http://20.216.41.245:90/G9_20/controller/producto_negocio.php?opc=DeleteProducto';

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
                '<td>'+
                '<button class="btn btn-info" onclick="CargarProducto('+ MisItems[i].NumeroDePedido +')">Editar</button>'+
                '</td>'+
                '<td>'+
                '<button class="btn btn-danger" onclick="EliminarProducto('+ MisItems[i].NumeroDePedido +')">Eliminar</button>'+
                '</td>'
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

function CargarProducto(idProducto){
    var datosproducto = {
        NumeroDePedido: idProducto
    };
    var datosproductojson = JSON.stringify(datosproducto);

    $.ajax({
        url: UrlGetProducto,
        type: 'POST',
        data: datosproductojson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response){
            var MisItems = response;
            $('#NumeroDePedido').val(MisItems[0].NumeroDePedido);
            $('#NombreArticulo').val(MisItems[0].NombreArticulo);
            $('#PrecioUnitario').val(MisItems[0].PrecioUnitario);
            $('#FechaDePedido').val(MisItems[0].FechaDePedido);
            $('#CantidadDeArticulo').val(MisItems[0].CantidadDeArticulo);
            $('#MontoTotal').val(MisItems[0].MontoTotal);
            $('#AplicaImpuesto').val(MisItems[0].AplicaImpuesto);
            var btnactualizar = '<input type="submit" id="btn_actualizar" onclick="ActualizarProducto(' + MisItems[0].NumeroDePedido + ')"' +
            'value="Actualizar Producto" class="btn btn-primary"></input>';   
            $('#btnAgregarProducto').html(btnactualizar); 
        }
    });
}

function ActualizarProducto(idProducto){
    var datosproducto = {
        NumeroDePedido: idProducto,
        NombreArticulo: $('#NombreArticulo').val(),
        PrecioUnitario: $('#PrecioUnitario').val(),
        FechaDePedido: $('#FechaDePedido').val(),
        CantidadDeArticulo: $('#CantidadDeArticulo').val(),
        MontoTotal: $('#MontoTotal').val(),
        AplicaImpuesto: $('#AplicaImpuesto').val()
    };
    var datosproductojson = JSON.stringify(datosproducto);

    $.ajax({
        url: UrlUpdateProducto,
        type: 'PUT',
        data: datosproductojson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response){
            console.log(response);
            alert("Producto Actualizado");
        },
        error: function(textStatus, errorThrow){
            alert('Error al Actualizar Producto' + textStatus + errorThrow);
        }
    });
    alert('Aviso');
}

function EliminarProducto(idProducto){
    var datosproducto = {
        NumeroDePedido: idProducto
    };
    var datosproductojson = JSON.stringify(datosproducto);

    $.ajax({
        url: UrlDeleteProducto,
        type: 'DELETE',
        data: datosproductojson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response){
            console.log(response);
            alert("Producto Eliminado");
        },
        error: function(textStatus, errorThrow){
            alert('Error al eliminar el Producto');
        }
    });
    alert('Aviso');
    CargarProductos();
}