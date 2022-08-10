var UrlCliente = 'http://20.216.41.245:90/G9_20/controller/C_Clientes.php?opc=GetClientes';

$(document).ready(function(){
    CargarClientes();
});

function CargarClientes(){
    $.ajax({
        url: UrlCliente,
        type: 'GET',
        datatype: 'JSON',
        success: function(reponse){
            var MiItems = reponse;
            var Valores = '';

            for(i=0; i< MiItems.length; i++){
                Valores +=  '<tr>'+
                '<td>'+ MiItems[i].Numero_Cliente +'</td>'+
                '<td>'+ MiItems[i].Nombre +'</td>'+
                '<td>'+ MiItems[i].Apellidos +'</td>'+
                '<td>'+ MiItems[i].Fecha_registro +'</td>'+
                '<td>'+ MiItems[i].Direccion_Cliente +'</td>'+
                '<td>'+ MiItems[i].RTN +'</td>'+
                '<td>'+ MiItems[i].Email +'</td>'+
              '</tr>';
              $('#DataClientes').html(Valores);
            }
        }
    })
}